import { Link } from "react-router-dom"
import AdminAuth from '../../hooks/adminAuth'
const InicioAdmin = () => {

  const{cerrarSesion} = AdminAuth()
    return (
      <>
      <div>Pagina inicio desde el area de administrador</div>
      <div> <button className="bg-blue-200"><Link to="/admin/modulo-profesional">Módulo Profesionales</Link></button></div>
      <div><button className="bg-blue-200"><Link to="/admin/modulo-admin">Módulo Administradores</Link></button></div>
      <div><button className="bg-blue-200"><Link to="/admin/modulo-paciente">Módulo Paciente</Link></button></div>

      <button onClick={cerrarSesion}>Cerrar sesión</button>
  
      </>
    )
  }
  
  export default InicioAdmin