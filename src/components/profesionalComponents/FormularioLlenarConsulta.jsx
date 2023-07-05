import { useEffect,useState } from "react";
import { useParams, } from 'react-router-dom';
import clientAxios from "../../config/axios";
import moment from "moment";
import { MdKeyboardArrowDown, MdKeyboardArrowRight,MdAddCircle } from "react-icons/md";
import { IoMdCloseCircle} from "react-icons/io";
import { RxMagnifyingGlass } from "react-icons/rx";
import { Paginacion } from "../Paginacion";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";
import ExamenSolicitado from "./ExamenSolicitado";
import pdfMake from 'pdfmake/build/pdfmake'; // Importar el módulo principal de pdfmake
import pdfFonts from 'pdfmake/build/vfs_fonts'; // Importar las fuentes utilizadas por pdfmake
// Registrar las fuentes en pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const FormularioLlenarConsulta = () => {
    const [consulta, setConsulta] = useState([]);
    const { id } = useParams();
    const [datosPaciente, setDatosPaciente] = useState({ });
    const [datosPacienteMotivo, setDatosPacienteMotivo] = useState({});
    const [datosPacientediagnostico, setDatosPacientediagnostico] = useState({});
    const [datosPacientemotivo, setDatosPacientemotivo] = useState({});
    const [loading, setLoading] = useState(true); 
    const [cargando, setCargando] = useState(true); 
    const [datosCargados, setDatosCargados] = useState(false);
    const [seccionVisible, setSeccionVisible] = useState(false);
    const [nombre, setNombre] = useState('');
    const [fechadiagnostico, setFechadiagnostico] = useState('');
    const [tratamiento, setTratamiento] = useState('');
    const [ultimocontrol, setUltimoControl] = useState('');
    const [obsdiagnostico, setObsdiagnostico] = useState('');
    const [ocultarEnfermedad, setOcultarEnfermedad] = useState({});
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [enfermedadActualId, setEnfermedadActualId] = useState(null);

    const [medidas, setMedidas] = useState([]);
    const [enfermedades, setEnfermedades] = useState([]);
    const [loadingEnfermedades, setLoadingEnfermedades] = useState(true);
    const [datosPacienteconsulta, setDatosPacienteconsulta] = useState({});
    const [seccionVisibleFarmaco, setSeccionVisibleFarmaco] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [recetamodalVisible, setRecetamodalvisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(3);
    const [datosPacientefarmaco, setDatosPacientefarmaco] = useState({});
    const [ocultarFarmaco, setOcultarFarmaco] = useState({});
    const [mostrarFormularioFarmaco, setMostrarFormularioFarmaco] = useState(false);
    const [farmacoActualId, setFarmacoActualId] = useState(null)
    const [nombrefarmaco, setNombreFarmaco] = useState('');
    const [horario, setHorario] = useState('');
    const [dosis, setDosis] = useState('');
    const [tipo, setTipo] = useState('');
    const [tipodeuso, setTipodeuso] = useState('');
    const [duracion, setDuracion] = useState('');
    const [formato, setFormato] = useState('');
    const [farmacoId, setFarmacoId] = useState('');
    const [farmacosSeleccionados, setFarmacosSeleccionados] = useState([]);
    const [seccionVisibleReceta, setSeccionVisibleReceta] = useState(false);
    const [receta, setReceta] = useState([]);
    const [mostrarFormulariointerconsulta, setMostrarFormulariointerconsulta] = useState(false);
    const [seccionVisibleinterconsulta, setSeccionVisibleinterconsulta] = useState(false);
    const [profesionalesSeleccionados, setProfesionalesSeleccionados] = useState([]);
    const [tipoReceta, setTipoReceta] = useState('');
    const [mostrarFormularioReceta, setMostrarFormularioReceta] = useState(false);
    const [mostrarFormularioNormal, setMostrarFormularioNormal] = useState(false);


  //Sección farmacos
    const maximo = Math.ceil(medidas.length / porPagina);

    useEffect(() => {
      const tokenPro = localStorage.getItem("tokenPro");
      if (!tokenPro) return;
    
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenPro}`,
        },
      };
    
      const ObtenerEnfermedades = async () => {
        try {
          const { data } = await clientAxios.get(
            `/profesional/obtener-enfermedades`,
            config
          );
    
          if (consulta && consulta.paciente) {
            const enfermedadesFiltradas = data.filter(
              (enfermedad) => consulta.paciente._id === enfermedad.paciente
            );
            setEnfermedades(enfermedadesFiltradas);
            setLoadingEnfermedades(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      ObtenerEnfermedades();
    }, [consulta]);
    const togglefar = (farmacoId) => {
      setOcultarFarmaco((prevOcultarEnfermedad) => ({
        ...prevOcultarEnfermedad,
        [farmacoId]: !prevOcultarEnfermedad[farmacoId]
      }));
    };
    const toggleFarmaco = (farmacoId) => {
      if (farmacosSeleccionados.includes(farmacoId)) {
        const updatedFarmacos = farmacosSeleccionados.filter(
          (id) => id !== farmacoId
        );
        setFarmacosSeleccionados(updatedFarmacos);
      } else {
        setFarmacosSeleccionados([...farmacosSeleccionados, farmacoId]);
      }
    };
    const cerrarModalFarmaco = () => {
      setMostrarFormularioFarmaco(false);
    };
      const VerFormularioCerradofar = () => {
    setMostrarFormularioFarmaco(!mostrarFormularioFarmaco);
  };
  useEffect(() => {
    if (consulta && Array.isArray(consulta.farmaco)) {
      setDatosPacientefarmaco(consulta.farmaco);
    }
  }, [consulta]);
  const actualizarPacienteFar = async () => {
      const tokenPro = localStorage.getItem('tokenPro');
      if (!tokenPro || !farmacoActualId) return;
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenPro}`
        }
      };
  
      try {
        const enfermedad = datosPacientefarmaco[farmacoActualId];
  
        await clientAxios.put(`/profesional/editar-farmacos-paciente/${enfermedad._id}`, enfermedad, config);
  
        // Obtener los datos actualizados después de la actualización
        fetchData();
        
      } catch (error) {
        console.error(error.message);
    }
  };
  const GuardarFarmaco = async (e) => {
    e.preventDefault();
  
    try {
      if (!nombrefarmaco) {
        Swal.fire('¡Error!', 'Por favor, Agregue un nombre para el farmaco', 'error');
        return;
      }
      if (!dosis) {
        Swal.fire('¡Error!', 'Por favor, Agregue una dosis', 'error');
        return;
      }
      if (!horario) {
        Swal.fire('¡Error!', 'Por favor, Agregue un horario', 'error');
        return;
      }
      if (!duracion) {
        Swal.fire('¡Error!', 'Por favor, Agregue la duración para el farmaco', 'error');
        return;
      }
      if (!formato) {
        Swal.fire('¡Error!', 'Por favor, Agregue un formato', 'error');
        return;
      }
      if (!tipodeuso) {
        Swal.fire('¡Error!', 'Por favor, Agregue el tipo de uso', 'error');
        return;
      }
      const tokenPro = localStorage.getItem("tokenPro");
      if (!tokenPro) return;
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenPro}`,
        },
      };
  
      await clientAxios.post('/profesional/agregar-farmaco-motivo', {
        enfermedad: farmacoId,
        nombre:nombrefarmaco,
        horario,
        dosis,
        duracion,
        formato,
        tipo,
        tipodeuso,
        pacienteId: consulta.paciente._id,
        motivoId: consulta.motivoconsulta._id
      },config);
      const { data } = await clientAxios.get(
        `/profesional/informacion-paciente-consulta/${id}`,
        config
      );
  
      setConsulta(data);
      setDatosPacienteconsulta(data.farmaco);
      fetchData();
      setNombreFarmaco('');
      setHorario('');
      setDosis('');
      setDuracion('');
      setFormato('');
      setTipo('')
      setTipodeuso('')
      setFarmacoId({});
      setMostrarFormularioFarmaco(false)
      // Mostrar mensaje de éxito o redireccionar a otra página
      Swal.fire('¡Perfecto!', 'Farmaco actualizado con éxito', 'success');
    } catch (error) {o
      console.log(error);
      // Mostrar mensaje de error
      Swal.fire('¡Error!', 'No se puede guardar el farmaco', 'error');
    }
  };
  
  const handleChangefarmaco = (e, farmacoId) => {
    const { name, value } = e.target;
    setDatosPacientefarmaco((prevState) => ({
      ...prevState,
      [farmacoId]: {
        ...prevState[farmacoId],
        [name]: value
      }
    }));
    setFarmacoActualId(farmacoId); // Establecer el ID de la enfermedad actual
  };
  const openModal = () => {
    setRecetamodalvisible(true);
  };
  const closeModal = () => {
    setRecetamodalvisible(false);
    setFarmacosSeleccionados([''])
  };
    const abrirModal = () => {
      setModalVisible(true);
    };
  
    const cerrarModalFar = () => {
      setModalVisible(false);
      setSearchValue('');
    };
  
    const ObtenerMedidasGenerales = async () => {
      const tokenPro = localStorage.getItem('tokenPro');
      if (!tokenPro) return;
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenPro}`
        }
      };
  
      try {
        const { data } = await clientAxios.get(`/profesional/obtener-medidasgenerales`, config);
        setMedidas(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      ObtenerMedidasGenerales();
    }, []);
  
    const medidasfiltradas = medidas.filter(me => {
      if (!me || (!me.titulo && !me.tags)) return false;
    
      const titulo = me.titulo ? me.titulo.toString().toLowerCase() : '';
      const tags = me.tags ? me.tags.toString().toLowerCase() : '';
    
      return titulo.includes(searchValue.toLowerCase()) ||  tags.includes(searchValue.toLowerCase());
    });
    
    

  
    useEffect(() => {
      if (consulta.motivoconsulta) {
        setDatosPacienteMotivo(consulta.motivoconsulta);
      }
    }, [consulta.motivoconsulta]);
    useEffect(() => {
      if (consulta) {
        setDatosPacienteconsulta(consulta);
      }
    }, [consulta]);
    const actualizarMotivoFar = async () => {
      const tokenPro = localStorage.getItem('tokenPro');
      if (!tokenPro) return;
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenPro}`
        }
      };
  
      try {
        await clientAxios.put(`/profesional/actualizar-motivo-ficha/${datosPacienteMotivo._id}`, datosPacienteMotivo, config);
      } catch (error) {
        console.error(error.message);
        // Mostrar un mensaje de error o realizar acciones adicionales en caso de error
      }
    };
  
    const Actualizacionmodo = (e) => {
      const { name, value } = e.target;
      setDatosPacienteMotivo((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };
    const toggleSeccionVisibleFar = () => {
      setSeccionVisibleFarmaco(!seccionVisibleFarmaco);
    };
    const toggleSeccionReceta = () => {
      setSeccionVisibleReceta(!seccionVisibleReceta);
    };
  
    const copiarAlPortapapeles = (descripcion, titulo) => {
      navigator.clipboard.writeText(descripcion)
        .then(() => {
          const toastMixin = Swal.mixin({
            toast: true,
            icon: 'success',
            title: `Medida general sobre: "${titulo}" copiada con éxito`,
            animation: false,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
  
          toastMixin.fire();
        })
        .catch((error) => {
          console.error('Error al copiar al portapapeles:', error);
          Swal.fire('¡Error!', 'Ocurrió un error al copiar la descripción', 'error');
        });
    };
    const imageUrl = 'https://res.cloudinary.com/dde62spnz/image/upload/v1687451263/Imagenes%20sitio/kisspng-digital-signature-clip-art-signature-5b0840d4458ca4.5304199015272675402849_a47lug.png';
  
    async function fetchImageAsBase64(url) {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    const generarReceta = async () => {
      try {
        // Obtener los datos de los farmacos relacionados al motivo de consulta actual
        const farmacosRelacionados = Object.keys(datosPacientefarmaco)
          .filter((farmacoId) => {
            const farmaco = datosPacientefarmaco[farmacoId];
            return farmaco && farmaco.motivoconsulta?.includes(motivoConsultaId);
          })
          .map((farmacoId) => datosPacientefarmaco[farmacoId]);
    
                // Verificar si hay fármacos seleccionados
            if (farmacosRelacionados.length === 0) {
              // Si no hay fármacos, simplemente detener la ejecución de la función
             return;
      }
    
        // Generar el contenido del PDF a partir de los datos de los farmacos relacionados
        const content = farmacosRelacionados.map((farmaco) => {
          return `  ${farmaco.nombre ||''}   ${farmaco.horario ||''} ${farmaco.dosis||''} ${farmaco.tipodeuso||''} ${farmaco.duracion||''}  ${farmaco.formato||''}`;
        });
    
        // Obtener la imagen de Cloudinary como base64
        const base64Image = await fetchImageAsBase64(imageUrl);
    
        // Crear el documento PDF
        const documentDefinition = {
          content: [
            { text: 'RECETA MÉDICA', style: 'header' },
            '\n', // Salto de línea
            {
              stack: [
                content // Contenido de la receta
              ],
              width: '100%', // Ancho del stack es 100% del espacio disponible
              alignment: 'justify' // Alinear el contenido de manera justificada
            },
            {
              image: base64Image,
              width: 100, // Ajustar el tamaño de la imagen según tus necesidades
              alignment: 'right'
            },
            {
              text: 'Firma Digital',
              alignment: 'right',
              margin: [0, 5, 0, 0] // Márgenes [arriba, izquierda, abajo, derecha]
            },
            // Resto de las imágenes en el documento
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              alignment: 'center',
              margin: [0, 0, 0, 10] // Márgenes [arriba, izquierda, abajo, derecha]
            }
          },
          pageBackground: { fillColor: 'transparent' },
          images: {
            // Resto de las imágenes definidas en el documento
          }
        };
    
        // Generar el PDF a partir del documento definido
        const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        // Obtener el blob del PDF generado
        pdfDocGenerator.getBlob(async (blob) => {
            try {
              // Crear un FormData y agregar el PDF con el nombre 'documento'
              const formData = new FormData();
              formData.append('documento', blob, 'documento.pdf');
              formData.append('pacienteId', consulta.paciente._id);
    
              const opciones = farmacosRelacionados.map((farmaco) => farmaco.nombre || '').join(', ');
              formData.append('opciones', opciones);
              formData.append('tipoReceta', tipoReceta);
    
              formData.append('profesionalId', consulta.profesional._id);
              formData.append('motivoId', consulta.motivoconsulta._id);
    
              // Realizar la petición a tu backend utilizando Axios
              const tokenPro = localStorage.getItem('tokenPro');
              const config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${tokenPro}`,
                }
              };
              const response = await clientAxios.post('/profesional/guardar-receta', formData, config);
              // Manejar la respuesta del backend si es necesario
              Swal.fire('¡Perfecto!', 'La receta fue creada y enviada por correo', 'success');
              setRecetamodalvisible(false);
            } catch (error) {
              // Manejar el error en caso de fallo al subir el PDF al backend
              console.log(error);
            }
        });
      } catch (error) {
        // Manejar el error en caso de fallo al generar el PDF
        console.log(error);
      }
    };
    const generarRecetaMagistral = async () => {
      try {
        // Obtener los datos de los farmacos relacionados al motivo de consulta actual
        const farmacosRelacionados = Object.keys(datosPacientefarmaco)
          .filter((farmacoId) => {
            const farmaco = datosPacientefarmaco[farmacoId];
            return farmaco && farmaco.motivoconsulta?.includes(motivoConsultaId);
          })
          .map((farmacoId) => datosPacientefarmaco[farmacoId]);
    
                // Verificar si hay fármacos seleccionados
            if (farmacosRelacionados.length === 0) {
              // Si no hay fármacos, simplemente detener la ejecución de la función
             return;
      }
    
        // Generar el contenido del PDF a partir de los datos de los farmacos relacionados
        const content = farmacosRelacionados.map((farmaco) => {
          return `  ${farmaco.nombre ||''}   ${farmaco.horario ||''} ${farmaco.dosis||''} ${farmaco.tipodeuso||''} ${farmaco.duracion||''}  ${farmaco.formato||''}`;
        });
    
        // Obtener la imagen de Cloudinary como base64
        const base64Image = await fetchImageAsBase64(imageUrl);
    
        // Crear el documento PDF
        const documentDefinition = {
          content: [
            { text: 'RECETA MAGISTRAL', style: 'header' },
            '\n', // Salto de línea
            {
              stack: [
                content // Contenido de la receta
              ],
              width: '100%', // Ancho del stack es 100% del espacio disponible
              alignment: 'justify' // Alinear el contenido de manera justificada
            },
            {
              image: base64Image,
              width: 100, // Ajustar el tamaño de la imagen según tus necesidades
              alignment: 'right'
            },
            {
              text: 'Firma Digital',
              alignment: 'right',
              margin: [0, 5, 0, 0] // Márgenes [arriba, izquierda, abajo, derecha]
            },
            // Resto de las imágenes en el documento
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              alignment: 'center',
              margin: [0, 0, 0, 10] // Márgenes [arriba, izquierda, abajo, derecha]
            }
          },
          pageBackground: { fillColor: 'transparent' },
          images: {
            // Resto de las imágenes definidas en el documento
          }
        };
    
        // Generar el PDF a partir del documento definido
        const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        // Obtener el blob del PDF generado
        pdfDocGenerator.getBlob(async (blob) => {
  
            try {
              // Crear un FormData y agregar el PDF con el nombre 'documento'
              const formData = new FormData();
              formData.append('documento', blob, 'documento.pdf');
              formData.append('pacienteId', consulta.paciente._id);
    
              const opciones = farmacosRelacionados.map((farmaco) => farmaco.nombre || '').join(', ');
              formData.append('opciones', opciones);
              formData.append('tipoReceta', tipoReceta);
    
              formData.append('profesionalId', consulta.profesional._id);
              formData.append('motivoId', consulta.motivoconsulta._id);
    
              // Realizar la petición a tu backend utilizando Axios
              const tokenPro = localStorage.getItem('tokenPro');
              const config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${tokenPro}`,
                }
              };
              const response = await clientAxios.post('/profesional/guardar-receta', formData, config);
              // Manejar la respuesta del backend si es necesario
              Swal.fire('¡Perfecto!', 'La receta fue creada y enviada por correo', 'success');
              setRecetamodalvisible(false);
            } catch (error) {
              // Manejar el error en caso de fallo al subir el PDF al backend
              console.log(error);
            }
          
        });
      } catch (error) {
        // Manejar el error en caso de fallo al generar el PDF
        console.log(error);
      }
    };

//------------------------------------------------
    //Parte de los diagnosticos
    const toggleEnfermedad = (enfermedadId) => {
      setOcultarEnfermedad((prevOcultarEnfermedad) => ({
        ...prevOcultarEnfermedad,
        [enfermedadId]: !prevOcultarEnfermedad[enfermedadId]
      }));
    };
    const cerrarModal = () => {
      setMostrarFormulario(false);
    };
      const VerFormularioCerrado = () => {
    setMostrarFormulario(!mostrarFormulario);
  };
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        if (!nombre) {
          Swal.fire('¡Error!', 'Por favor, Agregue un nombre para el diagnóstico', 'error');
          return;
        }
        if (!fechadiagnostico) {
          Swal.fire('¡Error!', 'Por favor, Agregue fecha del diagnóstico', 'error');
          return;
        }
        if (!tratamiento) {
          Swal.fire('¡Error!', 'Por favor, Agregue un tratamiento.', 'error');
          return;
        }
        const tokenPro = localStorage.getItem("tokenPro");
        if (!tokenPro) return;
    
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenPro}`,
          },
        };
    
        await clientAxios.post('/profesional/agregar-enfermedad-motivo', {
          pacienteId: consulta.paciente._id,
          nombre,
          fechadiagnostico,
          tratamiento,
          ultimocontrol,
          obsdiagnostico,
          motivoId: consulta.motivoconsulta._id
        },config);
        const { data } = await clientAxios.get(
          `/profesional/informacion-paciente-consulta/${id}`,
          config
        );
   
        setConsulta(data);
        setDatosPaciente(data.enfermedades);
        fetchData();
        setNombre('');
        setFechadiagnostico('');
        setTratamiento('');
        setUltimoControl('');
        setObsdiagnostico('');
        setMostrarFormulario(false)
        // Mostrar mensaje de éxito o redireccionar a otra página
        Swal.fire('¡Perfecto!', 'Diangóstico actualizado con éxito', 'success');
      } catch (error) {
        console.log(error);
        // Mostrar mensaje de error
        Swal.fire('¡Error!', 'No se puede guardar el diagnóstico', 'error');
      }
    };
    
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
        const { data } = await clientAxios.get(`/profesional/informacion-paciente-consulta/${id}`, config);
     setConsulta(data)
     setLoading(false);
     setCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
        fetchData();
      }, [id]); 
      useEffect(() => {
        if (consulta) {
          setDatosPaciente(consulta);
          setDatosCargados(true);
        }
      }, [consulta]);
      useEffect(() => {
        if (consulta.motivoconsulta) {
          setDatosPacientemotivo(consulta.motivoconsulta);
          setDatosCargados(true);
        }
      }, [consulta.motivoconsulta]);
      useEffect(() => {
        if (consulta && Array.isArray(consulta.enfermedades)) {
          setDatosPacientediagnostico(consulta.enfermedades);
        }
      }, [consulta]);
      const actualizarConsulta = async () => {
        const tokenPro = localStorage.getItem('tokenPro');
        if (!tokenPro) return;
      
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenPro}`
          }
        };
        try {
          await clientAxios.put(`/profesional/actualizar-consulta-ficha/${id}`, datosPaciente,config);

        } catch (error) {
          console.error(error.message);
          // Mostrar un mensaje de error o realizar acciones adicionales en caso de error
        }
      };
      const actualizarMotivo = async () => {
        const tokenPro = localStorage.getItem('tokenPro');
        if (!tokenPro) return;
    
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenPro}`
          }
        };
    
        try {
          await clientAxios.put(`/profesional/actualizar-motivo-ficha/${datosPacientemotivo._id}`, datosPacientemotivo, config);
        } catch (error) {
          console.error(error.message);
          // Mostrar un mensaje de error o realizar acciones adicionales en caso de error
        }
      };
      const actualizarPaciente = async () => {
          const tokenPro = localStorage.getItem('tokenPro');
          if (!tokenPro || !enfermedadActualId) return;
      
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenPro}`
            }
          };
      
          try {
            const enfermedad = datosPacientediagnostico[enfermedadActualId];
      
            await clientAxios.put(`/profesional/editar-enfermedades-paciente/${enfermedad._id}`, enfermedad, config);
      
            // Obtener los datos actualizados después de la actualización
            fetchData();
            
          } catch (error) {
            console.error(error.message);
          }

      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosPaciente((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
      const handleChangemotivo = (e) => {
        const { name, value } = e.target;
        setDatosPacientemotivo((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
      const handleChangediagnostico = (e, enfermedadId) => {
        const { name, value } = e.target;
        setDatosPacientediagnostico((prevState) => ({
          ...prevState,
          [enfermedadId]: {
            ...prevState[enfermedadId],
            [name]: value
          }
        }));
      
        setEnfermedadActualId(enfermedadId); // Establecer el ID de la enfermedad actual
      };
      const guardarDatos = async () => {
        const confirmar = await Swal.fire({
          title: '¿Quieres actualizar la información de la consulta?',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#5d5ddb',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Guardar'
        }).then((result) => {
          if (result.isConfirmed) {
            return true;
          } else {
            return false;
          }
        });
      
        if (confirmar) {
          try {
            actualizarConsulta();
            actualizarMotivo();
            actualizarPaciente();
            actualizarPacienteFar();
            actualizarMotivoFar();
      
            Swal.fire('¡Perfecto!', 'Sección publicada', 'success');
          } catch (error) {
            Swal.fire('Error', 'Ha ocurrido un error', 'error');
            console.error(error);
          }
        }
      };
      
      const now = moment();
      const showButton = consulta && now.isSameOrAfter(moment(consulta.fecha).add(consulta.horarioinicio));

      const toggleSeccionVisible = () => {
        setSeccionVisible(!seccionVisible);
      };
      const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset());
        const formatoFecha = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        };
        return nuevaFecha.toLocaleDateString('es-CL', formatoFecha);
      };
      function isValidDate(dateString) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(dateString);
      }
    
      const motivoConsultaId = datosPaciente.motivoconsulta?._id;
      useEffect(() => {
        const fetchData2 = async () => {
          const tokenPro = localStorage.getItem('tokenPro');
          if (!tokenPro || !consulta || !consulta.motivoconsulta) return;
          
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenPro}`
            }
          };
      
          try {
            const { data } = await clientAxios.get(`/profesional/obtener-recetas/${consulta.motivoconsulta._id}`, config);
            setReceta(data);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData2();
      }, [consulta]);

      //INTERCONSULTA
      const handleOpcionSi = () => {
        setDatosPacientemotivo((prevState) => ({
          ...prevState,
          interconsulta: 'Si' // Establecer el valor por defecto como 'Si'
        }));
        setMostrarFormulariointerconsulta(true);
        // Aquí puedes enviar la información al backend utilizando la variable `datosPaciente.interconsulta` ('Si')
        // por ejemplo, puedes hacer una llamada a una API utilizando fetch o axios
      };
    
      const handleOpcionNo = () => {
        setDatosPacientemotivo((prevState) => ({
          ...prevState,
          interconsulta: 'No' // Establecer el valor por defecto como 'No'
        }));
        setMostrarFormulariointerconsulta(true);
        // Aquí puedes enviar la información al backend utilizando la variable `datosPaciente.interconsulta` ('No')
        // por ejemplo, puedes hacer una llamada a una API utilizando fetch o axios
      };
      const toggleSeccionVisibleinterconsulta = () => {
        setSeccionVisibleinterconsulta(!seccionVisibleinterconsulta);
      };
      const actualizarPropuestaInterconsulta = () => {
        const propuestaInterconsulta = profesionalesSeleccionados.join(', ');
        setDatosPacientemotivo((prevState) => ({
          ...prevState,
          propuestainterconsulta: propuestaInterconsulta
        }));
      };
      useEffect(() => {
        // Llamar a la función para actualizar el campo "propuestainterconsulta"
        actualizarPropuestaInterconsulta();
      }, [profesionalesSeleccionados]);
      const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
          setProfesionalesSeleccionados((prevSeleccionados) => [...prevSeleccionados, value]);
        } else {
          setProfesionalesSeleccionados((prevSeleccionados) =>
            prevSeleccionados.filter((profesional) => profesional !== value)
          );
        }
      };
      const actualizarNotificacionInterconsulta = async () => {
        if (datosPacientemotivo.interconsulta !== 'Si') {
          // Si datosPacientemotivo.interconsulta no es igual a "Si", no realizar la petición
          return;
        }
      else{
        try {
          const tokenPro = localStorage.getItem('tokenPro');
          if (!tokenPro) return;
      
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenPro}`,
            },
          };
          await clientAxios.put(
            `/profesional/actualizar-notificacion-interconsulta/${datosPacientemotivo._id}`,{notificacioninterconsulta:true},
            config
          );
        } catch (error) {
          console.error(error.message);
          // Mostrar un mensaje de error o realizar acciones adicionales en caso de error
        }
      }

      };
      
      
      const handleFinalizar = async () => {
        const farmacosRelacionados = Object.keys(datosPacientefarmaco).filter((farmacoId) => {
          const farmaco = datosPacientefarmaco[farmacoId];
          return farmaco && farmaco.motivoconsulta?.includes(motivoConsultaId);
        });
      
        const mensajeReceta = farmacosRelacionados.length > 0 ? 'SI' : 'NO';
        const colorReceta = farmacosRelacionados.length > 0 ? 'green' : 'red';
      
        const confirmar = await Swal.fire({
          title: '¿Estás seguro de finalizar esta consulta?',
          html: `
            <div>
              <p>Interconsulta: ${datosPacientemotivo.interconsulta}</p>
              <p style="color: ${colorReceta}">Creación de receta médica: ${mensajeReceta}</p>
              ${mensajeReceta === 'SI' ? `<p>Tipo de receta: ${tipoReceta === 'normal' ? 'Receta Normal' : 'Receta Magistral'}</p>` : ''}
            </div>
          `,
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#5d5ddb',
          confirmButtonText: 'Si, Finalizar'
        });
        
      
        if (confirmar.isConfirmed) {
          try {
            if (tipoReceta === 'normal') {
              generarReceta(); // Llamar a la función para generar la receta normal
            } else if (tipoReceta === 'magistral') {
              generarRecetaMagistral(); // Llamar a la función para generar la receta magistral
            }
            await actualizarNotificacionInterconsulta()
            Swal.fire('¡Perfecto!', 'Consulta finalizada', 'success');
          } catch (error) {
            Swal.fire('¡Error!', 'No se pudo finalizar la consulta', 'error');
          }
        }
      };

      const handleTipoReceta = (tipo) => {
        setTipoReceta(tipo);
        if (tipo === 'magistral') {
          setMostrarFormularioReceta(true);
        } else {
          setMostrarFormularioReceta(false);
        }
        if (tipo === 'normal') {
          setMostrarFormularioNormal(true);
        } else {
          setMostrarFormularioNormal(false);
        }
      };
      const cerrarReceta = () => {
        setMostrarFormularioReceta(false);
       }
       const cerrarRecetaNormal = () => {
        setMostrarFormularioNormal(false);
       }
      

  return (
    <>
    <div className="max-w-7xl mx-auto mt-10 bg-gray-200 px-5 py-5  rounded-t ">
    {/* SECCIÓN DE REGISTRO ATENCIÓN Y DIAGNÓSTICOS! */}
{loading || cargando ? (
  <p className="max-w-7xl mx-auto bg-gray-200  py-5 rounded-md px-2">Cargando...</p>
) : (
    <div className="">
  <h1 className="text-center text-lg font-semibold">Registro de la consulta</h1>
    <div className="max-w-7xl mx-auto bg-lila-300 px-3 py-1 rounded-t flex justify-start">
      <button
        className=" py-2 text-sm rounded-md  text-white "
        onClick={toggleSeccionVisible}>
        {seccionVisible ? <div className="flex"> <p className="text-sm font-semibold">Registro de la atención </p>  <p className="text-xl">
     <MdKeyboardArrowDown />
        </p></div> :<div className="flex"> <p className="text-sm font-semibold">Registro de la atención</p>   <p className="text-xl">
          <MdKeyboardArrowRight />
        </p></div>} 
      </button>
    </div>
    {seccionVisible && (
   <div className="max-w-7xl mx-auto px-2 border-l-2 border-l-indigo-200 border-r-2 border-r-indigo-200 border-b-2  border-b-indigo-200 bg-gray-50">
   <div className="py-2 ">
 
     <label htmlFor="" className="text-sm font-regular">Registro de la consulta</label>
            <textarea
                className="w-full h-28 p-3 bg-white border border-gray-300 rounded resize-none outline-none focus:border-indigo-500"
                placeholder="Escribe aquí los detalles de la consulta del paciente..."
                type="text"
                name="registro"
                value={datosPaciente.registro || ''}
                onChange={handleChange}
            ></textarea>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-1">
            <div className="flex flex-col text-sm">
            <label htmlFor="impresiondiagnostica" className="text-sm font-regular">Impresión diagnóstica</label>
            <textarea
                className="w-full h-16 p-3 bg-white border border-gray-300 rounded-md resize-none outline-none focus:border-indigo-500"
                placeholder="Ingrese la impresión diagnóstica..."
                type="text"
                name="impresiondiagnostica"
                value={datosPacientemotivo.impresiondiagnostica || ''}
                onChange={handleChangemotivo}
            ></textarea>
            </div>
            </div>
            </div>
          </div>
            )  }

        </div>
    )}

      {mostrarFormulario && (
  <div className="fixed inset-0 flex  items-center justify-center z-50">
    <div
      className="bg-gray-800 bg-opacity-75  absolute inset-0 pointer-events-none"
      onClick={cerrarModal}
    ></div>
    <div className="bg-white rounded-lg p-6 relative w-96 ">
      <button onClick={cerrarModal} className="absolute top-0 right-0 p-2 ">
      < IoMdCloseCircle className="text-3xl text-lila-300  hover:text-lila-100 "/>
      </button>

      <form className="p-2 " onSubmit={handleSubmit}>
    <h1 className=" text-center text-xl font-bold p-2">Nuevo diagnóstico</h1>
    <div className="grid grid-cols-1 sm:grid-cols-1 gap-1 ">
    <div className="flex flex-col text-sm">
        <label htmlFor="nombre" className="mb-2 ">Nombre del diagnóstico</label>
        <input
  type="text"
  className="border px-4 py-2 rounded-lg w-full "
  name="nombre"
  id="nombre" 
  placeholder="Nombre exacto del diagnóstico"
  value={nombre}
  onChange={(e) => setNombre(e.target.value)} 
/>
      </div>
      <div className="flex flex-col text-sm">
        <label htmlFor="fechadiagnostico"className="mb-2 ">Fecha de diagnóstico:</label>
        <input
  type="date" 
  id="fechadiagnostico"
  className="border px-4 py-2 rounded-lg w-full "
  value={fechadiagnostico}
  onChange={(e) => setFechadiagnostico(e.target.value)}
/>
      </div>
      <div className="flex flex-col text-sm">
        <label htmlFor="ultimocontrol"className="mb-2 ">Último control:</label>
        <input
  type="date" 
  id="ultimocontrol"
  className="border px-4 py-2 rounded-lg w-full "
  value={ultimocontrol}
  onChange={(e) => setUltimoControl(e.target.value)} 
/>
      </div>
    </div>

    <div className="flex flex-col text-sm">
        <label htmlFor="tratamiento" className="mb-2">Tratamiento:</label>
        <textarea
          type="text"
          id="tratamiento"
          className="border px-4 py-2 rounded-lg w-full"
          value={tratamiento}
          placeholder="Tratamiento para este diagnóstico"
          onChange={(e) => setTratamiento(e.target.value)} 
        />
      </div>
      <div className="flex flex-col text-sm">
        <label htmlFor="obsdiagnostico" className="mb-2">Observaciones diagnóstico:</label>
        <textarea
          type="text"
          id="obsdiagnostico"
          className="border px-4 py-2 rounded-lg w-full"
          placeholder="Agregar recomendaciones o información relevante"
          value={obsdiagnostico} 
          onChange={(e) => setObsdiagnostico(e.target.value)} 
        />
      </div>
      <div className="flex  text-sm mt-2 gap-1 bg-blue-200 px-2 py-1 rounded">
        <p  className="  font-bold">motivo de consulta: </p>
        <p className=" font-regular">  {' '} {datosPacientemotivo.titulo}  </p>
      
      </div>

    <div className="flex justify-center py-2">
        <button  type="submit" className="bg-lila-200 hover:bg-lila-100 text-white font-semibold py-2 px-4 rounded-lg">
         Guardar
        </button>
        
      </div>

  </form>
  </div>
        </div>
      )}

{/* SECCIÓN DE INDICACIONES Y FARMACOS! */}
{loading || cargando ? (
  <p className="max-w-7xl mx-auto bg-gray-200  py-5 rounded-md px-2">Cargando...</p>
) : (       <div className="py-4">
<div className="">
    <div className="max-w-7xl mx-auto bg-lila-300 px-3 py-1 rounded-t flex justify-start">
      <button
        className=" py-2 text-sm rounded-md  text-white "
        onClick={toggleSeccionVisibleFar}
      >
        {seccionVisibleFarmaco ? (
          <div className="flex">
            <p className="text-sm font-semibold">Indicaciones </p>
            <p className="text-xl">
              <MdKeyboardArrowDown />
            </p>
          </div>
        ) : (
          <div className="flex">
            <p className="text-sm font-semibold">Indicaciones</p>
            <p className="text-xl">
              <MdKeyboardArrowRight />
            </p>
          </div>
        )}
      </button>
    </div>
    {seccionVisibleFarmaco && (
      <div className="max-w-7xl mx-auto px-2 border-l-2 border-l-indigo-200 border-r-2 border-r-indigo-200 border-b-2  border-b-indigo-200 bg-gray-50">
        <div className="py-2 ">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-1">
            <div className="flex flex-col text-sm">
              <div className="flex justify-end">
              {showButton && (
              <button className="px-1 py-1 text-xs rounded-md text-center flex text-white bg-lila-200 hover:bg-lila-100" onClick={abrirModal}>
              Buscar medidas generales <RxMagnifyingGlass className=" text-xl" />
            </button>
              )}
              </div>

              <label htmlFor="medidasgenerales" className="text-sm font-regular">Medidas generales</label>

              <textarea
className="w-full h-44 p-3 bg-white border rounded border-gray-300  resize-none outline-none focus:border-indigo-500"
placeholder="Escribe aquí las medidas generales para el motivo de consulta del paciente..."
type="text"
name="medidasgenerales"
value={datosPacienteMotivo.medidasgenerales || ''}
onChange={Actualizacionmodo}
></textarea>
            </div>
          </div>
          {modalVisible && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
              <div className="bg-white w-1/1 md:w-1/2 p-4 rounded-md shadow-md border border-gray-300">
                <div className="flex justify-end ">
                  <button
                    className="px-1 py-1 mr-2 text-2xl rounded-md text-red-500 hover:text-red-700"
                    onClick={cerrarModalFar}
                  >
                    <AiFillCloseCircle />
                  </button>
                </div>
                <h2 className="text-md font-semibold text-center ">Buscar Medidas Generales</h2>
                <div className="flex justify-end px-1 py-1 ">
                  <label htmlFor="orden" className="mr-2 text-md font-semibold">Buscar:</label>
                  <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Buscar medidas generales" className="p-1 border rounded-md w-52 placeholder:text-sm" />

                </div>
                <div className="divide-y divide-gray-300 ">
                  {medidasfiltradas.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina).map((me) => (
                    <div key={me._id} className="py-2 cursor-pointer hover:bg-gray-100" onClick={() => copiarAlPortapapeles(me.descripcion, me.titulo)}>
                      <div className="flex justify-end ">
                        <button className="px-4 py-2 text-sm rounded-md text-white bg-lila-200 hover:bg-lila-100" onClick={() => copiarAlPortapapeles(me.descripcion, me.titulo)}>
                          <FaCopy />
                        </button>
                      </div>  
                      <p className=" text-center text-sm font-semibold">{me.titulo || ''}</p>
                      <p className="text-xs bg-gray-100 px-2 p-1">{me.descripcion || ''}</p>
                      <div className=" flex "> <p className="text-xs font-bold  ">Fuente: </p>  <p className="text-xs text-gray-600 font-regular italic"> {' '}{me.fuente || 'Sin datos'}</p></div>

                      <div className="flex">
                      <div className=" flex "> <p className="text-sm font-bold  ">Tags: </p>  <p className="font-regular text-sm text-indigo-800 bg-indigo-100 rounded ml-1"> {' '}{me.tags || ''}</p></div>
                      </div>
                      <div className=""> {me.anonimo===true ? <div className="flex"> <p className="text-sm font-bold">Subido por: </p><p className="text-sm">Anónimo</p></div> : <div className="flex"> <p className="text-sm font-bold">Subido por: </p><p className="text-sm ">Subido por:{me.profesional.nombres} {me.profesional.apellidos}</p></div>}  </div>
                      <hr />
                    </div>
                  ))}
                </div>
                <Paginacion
                  maximo={maximo}
                  pagina={pagina}
                  setPagina={setPagina}
                />
              </div>
            </div>
          )}
        </div>

        <div className=" flex justify-end">
         
      {showButton && (
        <div>

<button
onClick={VerFormularioCerradofar}
className="uppercase bg-coral-200 hover:bg-coral-100 px-2 py-2 text-white rounded-md"
>
{mostrarFormularioFarmaco ? (
  <div className="flex">
    <IoMdCloseCircle className="text-2xl" />
  </div>
) : (
  <div className="flex">
    Agregar farmaco<MdAddCircle className="text-2xl" />
  </div>
)}
</button>
</div>
)}

      </div>
<div>
{ Object.keys(datosPacientefarmaco)
.filter((farmacoId) => {
const farmaco = datosPacientefarmaco[farmacoId];
return farmaco && farmaco.motivoconsulta?.includes(motivoConsultaId);
})
.length > 0 ? (
  <>
          <div className="text-center font-semibold">
        FARMACOS ASIGNADOS PARA ESTE MOTIVO DE CONSULTA
      </div>
{ Object.keys(datosPacientefarmaco)
.filter((farmacoId) => {
const farmaco = datosPacientefarmaco[farmacoId];
return farmaco && farmaco.motivoconsulta?.includes(motivoConsultaId);
})
.map((farmacoId, index) => {
const numeroEnumeracion = index + 1;
const isEnfermedadOculta = ocultarFarmaco[farmacoId] || false;
const farmaco = datosPacientefarmaco[farmacoId];
return (
<div className=" bg-gray-50 " key={farmacoId}>
<div className="" >
<div className="container mx-auto p-1">
<div className="grid grid-cols-2 items-center  ">
<div className="flex justify-start gap-2 ">
<div className="">
<h2 className="text-md font-semibold">{numeroEnumeracion}.-</h2>
</div>
<div>
<h2 className="text-md font-regular">
{farmaco.nombre}
</h2>
</div>
<div>

</div>
<div>

<button
className="text-blue-500 focus:outline-none"
onClick={() => togglefar(farmacoId)}
>
{isEnfermedadOculta ? (
  <p className="text-3xl">< MdKeyboardArrowDown/></p>
) : (
  <p className="text-3xl"><MdKeyboardArrowRight /></p>
)}
</button>
</div>


</div>


</div>
  {isEnfermedadOculta && (
    <>
{showButton ? (
<div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
<div className="flex flex-col text-sm">
<div className="flex">
<label htmlFor="nombre">Nombre del farmaco:</label>
</div>
<input
key={farmacoId}
type="text"
className={`border px-2 py-1.5 rounded-lg  flex-grow ${farmaco.guardadoporpaciente ? 'text-gray-600' : 'text-black'}`}
name="nombre"
placeholder="Nombre exacto del diagnóstico"
value={farmaco.nombre || ''}
onChange={(e) => handleChangefarmaco(e, farmacoId)}
/>

</div>
<div className="flex flex-col text-sm">
<label htmlFor="horario" className=" ">Hora de consumo</label>
<input
  key={farmacoId}
  type="text"
  className={`border  px-2 py-1 rounded-lg w-full ${farmaco.guardadoporpaciente ? 'text-gray-600' : 'text-black'}`}
  placeholder="Ej:Consumir cada 8 Horas"
  name="horario"
  value={farmaco.horario || ''}
  onChange={(e) => handleChangefarmaco(e, farmacoId)}
/>
</div>
<div className="flex flex-col  text-sm">
<div className="flex">
<label htmlFor="dosis" className="">Dosis</label>
</div>
<input
  key={farmacoId}
  type="text"
  className={`border  px-2 py-1 rounded-lg w-full ${farmaco.guardadoporpaciente ? 'text-gray-600' : 'text-black'}`}
  name="dosis"
  placeholder="Ej: 800 ml"
  value={farmaco.dosis || ''}
  onChange={(e) => handleChangefarmaco(e, farmacoId)}
/>
</div>
<div className="flex flex-col  text-sm">
<div className="flex">
<label htmlFor="dosis" className="">Tipo de uso</label>
</div>
<input
  key={farmacoId}
  type="text"
  className={`border  px-2 py-1 rounded-lg w-full ${farmaco.guardadoporpaciente ? 'text-gray-600' : 'text-black'}`}
  name="tipodeuso"
  placeholder="Ej: Solo en episodios de dolor"
  value={farmaco.tipodeuso || ''}
  onChange={(e) =>handleChangefarmaco(e, farmacoId)}
/>
</div>


</div>
) : (
  <div className="flex flex-col text-sm gap-1">
  <div className="flex items-center  gap-1">
    <label htmlFor="nombre" className="font-bold">Nombre del farmaco:</label>
    <label>{farmaco.nombre||''}  </label>
  </div>
  <div className="flex items-center  gap-1">
    <label htmlFor="ultimocontrol" className="font-bold">
      Hora de consumo:
    </label>
    <label>{farmaco.horario||''}</label>
  </div>
  <div className="flex items-center  gap-1">
    <label htmlFor="tratamiento" className="font-bold">
        Dosis:
    </label>
    <label >{farmaco.dosis||''}</label>
  </div>
  <div className="flex items-center  gap-1">
    <label htmlFor="obsdiagnostico" className="font-bold">
    Tipo de uso:
    </label>
    <label>{farmaco.tipodeuso||''}</label>
  </div>
</div>
)}
 {showButton ? (
<div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
<div className="flex flex-col text-sm">
<div className="flex">
<label htmlFor="duracion" className="">Duración</label>
</div>
<input
  key={farmacoId}
  type="text"
  className={`border  px-2 py-1 rounded-lg w-full ${farmaco.guardadoporpaciente ? 'text-gray-600' : 'text-black'}`}
  name="duracion"
  placeholder="Ej: Durante 6 días"
  value={farmaco.duracion || ''}
  onChange={(e) =>  handleChangefarmaco(e, farmacoId)}
/>

</div>
<div className="flex flex-col text-sm">
<label htmlFor="formato" className="">Tipo de presentación</label>     
<input
  key={farmacoId}
  type="text"
  className={`border  px-2 py-1 rounded-lg w-full ${farmaco.guardadoporpaciente ? 'text-gray-600' : 'text-black'}`}
  name="formato"
  placeholder="Ej: Tabletas"
  value={farmaco.formato || ''}
  onChange={(e) => handleChangefarmaco(e, farmacoId)}
/>
</div>
<div className="flex flex-col text-sm">
<label htmlFor="enfermedad" className="">Asociar a</label>
{loadingEnfermedades ? (
<span>Cargando...</span>
) : (
<select
className="border  px-2 py-1 rounded-lg w-full"
name="enfermedad"
value={farmaco.enfermedad || ''}
onChange={(e) => handleChangefarmaco(e, farmacoId)}
>
<option value={null}>Sin enfermedad</option>
{enfermedades.map((enfermedad) => (
  <option key={enfermedad._id} value={enfermedad._id}>{enfermedad.nombre}</option>
))}
</select>
)}
</div>
</div>
) : (
  <div className="flex flex-col text-sm gap-1">
  <div className="flex items-center  gap-1">
    <label htmlFor="nombre" className="font-bold">Duración:</label>
    <label>{farmaco.duracion||''}  </label>
  </div>
  <div className="flex items-center  gap-1">
    <label htmlFor="ultimocontrol" className="font-bold">
    Tipo de presentación:
    </label>
    <label>{farmaco.formato||''}</label>
  </div>
  <div className="flex items-center  gap-1">
    <label htmlFor="tratamiento" className="font-bold">
    Tipo de tratamiento:
    </label>
    <label >{farmaco.tipo||''}</label>
  </div>
  <div className="flex items-center  gap-1">
    <label htmlFor="obsdiagnostico" className="font-bold">
    Enfermedad asociada:
    </label>
    <label>{farmaco.enfermedad||''}</label>
  </div>
</div>
)}
</>
  )}
</div>
</div>
<hr />
</div>


);
})}
    </>
  ) : (
''  )}
</div>
<div>


   </div>
   <div >
  {/* SECCIÓN DE RECETA MÉDICA! */}
  <div className="max-w-7xl mx-auto bg-lila-300 px-3 py-1 rounded-t flex justify-start mt-2">
            <button
              className=" py-2 text-sm rounded-md  text-white "
              onClick={toggleSeccionReceta}
            >
              {seccionVisibleReceta ? (
                <div className="flex">
                  <p className="text-sm font-semibold">Receta Médica: {tipoReceta==='normal' ? 'Receta normal' :''}{tipoReceta==='magistral' ? 'Receta Magistral' :''} </p>
                  <p className="text-xl">
                    <MdKeyboardArrowDown />
                  </p>
                </div>
              ) : (
                <div className="flex">
                  <p className="text-sm font-semibold">Receta Médica: {tipoReceta==='normal' ? 'Receta Normal' :''}{tipoReceta==='magistral' ? 'Receta Magistral' :''} </p>
                  <p className="text-xl">
                    <MdKeyboardArrowRight />
                  </p>
                </div>
              )}
            </button>

    </div>
    {seccionVisibleReceta && (
    <div className="max-w-7xl mx-auto px-2 border-l-2 border-l-indigo-200 border-r-2 border-r-indigo-200 border-b-2  border-b-indigo-200 bg-gray-50 ">
    <div className="flex justify-end py-2">  
    </div> 
    {loading ? (
  <p className="max-w-7xl mx-auto bg-gray-200  py-5 rounded-md px-2">Cargando...</p>
) : ( 
<div>
<div className="flex gap-2">
  <p className="mt-1">¿Qué tipo de receta quieres generar?</p>
  <button
    className={`text-white px-2 py-2 rounded text-sm ${tipoReceta === 'normal' ? 'bg-lila-100' : 'bg-lila-300'}`}
    onClick={() => handleTipoReceta('normal')}
  >
    Receta Normal
  </button>
  <button
    className={`text-white px-2 py-2 rounded text-sm ${tipoReceta === 'magistral' ? 'bg-lila-100' : 'bg-lila-300'}`}
    onClick={() => handleTipoReceta('magistral')}
  >
    Receta Magistral
  </button>
</div>
{mostrarFormularioReceta && (
  
 <div>
  <hr className="mt-2" />
    <div className="flex justify-end">          
  <button onClick={cerrarReceta} className="text-md px-1 flex "> Cerrar
< IoMdCloseCircle className=" text-lila-300 text-2xl  hover:text-lila-100 "/>
</button>
  </div>
{ Object.keys(datosPacientefarmaco)
.filter((farmacoId) => {
const farmaco = datosPacientefarmaco[farmacoId];
return farmaco && farmaco.motivoconsulta?.includes(motivoConsultaId);
})
.map((farmacoId, index) => {
const numeroEnumeracion = index + 1;
const isEnfermedadOculta = ocultarFarmaco[farmacoId] || false;
const farmaco = datosPacientefarmaco[farmacoId];
return (
<div className=" bg-gray-50 " key={farmacoId}>
<div className="" >
<div className="container mx-auto p-1">
<div className="grid grid-cols-2 items-center  ">
<div className="flex justify-start gap-2 ">
<div className="">
<h2 className="text-md font-semibold">{numeroEnumeracion}.-</h2>
</div>
<div>
<h2 className="text-md font-regular">
{farmaco.nombre}
</h2>
</div>
<div>
</div>
<div>
</div>
</div>
</div>
    <>
{showButton ? (
<div className="grid grid-cols-1 sm:grid-cols-1 gap-1">
<div className="flex flex-col text-sm">
<div className="flex">
<label htmlFor="magistral">Detalles del tratamiento para receta magistral:</label>
</div>
<textarea
key={farmacoId}
type="text"
className={`border px-2 py-1.5 rounded-lg  flex-grow ${farmaco.guardadoporpaciente ? 'text-gray-600' : 'text-black'}`}
name="magistral"
placeholder="Detalles para generar la receta magistral. Ej:Urea 1% adapaleno 0.1%"
value={farmaco.magistral || ''}
onChange={(e) => handleChangefarmaco(e, farmacoId)}
/>

</div>


</div>
) : (''
)}
</>

</div>
</div>
<hr />
</div>


);
})}
   {Object.keys(datosPacientefarmaco).length === 0 && (
      <div className="text-center ">
        <h1 className="font-semibold text-coral-300">Aún no se han registrado tratamientos farmacológicos para este motivo, por lo que no puedes crear una receta aún</h1>
        <h1>Empieza registrando un tratamiento aquí</h1>
        <button
onClick={VerFormularioCerradofar}
className="uppercase bg-coral-200 hover:bg-coral-100 px-2 py-2 text-white rounded-md mt-2"
>
{mostrarFormularioFarmaco ? (
  <div className="flex">
    <IoMdCloseCircle className="text-xl" />
  </div>
) : (
  <div className="flex">
    Agregar farmaco<MdAddCircle className="text-2xl" />
  </div>
)}
</button>
      </div>
    )}
</div>

    )}
{mostrarFormularioNormal && (
  
  <div>
   <hr className="mt-2" />
     <div className="flex justify-end">          
   <button onClick={cerrarRecetaNormal} className="text-md px-1 flex "> Cerrar
 < IoMdCloseCircle className=" text-lila-300 text-2xl  hover:text-lila-100 "/>
 </button>
   </div>
    {Object.keys(datosPacientefarmaco).length === 0 && (
       <div className="text-center ">
         <h1 className="font-semibold text-coral-300">Aún no se han registrado tratamientos farmacológicos para este motivo, por lo que no puedes crear una receta aún</h1>
         <h1>Empieza registrando un tratamiento aquí</h1>
         <button
 onClick={VerFormularioCerradofar}
 className="uppercase bg-coral-200 hover:bg-coral-100 px-2 py-2 text-white rounded-md mt-2"
 >
 {mostrarFormularioFarmaco ? (
   <div className="flex">
     <IoMdCloseCircle className="text-xl" />
   </div>
 ) : (
   <div className="flex">
     Agregar farmaco<MdAddCircle className="text-2xl" />
   </div>
 )}
 </button>
       </div>
     )}
 </div>
     )}
  {receta && receta.length > 0 ? (
    <div className="py-2">
      <hr />
      <h1 className="text-center py-2 font-semibold">Lista de recetas generadas en este motivo de consulta</h1>
    <ul>
      
      {receta.map((item, index) => (
        <li key={index} className="flex items-center border-b border-gray-200 py-4">
          <div className="mr-4">
            
            {`${index + 1}.- Farmacos de la receta: ${item.opciones.join(', ')}`}/ Tipo de receta: {item.tipoReceta ==='normal'?'Receta Normal':'Receta Magistral'} </div>
          {item.documento?.secure_url ? (
            <div className="text-sm font-medium text-gray-900 py-0.5 px-0.5">
              <button
                onClick={() =>
                  downloadFile(item.documento?.secure_url, `Receta médica(Cimiento clínico).pdf`)
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
    </div>
  ) : (
    <p className="font-bold text-center py-5 text-coral-300"></p>
  )}
</div>


) }       
    </div> )}




{/* SECCIÓN DE EXAMENES SOLICITADOS! */}
   {cargando || !datosCargados ? (
  <p className="max-w-7xl mx-auto bg-gray-200  py-5 rounded-md px-2">Cargando...</p>
) : (
  <div>
       <ExamenSolicitado
        consultaId={consulta._id}
        pacienteId={consulta.paciente._id}
        profesionalId={consulta.profesional._id}
        consulta={consulta}
      />
  </div>
)}
   </div>
      </div>
    )}
  </div>
     {/*INTERCONSULTA */}
     <div className=" py-4">
    <div className="max-w-7xl mx-auto bg-lila-300 px-3 py-1 rounded-t flex justify-start">
      <button
        className=" py-2 text-sm rounded-md  text-white "
        onClick={toggleSeccionVisibleinterconsulta}>
        {seccionVisibleinterconsulta ? <div className="flex "> <p className="text-sm font-semibold">Interconsulta: </p>  
        <div>{datosPacienteMotivo.interconsulta ==='Interconsulta'?<p className="text-sm font-semibold px-1"> {datosPacienteMotivo.especialidades} </p> : ''} </div>
        <div>{datosPacienteMotivo.interconsulta ==='Si'?<p className="font-semibold px-1"> Si </p> : ''} </div> 
        <div>{datosPacienteMotivo.interconsulta ==='No'?<p className="font-semibold px-1"> No </p> : ''} </div> 
        <div>{datosPacienteMotivo.interconsulta ==='Sin datos'?<p></p> : ''} </div> 
        <p className="text-xl">
     <MdKeyboardArrowDown />
        </p></div> 
        :<div className="flex "> <p className="text-sm font-semibold">Interconsulta:</p> 
        <div >{datosPacienteMotivo.interconsulta ==='Interconsulta'?<p className="font-semibold px-1"> {datosPacienteMotivo.especialidades} </p> : ''} </div>
        <div>{datosPacienteMotivo.interconsulta ==='Si'?<p className="font-semibold px-1"> Si </p> : ''} </div> 
        <div>{datosPacienteMotivo.interconsulta ==='No'?<p className="font-semibold px-1"> No </p> : ''} </div> 
        <div>{datosPacienteMotivo.interconsulta ==='Sin datos'?<p></p> : ''} </div> 
         <p className="text-xl">
          <MdKeyboardArrowRight />
        </p></div>} 
      </button>
    </div>
    {seccionVisibleinterconsulta && (
 <div className="max-w-7xl mx-auto px-2 border-l-2 border-l-indigo-200 border-r-2 border-r-indigo-200 border-b-2  border-b-indigo-200 bg-gray-50">
 <div className="py-2">
  <div className="flex ">
 <h1>{datosPacienteMotivo.interconsulta ==='Interconsulta'?<p>Se genero una interconsulta con profesional/es: {datosPacienteMotivo.especialidades}</p>:<p></p>}</h1>
  </div>
  <div className="flex gap-2">

   <label htmlFor="" className="text-md font-regular mt-2">
   <h1>{datosPacienteMotivo.interconsulta ==='Interconsulta'?<p> ¿Quieres generar una nueva interconsulta?</p>:<p>¿Generar Interconsulta?</p>}</h1>

   </label>
   <div className="mt-1">
     <button
       className="px-2 py-1 mr-2  text-black rounded"
       onClick={handleOpcionSi}>
       Si
     </button>
     <button
       className="px-2 py-1  text-black rounded"
       onClick={handleOpcionNo}>
       No
     </button>
   </div>
   </div>
   {mostrarFormulariointerconsulta && (
      <div className="mt-2">
        {/* Aquí puedes agregar los campos adicionales del formulario */}
        {datosPacientemotivo.interconsulta === 'Si' ? (
             <div>
             <p>Selecciona los profesionales de la salud:</p>
             <div>
               <label>
               <input
                      type="checkbox"
                      value="Médico"
                      onChange={handleCheckboxChange}
                    />
                 Médico
               </label>
             </div>
             <div>
               <label>
               <input
                      type="checkbox"
                      value="Cirujano"
                      onChange={handleCheckboxChange}
                    />
                 Cirujano
               </label>
             </div>
             <div>
               <label>
               <input
                      type="checkbox"
                      value="Nutricionista"
                      onChange={handleCheckboxChange}
                    />
                 Nutricionista
               </label>
             </div>
             {/* Agrega más checkboxes para otros profesionales si es necesario */}
           </div>
        ) : (
          <h1></h1>
        )}

{datosPacientemotivo.interconsulta === 'No' ? (
             <div>
              <h1>No se generara Interconsulta para este motivo</h1>
           </div>
        ) : (
          <h1></h1>
        )}
      </div>
    )}
 </div>
</div>
            )  }

        </div>
</div>)}
<div className=" flex justify-center mt-2">
             {showButton && (
               <button className="px-4 py-3 text-sm rounded-md text-center mb-2 text-white bg-lila-200 hover:bg-lila-100" onClick={guardarDatos}>
               GUARDAR REGISTRO DE LA CONSULTA
             </button>
            )}
   </div>
      {mostrarFormularioFarmaco && (
  <div className="fixed inset-0 flex  items-center justify-center z-50">
    <div
      className="bg-gray-800 bg-opacity-75  absolute inset-0 pointer-events-none"
      onClick={cerrarModalFarmaco}
    ></div>
    <div className="bg-white rounded-lg p-6 relative w-96 ">
      <button onClick={cerrarModalFarmaco} className="absolute top-0 right-0 p-2 ">
      < IoMdCloseCircle className="text-3xl text-lila-300  hover:text-lila-100 "/>
      </button>

      <form className="p-2 " onSubmit={GuardarFarmaco}>
    <h1 className=" text-center text-xl font-bold p-2">Nuevo farmaco</h1>
    <div className="grid grid-cols-1 sm:grid-cols-1 gap-1 ">
    <div className="flex flex-col text-sm">
        <label htmlFor="nombre" className="mb-2 ">Nombre del farmaco</label>
        <input
  type="text"
  className="border px-4 py-2 rounded-lg w-full "
  name="nombre"
  id="nombre" 
  placeholder="Nombre exacto del diagnóstico"
  value={nombrefarmaco}
  onChange={(e) => setNombreFarmaco(e.target.value)} 
/>
    </div>
    <div className="flex flex-col text-sm">
        <label htmlFor="horario"className=" ">Hora de consumo:</label>
        <input
  type="text" 
  id="horario"
  placeholder="Ej:Consumir cada 8 Horas"
  className="border  px-2 py-1 rounded-lg w-full "
  value={horario}
  onChange={(e) => setHorario(e.target.value)}
/>
      </div>
      <div className="flex flex-col text-sm">
        <label htmlFor="dosis"className="">Dosis:</label>
        <input
  type="text" 
  id="dosis"
  placeholder="Ej: 800 ml"
  className="border  px-2 py-1 rounded-lg w-full "
  value={dosis}
  onChange={(e) => setDosis(e.target.value)} 
/>
      </div>
      <div className="flex flex-col text-sm">
        <label htmlFor="tipodeuso"className="">Tipo de uso:</label>
        <input
  type="text" 
  id="tipodeuso"
  placeholder="Ej:Solo en episodios de dolor"
  className="border  px-2 py-1 rounded-lg w-full "
  value={tipodeuso}
  onChange={(e) => setTipodeuso(e.target.value)} 
/>
      </div>
      <div className="flex flex-col text-sm">
        <label htmlFor="duracion" className="">Duración:</label>
        <input
          type="text"
          id="duracion"
          placeholder="Ej: Durante 6 días"
          className="border  px-2 py-1 rounded-lg w-full"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)} 
        />
      </div>
      <div className="flex flex-col text-sm">
        <label htmlFor="formato" className="">Formato:</label>
        <input
          type="text"
          id="formato"
          placeholder="Ej: Tabletas"
          className="border  px-2 py-1 rounded-lg w-full"
          value={formato} 
          onChange={(e) => setFormato(e.target.value)} 
        />
      </div>
<div className="flex flex-col text-sm">
      <label htmlFor="enfermedad" className="">Asociar a</label>
  {loadingEnfermedades ? (
    <span>Cargando...</span>
  ) : (
    <select className='border  px-2 py-1 rounded-lg w-full' value={farmacoId} onChange={(e) => setFarmacoId(e.target.value)}>
  <option className='font-bold' value={null}>Sin enfermedad</option>
  {enfermedades.map((enfermedad) => (
    <option key={enfermedad._id} value={enfermedad._id}>
      {enfermedad.nombre}
    </option>
  ))}
    </select>
  )}
      </div>

    </div>
    <div className="flex justify-center py-2">
        <button  type="submit" className="bg-lila-200 hover:bg-lila-100 text-white font-semibold py-2 px-4 rounded-lg">
         Guardar
        </button>
        
      </div>

  </form>
  </div>
        </div>
      )}

   </div>  

   {/*BOTON PARA FINALIZAR CONSULTA (ENVIARA PROPUIESTA INTERCONSULTA) */}
   <div className=" flex justify-center p-4">

        <button className="text-5xl text-white bg-coral-200 hover:bg-coral-300 px-2 py-2 rounded-md" onClick={handleFinalizar}>Finalizar la consulta</button>
      </div>

    </>
  )
}
export default FormularioLlenarConsulta