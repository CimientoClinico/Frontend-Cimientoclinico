import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";

const AuthProContext = createContext()

const AuthProProvider = ({children})=>{
const [cargando, setCargando ] =useState(true)
const [ authpro, setAuthpro ] = useState({})

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
                const {data} = await clientAxios.get(`/profesional/perfil`,config)
                setAuthpro(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuthpro({})
            }
    
            setCargando(false)
        }
        autenticarUsuario()
    
     }, [])

return(
    <AuthProContext.Provider
    value={{
        authpro,
        setAuthpro,
        cargando
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