import { useState, useEffect } from 'react'
import usePreguntasCli from '../../../hooks/paciente/usePreguntasCli';
const Alimentacion = () => {
  const [ocultarseccion, SetOcultarSeccion] = useState(false)
  const [ perfil, setPerfil ] = useState({});
  const [ perfil2, setPerfil2 ] = useState({});
  const {auth,actualizarAlimentacion } =  usePreguntasCli()

  useEffect(() => {
    setPerfil(auth)
  
  }, [])
  useEffect(() => {
    setPerfil2(auth)
  
  }, [])

const handleSubmit = async e =>{
    e.preventDefault()
    await  actualizarAlimentacion (perfil)
    SetOcultarSeccion(true)
    
   }
   const estadovacio= async e =>{
    e.preventDefault()
    await  actualizarAlimentacion(perfil2)
    
   }

  return (
    <>
      { auth.historiaclinica?.alimentacion==='Sin datos'
    ? 
    <div className="card   rounded-xl flex flex-col ml-10 bg-[#d5d5d5] ">
    <div className="title text-md font-regular font-nunito">Según la siguiente escala, ¿qué tan conforme estás con la calidad del alimentacion?</div>
    <div className="w-full ">

      <form onSubmit={handleSubmit}>
    <div className="inline-block mr-2 mt-2">
          <div className="flex">
          <div>
<input type="radio" name="alimentacion" id="a1" className="peer hidden" value='1' onChange={ e => setPerfil({
               ...perfil,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="a1"
className="flex font-nunito text-white justify-center bg-red-700 cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse  peer-checked:font-bold peer-checked:text-white"
>
  😡
  1 </label>
</div>
            
</div>          
</div>
<div className="inline-block mr-2 mt-2">
<div className="flex">
<div>
<input type="radio" name="alimentacion" id="a2" className="peer hidden"   value='2'
onChange={ e => setPerfil({
               ...perfil,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="a2"
className="flex font-nunito bg-red-600 text-white justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse peer-checked:font-bold peer-checked:text-white">
 🤢
  2 </label>
</div>
            
</div>
          
  </div>

  <div className="inline-block mr-2 mt-2">
<div className="flex">
<div>
<input type="radio" name="alimentacion" id="a3" className="peer hidden"   value='3'onChange={ e => setPerfil({
               ...perfil,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="a3"
className="flex font-nunito bg-red-500 text-white justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse peer-checked:font-bold peer-checked:text-white">
  🤒
 
  3</label>
</div>
            
</div>
          
  </div>

  <div className="inline-block mr-2 mt-2">
<div className="flex">
<div>
<input type="radio" name="alimentacion" id="a4" className="peer hidden"   value='4' onChange={ e => setPerfil({
               ...perfil,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="a4"
className="flex font-nunito bg-orange-500 text-white justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500  peer-checked:animate-pulse peer-checked:font-bold peer-checked:text-white">
 🤧
  4 </label>
</div>
            
</div>
          
  </div>

  <div className="inline-block mr-2 mt-2">
<div className="flex">
<div>
<input type="radio" name="alimentacion" id="a5" className="peer hidden"   value='5'onChange={ e => setPerfil({
               ...perfil,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="a5"
className="flex font-nunito bg-orange-400 text-white justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500  peer-checked:animate-pulse peer-checked:font-bold peer-checked:text-white">
 😐
  5 </label>
</div>
            
</div>
          
  </div>

  <div className="inline-block mr-2 mt-2">
<div className="flex">
<div>
<input type="radio" name="alimentacion" id="a6" className="peer hidden"   value='6' onChange={ e => setPerfil({
               ...perfil,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="a6"
className="flex font-nunito bg-yellow-400 text-white justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse peer-checked:font-bold peer-checked:text-white">
  🤨
  6 </label>
</div>
            
</div>
          
  </div>
  <div className="inline-block mr-2 mt-2">
<div className="flex">
<div>
<input type="radio" name="alimentacion" id="a7" className="peer hidden"   value='7'onChange={ e => setPerfil({
               ...perfil,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="a7"
className="flex font-nunito bg-yellow-300 text-white justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse peer-checked:font-bold peer-checked:text-white">
  🙂
  7</label>
</div>
            
</div>
          
  </div>
  <div className="inline-block mr-2 mt-2">
<div className="flex">
<div>
<input type="radio" name="alimentacion" id="a8" className="peer hidden"   value='8'onChange={ e => setPerfil({
               ...perfil,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="a8"
className="flex font-nunito bg-green-400 text-white justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse peer-checked:font-bold peer-checked:text-white">
  😉
  8 </label>
</div>
            
</div>
          
  </div>
  <div className="inline-block mr-2 mt-2">
<div className="flex">
<div>
<input type="radio" name="alimentacion" id="a9" className="peer hidden"   value='9'onChange={ e => setPerfil({
               ...perfil,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="a9"
className="flex font-nunito bg-green-500 text-white justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse peer-checked:font-bold peer-checked:text-white">
 😀
  9 </label>
</div>
            
</div>
          
  </div>
  <div className="inline-block mr-2 mt-2">
<div className="flex">
<div>
<input type="radio" name="alimentacion" id="a10" className="peer hidden"  value='10' onChange={ e => setPerfil({
               ...perfil,
               [e.target.name] : e.target.value
             })} />
<label
htmlFor="a10"
className="flex font-nunito bg-green-600 text-white justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-indigo-500 peer-checked:animate-pulse peer-checked:font-bold peer-checked:text-white">
  😄
  10 </label>
</div>
            
</div>
          
  </div>
  <button className="  bg-[#96858f] px-2 py-2 text-white rounded-md text-rigth ml-10 font-nunito  hover:bg-indigo-400 ">Guardar💾</button>
  </form>


    </div>
    </div>
    : 
    <div>
         <div className='  md:flex  lg:gap-2 xs:gap-0 '>
      <div className='md:w-5/6 ml-4 md:mb-0 border text-sm border-gray-200 rounded-md'>
      <div className='px-1 mt-1 font-nunito'>    { auth.historiaclinica?.alimentacion==='1' ? 
      
      <h1> Su calidad de alimentación en las últimas semanas ha sido:  <span className='text-red-600 font-bold'>Crítica 😡</span> </h1>
      :''} </div>
       <div className='px-1 mt-1 text-md  font-nunito'>    { auth.historiaclinica?.alimentacion==='2' ? 
      <h1> Su calidad de alimentación en las últimas semanas ha sido:  <span className='text-red-500 font-bold'>Muy negativa🤢</span> </h1>
      :''} </div> 
       <div className='px-1 mt-1  font-nunito'>    { auth.historiaclinica?.alimentacion==='3' ? 
       <h1> Su calidad de alimentación en las últimas semanas ha sido:  <span className='text-red-400 font-bold'>Negativa 🤒</span> </h1>
      
      :''} </div> 
       <div className='px-1 mt-1  font-nunito'>    { auth.historiaclinica?.alimentacion==='4' ? 
      <h1> Su calidad de alimentación en las últimas semanas ha sido:  <span className='text-orange-600 font-bold'>Mala  🤧</span> </h1>

      :''} </div> 
       <div className='px-1 mt-1  font-nunito'>    { auth.historiaclinica?.alimentacion==='5' ? 
       <h1> Su calidad de alimentación en las últimas semanas ha sido:  <span className='text-orange-500 font-bold'>Baja 😐</span> </h1>
      
      :''} </div> 
       <div className='px-1 mt-1  font-nunito'>    { auth.historiaclinica?.alimentacion==='6' ? 
        <h1> Su calidad de alimentación en las últimas semanas ha sido:  <span className='text-yellow-600 font-bold'>Regular 🤨</span> </h1>
      
      :''} </div>
       <div className='px-1 mt-1  font-nunito'>    { auth.historiaclinica?.alimentacion==='7' ? 
      <h1> Su calidad de alimentación en las últimas semanas ha sido:  <span className='text-yellow-500 font-bold'>Buena 🙂</span> </h1>
      :''} </div>   
       <div className='px-1 mt-1  font-nunito'>    { auth.historiaclinica?.alimentacion==='8' ? 
      <h1> Su calidad de alimentación en las últimas semanas ha sido:  <span className='text-green-500 font-bold'>Positiva 😉</span> </h1>
      :''} </div>   
       <div className='px-1 mt-1  font-nunito'>    { auth.historiaclinica?.alimentacion==='9' ? 
      <h1> Su calidad de alimentación en las últimas semanas ha sido:  <span className='text-green-600 font-bold'>Muy positiva😀</span> </h1>
      :''} </div>   
       <div className='px-1 mt-1  font-nunito'>    { auth.historiaclinica?.alimentacion==='10' ? 
       <h1> Su calidad de alimentación en las últimas semanas ha sido:  <span className='text-green-700 font-bold'>Extremadamente positiva 😄</span> </h1>
      :''} </div>        
      </div>
    <form onSubmit={estadovacio}  >
<input type="radio" name="alimentacion" className="peer hidden " value='Sin datos' checked
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
  

    </>
  )
}

export default Alimentacion