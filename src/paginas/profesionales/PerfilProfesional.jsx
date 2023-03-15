import { useState, useEffect } from "react"
import React from 'react';
import { Image} from "cloudinary-react";
import proAuth from "../../hooks/proAuth"
import Alerta from '../../components/Alerta';
import AlertaP from '../../components/AlertaPaciente'
import sinfoto from '../../assets/img/sinfoto.png'

const PerfilProfesional = () => {
  const [showPwd, setShowPwd] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)
  const [showPwd3, setShowPwd3] = useState(false)
  const [alerta, setAlerta ]= useState({})
  const [alertap, setAlertap ]= useState({})
  const [ perfil, setPerfil ] = useState({});
  const [contraseña, setContraseña] = useState({
    pwd_actual:'',
    pwd_nuevo:'',
  })
  const [image, setImage] = useState({})
  const [repetirPassword, setRepetirPassword] = useState('')
  const {authpro,actualizarPerfil,guardarPassword,actualizarFoto, loading, setLoading } =  proAuth()

  const formatearFecha = (fecha) => {

    const nuevaFecha = new Date(fecha)
    nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
    return new Intl.DateTimeFormat('es-CL', {dateStyle: 'long'}).format(nuevaFecha) }


 useEffect(() => {
       setPerfil(authpro)

 }, [])

 useEffect(() => {
  
  setImage(authpro)

}, [])


const handleSubmit = async e =>{
  e.preventDefault()
  const {telefono}= perfil
  if(telefono.length > 12 || telefono.length < 12 ){
    setAlerta({msg: 'Usar formato correcto de número telefónico', error: true})
    setTimeout(()=> setAlerta({}),5000)
  return
    
  }
  await actualizarPerfil(perfil)
  
 }

 const fotoPerfil = async (e)  =>{
  e.preventDefault();
  await actualizarFoto(image)
  {setTimeout(() => setLoading(false), 6000)}

}

const cambiarContraseña = async e =>{
  e.preventDefault();
  if(Object.values(contraseña).some(campo => campo ==='')){
    setAlertap({msgp: 'Todos los campos son obligatorios', error: true})
    setTimeout(()=> setAlertap({}),5000)
  return
  }
  if(contraseña.pwd_nuevo.length < 6 ){

    setAlertap({msgp: 'La contraseña debe tener al menos 6 caracteres', error: true})
    setTimeout(()=> setAlertap({}),5000)
  return
  }
  if(contraseña.pwd_nuevo !== repetirPassword){
    setAlertap({msgp: 'Las nuevas contraseñas no son iguales', error: true})
    setTimeout(()=> setAlertap({}),5000)
  return
  }
 const respuesta = await guardarPassword(contraseña)
 setAlertap(respuesta)
 setTimeout(()=> setAlertap({}),5000)
 

  toastMixin.fire({
    animation: true,
    title: 'Seras redireccionado al Login de paciente en 7 segundos...'
  });



 }

 const { msg } = alerta
 const { msgp } = alertap


  return (
    <>

<div className="container px-6 h-min py-10 mx-auto ">
<div className="relative w-full group max-w-md min-w-0 mx-auto mt-5  break-words bg-white border shadow-2xl dark:bg-gray-800 dark:border-gray-700 md:max-w-sm rounded-xl">
    <div className="pb-6">
      
        <div className="flex flex-wrap  justify-center">
        
        {loading ? 
      <div className=" container text-center">
    <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
  <span className="sr-only">cargando</span>
</div>
</div>


: 

<div className="">
                  { authpro.image === undefined ? <img src={sinfoto}/> :<Image cloudName="dde62spnz" publicId={authpro.image.public_id}>
                 </Image> }

   </div>}



            <div className="flex justify-center -full">
                
            </div>
                
                <form className="text-center" onSubmit={fotoPerfil}>
                <label className="block mb-2 text-sm font-bold text-gray-900 font-nunito dark:text-white" >Sube tu foto de perfil</label>
                    <input 
                    accept="image/*"
                    name="image" 
                    className="block w-full text-sm  border border-gray-200 rounded-md  bg-gray-50 "  
                    type="file"
                    onChange={(e) => setImage({...image,[e.target.name]: e.target.files[0]})} />
                    <button type="submit" className=" text-xs text-white bg-blue-500 py-2 px-4 rounded-md mt-1 hover:bg-blue-700">Subir foto</button>
                   </form>





                
        </div>
        <div className="mt-2 text-center">
          
  
          
            <h3 className=" text-2xl font-semibold font-nunito text-blue-700 dark:text-gray-300"> {authpro.nombres} {authpro.apellidos} </h3>

            <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
                <div className=" font-regular tracking-wide text-black dark:text-gray-300 font-nunito text-md"> <span className="font-bold">Cuenta creada:</span> {formatearFecha((authpro.fecha))}</div>
            </div>
            <div className="w-full text-center">
                <div className="flex justify-center pt-8 pb-0 lg:pt-4">
                    <div className="flex space-x-2">
                  
                    </div>
                </div>
            </div>
  
    
  
    </div>
</div>

</div>
        
<div className="container  mx-auto md:grid grid-cols-2 gap-8 p-1  ">
<div className=" dark:bg-slate-300 mx-auto md:max-w-2xl  min-w-0 break-worsd bg-white w-full mb-6 shadow-lg rounded-xl mt-10">
    <div className="px-6">
        <div className="flex flex-wrap justify-center">

        </div>
        <div className="text-center mt-2 lg:px-12 sm:px-0">
            <h3 className="text-2xl text-blue-600 font-nunito font-bold py-2 mb-1">Datos de tu perfil</h3>
            
            <div className="text-left">
            <label className="font-nunito font-semibold" >Rut</label>
            <div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl bg-gray-200">
                  <div className=" font-normal font-nunito  pl-2 w-full outline-none border-none">{authpro.rut}</div>
              </div>
              </div>
              <div className="text-left">
            <label className="font-nunito font-semibold" >Nombres</label>
            <div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl bg-gray-200">
                  <div className=" font-normal font-nunito  pl-2 w-full outline-none border-none">{authpro.nombres}</div>
              </div>
              </div>
              <div className="text-left">
            <label className="font-nunito font-semibold" >Apellidos</label>
            <div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl bg-gray-200">
                  <div className=" font-normal font-nunito  pl-2 w-full outline-none border-none">{authpro.apellidos}</div>
              </div>
              </div>
              <div className="text-left">
            <label className="font-nunito font-semibold" >Email</label>
            <div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl bg-gray-200">
                  <div className=" font-normal font-nunito  pl-2 w-full outline-none border-none">{authpro.email}</div>
              </div>
              </div>
              <div className="text-left">
            <label className="font-nunito font-semibold" >Género</label>
            <div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl bg-gray-200">
                  <div className=" font-normal font-nunito  pl-2 w-full outline-none border-none " >{authpro.sexo}</div>
              </div>
              </div>
              <div className="text-left ">
            <label className="font-nunito font-semibold" >Fecha de nacimiento</label>
            <div className="flex  items-center border-2 mb-2 py-2 px-3 rounded-2xl bg-gray-200">
                  <div className=" font-normal font-nunito  pl-2 w-full outline-none border-none">{formatearFecha((authpro.fechaNacimiento))}</div>
              </div>
              </div>
              {msg && <Alerta
              alerta={alerta}
              />}
            
              <form onSubmit={handleSubmit} className="text-left " >
              <label className="font-nunito font-semibold   "> Teléfono <h6 className="text-sm text-red-600">Formato:+56911223344</h6> </label>
            <div className=" flex items-center border-2 mb-10 py-2 px-3 rounded-2xl">
                <input 
                name="telefono"
                
                className=" dark:bg-slate-300 font-normal text-sm  font-nunito  pl-2 w-full outline-none border-none"
                 type="text"
       
                  placeholder="Ingresa tu teléfono"
                  pattern="\x2b[0-9]+" 
                  value={perfil.telefono || ''}
                  onChange={ e => setPerfil({
                    ...perfil,
                    [e.target.name] : e.target.value
                  })}
                  
                  
                  />
                  
                  
                  <button  className="text-sm text-gray-100 bg-blue-500 hover:bg-blue-700 pt-1 pb-1 pl-2 pr-2 rounded-lg ">Actualizar</button>
                  
              </div>
            </form>
 
        </div>
     
    </div>
</div>
<div className="relative dark:bg-slate-300  mx-auto md:max-w-2xl  min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-10">
    <div className="px-6">
        <div className="flex flex-wrap justify-center">

        </div>
        <div className="text-center mt-2 lg:px-12 sm:px-0">
            
            <h3 className="text-2xl  text-blue-600 font-nunito font-bold py-2 mb-1">Cambia tu contraseña</h3>
            {msgp && <AlertaP
              alertap={alertap}
              />}
            
             <form onSubmit={cambiarContraseña}>
                <div className="text-left">
                <label className="font-nunito text-left font-semibold" >Contraseña actual</label>

                

              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                
                <input type={showPwd ? "text" : "password"} className="dark:bg-slate-300 pl-2 w-full text-sm outline-none border-none"
                 placeholder="Ingresa tu actual contraseña" 
                 name="pwd_actual"
                 onChange={ e=> setContraseña({
                  ...contraseña,
                  [e.target.name]: e.target.value
                 })}
            
                 />
                 <div className="position-absolute position-right pointer pwd-icon" onClick={() => setShowPwd(!showPwd)}>
            {showPwd ? <svg  className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.2rem"}>
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg> : <svg className="h-5 w-5 text-gray-400"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.2rem"}>
              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
            </svg>}
          </div>
                
              </div>
              </div>



                 <div className="text-left">
                <label className="font-nunito text-left font-semibold" >Nueva contraseña</label>

                

              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                
                <input type={showPwd2 ? "text" : "password"} className="dark:bg-slate-300 pl-2 text-sm w-full outline-none border-none"
                 placeholder="Ingresa tu nueva contraseña" 
                 name="pwd_nuevo"
                 onChange={ e=> setContraseña({
                  ...contraseña,
                  [e.target.name]: e.target.value
                 })}
            
                 />
                 <div className="position-absolute position-right pointer pwd-icon" onClick={() => setShowPwd2(!showPwd2)}>
            {showPwd2 ? <svg  className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.2rem"}>
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg> : <svg className="h-5 w-5 text-gray-400"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.2rem"}>
              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
            </svg>}
          </div>
                
              </div>
              </div>



                 <div className="text-left">
                <label className="font-nunito text-left font-semibold" >Confirmar nueva contraseña</label>

                

              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                
                <input type={showPwd3 ? "text" : "password"} className="dark:bg-slate-300 pl-2 text-sm w-full outline-none border-none"
                 placeholder="Valida tu nueva contraseña" 
                 value={repetirPassword}
                 onChange={e => setRepetirPassword(e.target.value)}
            
                 />
                 <div className="position-absolute position-right pointer pwd-icon" onClick={() => setShowPwd3(!showPwd3)}>
            {showPwd3 ? <svg  className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.2rem"}>
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg> : <svg className="h-5 w-5 text-gray-400"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.2rem"}>
              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
            </svg>}
          </div>
                
              </div>
              </div>
              <button  type="submit" className=" bg-blue-500 block w-full font-nunito py-2 rounded-2xl hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 text-white font-semibold mb-2">Actualizar contraseña</button>

              </form>
   
 
        </div>
     
    </div>
</div>




</div>
</div>
     

    
    </>
  )
}

export default PerfilProfesional