import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";

const AuthAdminContext = createContext()

const AuthAdminProvider = ({children})=>{
const [cargando, setCargando ] =useState(true)
const [ authadmin, setAuthadmin ] = useState({})

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
        localStorage.removeItem('token')
        setAuthadmin({})
      }

return(
    <AuthAdminContext.Provider
    value={{
        authadmin,
        setAuthadmin,
        cargando,
        cerrarSesion
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