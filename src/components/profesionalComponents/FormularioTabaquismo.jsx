import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clientAxios from "../../config/axios";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { FaExclamation } from "react-icons/fa";

import moment from "moment";
const FormularioTabaquismo = () => {
    const { id } = useParams();
    const [consulta, setConsulta] = useState([]);
    const [datosPaciente, setDatosPaciente] = useState({});
    const [loading, setLoading] = useState(true);
    const [ocultarseccion, setOcultarSeccion] = useState(false);
    const [ocultarActividad, setOcultarActividad] = useState(true);

    const toggleActividad = () => {
      setOcultarActividad(!ocultarActividad);
    };

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
        if (consulta && consulta.paciente) {
          setDatosPaciente(consulta.paciente);
          setLoading(false); 
        }
      }, [consulta]);
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
    
          Swal.fire('¡Perfecto!', 'Sección de consumo de tabaco actualizada', 'success');          
    
        } catch (error) {
          console.error(error.message);
          // Mostrar un mensaje de error o realizar acciones adicionales en caso de error
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
      
        // Si el campo es 'fumador', actualiza solo esa propiedad dentro de historiaclinica
        if (name === 'fumador') {
          setDatosPaciente((prevState) => ({
            ...prevState,
            historiaclinica: {
              ...prevState.historiaclinica,
              [name]: value
            }
          }));
        } else {
          // Si es otro campo, actualiza directamente en el objeto 'datosPaciente'
          setDatosPaciente((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
      };
      
      const now = moment();
      const showButton = consulta && now.isSameOrAfter(moment(consulta.fecha).add(consulta.horarioinicio));
      const CamposVacios =
      !datosPaciente.obsfumador ||
      datosPaciente?.historiaclinica?.fumador==='Sin datos';
     const nombreVacio = !datosPaciente.obsfumador;
     const actividadVacia = datosPaciente?.historiaclinica?.fumador ==='Sin datos' || '';

  return (
    <>
          {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
        <div className="mx-auto max-w-7xl rounded-md  mb-1">
        <div className="flex justify-start gap-2 py-1 px-4 rounded-t-lg bg-lila-300">
              <div>
                <h1 className="text-white font-semibold text-sm">
                Tabaquismo:  {datosPaciente?.historiaclinica?.fumador} 
                </h1>
              </div>
              <div>
                <button
                  className="rounded-md inline-flex space-x-1 items-center text-white hover:text-white hover:bg-indigo-500"
                  onClick={() => setOcultarSeccion(!ocultarseccion)  }
                >
                  <span className="text-xs font-regular  lg:block">
                    {ocultarseccion ? (
                      <div className="flex gap-2">
                        <p className=" text-2xl"> <MdKeyboardArrowDown/></p>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <p className=" text-2xl"><MdKeyboardArrowRight/></p>
                      </div>
                    )}
                  </span>
                </button>
              </div>
              <div>
              {CamposVacios && (
       <div className="flex mt-1">
    <p className="text-red-500 text-md"><FaExclamation className="animate-pulso text-xl" /></p>
    </div>
  )}

              </div>          
        </div>
        <div className=  {`${ocultarseccion?'block':'hidden'} xs:block `}>
        <div className="mx-auto max-w-7xl rounded-md">
        <div className="border-l-2 border-l-indigo-200 border-r-2 border-r-indigo-200 border-b-2 bg-gray-50 border-b-indigo-200 ">
<div className="border-b border-b-indigo-200" >
<div className="container mx-auto p-1">
<div className="grid grid-cols-2 items-center">
<div className="flex justify-start gap-2">
  <div>
  <h2 className="text-lg font-regular">
  {datosPaciente?.historiaclinica?.fumador} 
  </h2>
    </div>

  {CamposVacios && (
       <div className="flex mt-1">
    <p className="text-red-500 text-md"><FaExclamation className="animate-pulso text-xl" /></p>
    </div>
  )}
        <button
          className="text-blue-500 focus:outline-none"
          onClick={toggleActividad}
        >
          {ocultarActividad ? (
            <p className="text-3xl"><MdKeyboardArrowRight /></p>
          ) : (
            <p className="text-3xl"><MdKeyboardArrowDown /></p>
          )}
        </button>
</div>
</div>
{ocultarActividad ? null : (
     <div>
      {showButton ? (
  <div className="grid grid-cols-1 sm:grid-cols-1 ">

    <div className="flex flex-col text-sm">
      <div className="flex">
      <label htmlFor="obsfumador" className="text-md">Observaciones de tabaquismo:</label>
      {nombreVacio && (
              <span className="text-red-500 text-md"><FaExclamation className="animate-pulso text-lg" /></span>
                )}

    </div>
    <textarea
        type="text"
        className="border px-4 py-2 rounded-lg w-full "
        name="obsfumador"
        value={datosPaciente.obsfumador || ''}
        onChange={handleChange}
    />
    </div>
    <div className="flex flex-col text-sm">
      <div className="flex">
      <label htmlFor="fumador" className="text-md  ">¿Consumo de tabaco?</label>
      {actividadVacia && (
              <span className="text-red-500 text-md"><FaExclamation className="animate-pulso text-lg" /></span>
                )}
    </div>
    <select
  className="border px-4 py-2 rounded-lg w-full"
  name="fumador"
  value={datosPaciente.historiaclinica.fumador || ""}
  onChange={handleChange}
>
  <option value="">Seleccione una opción</option>
  <option value="Si">Si</option>
  <option value="No">No</option>
</select>
    </div>
  </div>
        ) : (
          <div className="flex flex-col text-sm gap-1">
          <div className="flex items-center  gap-1">
            <label htmlFor="nombre" className="font-bold">Observaciones de tabaquismo:</label>
            <label>{datosPaciente.obsfumador || ''} </label>
          </div>
          <div className="flex items-center  gap-1">
            <label htmlFor="ultimocontrol" className="font-bold">
            ¿Consumo de tabaco?:
            </label>
            <label>{datosPaciente.historiaclinica.fumador ||''}</label>
          </div>
        </div>
      )}

  <div className="flex justify-center py-1">
    {showButton && (
      <button onClick={actualizarPaciente} className="bg-lila-200 hover:bg-lila-100 text-white font-semibold py-1.5 px-2 rounded-lg">
        Actualizar
      </button>
    )}
    
  </div>

  </div>
    )}
</div>


</div>



        </div>
        </div>
        </div>
        </div>
        </>
        )}
    
</>
  )
}

export default FormularioTabaquismo