import React from 'react'
import { useEffect,useState } from "react";
import clientAxios from "../../config/axios";
import { FaTimes } from 'react-icons/fa';
import { AiFillCloseCircle } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from "moment";
// Configura pdfmake con los tipos de letra necesarios
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const ExamenSolicitado = ({ consultaId, pacienteId, profesionalId,consulta }) => {
    const [secciones, setSecciones] = useState([
        { nombre: 'Hematológicos', examenes: ['Hemograma', 'Grupo sanguineo ABO y RH','Reticulocitos','Protrombina','TTPK'] },
        { nombre: 'Bioquímicos', examenes: ['Perfil Bioquímico', 'Perfil Lipídico','Perfil Hepático',
        'Glicemia','Test tolerancia glucosa', 'Proteínas totales','Albúmina','Ac.Urico,Uricemia','Calcio',
         'Fósforo, Fosfemia','Fosfatasa alcalina','Colinesterasa','Creatinina','Amilasa, Amilasemia',
        'L.D.H.','G.G.T.' ,'CK Total','Ck.MB','Electrolitos: Na-K-CI','Clearence de creatina','Uremia, Nitrogeno ureico',
        'Proteína C reactiva','GOT/GPT'] },
        { nombre: 'Orina', examenes: ['Orina Completa', 'Creatinuria','Microalbuminuria','Proteinuria 24 Horas',
        'Test de Embarazo','Urocultivo','R.A.C.'] },
        { nombre: 'Toma de muestra', examenes: ['Venosa en Adultos', 'Venosa Niño y Lac.'] },

        { nombre: 'Serológicos e inmunológicos', examenes: ['VIH (ELISA)', 'VDRL','Aglutinaciones Tificas','Monotest',
        'Titulo ASO/Antiestreptolisina','Factor Reumatoídeo','Inmonoglobulinas G - A - M','Ig E','Ig A secretora',
        'Hepatitis A lgM','Hepatitis A Ac.(igM + igG)','Hepatitis B Antígeno de superficie','Hepatitis B Ac de Ag (Vacuna)','Hepatitis C',
        'Ac. Antinucleares (ANA)', 'Complemento C3,C4,C1q c/u','ENA', 'ANCA','Ac. Anti tiroideo (Anti micr-Anti tirog)','Ac.Anti DNA u otros'] },
        { nombre: 'Hormonales', examenes: ['T3','T4','TSH','T4 LIBRE','FSH','LH','Protaltina','Gonadotrofina coriónica (BHCG)','Progesterona',
        'Testosterona Total','Testosterona Libre','DHEA-S',' Hb Glicosilada','Cortisol','Insulina','Insulina curva','Estradiol'] },
        { nombre: 'Microbiologia', examenes: ['Cultivo Secreción vaginal', 'Cultivo corriente','Antibiograma','Gram Directo','Ex.microscopio Direct.'] },
        { nombre: 'Deposiciones', examenes: ['Coproparasitológico', 'Test Graham','Leucocitos fecales','Rotavirus','Hemorragias Ocultas',
        'Coprocultivo','Helicobacter Pylori'] },
        { nombre: 'Marcadores tumorales', examenes: ['PSA TOTAL Y LIBRE ','Ca 125','Ca 19.9','Ca 15.3',
        'Ag. Carcino Embrionario(CEA)','Alfafeto proteínas (AFA)'] },
        { nombre: 'Exámenes varios', examenes: ['Papanicolau','Eosinófilos en secreción','Vitamina B 12','Vitamina D',
        'Drogas Terapéuticas(Ac valproicofenitoina, fenobarbital digoxina,etc)','Drogas de abuso en orina','Ferritina',
        'Trasferritina','Ferremia','Test Coombs indirecto','Chagas','Panel ETS'] },
      ]);
      const [examen, setExamen] = useState([]);
      const [seccionActiva, setSeccionActiva] = useState(null);
      const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
      const [examenPersonalizado, setExamenPersonalizado] = useState('');
      const [modalOpen, setModalOpen] = useState(false);
      const [searchValue, setSearchValue] = useState("");
      const [loading, setLoading] = useState(true); 
      const [seccionVisible, setSeccionVisible] = useState(false);

      useEffect(() => {
      const fetchData = async () => {
        const tokenPro = localStorage.getItem('tokenPro');
        if (!tokenPro) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenPro}`
          }
        };
          try {
            const { data } = await clientAxios.get(`/profesional/obtener-examenes-solicitados/${consultaId}`, config);
         setExamen(data)
         setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
            fetchData();
          }, []); 
      const openModal = () => {
        setModalOpen(true);
      };
      
      const closeModal = () => {
        setModalOpen(false);
      };
    
      const handleSeccionClick = (seccionIndex) => {
        if (seccionActiva === seccionIndex) {
            setSeccionActiva(null); // Restablecer la sección activa si se hace clic nuevamente
          } else {
            setSeccionActiva(seccionIndex);
          }
    }
     
    
      const handleOptionChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
          // Si la opción está seleccionada, la agregamos al estado
          setOpcionesSeleccionadas((prevOpciones) => [...prevOpciones, value]);
        } else {
          // Si la opción no está seleccionada, la eliminamos del estado
          setOpcionesSeleccionadas((prevOpciones) =>
            prevOpciones.filter((opcion) => opcion !== value)
          );
        }
      };
    
      const handleExamenPersonalizadoChange = (e) => {
        setExamenPersonalizado(e.target.value);
      };
    
      const handleAgregarExamenPersonalizado = () => {
        if (examenPersonalizado.trim() !== '') {
          setOpcionesSeleccionadas((prevOpciones) => [
            ...prevOpciones,
            examenPersonalizado
          ]);
          setExamenPersonalizado('');
        }
      };
      const solicitarExamen = async () => {
        try {
          // Obtener el contenido del PDF a partir de las opciones seleccionadas
          const content = opcionesSeleccionadas.map((opcion) => {
            return { text: opcion };
          });
      
          // Crear el documento PDF
          const documentDefinition = {
            content,
            styles: {
              header: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 10] // Márgenes [arriba, izquierda, abajo, derecha]
              }
            }
          };
      
          // Generar el PDF a partir del documento definido
          const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
      
          // Obtener el blob del PDF generado
          pdfDocGenerator.getBlob(async (blob) => {
            const confirmar = await Swal.fire({
              title: '¿Estás seguro de generar esta lista de exámenes?',
              html: `<b>Examenes seleccionados:</b> ${opcionesSeleccionadas.join(', ')}`,
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#5d5ddb',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Enviar solicitud'
            }).then((result) => {
              if (result.isConfirmed) {
                return true;
              } else {
                return false;
              }
            });
            
          if(confirmar) {
            try {
              // Crear un FormData y agregar el PDF con el nombre 'documento'
              const formData = new FormData();
              formData.append('documento', blob, 'documento.pdf');
              formData.append('opciones', opcionesSeleccionadas.join(', '));
              formData.append('consultaId', consultaId);
              formData.append('pacienteId', pacienteId);
              formData.append('profesionalId', profesionalId);
      
              // Realizar la petición al backend utilizando Axios
              const tokenPro = localStorage.getItem('tokenPro');
              const config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${tokenPro}`,
                }
              };
      
              const response = await clientAxios.post('/profesional/guardar-examenes-solicitado', formData, config);
      
      
              // Mostrar mensaje de éxito o realizar la acción deseada
              Swal.fire('¡Perfecto!', 'Examen solicitado', 'success');
      
              // Limpiar las opciones seleccionadas
              setOpcionesSeleccionadas([]);
              setModalOpen(false)
            } catch (error) {
              // Manejar el error en caso de fallo al subir el PDF al backend
              console.log(error);
              Swal.fire('¡Error!', 'No se pudo enviar la solicitud', 'error');
            }
          }
          });
        } catch (error) {
          // Manejar el error en caso de fallo al generar el PDF
          console.log(error);
          Swal.fire('¡Error!', 'No se pudo generar el PDF', 'error');
        }
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          if (!opcionesSeleccionadas.length) {
            Swal.fire('¡Error!', 'Por favor, seleccione al menos una opción', 'error');
            return;
          }
      
          // Generar el PDF y enviarlo al backend
          await solicitarExamen();
        } catch (error) {
          console.log(error);
          // Mostrar mensaje de error
          Swal.fire('¡Error!', 'No se pudo enviar la solicitud', 'error');
        }
      };
      const handleDeselectOption = (examen) => {
        setOpcionesSeleccionadas((prevOpciones) =>
          prevOpciones.filter((opcion) => opcion !== examen)
        );
      };
      const filteredExams = secciones
      .flatMap((seccion) => seccion.examenes)
      .filter((examen) =>
        examen.toLowerCase().includes(searchValue.toLowerCase())
      );
      const toggleSeccion = () => {
        setSeccionVisible(!seccionVisible);
      };
      const handleDownload = async (url, filename) => {
        try {
          const response = await clientAxios({
            url: url,
            method: 'GET',
            responseType: 'blob', // Indicar que la respuesta es un archivo binario
          });
      
          // Crear una URL temporal con el archivo recibido
          const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
      
          // Crear un enlace invisible y hacer clic en él para descargar el archivo
          const link = document.createElement('a');
          link.href = fileUrl;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
      
          // Limpiar la URL temporal creada
          window.URL.revokeObjectURL(fileUrl);
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error al descargar el archivo:', error);
        }
      };
      
      // Dentro de tu componente
      const downloadFile = (url, filename) => {
        handleDownload(url, filename);
      };
      const now = moment();
      const showButton = consulta && now.isSameOrAfter(moment(consulta.fecha).add(consulta.horarioinicio));
  return (
    <>  
    <div className='py-4'>
    <div className="max-w-7xl mx-auto bg-lila-300 px-3 py-1 rounded-t flex justify-start">

            <button
              className=" py-2 text-sm rounded-md  text-white "
              onClick={toggleSeccion}
            >
              {seccionVisible ? (
                <div className="flex">
                  <p className="text-sm font-semibold">Solicitud de exámenes </p>
                  <p className="text-xl">
                    <MdKeyboardArrowDown />
                  </p>
                </div>
              ) : (
                <div className="flex">
                  <p className="text-sm font-semibold">Solicitud de exámenes</p>
                  <p className="text-xl">
                    <MdKeyboardArrowRight />
                  </p>
                </div>
              )}
            </button>
    </div>
   

    {seccionVisible && ( 
      <div className="max-w-7xl mx-auto px-2 border-l-2 border-l-indigo-200 border-r-2 border-r-indigo-200 border-b-2  border-b-indigo-200 bg-gray-50">
      <div className="py-2 "> 
       <div className='flex justify-end py-2'>
       {showButton && ( <button className=' bg-coral-200 hover:bg-coral-100 px-2 py-2 text-white rounded-md' onClick={openModal}> SOLICITAR EXÁMENES📄</button> )  }
              
       </div>
       {loading ? (
  <p className="max-w-7xl mx-auto bg-gray-200  py-5 rounded-md px-2">Cargando...</p>
) : ( 
<div>
  {examen && examen.length > 0 ? (
    <ul>
      {examen.map((item, index) => (
        <li key={index} className="flex items-center border-b border-gray-200 py-4">
          <div className="mr-4">{`${index + 1}.- ${item.opciones}`}</div>
          {item.documento?.secure_url ? (
            <div className="text-sm font-medium text-gray-900 py-0.5 px-0.5">
              <button
                onClick={() =>
                  downloadFile(item.documento?.secure_url, `solicitud_de_exámenes(Cimiento clínico).pdf`)
                }
                className="bg-lila-200 hover:bg-lila-100 text-white text-sm font-nunito font-semibold py-1 px-2 rounded inline-flex items-center"
              >
                📥 Descargar
              </button>
            </div>
          ) : (
            <div className="lg:px-6 lg:py-4">No se subió archivo</div>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <p className='font-bold text-center py-5 text-coral-300'>Aún no has solicitado exámenes para esta consulta</p>
  )}
</div>

) }


       </div>
       </div>
    )}
    </div>
<div className={`modal ${modalOpen ? 'block' : 'hidden'} fixed z-10 inset-0 overflow-y-auto`}>
  <div className="flex items-center justify-center min-h-screen px-4">
    <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
    <div className=" px-10 py-10 modal-container bg-white w-11/12 md:max-w-7xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
    <div className="flex justify-end ">
                        <button
                          className="px-1 py-1 mr-2 text-3xl rounded-md text-red-500 hover:text-red-700"
                          onClick={closeModal}
                        >
                          <AiFillCloseCircle />
                        </button>
           
                      </div>
                      <div className=''>
                    <h1 className=' text-xl py-2 text-center'>Solicitud de exámenes</h1>
                    <hr className='py-2' />
                    <div className="flex justify-end px-1 py-1">
  <label htmlFor="search" className="mr-2 text-md font-semibold">
    Buscar:
  </label>
  <input
    type="text"
    value={searchValue}
    onChange={(e) => {
      setSearchValue(e.target.value);
      setSeccionActiva(null); // Restablecer la sección activa al realizar una búsqueda
    }}
    placeholder="Buscar exámenes"
    className="p-1 border rounded-md w-52 placeholder:text-sm"
  />
</div>
      <div className="grid grid-cols-3 sm:grid-cols-10 gap-1  ">
        {secciones.map((seccion, index) => (
          <button
            key={index}
            className={`seccion-button ${
              seccion.examenes.length === 0 ? 'disabled' : ''
            } ${seccionActiva === index ? 'bg-lila-100' : 'bg-coral-200'} text-white text-xs py-1 hover:bg-lila-100 focus:bg-indigo-300 rounded-lg`}
            onClick={() => handleSeccionClick(index)}
          >
            {seccion.nombre}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap">
        {seccionActiva !== null &&
          secciones[seccionActiva].examenes.map((examen, examenIndex) => (
            <div key={examenIndex} className="w-1/3 p-2">
              <label className="block">
                <input
                  type="checkbox"
                  value={examen}
                  checked={opcionesSeleccionadas.includes(examen)}
                  onChange={handleOptionChange}
                />
                <span className="ml-2">{examen}</span>
              </label>
            </div>
          ))}
      </div>


{searchValue && filteredExams.length > 0 && (
  <div>
    <h1>Resultados de búsqueda:</h1>
    <div className="grid grid-cols-4 gap-4">
      {filteredExams.map((examen, index) => (
        <div key={index}>
          <label className="block">
            <input
              type="checkbox"
              value={examen}
              checked={opcionesSeleccionadas.includes(examen)}
              onChange={handleOptionChange}
            />
            <span className="ml-2">{examen}</span>
          </label>
        </div>
      ))}
    </div>
  </div>
)}
  </div>
      <div className="flex justify-start mt-6">
  <input
    type="text"
    value={examenPersonalizado}
    onChange={handleExamenPersonalizadoChange}
    placeholder="Examen personalizado"
    className="p-2 border border-gray-300 rounded-lg mr-2 w-80"
  />
  <button
    className="bg-lila-300 px-2 py-2 text-white text-xs hover:bg-lila-100 rounded-lg"
    onClick={handleAgregarExamenPersonalizado}
  >
    Agregar a la lista
  </button>
</div>

      <div>
  <h1 className='font-bold'>Exámenes seleccionados:</h1>
  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 font-semibold text-lila-300">
    {opcionesSeleccionadas.map((examen, index) => (
      <div key={index} className="">
        <button
          onClick={() => handleDeselectOption(examen)}
          className="cursor-pointer flex"
          title="Eliminar de la lista"
        >
          {examen} <FaTimes className='mt-1' />
        </button>
      </div>
    ))}
  </div>
</div>
      <div className="flex justify-center mt-2">
        <button
          className="bg-lila-300 px-2 py-2 text-white hover:bg-lila-200 rounded-lg"
          type="submit"
          onClick={handleSubmit}
        >
          Enviar la solicitud
        </button>
      </div>
</div>
</div>

</div>
    </>
  )
}

export default ExamenSolicitado