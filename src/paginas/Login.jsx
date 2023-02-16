import { Link, useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import { useState } from 'react';
import login from '../assets/img/login.png'
import Alerta from '../components/Alerta'
import clientAxios from '../config/axios';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  
  const { setAuth } = useAuth()
  const navigate = useNavigate() 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if([email, password].includes('')){
      setAlerta({
        msg:'Todos los campos son obligatorios',
        error:true
      });
      return
    }

    try {
       const {data} = await clientAxios.post('/pacientes/login', { email , password })
      localStorage.setItem('TOKEN_CC', data.token)
      setAuth(data)
      navigate('/paciente')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }

const { msg } = alerta
    return(
        <>
<div className="h-screen flex">
          <div id="primario" className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center">
            <div 
                  className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
                  >

                  </div>
            <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
               <Link to="/"><img src={login} alt="" /></Link>
              <h1 className="text-white text-3xl font-nunito font-bold">Ingresa a Cimiento Clínico y agenda tus consultas de telemedicina</h1>
            </div>
          </div>
          

          <div className="flex w-full  lg:w-1/2 justify-center items-center space-y-8">
           

            <div className="w-full px-8 md:px-48 lg:px-36">
            { msg && 
            
            <Alerta
            alerta={alerta}/>}
            <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-2xl p-5">
              <h1  id="textologo"className="font-extrabold font-nunito text-2xl mb-1 text-center">Cimiento Clínico</h1>
              <p className="text-md font-nunito text-gray-400 font-normal mb-8 text-center">Inicio de sesión</p>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input 
                id="email" 
                className=" font-normal font-nunito  pl-2 w-full outline-none border-none"
                 type="email"
                  placeholder="Ingresa tu correo electrónico" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}/>
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input className="pl-2 w-full outline-none border-none"
                 type="password"  
                 id="password" 
                 placeholder="Ingresa tu contraseña" 
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 />
                
              </div>
              <button id="primario" type="submit" className="block w-full font-nunito py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>
              <div className="flex justify-between mt-4">
                <Link to="/olvide-password" className="text-sm ml-2 hover:text-teal-700 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Olvidaste tu contraseña?</Link>

                <Link to="/registrar" className="text-sm ml-2 hover:text-teal-700 cursor-pointer hover:-translate-y-1 duration-500 transition-all">No tienes una cuenta?</Link>
              </div>
              
            </form>
            </div>
            
          </div>
      </div>
        
        </>
    );
};

export default Login;