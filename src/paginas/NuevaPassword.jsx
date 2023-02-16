import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Alerta from '../components/Alerta';
import recuperar from '../assets/img/recuperar.png'
import clientAxios from '../config/axios';
const NuevaPassword = () => {

  const [password, setPassword]= useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido]=useState(false)
  const [passwordModificado, setPasswordModificado] =  useState(false)
  const params = useParams()
  const { token } = params
  console.log(token)
 
  useEffect(()=>{
    const comprobarToken = async ()=>{
      try {
        await clientAxios(`/pacientes/olvide-password/${token}`)
        setAlerta({
          msg:'Ya puedes ingresar tu nueva contraseña'
        })
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }

    }
    comprobarToken()
  },[])
  const handleSubmit = async (e) =>{
  e.preventDefault()
  if(password.length < 6 ){
    setAlerta({
      msg:'El password debe tener almenos 6 caracteres',
      error:true
    })
    return
  }
  try {
    const url =`/pacientes/olvide-password/${token}`
    const { data } = await clientAxios.post(url,{password})
    setAlerta({
      msg:data.msg
    })
    setPasswordModificado(true)
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
        
          <div  className="flex w-full  lg:w-1/2 justify-center items-center space-y-8">
          <div className="w-full px-8 md:px-48 lg:px-36">
          {msg && <Alerta
              alerta={alerta}
              />}
              {tokenValido && 
            <form onSubmit={handleSubmit}
            className="bg-white rounded-md shadow-2xl p-5">
              <h1 id="textologo"className="font-extrabold font-nunito text-2xl mb-1 text-center">Cimiento Clínico</h1>
              <p className="text-md font-nunito text-gray-400 font-normal mb-8 text-center">Cambiar tu contraseña</p>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input 
                className=" 
                font-normal font-nunito  pl-2 w-full outline-none border-none" 
                type="password" 
                placeholder="Nueva contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                 />
              </div>


              <button id="primario" type="submit" className="block w-full font-nunito py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Cambiar contraseña</button>
              <div className="flex justify-between mt-4">
              
                

              </div>
              {passwordModificado && 
                <Link  to="/ingresa" 
                className="text-md  ml-2 hover:text-teal-800 text-teal-600 cursor-pointer hover:-translate-y-1 
                duration-500 transition-all">Iniciar Sesión</Link> }
              
            </form>
            }
              
            </div>
          
          </div>

          <div id="primario" className=" hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center">
            <div className="bg-black  opacity-20 inset-0 z-0">

              </div>
              <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
              <img src={recuperar} alt="" />
              <h1 className="text-white text-3xl font-nunito font-bold">Recupera tu contraseña e ingresa Cimiento Clínico y agenda tus consultas de telemedicina</h1>
              </div>
           
            
          </div>
      </div>        
        </>
    );
};

export default NuevaPassword;

