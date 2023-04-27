import { useState, useEffect } from "react"
import clientAxios from "../../config/axios"
import useAuth from "../../hooks/useAuth"
import Alerta from "../Alerta"
import{AiFillEdit, AiFillDelete} from "react-icons/ai"
import{IoMdEyeOff,IoMdEye} from "react-icons/io"
import { Paginacion } from "../Paginacion"
const FormularioMotivoConsulta = () => {
    const [alerta, setAlerta ]= useState({})
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [consentimiento, setConsentimiento] = useState(false)
    const [visible, setVisible] = useState(false)
    const [id, setId] = useState(null)
    const { motivo,guardarMotivoConsulta,motivos, setMotivos, setEdicionMotivo,eliminarMotivoConsulta} =  useAuth()
    const [pagina, setPagina] = useState (1);
   const [porPagina, setPorPagina] = useState (3);
   const [isLoading, setIsLoading] = useState(true);

    
    const maximo = Math.ceil(motivos.length / porPagina) 

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
        return new Intl.DateTimeFormat('es-CL', {dateStyle: 'long'}).format(nuevaFecha) }

    useEffect(() => {
        if(motivo?.titulo){
         setTitulo(motivo.titulo)
         setDescripcion(motivo.descripcion)
         setConsentimiento(motivo.consentimiento)
         setVisible(motivo.visible)
         setId(motivo._id)
    
        }
     }, [motivo])



    useEffect(()=>{
        const obtenerMotivosConsulta = async() =>{
          try {
            const token = localStorage.getItem('token')
            if(!token) return
      
            const config={
              headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
            }
            const { data } = await clientAxios.get('/pacientes/obtener-motivodeconsultas',config)
            setMotivos(data)
            setIsLoading(false);
          } catch (error) {
            console.log(error)
          }
      
        }
        obtenerMotivosConsulta()      
      },[motivos])

      const actualizarVisible = async (id, nuevoValorVisible) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;
    
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };
    
          // Mostrar SweetAlert para confirmar la acción
          const resultado = await Swal.fire({
            title: `¿Quieres ${
              nuevoValorVisible ? 'hacer VISIBLE' : 'OCULTAR'
            } este motivo de consulta?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
          });
    
          if (resultado.isConfirmed) {
            await clientAxios.put(`/pacientes/actualizar-motivovisible/${id}`, { visible: nuevoValorVisible }, config);
            setMotivos((prevState) =>
              prevState.map((motivos) =>
                motivos._id === id ? { ...motivos, visible: nuevoValorVisible } : motivos
              )
            );
            Swal.fire('¡Listo!', 'El motivo de consulta ha sido actualizado.', 'success');
          }
        } catch (error) {
          console.error(error);
          Swal.fire('¡Ups!', 'Hubo un error al actualizar el motivo de consulta.', 'error');
        }
      };
    

            //AGREGANDO MOTIVO DE CONSULTA
            const handleSubmit = async e =>{
            e.preventDefault();
            if([titulo, descripcion].includes('')){
                setAlerta({msg: 'Hay campos vacíos', error: true})
                setTimeout(()=> setAlerta({}),4000)
                return;
            }
            if (!consentimiento) {
                setAlerta({msg: 'Acepte el consentimiento antes de publicar su caso', error: true})
                setTimeout(()=> setAlerta({}),4000)
                return;
              }
            setAlerta({})
            guardarMotivoConsulta({titulo,descripcion,visible,consentimiento,id})
            setTitulo('')
            setDescripcion('')
            setId('')
            setConsentimiento(false)
            setVisible(false)
              
            }
            const { msg } = alerta
  return (
    <>
        <div className="flex flex-row h-screen">
          
        <div className="w-1/3 bg-gray-200 p-10 shadow-lg">
        {msg && <Alerta alerta={alerta} />}
        <div className=" bg-indigo-500 rounded-t">
        <h1 className=" text-white py-5 text-xl text-center mt-8 ">Publica tu motivo de consulta</h1>
    
        </div>
  <form onSubmit={handleSubmit} className="bg-indigo-400 px-7 py-7 rounded-b ">
    
    <label className=" text-white" htmlFor="campo1">¿Cúal es tu motivo de consulta? <span className="text-red-600 text-lg">*</span></label>
    <textarea
      type="text"
      id="campo1"
      name="titulo"
      placeholder="escribe aquí tu motivo de consulta en la forma que quieras. (ej. “me duele la cabeza”, “siento mucha ansiedad”)"
      className="w-full focus:outline-none focus:text-gray-900 mb-1 border border-gray-300 rounded-md placeholder-slate-400 p-2 placeholder:text-xs "
      value={titulo}
      onChange={(e) => setTitulo(e.target.value)}
    />

    <label className="text-white" htmlFor="campo2 ">Describe tu consulta <span className="text-red-600 text-lg">*</span></label>
    <textarea
      type="text"
      id="campo2"
      name="descripcion"
      placeholder="escribe aquí los detalles que reconozcas sobre el motivo de tu consulta.
      En general, información sobre la localización (lugar donde ocurre o siente alguna molestia), la cronología (¿cuándo lo notó por primera vez? ¿qué tan frecuente? ¿cuánto dura?), la intensidad (¿qué tan fuerte es? ¿qué tan molesto es? ¿qué tanto le ha perjudicado en su día a día?) y manifestaciones asociadas es muy útil para el profesional de salud.
      Puedes editar o agregar información a esta sección cuando quieras, por si notas más detalles o algo distinto.
      "
      className="w-full focus:outline-none focus:text-gray-900 mb-1 border border-gray-300 rounded-md placeholder-slate-400 p-2 h-52 placeholder:text-xs "
      value={descripcion}
      onChange={(e) => setDescripcion(e.target.value)}
    />

    <div className="flex items-center pt-5">
      <input
        type="checkbox"
        id="campo3"
        name="consentimiento"
        className="w-4 h-4 mr-2"
        checked={consentimiento}
        onChange={(e) => {
          const checked = e.target.checked;
          setConsentimiento(checked);
        }}
      />
      <label htmlFor="campo3" className="text-sm text-white  ">
        Acepto publicar mi motivo de consulta el cual sera visto por profesionales de cimiento clínico <span className="text-red-600 text-lg">*</span>
      </label>
    </div>
    <div className="flex items-center pt-5">
      <input
        type="checkbox"
        id="campo3"
        name="visible"
        className="w-4 h-4 mr-2"
        checked={visible}
        onChange={(e) => {
          const checked = e.target.checked;
          setVisible(checked);
        }}
      />
      <label htmlFor="campo3" className="text-sm text-white  ">
        Publicar mi motivo de consulta de manera Visible{' (Esto hara que todos puedan verlo)'}
      </label>
    </div>

    <input type="submit" className="bg-indigo-600 w-full p-3 text-white
        uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-md"
        value={id ? 'Actualizar tu caso': 'Publicar tu caso'} />
  </form>
</div>

{isLoading ?
  <div className="sk-circle">
  <div className="sk-circle1 sk-child"></div>
  <div className="sk-circle2 sk-child"></div>
  <div className="sk-circle3 sk-child"></div>
  <div className="sk-circle4 sk-child"></div>
  <div className="sk-circle5 sk-child"></div>
  <div className="sk-circle6 sk-child"></div>
  <div className="sk-circle7 sk-child"></div>
  <div className="sk-circle8 sk-child"></div>
  <div className="sk-circle9 sk-child"></div>
  <div className="sk-circle10 sk-child"></div>
  <div className="sk-circle11 sk-child"></div>
  <div className="sk-circle12 sk-child"></div>
</div>
  
    : 

  <div className="w-3/4 p-10 shadow-lg">
  { motivos.length?
  <div className="flex flex-col px-10">
  <h1 className="font-nunito py-2 text-xl">Tus Motivo de consulta publicados</h1>
   <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="">

       {motivos.slice(
                (pagina - 1)* porPagina,
                (pagina - 1 ) * porPagina + porPagina
                ).map((motivo) => (

<div key={motivo._id} className="bg-white rounded-lg shadow-md w-full mb-10  ">
  <div className="p-4">
    <h2 className="text-lg font-medium text-gray-800 text-center">{motivo.titulo}</h2>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">Publicado: {formatearFecha(motivo.fecha)}</span>
    <p className="mt-2 text-lg font-semibold   text-slate-800">{motivo.descripcion}</p>
    { motivo.visible===false ? <span className="inline-block bg-red-200  rounded-full px-1 py-1 text-xs font-regular text-gray-700 mt-1">Publicación: Oculta</span>
 :  <span className="inline-block bg-green-200  rounded-full px-1 py-1 text-xs font-regular text-gray-700 mt-1">Publicación: Visible</span> }

  </div>
  <div className=" flex bg-gray-100 px-4 py-3 gap-1">
   
  <button
  onClick={() => setEdicionMotivo(motivo)}
  className="flex bg-teal-500 hover:bg-teal-700 text-white text-sm font-nunito font-semibold py-1 px-2  border border-teal-500 rounded">
  <h3>Editar</h3>
<AiFillEdit className="mt-0.5 text-lg" />
 </button>
 <button
  onClick={() => eliminarMotivoConsulta(motivo._id)}
  className="flex bg-red-500 hover:bg-red-700 text-white text-sm font-nunito font-semibold py-1 px-2 border border-red-500 rounded">
    <h3>Eliminar</h3>
  <AiFillDelete className="mt-0.5 text-lg" />
  </button>
 
  <button className=" flex rounded-md bg-indigo-400 hover:bg-indigo-700 text-white text-sm font-nunito font-semibold py-1 px-2"  onClick={() => actualizarVisible(motivo._id, !motivo.visible)}>
            {motivo.visible ?<   IoMdEyeOff title="Hacer visible" className="mt-0.5 text-lg"/>   :  <IoMdEye title="Ocultar"  className="mt-0.5 text-lg"/>  }
          </button>

  </div>
</div>

))}
<Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
      </div>
      </div>
      </div>
      </div>:<h1 className="font-semibold text-xl">Aquí se publicaran tus motivos de consultas</h1> }
  </div>
    }
</div>

    </>
  )
}

export default FormularioMotivoConsulta