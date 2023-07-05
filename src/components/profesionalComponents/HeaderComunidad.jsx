import React from 'react'
import { Link, useLocation } from "react-router-dom"
const HeaderComunidad = () => {
  return (
    <>
<header className="pt-12 bg-lila-200 ">
     <div className="container mx-auto flex flex-col md:flex-row justify-center items-center font-nunito   ">
<nav className="flex flex-col items-start md:flex-row justify-content: flex-start xl:gap-1 sm:gap-1 xl:mt-2 lg:mt-0">
<Link to="/profesional/comunidad"  className={`text-white text-sm hover:text-gray-300 bg-indigo-600 px-3 py-1 xl:rounded-t-lg xs:rounded-md font-regular flex ${location.pathname === '/profesional/comunidad' && 'text-gray-300  '}`}>Comunidad
 </Link>
 <Link to="/profesional/medidas-generales"  className={`text-white text-sm hover:text-gray-300 bg-green-600 px-3 py-1 xl:rounded-t-lg xs:rounded-md font-regular flex ${location.pathname === '/profesional/medidas-generales' && 'text-gray-300  '}`}>Medidas Generales
 </Link>
         </nav>
     </div>
   </header>
   <div className='flex justify-center gap-2 py-10' >
   <h1 className='text-center text-5xl  font-semibold'>Comunidad de </h1>
    <h1 className='text-center text-5xl text-lila-300 font-semibold'> Profesionales</h1>
   </div>
 
    </>
  )
}

export default HeaderComunidad