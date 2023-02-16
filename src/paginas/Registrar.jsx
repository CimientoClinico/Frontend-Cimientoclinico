import { Link } from 'react-router-dom';
import { useState } from 'react';
import registrar from '../assets/img/registrar.png'
import Alerta from '../components/Alerta';
import clientAxios from "../config/axios";
const Registrar = () => {
     const [email, setEmail] = useState('')
     const [Rut, setRut] = useState('')
     const [nombres, setNombres] = useState('')
     const [apellidos, setApellidos] = useState('')
     const [password, setPassword] = useState('')
     const [repetirPassword, setRepetirPassword] = useState('')
     const [alerta, setAlerta ]= useState({})
     const handleSubmit = async e =>{
      
      e.preventDefault();
      
      if([email,Rut,nombres,apellidos,password,repetirPassword].includes('')){
        setAlerta({msg: 'Hay campos vacíos', error: true})
        return;
      }

      if(password !== repetirPassword){
        setAlerta({msg: 'Las contraseñas deben ser iguales', error: true})
        return;
      }

      if(password.length < 6 ){
        setAlerta({msg: 'La contraseña debe tener al menos 6 caracteres', error: true})
        return;
      }

     
    


      

      setAlerta({})

      //Peticion al backend para crear usuario
      try{
         await clientAxios.post('/pacientes',{email,Rut,nombres,apellidos,password})
         setAlerta({
          msg: 'Registrado con éxito. Revisa tu Correo electrónico',
          error: false
         })

      }
      catch(error){
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
               <img src={registrar} alt="" />
              <h1 className="text-white text-3xl font-nunito font-bold">Registrate en Cimiento Clínico y agenda tus consultas de telemedicina</h1>
            </div>
          </div>

          <div className="flex w-full  lg:w-1/2 justify-center items-center space-y-8">
            <div className="w-full px-8 md:px-48 lg:px-36">
              {msg && <Alerta
              alerta={alerta}
              />}
            
            
            <form className="bg-white rounded-md shadow-2xl p-5" 
            onSubmit={handleSubmit}
            >
              <h1 id="textologo"className="font-extrabold font-nunito text-2xl mb-1 text-center">Cimiento Clínico</h1>
              <p className="text-md font-nunito text-gray-400 font-normal mb-8 text-center">Registro en el sistema</p>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <input id="email" className=" font-normal font-nunito  pl-2 w-full outline-none border-none" 
                type="email" 
                name="email"
                 placeholder="Ingresa tu correo electrónico"
                 value={email}
                 onChange={e => setEmail(e.target.value) }
                  />
              </div>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">

                <input id="rut" className=" font-normal font-nunito  pl-2 w-full outline-none border-none" 
                type="text" 
                name="Rut" 
                placeholder="RUT" 
                value={Rut}
                onChange={e => setRut(e.target.value) }
                />
              </div>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">

                <input id="nombres" className=" font-normal font-nunito  pl-2 w-full outline-none border-none" 
                type="text" 
                name="nombres"
                 placeholder="Nombres" 
                 value={nombres}
                 onChange={e => setNombres(e.target.value) }
                 />
              </div>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">

                <input id="apellidos" className=" font-normal font-nunito  pl-2 w-full outline-none border-none" 
                type="text" 
                name="apellidos" 
                placeholder="Apellidos" 
                value={apellidos}
                 onChange={e => setApellidos(e.target.value) }
                />
              </div>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">

                <input id="password" className=" font-normal font-nunito  pl-2 w-full outline-none border-none"
                type="password" 
                name="password" 
                placeholder="Contraseña"
                value={password}
                 onChange={e => setPassword(e.target.value) }
                />
              </div>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">

                <input id="repetirpassword" className=" font-normal font-nunito  pl-2 w-full outline-none border-none" 
                type="password"
                 name="repetirpassword" 
                 placeholder="Confirmar contraseña" 
                 value={repetirPassword}
                 onChange={e => setRepetirPassword(e.target.value) }
                 />
              </div>
              <button id="primario" type="submit" className="block w-full font-nunito py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Registrarse</button>
              <div className="flex justify-between mt-4">
                <Link  to="/ingresa" className="text-sm ml-2 hover:text-teal-700 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Ya tienes una cuenta? Ingresa aquí</Link>

              </div>
              
            </form>
            </div>
            
          </div>
      </div>
        
        </>
    );
};

export default Registrar;