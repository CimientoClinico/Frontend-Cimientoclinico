import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdHome, MdListAlt, MdVoiceChat, MdAccountCircle,MdDarkMode,MdPermDeviceInformation } from "react-icons/md";
import { FaUserMd } from "react-icons/fa";
import{BsFillDoorOpenFill, BsPatchQuestion} from "react-icons/bs";
import {BiNotepad} from "react-icons/bi";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

const Sidebar = () => {
  const {cerrarSesion,handleThemeSwitch} =  useAuth()
  const menus = [
    { name: "Inicio", link: "/paciente", icon: MdHome },
    { name: "Perfil", link: "/paciente/perfil-paciente", icon: MdAccountCircle },
    { name: "Mi historia clínica", link: "/paciente/historia-clinica", icon: MdListAlt },
    { name: "Motivos de consulta", link: "/paciente/consultas", icon: MdVoiceChat },
    { name: "Mis Horarios ", link: "/paciente/horarios", icon: BiNotepad },
    { name: "Cargar preguntas", link: "/paciente/consultas", icon: BsPatchQuestion },
    { name: "Buscar temas de interés", link: "/paciente/historia-clinica", icon: MdPermDeviceInformation },
    { name: "Buscar Profesionales", link: "/paciente/lista-profesionales", icon: FaUserMd },
    
  ];
  const menus3 = [
    { name: "DarkMode", boton: "DarkMode", icon: MdDarkMode, margin:20 },

  ];
  const menus2 = [
    { name: "Cerrar Sesión", boton: "Cerrar sesión", icon: BsFillDoorOpenFill },

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
            onClick={() => setOpen(!open)}
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
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
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