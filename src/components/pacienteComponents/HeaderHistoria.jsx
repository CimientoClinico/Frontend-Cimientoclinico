import { Link, useLocation } from "react-router-dom"

const HeaderHistoria = () => {
  const location = useLocation();
  return (
    <>
      <header className="pt-6 bg-lila-300 ">
     
     <div className="container mx-auto flex flex-col md:flex-row justify-center items-center font-nunito   ">
         <nav className="flex flex-col items-center md:flex-row xl:gap-1 sm:gap-1 xl:mt-2 lg:mt-0  ">
             <Link to="/paciente/historia-clinica" className={`text-white text-sm hover:text-gray-300 bg-blue-600 px-3 py-1 xl:rounded-t-lg xs:rounded-md font-regular ${location.pathname === '/paciente/historia-clinica' && 'text-gray-400  '}`}>Historial Clínica</Link>
             <Link to="/paciente/diagnosticos" className={`text-white text-sm hover:text-gray-300 bg-yellow-600 px-3 py-1 xl:rounded-t-lg xs:rounded-md font-regular ${location.pathname === '/paciente/diagnosticos' && 'text-gray-600'}`}>Diagnósticos</Link>
             <Link to="/paciente/examenes" className={`text-white text-sm hover:text-gray-300 bg-green-600 px-3 py-1 xl:rounded-t-lg xs:rounded-md font-regular ${location.pathname === '/paciente/examenes' && 'text-gray-600'}`}>Exámenes</Link>
             <Link to="/paciente/eventos" className={`text-white text-sm hover:text-gray-300 bg-red-600 px-3 py-1 xl:rounded-t-lg xs:rounded-md font-regular ${location.pathname === '/paciente/eventos' && 'text-gray-600'}`}>Eventos</Link>
             <Link to="/paciente/seguimiento-consulta" className={`text-white text-sm hover:text-gray-300 bg-purple-600 px-3 py-1 xl:rounded-t-lg xs:rounded-md font-regular ${location.pathname === '/paciente/seguimiento-consulta' && 'text-gray-400'}`}>Seguimiento de consultas</Link>
         </nav>
     </div>
   </header>
    </>
  )
}

export default HeaderHistoria