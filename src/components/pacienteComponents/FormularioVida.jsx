import { useState, useEffect } from 'react'
import useAuth from "../../hooks/useAuth"
const FormularioVida = () => {
    const [ocultarseccion, SetOcultarSeccion] = useState(false)
    const [ perfilD, setPerfild ] = useState({});
    const [ perfild2, setPerfild2 ] = useState({});
    const {auth,actualizarEstilodevida} =  useAuth()

    useEffect(() => {
        setPerfild(auth)
      
      }, [])
      useEffect(() => {
        setPerfild2(auth)
      
      }, [])
    const handleSubmit = async e =>{
        e.preventDefault()
        await  actualizarEstilodevida(perfilD)
        SetOcultarSeccion(true)
        
       }
       const SiFumador= async e =>{
        e.preventDefault()
        await  actualizarEstilodevida(perfild2)
        
       }
  return (
    <>
<div >




    { auth.historiaclinica?.fumador==='Sin datos'
    ?
<div className="card   rounded-xl flex flex-col ml-10 bg-[#d5d5d5] ">
<div className="title text-md font-regular font-nunito">Usted es fumador?</div>
<div className="w-full ">

  <form onSubmit={handleSubmit} >
<div className="inline-block mr-2 mt-2">
      <div className="flex">
      <div>
        <input type="radio" name="fumador" id="sifuma" className="peer hidden border border-gray-200" value='Si'
              onChange={ e => setPerfild({
               ...perfilD,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="sifuma"
className="flex font-nunito text-white justify-center bg-red-500 cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse  peer-checked:font-bold peer-checked:text-white"
>
🚬
Si fumo</label>
</div>
        
</div>          
</div>
<div className="inline-block mr-2 mt-2">
<div className="flex">
<div>
<input type="radio" name="fumador" id="nofuma" className="peer  hidden border border-gray-200" value='No'
              onChange={ e => setPerfild({
               ...perfilD,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="nofuma"
className="flex font-nunito bg-green-500 text-white justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse peer-checked:font-bold peer-checked:text-white">
🚭
No fumo </label>
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
      <h1 className='px-1 mt-1  font-nunito'> { auth.historiaclinica?.fumador==='Si' ? 'El paciente si es fumador 🚬':' El paciente no es fumador 🚭'} </h1>    
      </div>
    <form onSubmit={SiFumador}  >
<input type="radio" name="fumador" className="peer hidden " value='Sin datos' checked
              onChange={ e => setPerfild2({
               ...perfild2,
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

export default FormularioVida