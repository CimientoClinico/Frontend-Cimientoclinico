import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom"
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
import {AuthProvider} from "./context/AuthProvider"

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
      {/* Pagina principal con Layout header y footer */}
    <Route path="/" element={ <HomeLayout />}>
               <Route index element={ <Home />}/>
      </Route>
      {/* Ruta para el inicio de sesion y autentificación */}
      <Route path="/" element={ <AuthLayout />}>
               <Route path="ingresa" element={ <Login />}/>
               <Route path="registrar"element={ <Registrar />}/>
               <Route path="confirmar-cuenta-paciente/:id" element={ <ConfirmarCuenta />}/>
               <Route path="olvide-password" element={ <OlvidePassword />}/>
               <Route path="olvide-password/:token" element={ <NuevaPassword />}/>
               <Route path="404" element={ <NoEncontrado />}/>
      </Route>
     {/* Ruta protegida para PACIENTES */}
      <Route path="/paciente" element={ <PacienteLayout />}>
        <Route index element={ <InicioPacientes/> } />

      </Route>
    </Routes>
    </AuthProvider>

    </BrowserRouter>

   )
}

export default App
