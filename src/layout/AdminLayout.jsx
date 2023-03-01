import { Outlet, Navigate } from "react-router-dom"
import adminAuth from "../hooks/adminAuth"
const AdminLayout = () => {
    const { authadmin, cargando } = adminAuth( )
    if(cargando) return

  return (
    <>
   <>
  

  { authadmin?._id ?
  (

    <Outlet/>

   ): <Navigate to="/ingresa-admin"/> }




</>

    </>
  )
}

export default AdminLayout