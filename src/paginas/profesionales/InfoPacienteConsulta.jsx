import { useEffect,useState } from "react";
import { useParams, } from 'react-router-dom';
import clientAxios from "../../config/axios";
import proAuth from "../../hooks/proAuth"
import moment from "moment";
import FormularioDiagnosticos from "../../components/profesionalComponents/FormularioDiagnosticos";
import FormularioTratamientofarmaco from "../../components/profesionalComponents/FormularioTratamientofarmaco";
import FormularioActividadFisica from "../../components/profesionalComponents/FormularioActividadFisica";
import FormularioTratamientoprevio from "../../components/profesionalComponents/FormularioTratamientoprevio";
import FormularioAntecedentesQuirurgicos from "../../components/profesionalComponents/FormularioAntecendentesQuirurgicos";
import FormularioAlcohol from "../../components/profesionalComponents/FormularioAlcohol";
import FormularioDrogas from "../../components/profesionalComponents/FormularioDrogas";
import FormularioTabaquismo from "../../components/profesionalComponents/FormularioTabaquismo";
import FormularioAlergia from "../../components/profesionalComponents/FormularioAlergia";
import FormularioAntecedenteFam from "../../components/profesionalComponents/FormularioAntecedenteFam";
import FormularioHospitalizaciones from "../../components/profesionalComponents/FormularioHospitalizaciones";
const InfoPacienteConsulta = () => {
  const [consulta, setConsulta] = useState([]);
  const { id } = useParams();
  const {authpro} =  proAuth()
  const [datosPaciente, setDatosPaciente] = useState({});
  const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const tokenPro = localStorage.getItem('tokenPro');
        if (!tokenPro) return;
      
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenPro}`
          }
        };

        const fetchData = async () => {
          try {
            const { data } = await clientAxios.get(`/profesional/informacion-paciente-consulta/${id}`, config);
         setConsulta(data)
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();

      }, []); 
      useEffect(() => {
        // Establecer los valores actuales del paciente cuando se carga el componente
        if (consulta.paciente) {
          setDatosPaciente(consulta.paciente);
          setLoading(false); // Indicar que los datos han cargado correctamente
        }
      }, [consulta.paciente]);
      const actualizarPaciente = async () => {
        const tokenPro = localStorage.getItem('tokenPro');
        if (!tokenPro) return;
      
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenPro}`
          }
        };
        try {
          await clientAxios.put(`/profesional/editar-indentificacion-paciente/${consulta.paciente._id}`, datosPaciente,config);
    
          Swal.fire('¡Perfecto!', 'Sección publicada', 'success');          
    
        } catch (error) {
          console.error(error.message);
          // Mostrar un mensaje de error o realizar acciones adicionales en caso de error
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosPaciente((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };   
      const now = moment();
      const showButton = consulta && now.isSameOrAfter(moment(consulta.fecha).add(consulta.horarioinicio));  
      const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
        return new Intl.DateTimeFormat('es-CL', {dateStyle: 'long'}).format(nuevaFecha) }
          if (!consulta || consulta.length === 0) {
            return <p>Cargando...</p>;
          }

          if (consulta && consulta.profesional._id !== authpro._id ) {
            return (
            
                <div className=" bg-coral-100 w-full h-screen flex flex-col items-center justify-center">
 
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold  font-nunito md:text-6xl lg:text-9xl text-white  mt-12">403</h1>
                    <h2 className="text-3xl font-semibold  font-nunito md:text-4xl lg:text-5xl text-white mt-12">No tienes permiso</h2>
                    <img  className="h-96"  src="https://res.cloudinary.com/dde62spnz/image/upload/v1683307824/Imagenes%20sitio/mano_nvygfz.png" alt="" />
                    <p className="md:text-lg font-nunito  lg:text-xl text-white mt-8">Lo sentimos no tienes el permiso para ver esta sección</p>

                </div>
            </div>
              );
          }
  return (
    <>
         {loading ? (
      <p>Cargando...</p>
    ) : (
    <div className=" py-8  ">
 {!showButton && (
   <div className="flex justify-center">
   <div className=" bg-red-500 max-w-3xl px-10 py-5 mb-5 rounded-md  "> 
   <h1 className="text-white text-xl ">Aún no puedes editar la ficha de {consulta.paciente.nombres} {consulta.paciente.apellidos} </h1>
   </div>
   </div>
 )}

    <div className="mx-auto container max-w-5xl md:w-3/4 shadow-xl bg-white rounded-md text-sm border-t ">
    <div className="flex justify-center gap-5  bg-lila-300 text-white ">
    <div className="">
    <div>
  {consulta.paciente.image && consulta.paciente.image.secure_url ? (
    <img src={consulta.paciente.image.secure_url} alt=""  className="w-20"/>
  ) : (
    <span></span>
  )}
</div>
   </div>
   <div className="py-4 ">
   <h1 className="text-3xl font-semibold  ">{consulta.paciente.nombres} {consulta.paciente.apellidos}</h1>

   </div>
      </div>
      <hr />
       <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-4 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto ">RUT:</h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
              <div className="w-1/2 inline-flex border-b text-gray-600">
              {consulta.paciente.rut} 
              </div>
            </div>
          </div>
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-4 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto">Fecha de nacimiento:</h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
              <div className="w-1/2 inline-flex border-b text-gray-600">
              {formatearFecha(consulta.paciente.fechaNacimiento)}
              </div>
            </div>
          </div>
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-2 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto">Localidad:</h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 pl-2">
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <input
              type="text"
              className="font-normal font-nunito w-full outline-none border-none text-gray-600"
              name="localidad"
              value={datosPaciente.localidad || ''}
              onChange={handleChange}
            />
          </div>
        </div>
          </div>
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-2 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto">Ocupación:</h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 pl-2">
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <input
              type="text"
              className="font-normal font-nunito w-full outline-none border-none text-gray-600"
              name="ocupacion"
              value={datosPaciente.ocupacion || ''}
              onChange={handleChange}
            />
          </div>
        </div>
          </div>
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-2 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto">Previsión de salud:</h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 pl-2">
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <input
              type="text"
              className="font-normal font-nunito w-full outline-none border-none text-gray-600"
              name="previsionsalud"
              value={datosPaciente.previsionsalud || ''}
              onChange={handleChange}
            />
          </div>
        </div>
          </div>
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-2 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto">Escolaridad:</h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 pl-2">
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <input
              type="text"
              className="font-normal font-nunito w-full outline-none border-none text-gray-600"
              name="escolaridad"
              value={datosPaciente.escolaridad || ''}
              onChange={handleChange}
            />
          </div>
        </div>
          </div>
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-2 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto">Lugar donde te atiendes:</h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 pl-2">
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <input
              type="text"
              className="font-normal font-nunito w-full outline-none border-none text-gray-600 "
              placeholder="Ej:CESFAM Talcahuano"
              name="lugardeatencion"
              value={datosPaciente.lugardeatencion || ''}
              onChange={handleChange}
            />
          </div>
        </div>
          </div>
          <hr />
          <div className='bg-white flex justify-center mt-2'>
          {showButton && (
                      <button
                      className='px-10 py-3 rounded-md text-center mb-2 text-white bg-lila-200 hover:bg-lila-100'
                      onClick={actualizarPaciente}
                    >
                      Guardar 💾
                    </button>
    )}


  </div>

        </div>
        </div>
        )}

        <div className="bg-gray-200 rounded-lg max-w-7xl mx-auto">

  <div className="w-full">
  <h2 className="text-center text-lg mb-2 ">Motivo de consulta y su seguimiento:</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
  <div className="bg-lila-300 text-gray-200 py-2 px-1 mb-4 rounded-md text-sm">
    <h1 className="underline text-md">Motivo de consulta</h1>
    <p className="font-semibold">Fecha: {formatearFecha(consulta.motivoconsulta.fecha)}</p> 
     <p>Motivo: {consulta.motivoconsulta.titulo}</p>
    <p>Descripción: {consulta.motivoconsulta.descripcion}       </p>        
  </div>
    {consulta.seguimientomotivo.length === 0 ? (
      ''
    ) : (
      consulta.seguimientomotivo.map((seguimiento, index) => (
        <div key={index} className="bg-lila-200  text-gray-200 py-2 px-1 mb-4 rounded-md text-sm">
            <h1 className="underline text-md">Actualización del motivo</h1>
          <p className="font-semibold">Fecha: {formatearFecha(seguimiento.fecha)}</p>
          <p>Seguimiento: {seguimiento.nombre}</p>
          <p>Descripción: {seguimiento.descripcion}</p>
        </div>
      ))
    )}
  </div>
</div>
</div>

<div className="max-w-7xl mx-auto mt-10 bg-gray-200 px-5 py-5 rounded-md ">
  <h1 className="text-center p-2">HISTORIA CLÍNICA</h1>
<FormularioDiagnosticos/>
<FormularioTratamientofarmaco/>
<FormularioTratamientoprevio/>
<FormularioAntecedentesQuirurgicos/>
<FormularioAlergia/>
<FormularioAntecedenteFam/>
<FormularioHospitalizaciones/>
<FormularioActividadFisica/>
<FormularioAlcohol/>
<FormularioDrogas/>
<FormularioTabaquismo/>





</div>
    </>
  )
}

export default InfoPacienteConsulta