import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";

const AuthAdminContext = createContext()

const AuthAdminProvider = ({children})=>{
const [cargando, setCargando ] =useState(true)
const [ authadmin, setAuthadmin ] = useState({})
const [theme, setTheme] =  useState("light")
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
            const tokenAdm = localStorage.getItem('tokenAdm')
            if(!tokenAdm){
                setCargando(false)
                return
    
            } 
    
            const config ={
    
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${tokenAdm}`
                }
            }
            try {
                const {data} = await clientAxios.get(`/admin/perfil`,config)
                setAuthadmin(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuthadmin({})
            }
    
            setCargando(false)
        }
        autenticarUsuario()
    
     }, [])

     const cerrarSesion = ()=>{
        localStorage.removeItem('tokenAdm')
        setAuthadmin({})
      }

return(
    <AuthAdminContext.Provider
    value={{
        authadmin,
        setAuthadmin,
        cargando,
        cerrarSesion,
        handleThemeSwitch
    }}
    >
        {children}
    </AuthAdminContext.Provider>

)
}

export{
    AuthAdminProvider
}

export default AuthAdminContext