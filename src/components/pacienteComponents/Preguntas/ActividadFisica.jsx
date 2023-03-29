import { useState, useEffect } from 'react'
import usePreguntasCli from '../../../hooks/paciente/usePreguntasCli';
const ActividadFisica = () => {
    const [ocultarseccion, SetOcultarSeccion] = useState(false)
    const [ perfilact, setPerfilact ] = useState({});
    const [ perfil2, setPerfil2 ] = useState({});
    const {auth,actualizarActividad} =  usePreguntasCli()
    


    useEffect(() => {
      setPerfilact(auth)
      
      }, [])
      useEffect(() => {
        setPerfil2(auth)
      
      }, [])
    const handleSubmit = async e =>{
        e.preventDefault()
        await  actualizarActividad(perfilact)
        SetOcultarSeccion(true)
        
       }
       const SiActividadFisica= async e =>{
        e.preventDefault()
        await  actualizarActividad(perfil2)
       }
  return (
    <>
<div >



    { auth.historiaclinica?.actividadfisica==='Sin datos'
    ?
<div className="card   rounded-xl flex flex-col ml-10 bg-[#d5d5d5] ">
  
<div className="title text-md font-regular font-nunito">Usted realiza actividad física?</div>
<div className="w-full ">

  <form onSubmit={handleSubmit} >
<div className="inline-block mr-2 mt-2">
      <div className="flex">
      <div>
        <input type="radio" name="actividadfisica" id="siactividadfisica" className="peer hidden border border-gray-200" value='Si'
              onChange={ e => setPerfilact({
               ...perfilact,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="siactividadfisica"
className="flex font-nunito text-white justify-center bg-red-500 cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse  peer-checked:font-bold peer-checked:text-white"
>
🚴‍♀️
Si realizo actividad física </label>
</div>
        
</div>          
</div>
<div className="inline-block mr-2 mt-2">
<div className="flex">
<div>
<input type="radio" name="actividadfisica" id="noactividadfisica" className="peer  hidden border border-gray-200" value='No'
              onChange={ e => setPerfilact({
               ...perfilact,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="noactividadfisica"
className="flex font-nunito bg-green-500 text-white justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse peer-checked:font-bold peer-checked:text-white">
😴
No realizo actividad física </label>
</div>
        
</div>
      
</div>

<button className="  bg-[#96858f] hover:bg-indigo-400 px-2 py-2 text-white rounded-md text-rigth ml-10 font-nunito ">Guardar💾</button>
</form>


</div>
</div>



    :
    <div>
    
    <div className='  md:flex  lg:gap-24 xs:gap-0 '>
      <div className='md:w-4/6 ml-4 md:mb-0 border  border-gray-200 rounded-md'>
      <h1 className='px-1 mt-1  font-nunito'> { auth.historiaclinica?.actividadfisica==='Si' ? 'El paciente si realiza actividad fisica 🚴‍♀️':' El paciente no realiza actividad fisica 😴'} </h1>    
      </div>
    <form onSubmit={SiActividadFisica}  >
<input type="radio" name="actividadfisica" className="peer hidden " value='Sin datos' checked
              onChange={ e => setPerfil2({
               ...perfil2,
               [e.target.name] : e.target.value
             })} />
     
     <div className='md:w-6/6 '>
          <button  title="Actualizar" className="  bg-[#96858f] px-2 py-2 text-white rounded-md text-rigth  font-nunito  hover:bg-indigo-400 ">Cambiar🔄</button>
          </div>

  </form>
    </div>
  


          </div>
 

    
    }


          </div>
        </>
  )
}

export default ActividadFisica