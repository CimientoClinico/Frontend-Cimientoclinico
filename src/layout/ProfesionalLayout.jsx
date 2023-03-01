import { Outlet, Navigate } from "react-router-dom"
import proAuth from "../hooks/proAuth"
const ProfesionalLayout = () => {
    const { authpro, cargando } = proAuth( )
    if(cargando) return

  return (
    <>
   <>
  

  { authpro?._id ?
  (

    <Outlet/>

   ): <Navigate to="/ingresa-profesional"/> }




</>

    </>
  )
}

export default ProfesionalLayout