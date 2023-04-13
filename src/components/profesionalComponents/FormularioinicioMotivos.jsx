import { useEffect, useState } from "react"
import clientAxios from "../../config/axios";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// habilita los plugins utc y timezone
dayjs.extend(utc);
dayjs.extend(timezone);

// define la zona horaria deseada
dayjs.tz.setDefault('America/Santiago');
const fechaActual = dayjs();
const formatoFecha = fechaActual.format('DD/MM/YYYY HH:mm');

const FormularioinicioMotivos= () => {

    const [motivos, setMotivos] = useState([]);
    
    const formatearFecha = (fecha) => {
      const fechaSantiago = dayjs.utc(fecha).tz('America/Santiago');
      return fechaSantiago.format('DD/MM/YYYY HH:mm');
    };

    useEffect(()=>{
        const obtenerMotivosConsulta = async() =>{
          try {
            const tokenPro = localStorage.getItem('tokenPro')
            if(!tokenPro) return
      
            const config={
              headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenPro}`
            }
            }
            const { data } = await clientAxios.get('/profesional/obtener-motivos',config)
            setMotivos(data)
          } catch (error) {
            console.log(error)
          }
      
        }
        obtenerMotivosConsulta()      
      },[motivos])
  return (
    <>
     <div className="flex flex-col items-center justify-center w-full px-60 ">
      <h1 className="text-center text-xl mt-2  mb-4">Motivos de consulta</h1>


      {motivos
  .filter(motivo => motivo.estado === "publicado"&& motivo.visible === true) // Filtrar motivos publicados
  .map((motivo) => (
    <div key={motivo._id} className="bg-white rounded-lg shadow-md w-full mb-10  ">
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-800 text-center">{motivo.titulo}</h2>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">Publicado: {formatearFecha(motivo.fecha)}</span>
        <p className="mt-2 text-lg font-semibold   text-slate-800">{motivo.descripcion}</p>
      </div>
      <div className="bg-gray-100 px-4 py-3">
        <button className="bg-blue-400 hover:bg-blue-600 px-5 py-1 rounded-md text-white">
          <Link to={`/profesional/vermotivo/${motivo._id}`}>Ver más</Link>
        </button>
      </div>
    </div>
  ))}

    </div>



    
    
   
    
    </>
  )
}

export default FormularioinicioMotivos