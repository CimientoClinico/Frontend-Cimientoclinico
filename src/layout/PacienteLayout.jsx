import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
const PacienteLayout = () => {
    const { auth, cargando } = useAuth()
    if(cargando) return

  return (
    <>
    <div>Ruta protegida para pacientes</div>
   {auth?._id ? <Outlet/> : <Navigate to="/ingresa"/> } 

    </>
  )
}

export default PacienteLayout