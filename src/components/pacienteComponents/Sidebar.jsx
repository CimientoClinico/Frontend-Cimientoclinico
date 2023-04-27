import React, { useState,useEffect} from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdHome, MdListAlt, MdVoiceChat, MdAccountCircle,MdDarkMode,MdPermDeviceInformation } from "react-icons/md";
import { FaUserMd } from "react-icons/fa";
import{BsFillDoorOpenFill, BsPatchQuestion,BsFillBellFill} from "react-icons/bs";
import{TfiAgenda} from "react-icons/tfi";
import {BiNotepad} from "react-icons/bi";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import clientAxios from "../../config/axios";


const Sidebar = () => {
  const {cerrarSesion,handleThemeSwitch} =  useAuth()
  const [showNotifications, setShowNotifications] = useState(false);
  const [motivos, setMotivos] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const { auth} =  useAuth()

  const handleNotificationClick = () => {
    setShowNotifications(true);
    setOpen(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

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
      const { data } = await clientAxios.get('/pacientes/obtener-motivodeconsultas',config)
      setMotivos(data)
    } catch (error) {
      console.log(error)
    }

  }
  obtenerMotivosConsulta()      
},[motivos])
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
    } catch (error) {
      console.log(error)
    }

  }
  obtenerMotivosConsulta()      
},[consultas])
const consultasPendientes = consultas.filter(con => con.paciente === auth._id && con.estado === 'pendiente'  && con.leidopaciente===false );
const  motivosfiltrados = motivos
.filter(motivo => motivo.estado === "publicado"&& consultas.some( con => con.motivoconsulta===motivo._id && con.paciente===auth._id && con.estado==='pendiente') ) 
const numNotificaciones= consultasPendientes.length
  const menus = [
    { name: "Inicio", link: "/paciente", icon: MdHome },
    { name: "Perfil", link: "/paciente/perfil-paciente", icon: MdAccountCircle },
    { name: "Mi historia clínica", link: "/paciente/historia-clinica", icon: MdListAlt },
    { name: "Motivos de consulta", link: "/paciente/consultas", icon: MdVoiceChat },
    { name: "Mis Horarios", link: "/paciente/agenda", icon: BiNotepad },
    { name: "Mi agenda", link: "/paciente/horarios", icon: TfiAgenda },
    { name: "Cargar preguntas", link: "/paciente/consultas", icon: BsPatchQuestion },
    { name: "Buscar temas de interés", link: "/paciente/historia-clinica", icon: MdPermDeviceInformation },
    { name: "Buscar Profesionales", link: "/paciente/lista-profesionales", icon: FaUserMd },
    
  ];
  const menus3 = [
    { name: "DarkMode", boton: "DarkMode", icon: MdDarkMode},

  ];
  const menus2 = [
    { name: "Cerrar Sesión", boton: "Cerrar sesión", icon: BsFillDoorOpenFill },

  ];
  const menus4 = [
    {  name: "Notificaciones", boton: "Notificaciones", icon: BsFillBellFill },

  ];
  const [open, setOpen] = useState(true);
 
  return (
  
        <aside>
      <div 
      id="lateral"
        className={`bg-teal-700 dark:bg-slate-800  mb-0  ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4  `}
      >
        <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => {
            setOpen(!open);
            setShowNotifications(false);
          }}
        />
          
        </div>
        {open ?   <div className="flex gap-x-4 items-center">
           <h1 className={`cursor-pointer font-nunito font-extrabold duration-500 text-2xl `}> Cimiento Clínico</h1>
        
          
           </div>
            : <div className="flex gap-x-4 items-center">
           <h1 className={`cursor-pointer duration-500 `}> </h1>
         </div> }
         {open ?   <div className="flex gap-x-4 items-center">
           <h2 className={`cursor-pointer font-nunito duration-500 text-xl `}> Portal Pacientes</h2>
        
          
           </div>
            : <div className="flex gap-x-4 items-center">
           <h1 className={`cursor-pointer duration-500 `}> </h1>
         </div> }
     
        <div className="mt-4 flex flex-col gap-4 relative">
        {menus4?.map((menu4, i) => (
  <button onClick={handleNotificationClick}
    to={menu4.boton}
    key={i}
    className={` ${
      menu4?.margin && "mt-5"
    } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
  >
    <div>{React.createElement(menu4?.icon, { size: "20" })}
      {!open && numNotificaciones > 0 && (
        <div className="bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center ml-2">
          {numNotificaciones}
        </div>
      )}
    </div>

    <h2
      style={{
        transitionDelay: `${i + 3}00ms`,
      }}
      className={`whitespace-pre duration-500 ${
        !open && "opacity-0 translate-x-28 overflow-hidden"
      }`}
    >
      {menu4?.name}
    </h2>

    <h2
      className={`${
        open && "hidden"
      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
    >
      {menu4?.name}
    </h2>

    {open && menu4.name === "Notificaciones" && numNotificaciones > 0 &&
      <div className="bg-red-500 rounded-full px-2 py-0.5 ">{numNotificaciones}</div>
    }
  </button>
))}

{numNotificaciones > 0 && showNotifications && (
  <div className="">
    <div className="bg-gray-800 rounded-lg shadow-lg max-w-xs overflow-y-auto">
      <div className="flex justify-end">
        <button className="text-sm font-semibold" onClick={handleCloseNotifications}>Cerrar❌</button>
      </div>
      <div className=" pl-2">
        {consultasPendientes.slice(0, 3).map((con) => (
               <div key={con._id} className="mb-4">
                <h1 className="text-white text-sm px-0.5 font-regular font-semibold"> Nueva propuesta de Consulta</h1>
               <p className="text-white text-xs px-0.5 font-regular">Con el profesional {con.profesional.nombres} {con.profesional.apellidos} {`(${con.profesional.especialidad})`}  </p>
                <div className="border mr-1 border-gray-700 rounded-md px-0.5">
               </div>
     
             </div>
        ))}
      </div>
     
      {numNotificaciones  > 0 && showNotifications &&(
        
           <Link to="/paciente/notificaciones" >  <h1 className="text-blue-400 hover:text-blue-700 text-center text-sm px-0.5 font-regular">Ver todas las notificaciones</h1></Link>
           
      )}
    </div>
  </div>
)}
   {numNotificaciones === 0 && showNotifications && (
          <div className="  px-2 p-1 bg-gray-800 rounded-lg shadow-lg max-w-xs overflow-y-auto">         
            <button className="close-btn text-sm " onClick={handleCloseNotifications}>
            Cerrar❌
            </button>
            <h1 className="text-white text-center text-sm mr-2">Sin notificaciones...</h1>
            <Link to="/paciente/notificaciones" >  <h1 className="text-blue-400 hover:text-blue-700 text-center text-sm px-0.5 font-regular">Ver notificaciones antiguas</h1></Link>

          </div>
        )}

          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute  left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
          
            </Link>

            
          ))}

     

      {menus3?.map((menu3, i) => (
            <button onClick={handleThemeSwitch}
              to={menu3.boton}
              key={i}
              className={` ${
                menu3?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md  `}
            >
              <div>{React.createElement(menu3?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu3?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu3?.name}
              </h2>
          
            </button>
            
            
          ))}


          {menus2?.map((menu2, i) => (
            <button onClick={cerrarSesion}
              to={menu2.boton}
              key={i}
              className={` ${
                menu2?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu2?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu2?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu2?.name}
              </h2>
          
            </button>
            
            
          ))}




          
        </div>

      

      </div>
      
      </aside>
      
      
  
    
  );
};

export default Sidebar;