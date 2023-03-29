import React from 'react'
import { useState, useEffect } from 'react'
import useHistoriaCli from "../../hooks/paciente/useHistoriaCli"
const FormularioGinecoobstetrico = () => {

    const {auth, actualizarGinecoobstetricos} =   useHistoriaCli()
    const [ perfil, setPerfil ] = useState({});
    const [ocultarseccion, SetOcultarSeccion] = useState(true)
const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha)
  nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
  return new Intl.DateTimeFormat('es-CL', {dateStyle: 'long'}).format(nuevaFecha) }

  useEffect(() => {
    setPerfil(auth)
  
}, [])


const handleSubmit = async e =>{
    e.preventDefault()
    await actualizarGinecoobstetricos(perfil)
    return
    
   }

  return (
    <>
<div className="text-right mr-5">
        <button  className="p-1 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-white hover:text-white bg-[#6d7993]  hover:bg-indigo-500 "
            onClick={()=> SetOcultarSeccion(!ocultarseccion)}>
                  <span className="text-xs  font-regular  lg:block">{ocultarseccion ? 
                  <div className="flex gap-2">
                     🔽    
                  </div>
                  :
                  <div className="flex gap-2">
                   <h2 className="text-white  font-nunito text-md" >Antecedentes ginecoobstétricos</h2>
                   ▶️                     </div>
                  } </span>                     
            </button>   
</div>
<form onSubmit={handleSubmit} className=  {`${ocultarseccion?'block':'hidden'} xs:block grid grid-cols-10`} >
  <div class=" ml-6 col-span-7"> 
  <label className="text-gray-700 font-bold text-md ">Antecedentes ginecoobstétricos</label>
  
<div className=" mt-1 ">
      <textarea
           name='nginecoobstetrico'
            className="w-11/12 focus:outline-none focus:text-gray-900 mb-1 border border-gray-300 rounded-md placeholder-slate-400 p-2.5 h-32 resize-y "
            placeholder="Agrega tus antecedentes ginecoobstétricos"
            value={perfil.nginecoobstetrico || ''}
            onChange={ e => setPerfil({
              ...perfil,
              [e.target.name] : e.target.value
            })}
          />
</div>

  </div>
  <div class="col-span-3 flex justify-center items-center">
  <button className="text-white w-2/2 mx-auto max-w-sm rounded-md text-center bg-indigo-400 hover:bg-indigo-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right">
    Actualizar🔄
  </button>
</div>

</form>


    </>
  )
}

export default FormularioGinecoobstetrico