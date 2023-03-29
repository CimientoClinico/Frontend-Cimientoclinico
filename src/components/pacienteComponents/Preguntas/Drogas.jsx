import { useState, useEffect } from 'react'
import usePreguntasCli from '../../../hooks/paciente/usePreguntasCli';
const Drogas = () => {
    const [ocultarseccion, SetOcultarSeccion] = useState(false)
    const [ perfil, setPerfil ] = useState({});
    const [ perfil2, setPerfil2 ] = useState({});
    const {auth,actualizarDrogas} =  usePreguntasCli()


    useEffect(() => {
        setPerfil(auth)
      
      }, [])
      useEffect(() => {
        setPerfil2(auth)
      
      }, [])
    const handleSubmit = async e =>{
        e.preventDefault()
        await  actualizarDrogas(perfil)
        SetOcultarSeccion(true)
        
       }
       const SiDrogas= async e =>{
        e.preventDefault()
        await  actualizarDrogas(perfil2)
        
       }
  return (
    <>
<div >




    { auth.historiaclinica?.drogas==='Sin datos'
    ?
<div className="card   rounded-xl flex flex-col ml-10 bg-[#d5d5d5] ">
<div className="title text-md font-regular font-nunito">Usted consume drogas?</div>
<div className="w-full ">

  <form onSubmit={handleSubmit} >
<div className="inline-block mr-2 mt-2">
      <div className="flex">
      <div>
        <input type="radio" name="drogas" id="sidrogas" className="peer hidden border border-gray-200" value='Si'
              onChange={ e => setPerfil({
               ...perfil,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="sidrogas"
className="flex font-nunito text-white justify-center bg-red-500 cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse  peer-checked:font-bold peer-checked:text-white"
>
💊
Si Consumo drogas</label>
</div>
        
</div>          
</div>
<div className="inline-block mr-2 mt-2">
<div className="flex">
<div>
<input type="radio" name="drogas" id="nodrogas" className="peer  hidden border border-gray-200" value='No'
              onChange={ e => setPerfil({
               ...perfil,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="nodrogas"
className="flex font-nunito bg-green-500 text-white justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse peer-checked:font-bold peer-checked:text-white">
🚫
No consumo Drogas </label>
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
      <h1 className='px-1 mt-1  font-nunito'> { auth.historiaclinica?.drogas==='Si' ? 'El paciente si consume drogas 💊':' El paciente no consume drogas 🚫'} </h1>    
      </div>
    <form onSubmit={SiDrogas}  >
<input type="radio" name="drogas" className="peer hidden " value='Sin datos' checked
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

export default Drogas