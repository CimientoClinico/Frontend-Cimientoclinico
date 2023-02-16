import { useState } from "react";
const HeaderPublico = () =>{
    const [navbar, setNavbar] = useState(false);
return(
    <header>
    <nav   className= " bg-white  drop-shadow-2xl px-4 lg:px-6 py-3.5  w-full ">
           <div className=" justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 ">
               <div>
                   <div className="flex items-center justify-between py-3 md:py-5 md:block">
                       <a href="/">
                           <h1 id="textologo" className="font-nunito  text-3xl font-bold text-white">Cimiento Clínico</h1>
                       </a>
                       <div className="md:hidden">
                           <button
                               className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                               onClick={() => setNavbar(!navbar)}>
                               {navbar ? (
                                   <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       className="w-6 h-6 text-black"
                                       viewBox="0 0 20 20"
                                       fill="currentColor" >
                                       <path
                                           fillRule="evenodd"
                                           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                           clipRule="evenodd"/>
                                   </svg>
                               ) : (
                                   <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       className="w-6 h-6 text-black"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       stroke="currentColor"
                                       strokeWidth={2}>
                                       <path strokeLinecap="round" strokeLinejoin="round"  d="M4 6h16M4 12h16M4 18h16"/>
                                   </svg>
                               )}
                           </button>
                       </div>
                   </div>
               </div>
               <div>
                   <div
                       className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0  ${
                           navbar ? "block" : "hidden"
                       }`}>
                       <ul className="items-center justify-center space-y-8 md:flex md:space-x-16 md:space-y-0">
                           <li className="font-nunito font-normal block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                               <a href="#">Reservas</a>
                           </li>
                           <li className="font-nunito font-normal block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                               <a href="#">Nosotros</a>
                           </li>
                           <li className="font-nunito font-normal block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                               <a href="#">Preguntas frecuentes</a>
                           </li>
                           <li className="font-nunito  font-normal block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                               <a href="#">Contacto</a>
                           </li>
                       </ul>

                       <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                   <a id="primario" href="/ingresa"className="inline-block w-full px-4 py-2 text-center text-white font-nunito  rounded-md shadow ">Ingresar</a>
               </div>
                   </div>
               </div>
               <div className="hidden space-x-2 md:inline-block">
                   <a id="primario" href="/ingresa" className="inline-block w-full px-4 py-2 text-center text-white font-nunito  rounded-md shadow ">Ingresar</a>
               </div>
           </div>
       </nav>
       </header>
)
};
export default HeaderPublico