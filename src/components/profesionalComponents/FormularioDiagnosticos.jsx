import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clientAxios from "../../config/axios";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaExclamation } from "react-icons/fa";

const FormularioDiagnosticos = () => {
  const { id } = useParams();
  const [consulta, setConsulta] = useState(null);
  const [datosPaciente, setDatosPaciente] = useState({});
  const [loading, setLoading] = useState(true);
  const [ocultarseccion, setOcultarSeccion] = useState(true);
  const [enfermedadActualId, setEnfermedadActualId] = useState(null);
  const [ocultarEnfermedad, setOcultarEnfermedad] = useState({});
  const [nombre, setNombre] = useState('');
  const [fechadiagnostico, setFechadiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [ultimocontrol, setUltimoControl] = useState('');
  const [obsdiagnostico, setObsdiagnostico] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const toggleEnfermedad = (enfermedadId) => {
    setOcultarEnfermedad((prevOcultarEnfermedad) => ({
      ...prevOcultarEnfermedad,
      [enfermedadId]: !prevOcultarEnfermedad[enfermedadId]
    }));
  };
  useEffect(() => {
    const tokenPro = localStorage.getItem("tokenPro");
    if (!tokenPro) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenPro}`,
      },
    };

    const fetchData = async () => {
      try {
        const { data } = await clientAxios.get(
          `/profesional/informacion-paciente-consulta/${id}`,
          config
        );
        setConsulta(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  const actualizarPaciente = async () => {
    const confirmar = await Swal.fire({
      title: '¿Estas seguro de actualizar este diagnóstico?',
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
  })
  if(confirmar) { 
    const tokenPro = localStorage.getItem('tokenPro');
    if (!tokenPro || !enfermedadActualId) return;
  
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenPro}`
      }
    };
  
    try {
      const enfermedad = datosPaciente[enfermedadActualId];
  
      await clientAxios.put(`/profesional/editar-enfermedades-paciente/${enfermedad._id}`, enfermedad, config);
  
      Swal.fire('¡Perfecto!', 'Diangóstico actualizado con éxito', 'success');
    } catch (error) {
      console.error(error.message);
    }
  }
  };

  
  useEffect(() => {
    if (consulta && Array.isArray(consulta.enfermedades)) {
      setDatosPaciente(consulta.enfermedades);
    }
  }, [consulta]);

  const hayCamposVacios = Object.values(datosPaciente).some(
    (enfermedad) =>
      !enfermedad.nombre ||
      !enfermedad.fechadiagnostico ||
      !enfermedad.ultimocontrol ||
      !enfermedad.tratamiento ||
      !enfermedad.obsdiagnostico||
      enfermedad.guardadoporpaciente ===true|| 
      enfermedad.tratamiento.length < 6|| 
      enfermedad.obsdiagnostico.length < 6||
      enfermedad.pacientefechadiagnostico===true
  );


  const handleChange = (e, enfermedadId) => {
    const { name, value } = e.target;
    setDatosPaciente((prevState) => ({
      ...prevState,
      [enfermedadId]: {
        ...prevState[enfermedadId],
        [name]: value
      }
    }));
  
    setEnfermedadActualId(enfermedadId); // Establecer el ID de la enfermedad actual
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
      if (! obsdiagnostico) {
        Swal.fire('¡Error!', 'Por favor, Agregue información extra del diagnóstico', 'error');
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
  
      await clientAxios.post('/profesional/agregar-enfermedad-paciente', {
        pacienteId: consulta.paciente._id,
        nombre,
        fechadiagnostico,
        tratamiento,
        ultimocontrol,
        obsdiagnostico,
      },config);
      const { data } = await clientAxios.get(
        `/profesional/informacion-paciente-consulta/${id}`,
        config
      );
 
      setConsulta(data);
      setDatosPaciente(data.enfermedades);
      // Limpiar los campos del formulario
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
  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };
  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="mx-auto max-w-7xl rounded-md py-10">
            <div className="flex justify-start gap-4 p-3 rounded-t-lg bg-lila-100">
              <div>
                <h1 className="text-white font-semibold text-md">
                Antecedentes mórbidos  
                </h1>
              </div>
              <div>
                <button
                  className="rounded-md inline-flex space-x-1 items-center text-white hover:text-white hover:bg-indigo-500"
                  onClick={() => setOcultarSeccion(!ocultarseccion)}
                >
                  <span className="text-xs font-regular  lg:block">
                    {ocultarseccion ? (
                      <div className="flex gap-2">
                        <p className=" text-3xl"> <MdKeyboardArrowDown/></p>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <p className=" text-3xl"><MdKeyboardArrowUp/></p>
                      </div>
                    )}
                  </span>
                </button>
              </div>
              <div>
              {hayCamposVacios && (
                  <p className="text-red-600 text-2xl">
                    <FaExclamation className="animate-pulso" />
                    </p>
              )}
              </div>
              
            </div>
<div className=  {`${ocultarseccion?'block':'hidden'} xs:block `}>
            <div className="mx-auto max-w-7xl rounded-md">

<div className="border-l border-r border-b px-4">
{Object.keys(datosPaciente).map((enfermedadId) => {

  const enfermedad = datosPaciente[enfermedadId];
  const CamposVacios =
  !enfermedad.nombre ||
  !enfermedad.fechadiagnostico ||
  !enfermedad.ultimocontrol ||
  !enfermedad.tratamiento || enfermedad.tratamiento.length < 6 ||
  !enfermedad.obsdiagnostico || enfermedad.obsdiagnostico.length < 6 ||
  enfermedad.guardadoporpaciente ===true ||
  enfermedad.pacientefechadiagnostico===true;
  const isEnfermedadOculta = ocultarEnfermedad[enfermedadId] || false;
  return (
<div className="border-b" key={enfermedadId}>
  <div className="container mx-auto p-4">
  <div className="grid grid-cols-2 items-center mb-4">
  <div className="flex justify-start gap-2">
    <div className="">
    <h2 className="text-xl font-semibold">
       Diagnóstico:
    </h2>
    </div>
    <div>
    <h2 className="text-xl font-regular">
    {enfermedad.nombre} 
    </h2>
      </div>
 
    {CamposVacios && (
         <div className="flex mt-1">
      <p className="text-red-500 text-sm">
       Revisar datos actuales
      </p>
      <p className="text-red-500 text-md"><FaExclamation className="animate-pulso text-xl" /></p>
      </div>
    )}
    <div>

    </div>

  </div>
  <div className="flex justify-end">

    <button
      className="text-blue-500 focus:outline-none"
      onClick={() => toggleEnfermedad(enfermedadId)}
    >
      {isEnfermedadOculta ? (
        <p className="text-3xl"><MdKeyboardArrowUp /></p>
      ) : (
        <p className="text-3xl"><MdKeyboardArrowDown /></p>
      )}
    </button>
  </div>
</div>
        {isEnfermedadOculta && (
          <>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div className="flex flex-col text-sm">
        <label htmlFor="nombre" className="mb-2 ">Nombre del diagnóstico</label>
        <input
  key={enfermedadId}
  type="text"
  className={`border px-4 py-2 rounded-lg w-full ${enfermedad.guardadoporpaciente ? 'text-gray-400' : 'text-black'}`}
  name="nombre"
  value={enfermedad.nombre || ''}
  onChange={(e) => handleChange(e, enfermedadId)}
/>
      </div>
      <div className="flex flex-col text-sm">
      <label htmlFor="fechadiagnostico" className={`mb2 ${enfermedad.pacientefechadiagnostico===true ? 'text-gray-400' : 'text-black'}`}> Fecha de diagnóstico {enfermedad.pacientefechadiagnostico===true ? enfermedad.fechadiagnostico : '' }</label>
      <input
          key={enfermedadId}
          type="date"
          className={`border px-4 py-2 rounded-lg w-full ${enfermedad.guardadoporpaciente ? 'text-gray-400' : 'text-black'}`}
          name="fechadiagnostico"
          value={enfermedad.fechadiagnostico || ''}
          onChange={(e) => handleChange(e, enfermedadId)}
        />
      </div>
      <div className="flex flex-col  text-sm">
        <label htmlFor="ultimocontrol" className="mb-2">Último control</label>
        <input
          key={enfermedadId}
          type="date"
          className={`border px-4 py-2 rounded-lg w-full ${enfermedad.guardadoporpaciente ? 'text-gray-400' : 'text-black'}`}
          name="ultimocontrol"
          value={enfermedad.ultimocontrol || ''}
          onChange={(e) => handleChange(e, enfermedadId)}
        />
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      <div className="flex flex-col text-sm">
        <label htmlFor="tratamiento" className="mb-2">Tratamiento</label>
        <textarea
          key={enfermedadId}
          type="text"
          className={`border px-4 py-2 rounded-lg w-full ${enfermedad.guardadoporpaciente ? 'text-gray-400' : 'text-black'}`}
          name="tratamiento"
          value={enfermedad.tratamiento || ''}
          onChange={(e) => handleChange(e, enfermedadId)}
        />
      </div>
      <div className="flex flex-col text-sm">
        <label htmlFor="obsdiagnostico" className="mb-2">Observaciones diagnóstico</label>
        <textarea
          key={enfermedadId}
          type="text"
          className={`border px-4 py-2 rounded-lg w-full ${enfermedad.guardadoporpaciente ? 'text-gray-400' : 'text-black'}`}
          name="obsdiagnostico"
          value={enfermedad.obsdiagnostico || ''}
          onChange={(e) => handleChange(e, enfermedadId)}
        />
      </div>
    </div>
    <div className="flex justify-center ">
        <button onClick={actualizarPaciente} className="bg-lila-200 hover:bg-lila-100 text-white font-semibold py-2 px-4 rounded-lg">
          Actualizar diagnóstico
        </button>
      </div>
      </>
        )}
  </div>
  
</div>

  );

})}
<div>
  <p onClick={toggleFormulario} className="cursor-pointer underline text-sm text-blue-500">
    { mostrarFormulario ? 'Cerrar formulario' :'Agregar un nuevo diagnóstico'}
  </p>
  {mostrarFormulario && (
  
  <form className="p-2" onSubmit={handleSubmit}>
    <h1 className=" text-center text-xl font-bold p-2">Nuevo diagnóstico</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
    <div className="flex flex-col text-sm">
        <label htmlFor="nombre" className="mb-2 ">Nombre del diagnóstico</label>
        <input
  type="text"
  className="border px-4 py-2 rounded-lg w-full "
  name="nombre"
  id="nombre" 
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">

    <div className="flex flex-col text-sm">
        <label htmlFor="tratamiento" className="mb-2">Tratamiento:</label>
        <textarea
          type="text"
          id="tratamiento"
          className="border px-4 py-2 rounded-lg w-full"
          value={tratamiento}
          onChange={(e) => setTratamiento(e.target.value)} 
        />
      </div>
      <div className="flex flex-col text-sm">
        <label htmlFor="obsdiagnostico" className="mb-2">Observaciones diagnóstico:</label>
        <textarea
          type="text"
          id="obsdiagnostico"
          className="border px-4 py-2 rounded-lg w-full"
          value={obsdiagnostico} 
          onChange={(e) => setObsdiagnostico(e.target.value)} 
        />
      </div>
    </div>
    <div className="flex justify-center ">
        <button  type="submit" className="bg-lila-200 hover:bg-lila-100 text-white font-semibold py-2 px-4 rounded-lg">
         Guardar diagnóstico
        </button>
      </div>

  </form>
)}
</div>
</div>


          </div>
              
          </div>
          
          </div>
        </>
      )}
    </>
  );
};

export default FormularioDiagnosticos;
