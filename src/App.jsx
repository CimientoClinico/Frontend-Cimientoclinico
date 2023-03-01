import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import HomeLayout from "./layout/HomeLayout"
import PacienteLayout from "./layout/PacienteLayout"
import Home from "./paginas/Home"
import Login from "./paginas/Login"
import Registrar from "./paginas/Registrar"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import OlvidePassword from "./paginas/OlvidePassword"
import NuevaPassword from "./paginas/NuevaPassword"
import NoEncontrado from "./paginas/404"
import InicioPacientes from "./paginas/pacientes/InicioPacientes"
import LoginAdmin from "./paginas/admins/LoginAdmin"
import InicioAdmin from "./paginas/admins/InicioAdmin"
import AdminLayout from "./layout/AdminLayout"
import ConfirmarAdmin from "./paginas/admins/ConfirmarAdmin"
import PasswordAdmin from "./paginas/admins/PasswordAdmin"
import NuevaPassAdmin from "./paginas/admins/NuevaPassAdmin"
import ModuloProfesional from "./paginas/admins/ModuloProfesional"
import ConfirmarPro from "./paginas/profesionales/ConfirmarPro"
import LoginProfesional from "./paginas/profesionales/LoginProfesional"
import ModuloAdmin from "./paginas/admins/ModuloAdmin"
import InicioProfesional from "./paginas/profesionales/InicioProfesional"
import PacientePass from "./paginas/PacientePass"
import ProfesionalLayout from "./layout/ProfesionalLayout"
import NuevaPassPro from "./paginas/profesionales/NuevaPassPro"
import PasswordPro from "./paginas/profesionales/PasswordPro"
import ProfesionalPass from "./paginas/profesionales/ProfesionalPass"
import Adminpass from "./paginas/admins/Adminpass"
import PortalProfesional from "./paginas/PortalProfesional"
import ModuloPaciente from "./paginas/admins/ModuloPaciente"
import {AuthProvider} from "./context/AuthProvider"
import {AuthAdminProvider } from "./context/AuthAdminProvider"
import {AuthProProvider} from "./context/AuthProProvider"
import { ProfesionalProvider } from "./context/admin/ProfesionalProvider"
import { AdminProvider } from "./context/admin/AdminProvider"
import {PacienteProvider} from "./context/admin/PacienteProvider"


function App() {
  return (
    <BrowserRouter>
    <AuthProProvider>
    <AuthAdminProvider>
    <AuthProvider>
    <ProfesionalProvider>
    <AdminProvider>
    <PacienteProvider>
    <Routes>
      {/* Pagina principal con Layout header y footer */}
    <Route path="/" element={ <HomeLayout />}>
               <Route index element={ <Home />}/>
               <Route path="portal-profesional" element={ <PortalProfesional />}/>
      </Route>
      {/* Ruta para el inicio de sesion y autentificación */}
      <Route path="/" element={ <AuthLayout />}>
               <Route path="ingresa" element={ <Login />}/>
               <Route path="registrar"element={ <Registrar />}/>
               <Route path="confirmar-cuenta-paciente/:id" element={ <ConfirmarCuenta />}/>
               <Route path="olvide-password" element={ <OlvidePassword />}/>
               <Route path="olvide-password/:token" element={ <NuevaPassword />}/>
               <Route path="paciente-pass-ingreso" element={ <PacientePass />}/>
               <Route path="404" element={ <NoEncontrado />}/>
               
               
               <Route path="ingresa-admin" element={ <LoginAdmin />}/>
               <Route path="confirmar-admin/:id" element={ <ConfirmarAdmin />}/>
               <Route path="reset-pass-admin" element={ <PasswordAdmin />}/>
               <Route path="reset-pass-admin/:token" element={ <NuevaPassAdmin />}/>
               <Route path="admin-pass-ingreso" element={ <Adminpass />}/>


               <Route path="ingresa-profesional" element={ <LoginProfesional />}/>
               <Route path="confirmar-pro/:id" element={ <ConfirmarPro />}/>
               <Route path="reset-pass-pro" element={ <PasswordPro />}/>
               <Route path="reset-pass-pro/:token" element={ <NuevaPassPro />}/>
               <Route path="profesional-pass-ingreso" element={ <ProfesionalPass />}/>
            
      </Route>
     {/* Ruta protegida para PACIENTES */}
      <Route path="/paciente" element={ <PacienteLayout />}>
        <Route index element={ <InicioPacientes/> } />

      </Route>
      <Route path="/admin" element={ <AdminLayout />}>
        <Route index element={ <InicioAdmin/> } />
        <Route path="modulo-profesional" element={ <ModuloProfesional/> } />
        <Route path="modulo-admin" element={ <ModuloAdmin/> } />
        <Route path="modulo-paciente" element={ <ModuloPaciente/> } />
      </Route>

      <Route path="/profesional" element={ <ProfesionalLayout />}>
        <Route index element={ <InicioProfesional/> } />

      </Route>
    </Routes>
    </PacienteProvider>  
    </AdminProvider>
    </ProfesionalProvider>
    </AuthProvider>
    </AuthAdminProvider>
    </AuthProProvider>
    </BrowserRouter>

   )
}

export default App
