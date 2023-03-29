import { useState, createContext } from "react";
import clientAxios from "../../config/axios";
import useAuth from "../../hooks/useAuth"
const HistoriaCliContext = createContext()

const HistoriaCliProvider = ({children})=>{
    const [quirurgicos, setQuirurgicos] = useState([])
    const [quirurgico, setQuirurgico] = useState({})
    const [farmacos, setFarmacos] = useState([])
    const [farmaco, setFarmaco] = useState({})
    const [vacunas, setVacunas] = useState([])
    const [vacuna, setVacuna] = useState({})
    const [enfermedades, setEnfermedades] = useState([])
    const [enfermedad, setEnfermedad] = useState({})
    const [alergias, setAlergias] = useState([])
    const [alergia, setAlergia] = useState({})
    const [antecedentesfamiliares, setAntecedentesfamiliares] = useState([])
    const [antecedentesfam, setAntecedentesfam] = useState({})
    const [hospitalizaciones, setHospitalizaciones] = useState([])
    const [hospitalizacion, setHospitalizacion] = useState({})
    const [urgencias, setUrgencias] = useState([])
    const [urgencia, setUrgencia] = useState({})
    const { auth } = useAuth()
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

    const cuentaConQuirurgico= async datos =>{
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
        const url = `/pacientes/tiene-quirurgico/${datos._id}`
        const {data} = await clientAxios.put(url,datos,config)
    
        
    } catch (error) {
        console.log(error)
    }
    }
    const guardarQuirurgico =  async(quirurgico) =>{
        const token = localStorage.getItem('token')
        const config = {
          headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
        }
        if(quirurgico.id){
         try {
            const{data}= await clientAxios.put(`/pacientes/actualizar-quirurgico/${quirurgico.id}`,quirurgico,config)
          
          const quirurgicosActualizados= quirurgicos.map( quirurgicoState => quirurgicoState._id===
            data._id ? data : quirurgicoState)
            setQuirurgicos(quirurgicosActualizados)
         } catch (error) {
          console.log(error)
         }
    
        }else{
          try {
         
            const{ data }= await clientAxios.post('/pacientes/agregar-quirurgico',quirurgico,config)
            const{ createdAt, updatedAt, __v, ...quirurgicoAlmacenado} = data
            setQuirurgicos ([quirurgicoAlmacenado, ...quirurgicos])
            toastMixin.fire({
                animation: true,
                title: 'Antecedentes quirúrgicos agregados',
                icon:'success'
              });
        
        } catch (error) {
          console.log(error.response.data.msg)
        }
        }
     
    }
    const cuentaConFarmaco= async datos =>{
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
        const url = `/pacientes/tiene-farmaco/${datos._id}`
        const {data} = await clientAxios.put(url,datos,config)
    
        
    } catch (error) {
        console.log(error)
    }
    }
    const guardarFarmaco =  async(farmaco) =>{
        const token = localStorage.getItem('token')
        const config = {
          headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
        }
        if(farmaco.id){
         try {
            const{data}= await clientAxios.put(`/pacientes/actualizar-farmaco/${farmaco.id}`,farmaco,config)
          
          const farmacosActualizados= farmacos.map( farmacoState => farmacoState._id===
            data._id ? data : farmacoState)
            setFarmacos(farmacosActualizados)
         } catch (error) {
          console.log(error)
         }
    
        }else{
          try {
         
            const{ data }= await clientAxios.post('/pacientes/agregar-farmaco',farmaco,config)
            const{ createdAt, updatedAt, __v, ...farmacoAlmacenado} = data
            setFarmacos ([farmacoAlmacenado, ...farmacos])
            toastMixin.fire({
                animation: true,
                title: 'Farmaco agregado',
                icon:'success'
              });
        
        } catch (error) {
          console.log(error.response.data.msg)
        }
        }
     
    }
    const cuentaConVacuna= async datos =>{
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
        const url = `/pacientes/tiene-vacuna/${datos._id}`
        const {data} = await clientAxios.put(url,datos,config)
    
        
    } catch (error) {
        console.log(error)
    }
    }
    const guardarVacuna =  async(vacuna) =>{
        const token = localStorage.getItem('token')
        const config = {
          headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
        }
        if(vacuna.id){
         try {
            const{data}= await clientAxios.put(`/pacientes/actualizar-vacuna/${vacuna.id}`,vacuna,config)
          
          const vacunasActualizados= vacunas.map( vacunaState => vacunaState._id===
            data._id ? data : vacunaState)
            setVacunas(vacunasActualizados)
         } catch (error) {
          console.log(error)
         }
    
        }else{
          try {
         
            const{ data }= await clientAxios.post('/pacientes/agregar-vacuna',vacuna,config)
            const{ createdAt, updatedAt, __v, ...vacunaAlmacenado} = data
            setVacunas ([vacunaAlmacenado, ...vacunas])
            toastMixin.fire({
                animation: true,
                title: 'Vacuna agregada',
                icon:'success'
              });
        
        } catch (error) {
          console.log(error.response.data.msg)
        }
        }
     
    }
    
  const cuentaConEnfermedad= async datos =>{
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
    const url = `/pacientes/tiene-enfermedad/${datos._id}`
    const {data} = await clientAxios.put(url,datos,config)

    
} catch (error) {
    console.log(error)
}
    }
  const guardarEnfermedad =  async(enfermedad) =>{
    const token = localStorage.getItem('token')
    const config = {
      headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
    }
    if(enfermedad.id){
     try {
        const{data}= await clientAxios.put(`/pacientes/actualizar-enfermedad/${enfermedad.id}`,enfermedad,config)
      
      const enfermedadesActualizados= enfermedades.map( enfermedadState => enfermedadState._id===
        data._id ? data : enfermedadState)
        setEnfermedades(enfermedadesActualizados)
     } catch (error) {
      console.log(error)
     }

    }else{
      try {
     
        const{ data }= await clientAxios.post('/pacientes/agregar-enfermedad',enfermedad,config)
        const{ createdAt, updatedAt, __v, ...enfermedadAlmacenado} = data
        setEnfermedades ([enfermedadAlmacenado, ...enfermedades])
        toastMixin.fire({
            animation: true,
            title: 'Enfermedad agregada',
            icon:'success'
          });
    
    } catch (error) {
      console.log(error.response.data.msg)
    }
    }
 
    }
    
  const cuentaConAlergia= async datos =>{


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

    const url = `/pacientes/tiene-alergia/${datos._id}`
    const {data} = await clientAxios.put(url,datos,config)
    
} catch (error) {
    console.log(error)
}
    }
  const guardarAlergia =  async(alergia) =>{
    const token = localStorage.getItem('token')
    const config = {
      headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
    }
    if(alergia.id){
     try {
        const{data}= await clientAxios.put(`/pacientes/actualizar-alergia/${alergia.id}`,alergia,config)
      
      const alergiasActualizados= alergias.map( alergiaState => alergiaState._id===
        data._id ? data : alergiaState)
        setAlergias(alergiasActualizados)
     } catch (error) {
      console.log(error)
     }

    }else{
      try {
     
        const{ data }= await clientAxios.post('/pacientes/agregar-alergia',alergia,config)
        const{ createdAt, updatedAt, __v, ...alergiaAlmacenado} = data
        setAlergias ([alergiaAlmacenado, ...alergias])
        toastMixin.fire({
            animation: true,
            title: 'Alergia agregada',
            icon:'success'
          });
    
    } catch (error) {
      console.log(error.response.data.msg)
    }
    }
 
   }

  const cuentaConAntecedentesfam= async datos =>{
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

    const url = `/pacientes/tiene-antecedentesfam/${datos._id}`
    const {data} = await clientAxios.put(url,datos,config)
    
} catch (error) {
    console.log(error)
}
    }
  const guardarAntecedentesfam =  async(antecedentesfam) =>{
    const token = localStorage.getItem('token')
    const config = {
      headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
    }
    if(antecedentesfam.id){
     try {
        const{data}= await clientAxios.put(`/pacientes/actualizar-antecedentesfam/${antecedentesfam.id}`,antecedentesfam,config)
      
      const antecedentesfamiliaresActualizados= antecedentesfamiliares.map( antecedentesfamState => antecedentesfamState._id===
        data._id ? data : antecedentesfamState)
        setAntecedentesfamiliares(antecedentesfamiliaresActualizados)
     } catch (error) {
      console.log(error)
     }

    }else{
      try {
     
        const{ data }= await clientAxios.post('/pacientes/agregar-antecedentesfam',antecedentesfam,config)
        const{ createdAt, updatedAt, __v, ...antecedentesfamAlmacenado} = data
        setAntecedentesfamiliares([antecedentesfamAlmacenado, ...antecedentesfamiliares])
        toastMixin.fire({
            animation: true,
            title: 'Antecedente familiar  agregado',
            icon:'success'
          });
    
    } catch (error) {
      console.log(error.response.data.msg)
    }
    }
 
   }

   const cuentaConHospitalizaciones= async datos =>{
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

    const url = `/pacientes/tiene-hospitalizacion/${datos._id}`
    const {data} = await clientAxios.put(url,datos,config)
    
} catch (error) {
    console.log(error)
}
    }

  const guardarHospitalizaciones =  async(hospitalizacion) =>{
    const token = localStorage.getItem('token')
    const config = {
      headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
    }
    if(hospitalizacion.id){
     try {
        const{data}= await clientAxios.put(`/pacientes/actualizar-hospitalizacion/${hospitalizacion.id}`,hospitalizacion,config)
      
      const hospitalizacionesActualizados= hospitalizaciones.map( hospitalizacionState => hospitalizacionState._id===
        data._id ? data : hospitalizacionState)
        setHospitalizaciones(hospitalizacionesActualizados)
     } catch (error) {
      console.log(error)
     }

    }else{
      try {
     
        const{ data }= await clientAxios.post('/pacientes/agregar-hospitalizacion',hospitalizacion,config)
        const{ createdAt, updatedAt, __v, ...hospitalizacionAlmacenado} = data
        setHospitalizaciones([hospitalizacionAlmacenado, ...hospitalizaciones])
        toastMixin.fire({
            animation: true,
            title: 'Hospitalizacion agregada',
            icon:'success'
          });
    
    } catch (error) {
      console.log(error.response.data.msg)
    }
    }
 
   }

   const cuentaConUrgencias= async datos =>{
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

    const url = `/pacientes/tiene-urgencia/${datos._id}`
    const {data} = await clientAxios.put(url,datos,config)
    
} catch (error) {
    console.log(error)
}
    }

  const guardarUrgencias =  async(urgencia) =>{
    const token = localStorage.getItem('token')
    const config = {
      headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
    }
    if(urgencia.id){
     try {
        const{data}= await clientAxios.put(`/pacientes/actualizar-urgencia/${urgencia.id}`,urgencia,config)
      
      const urgenciasActualizados= urgencias.map( urgenciaState => urgenciaState._id===
        data._id ? data : urgenciaState)
        setUrgencias(urgenciasActualizados)
     } catch (error) {
      console.log(error)
     }

    }else{
      try {
     
        const{ data }= await clientAxios.post('/pacientes/agregar-urgencia',urgencia,config)
        const{ createdAt, updatedAt, __v, ...urgenciaAlmacenado} = data
        setUrgencias([urgenciaAlmacenado, ...urgencias])
        toastMixin.fire({
            animation: true,
            title: 'Atención en urgencia agregada',
            icon:'success'
          });
    
    } catch (error) {
      console.log(error.response.data.msg)
    }
    }
 
   }

   const actualizarIdentificacion= async datos =>{
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

    const url = `/pacientes/actualizar-identificacion/${datos._id}`
    const {data} = await clientAxios.put(url,datos,config)
    toastMixin.fire({
      animation: true,
      title: 'Información actualizada',
      icon:'success'
    });
    
} catch (error) {
    console.log(error)
}
    }

    const actualizarGinecoobstetricos= async datos =>{
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
  
      const url = `/pacientes/actualizar-ginecoobstetrico/${datos._id}`
      const {data} = await clientAxios.put(url,datos,config)
      toastMixin.fire({
        animation: true,
        title: 'Información actualizada',
        icon:'success'
      });
      
  } catch (error) {
      console.log(error)
  }
      }   
    return(
        <HistoriaCliContext.Provider
        value={{
            auth,
            guardarQuirurgico,
            cuentaConQuirurgico,
            quirurgico,
            setQuirurgico,
            quirurgicos,
            setQuirurgicos,
            cuentaConFarmaco,
            guardarFarmaco,
            farmaco,
            setFarmaco,
            farmacos,
            setFarmacos,
            setVacunas,
            guardarVacuna,
            vacuna,
            setVacuna,
            vacunas,
            cuentaConVacuna,
            guardarEnfermedad,
            enfermedad,
            setEnfermedad,
            enfermedades,
            setEnfermedades,
            cuentaConEnfermedad,
            guardarAlergia,
            alergia,
            setAlergia,
            alergias,
            setAlergias,
            cuentaConAlergia,
            cuentaConAntecedentesfam,
            guardarAntecedentesfam,
            antecedentesfam,
            antecedentesfamiliares,
            setAntecedentesfam,
            setAntecedentesfamiliares,
            guardarHospitalizaciones,
            cuentaConHospitalizaciones,
            hospitalizacion,
            hospitalizaciones,
            setHospitalizacion,
            setHospitalizaciones,
            guardarUrgencias,
            cuentaConUrgencias,
            urgencias,
            urgencia,
            setUrgencia,
            setUrgencias,
            actualizarIdentificacion,
            actualizarGinecoobstetricos
        }}
        >
            {children}
        </HistoriaCliContext.Provider>
    )
}
export {
    HistoriaCliProvider
    
}

export default HistoriaCliContext