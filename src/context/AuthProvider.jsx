import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";


const AuthContext = createContext()

const AuthProvider = ({children})=>{
const [theme, setTheme] =  useState("light")
const [cargando, setCargando] = useState(true)
const [loading, setLoading] = useState(false)
    const [auth, setAuth] = useState({})
    const toastMixin = Swal.mixin({
        toast: true,
        icon: 'success',
        title: 'Titulo',
        animation: false,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    useEffect(() => {
        if(theme == "dark"){
          document.documentElement.classList.add("dark");

        }else{
            document.documentElement.classList.remove("dark");
        }
    
    }, [theme])

    const handleThemeSwitch=() =>{
        setTheme (theme === "dark" ? "light": "dark");
    }
    
  
 useEffect(()=>{
    const autenticarUsuario = async() =>{
        const token = localStorage.getItem('token')
        if(!token){
            setCargando(false)
            return

        } 

        const config ={

            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
        try {
            const {data} = await clientAxios.get(`/pacientes/perfil`,config)
            setAuth(data)
        } catch (error) {
            console.log(error.response.data.msg)
            setAuth({})
        }

        setCargando(false)
    }
    autenticarUsuario()

 }, [auth])

 const cerrarSesion = ()=>{
    localStorage.removeItem('token')
    setAuth({})
  }
  const actualizarPerfil = async datos =>{
    const token = localStorage.getItem('token')
    if(!token){
        setCargando(false)
        return
    } 
    const config ={
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }
    try {
        const url = `/pacientes/perfil/${datos._id}`
        const {data} = await clientAxios.put(url,datos,config)
        toastMixin.fire({
            animation: true,
            title: 'Número de teléfono actualizado'
          });
        
    } catch (error) {
        console.log(error)
    }
  }

const guardarPassword = async (datos) =>{
    const token = localStorage.getItem('token')
    if(!token){
        setCargando(false)
        return
    } 
    const config ={
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }

    try {
         const url = '/pacientes/actualizar-password'
         const {data} = await clientAxios.put(url,datos,config)
         toastMixin.fire({
            animation: true,
            title: 'Tu sesión sera cerrada en los proximos segundos...',
            icon:'info'
          });
         setTimeout(()=> cerrarSesion(),8000)
         return{
            msgp:data.msg
            
         }
 
         
       
    } catch (error) {
        return{
            msgp: error.response.data.msg,
            error:true
        }
    }
}

const actualizarFoto = async (image) =>{
    const form =  new FormData()
    for (let key in image) {
      form.append(key, image[key]);
    }
    setLoading(true)
    const token = localStorage.getItem('token')
    if(!token){
        setCargando(false)
        return }


    const config ={
      headers:{
        'Content-Type': 'multipart/form-data',
          Authorization:`Bearer ${token}`
      }
  }
  try {

    const {data} = await clientAxios.put(`/pacientes/foto-perfil/${image._id}`,form,config)
   
  } catch (error) {
        return{
            msg: error.response.data.msg,
            error:true
        }
  }

  setLoading(false)
  
  }



    return(
        <AuthContext.Provider
        value={{
            auth,
            setAuth, 
            cargando,
            cerrarSesion,
            actualizarPerfil,
            guardarPassword,
            actualizarFoto,
            loading,
            setLoading,
            handleThemeSwitch
   
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext