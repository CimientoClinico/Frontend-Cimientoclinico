import{createContext, useState, useEffect} from 'react'
import clientAxios from '../../config/axios'
const ProfesionalesContext = createContext()

export const ProfesionalProvider = ({children}) => {

    const [profesionales, setProfesionales] = useState([])
    const [profesional, setProfesional] = useState({})
    const [tablaUsuarios, setTablaUsuarios]= useState([]);
    const [pagina, setPagina] = useState (1);
    const [porPagina, setPorPagina] = useState (7);
    const maximo = Math.round(profesionales.length / porPagina) 



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

   useEffect(()=>{
     const obtenerProfesionales = async ()=>{

        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
              headers:{
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
            }
            const { data } = await clientAxios("/admin/modulo-profesional",config)
            setProfesionales(data)
            setTablaUsuarios(data);
         
          } catch (error) {
            console.log(error)
          }
    
     }
     obtenerProfesionales()

   },[])

    const guardarProfesional = async (profesional)=>{
      const token = localStorage.getItem('token')
      const config = {
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
      }
      if(profesional.id){
        try {
          const{data}= await clientAxios.put(`/admin/modulo-profesional/${profesional.id}`,profesional,config)
          const profesionalActualizado = profesionales.map(profesionalState => profesionalState._id ===
            data._id ? data : profesionalState )
            setProfesionales(profesionalActualizado)
            toastMixin.fire({
              title: 'Profesional Actualizado correctamente'
            });
        } catch (error) {
          console.log(error)
        }

      }else{
   
        try{
      
          const{ data }= await clientAxios.post('admin/modulo-profesional',profesional,config)
        
            const{ createdAt, updatedAt, __v, ...profesionalAlmacenado} = data
          setProfesionales ([profesionalAlmacenado, ...profesionales])
          toastMixin.fire({
            animation: true,
            title: 'Registrado correctamente. Email de confirmación enviado'
          });
          
         }
         catch(error){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Email o Rut ya registrado',
          })
     
         }
      }



    }

    const setEdicion = (profe) =>{
     setProfesional(profe)
    }


    const eliminarProfesional = async (id) => {
      const confirmar = await Swal.fire({
        title: '¿Estás seguro de eliminar el profesional?',
        text: "!No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4084f4',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarlo!'
        }).then((result) => {
        if (result.isConfirmed) {
            return true;
        } else {
            return false;
        }
    })
    if(confirmar) {
      try {
          const token = localStorage.getItem("token");
          const config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
          }
          const {data} = await clientAxios.delete(`admin/modulo-profesional/${id}`, config);
          const profesionalActualizado = profesionales.filter(profesionalesState => profesionalesState._id !== id);
          setProfesionales(profesionalActualizado);
          toastMixin.fire({
              animation: true,
              title: 'Eliminado correctamente'
            });
      } catch (error) {
          console.log(error);
      }
  }
    


    }


  return (
   <ProfesionalesContext.Provider
   value={{
    profesionales,
    guardarProfesional,
    profesional,
    setEdicion,
    eliminarProfesional,
    setProfesionales,
    tablaUsuarios,
    setTablaUsuarios,
    pagina,
    setPagina,
    porPagina,
    setPorPagina,
    maximo,


   }}
   >
    {children}

   </ProfesionalesContext.Provider> 
  )
}


export default ProfesionalesContext