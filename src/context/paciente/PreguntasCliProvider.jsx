import { useState, useEffect, createContext } from "react";
import clientAxios from "../../config/axios";
import useAuth from "../../hooks/useAuth"
const PreguntasCliContext = createContext()

const PreguntasCliProvider = ({children})=>{

    const { auth } = useAuth()
    const [loading, setLoading] = useState(false)


    const actualizarEstadogeneral = async datos =>{
      setLoading(true)
        try {
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
        const url = `/pacientes/actualizar-estadogeneral/${datos._id}`
        const {data} = await clientAxios.put(url,datos,config)
    
        
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
    setLoading(false)
    }
    const actualizarSueño = async datos =>{
      setLoading(true)
        try {
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
     
        const url = `/pacientes/actualizar-sueno/${datos._id}`
        const {data} = await clientAxios.put(url,datos,config)
      
        
      } catch (error) {
        console.log(error)
        setLoading(false)
   
      }
      setLoading(false)

      }
      
      const actualizarSaludmental = async datos =>{
        try {
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
        const url = `/pacientes/actualizar-saludmental/${datos._id}`
        const {data} = await clientAxios.put(url,datos,config)
      
        
      } catch (error) {
        console.log(error)
      }
      }
      const actualizarAlimentacion = async datos =>{
        try {
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
        const url = `/pacientes/actualizar-alimentacion/${datos._id}`
        const {data} = await clientAxios.put(url,datos,config)
      
        
      } catch (error) {
        console.log(error)
      }
      }
      
      const actualizarAlcohol = async datos =>{
        try {
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
        const url = `/pacientes/actualizar-alcohol/${datos._id}`
        const {data} = await clientAxios.put(url,datos,config)
      
        
      } catch (error) {
        console.log(error)
      }
      }
      const actualizarDrogas = async datos =>{
        try {
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
        const url = `/pacientes/actualizar-drogas/${datos._id}`
        const {data} = await clientAxios.put(url,datos,config)
      
      } catch (error) {
        console.log(error)
      }
      }
      const actualizarActividad = async datos =>{
        setLoading(true)
        try {
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
        const url = `/pacientes/actualizar-actividadfisica/${datos._id}`
        const {data} = await clientAxios.put(url,datos,config)
      
        
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
      setLoading(false)
      }


    return(
        <PreguntasCliContext.Provider
        value={{
            auth,
            actualizarEstadogeneral,
            actualizarSueño,
            actualizarSaludmental,
            actualizarAlimentacion,
            actualizarAlcohol,
            actualizarDrogas,
            actualizarActividad,
            loading, 
            setLoading
            
        }}
        >
            {children}
        </PreguntasCliContext.Provider>
    )
}
export {
    PreguntasCliProvider
    
}

export default PreguntasCliContext