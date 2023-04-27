import { useState, useEffect } from "react";
import clientAxios from "../../config/axios";
import proAuth from "../../hooks/proAuth"

const BorrarNotificaciones = () => {
    const {authpro} =  proAuth()
    const [ perfil, setPerfil ] = useState({});
    useEffect(() => {
        setPerfil(authpro)
      
      }, [])
      const marcarConsultasAceptadasComoLeidas = async datos  =>{

        try {
          const tokenPro = localStorage.getItem('tokenPro')
          if(!tokenPro){
            setCargando(false)
            return
          } 
          const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${tokenPro}`
            }
          }
            const url = `/profesional/cambiar-estado-consultas-aceptadas/${datos._id}`
            const {data} = await clientAxios.put(url,datos,config)           
          }
        
        catch (error) {
          console.log(error)
        }
      }
      const handleSubmit = async e =>{
        e.preventDefault()
        await  marcarConsultasAceptadasComoLeidas(perfil)
        
       }
  return (
    <>

<div className="flex justify-end">
<button className="bg-red-500 px-2 py-2 text-white rounded-lg text-xs" onClick={handleSubmit}>Quitar Notificaciones🗑️</button>
</div>


    </>
  )
}

export default BorrarNotificaciones