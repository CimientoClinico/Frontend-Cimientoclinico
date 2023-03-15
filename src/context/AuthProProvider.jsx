import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";

const AuthProContext = createContext()

const AuthProProvider = ({children})=>{
const [cargando, setCargando ] =useState(true)
const [ authpro, setAuthpro ] = useState({})
const [loading, setLoading] = useState(false)
const [theme, setTheme] =  useState("light")

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
            const tokenPro = localStorage.getItem('tokenPro')
            if(!tokenPro){
                setCargando(false)
                return
    
            } 
    
            const config ={
    
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${tokenPro}`
                }
            }
            try {
                const {data} = await clientAxios.get(`/profesional/perfil`,config)
                setAuthpro(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuthpro({})
            }
    
            setCargando(false)
        }
        autenticarUsuario()
    
     }, [authpro])
     const cerrarSesion = ()=>{
        localStorage.removeItem('tokenPro')
        setAuthpro({})
      }

      const actualizarPerfil = async datos =>{
        const tokenPro = localStorage.getItem('tokenPro')
        if(!tokenPro){
            setCargando(false)
            return
        } 
        const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${tokenPro}`
            }
        }
        try {
            const url = `/profesional/perfil/${datos._id}`
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
        const tokenPro = localStorage.getItem('tokenPro')
        if(!tokenPro){
            setCargando(false)
            return
        } 
        const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${tokenPro}`
            }
        }
    
        try {
             const url = '/profesional/actualizar-password'
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
        const tokenPro = localStorage.getItem('tokenPro')
        if(!tokenPro){
            setCargando(false)
            return }
    
    
        const config ={
          headers:{
            'Content-Type': 'multipart/form-data',
              Authorization:`Bearer ${tokenPro}`
          }
      }
      try {
    
        const {data} = await clientAxios.put(`/profesional/foto-perfil/${image._id}`,form,config)
       
      } catch (error) {
            return{
                msg: error.response.data.msg,
                error:true
            }
      }
    
      setLoading(false)
      
      }

return(
    <AuthProContext.Provider
    value={{
        authpro,
        setAuthpro,
        cargando,
        cerrarSesion,
        actualizarFoto,
        guardarPassword,
        actualizarPerfil,
        loading,
        setLoading,
        handleThemeSwitch
    }}
    >
        {children}
    </AuthProContext.Provider>

)
}

export{
    AuthProProvider
}

export default AuthProContext