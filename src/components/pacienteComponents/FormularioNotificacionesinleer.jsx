import React, { useState,useEffect} from "react";
import useAuth from "../../hooks/useAuth"
import clientAxios from "../../config/axios";
import { Image} from "cloudinary-react";
import { Link , useNavigate } from "react-router-dom";

const FormularioNotificacionesSinleer = () => {
    const [consultas, setConsultas] = useState([]);
    const { auth} =  useAuth()
    const [isLoading, setIsLoading] = useState(true);
    const [ perfil, setPerfil ] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
      setPerfil(auth)
    
    }, [])
    const formatearFecha = (fecha) => {
      const nuevaFecha = new Date(fecha)
      nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
      return new Intl.DateTimeFormat('es-CL', {dateStyle: 'long'}).format(nuevaFecha) }
      const ConsultasLeidas= async datos  =>{

        try {
          const token = localStorage.getItem('token')
          if(!token){
            setCargando(false)
            return
          } 
          const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
          }
            const url = `/pacientes/consultasleidas/${datos._id}`
            const {data} = await clientAxios.put(url,datos,config)   
            
          }
        
        catch (error) {
          console.log(error)
        }
      }

      useEffect(()=>{
        const obtenerMotivosConsulta = async() =>{
          try {
            const token = localStorage.getItem('token')
            if(!token) return
      
            const config={
              headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
            }
            const { data } = await clientAxios.get('/pacientes/obtener-consultas',config)
            setConsultas(data)
            setIsLoading(false);
          } catch (error) {
            console.log(error)
          }
      
        }
        obtenerMotivosConsulta()      
      },[consultas])
      const consultasPendientes = consultas.filter(con => con.paciente === auth._id && con.estado === 'pendiente' && con.leidopaciente === false);
      const handleSubmit = async e =>{
        e.preventDefault()
        await  ConsultasLeidas(perfil)      
       }
       const handleLinkClick = (e) => {
        e.preventDefault();
      
        const resultado =Swal.fire({
          title: `¿Enviar propuesta de consulta al paciente?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí',
          cancelButtonText: 'Cancelar'
        }).then((resultado) => {
          if (resultado.isConfirmed) {
             const url = e.target.getAttribute('href');
             navigate(url);
          }
        });
      }
  return (
    <>
    <div className="px-10 py-5">
    
        {isLoading ?
      <div className="sk-circle">
      <div className="sk-circle1 sk-child"></div>
      <div className="sk-circle2 sk-child"></div>
      <div className="sk-circle3 sk-child"></div>
      <div className="sk-circle4 sk-child"></div>
      <div className="sk-circle5 sk-child"></div>
      <div className="sk-circle6 sk-child"></div>
      <div className="sk-circle7 sk-child"></div>
      <div className="sk-circle8 sk-child"></div>
      <div className="sk-circle9 sk-child"></div>
      <div className="sk-circle10 sk-child"></div>
      <div className="sk-circle11 sk-child"></div>
      <div className="sk-circle12 sk-child"></div>
    </div>

    :
        <div className="   w-full bg-gray-700 rounded-lg">

            <div className=" flex justify-end">
            <button className=" pr-4  text-white rounded-lg text-sm py-0.5" onClick={handleSubmit}>Marcar todas como leidas</button>
            </div>
           { consultasPendientes.length=== 0 ? 
            <h1 className="text-white text-2xl text-center"> No hay Notificaciones...</h1>
           :    
           <div>
                    {consultasPendientes.slice(0, 10).map((con) => (
               <div key={con._id} className="mb-4 bg-gray-700 rounded-lg  px-10 py-4">
               {con.profesional.image?.public_id ?
                <Image cloudName="dde62spnz" publicId={con.profesional.image?.public_id}  width="50"></Image>
               :''}
              
               
               <p className="text-white text-sm px-0.5 font-regular">El profesional <span className="font-semibold">{con.profesional.nombres} {con.profesional.apellidos} </span> 
                esta interesado en tu caso: <span className="text-red-400">{con.motivoconsulta.titulo}</span> </p>
                <div className="border mr-1 border-gray-700 rounded-md px-0.5">
               <p className="text-gray-300 text-sm "> {""} </p>
               <p className="text-gray-300 text-sm ">Fecha propuesta: { formatearFecha(con.fecha)} </p>
               <p className="text-gray-300 text-sm">Horario propuesto: {con.horarioinicio}{'-'}{con.horariofin}</p>
               { con.tarifa ?
               <p className=" text-sm text-gray-300 ">Precio: <span className="text-bold text-white"> {'$'}{con.tarifa.valor.toLocaleString('es-CL')}</span></p>
               :
               <p className=" text-sm text-gray-300">Precio: <span className="text-bold text-white"> {'$'}{con.tarifaGlobal.valor.toLocaleString('es-CL')}</span></p>
               }
               <div className="flex text-regular text-xs gap-1 mb-1">
                 <button className="bg-green-600 px-0.5 py-0.5 rounded-lg text-white">Aceptar</button>
                 <Link className="bg-red-600 px-0.5 py-0.5 rounded-lg text-white" to={`/paciente/vermas-consulta/${con._id}`}onClick={handleLinkClick}>Rechazar</Link>
                 <Link className="bg-blue-600 px-0.5 py-0.5 rounded-lg text-white" to={`/paciente/vermas-consulta/${con._id}`}>Conocer Más</Link>
               </div>
               </div>
     
             </div>
        ))}
           </div>
           }

      </div>
  }
    </div>
    </>
  )
}

export default FormularioNotificacionesSinleer