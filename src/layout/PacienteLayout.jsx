import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Sidebar from "../components/pacienteComponents/Sidebar"
const PacienteLayout = () => {
   const { auth, cargando } = useAuth( )
   if(cargando) return
  return (
    <>
  
          <Sidebar/>
          { auth?._id ?
          (

            <Outlet/>

           ): <Navigate to="/ingresa"/> }


    

    </>
  )
}

export default PacienteLayout