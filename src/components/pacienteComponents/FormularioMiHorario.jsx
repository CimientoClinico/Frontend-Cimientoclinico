import { useState, useEffect } from 'react'
import useAuth from "../../hooks/useAuth"


const FormularioMiHorario = () => {
  const [perfil, setPerfil] = useState({});
  const { auth, actualizarHorario } = useAuth()

  useEffect(() => {
    setPerfil(auth)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
 
    await actualizarHorario(perfil)
  }



  return (
    <>
      <h1 className='text-lg font-semibold'>Registra tus horarios</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-8 sm:grid-cols-4 lg:grid-cols-8 mr-20 gap-0 ">
        <div className='col-span-4 xs:col-span-2 lg:col-span-1 border-t border-b border-l border-gray-700 '>
  <div className='border-b border-gray-600'> 
    <h1 className='font-nunito'>Lunes</h1>
  </div>
  <div className=" mt-3">
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="lunes"
        id="lunes"
        className="form-switch absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        checked={perfil.lunes || false}
        onChange={ e => setPerfil({
          ...perfil,
          [e.target.name] : e.target.checked
        })} />
      <label
        htmlFor="lunes"
        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer 
        ${perfil.lunes ? 'bg-green-500' : 'bg-red-500 '} transition-all duration-200`}
      ></label>
    </div>
    <label htmlFor="lunes" className="text-gray-700 font-medium mr-2">{perfil.lunes ? 
      "Sí puedo" : "No puedo"}
    </label>
    {perfil.lunes && (
      <div className="mt-2 ">
        <label htmlFor="lunesinicio" className="text-gray-700 font-medium block mb-1">Desde:</label>
        <input type="time" id="lunesinicio" name="lunesinicio" 
        
         value={perfil.lunesinicio || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />
         

<label htmlFor="lunesfin" className="text-gray-700 font-medium block mb-1">Hasta:</label>
        <input type="time" id="lunesfin" name="lunesfin" 
         value={perfil.lunesfin || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />
      </div>
      
    )}
  </div>
</div>

<div className='col-span-4 xs:col-span-2 lg:col-span-1 border border-gray-700 '>
  <div className='border-b border-gray-600'> 
    <h1 className='font-nunito'>Martes</h1>
  </div>
  <div className=" mt-3">
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="martes"
        id="martes"
        className="form-switch absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        checked={perfil.martes || false}
        onChange={ e => setPerfil({
          ...perfil,
          [e.target.name] : e.target.checked
        })} />
      <label
        htmlFor="martes"
        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer 
        ${perfil.martes ? 'bg-green-500' : 'bg-red-500 '} transition-all duration-200`}
      ></label>
    </div>
    <label htmlFor="martes" className="text-gray-700 font-medium mr-2">{perfil.martes ? 
      "Sí puedo" : "No puedo"}
    </label>
    {perfil.martes && (
      <div className="mt-2 ">
        <label htmlFor="martesinicio" className="text-gray-700 font-medium block mb-1">Desde:</label>
        <input type="time" id="martesinicio" name="martesinicio" 
         value={perfil.martesinicio || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />

<label htmlFor="martesfin" className="text-gray-700 font-medium block mb-1">Hasta:</label>
        <input type="time" id="lunesfin" name="martesfin" 
         value={perfil.martesfin || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />
      </div>
      
    )}
  </div>
</div>


<div className='col-span-4 xs:col-span-2 lg:col-span-1 border-t border-b border-l border-gray-700 '>
  <div className='border-b border-gray-600'> 
    <h1 className='font-nunito'>Miercoles</h1>
  </div>
  <div className=" mt-3">
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="miercoles"
        id="miercoles"
        className="form-switch absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        checked={perfil.miercoles || false}
        onChange={ e => setPerfil({
          ...perfil,
          [e.target.name] : e.target.checked
        })} />
      <label
        htmlFor="miercoles"
        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer 
        ${perfil.miercoles ? 'bg-green-500' : 'bg-red-500 '} transition-all duration-200`}
      ></label>
    </div>
    <label htmlFor="miercoles" className="text-gray-700 font-medium mr-2">{perfil.miercoles ? 
      "Sí puedo" : "No puedo"}
    </label>
    {perfil.miercoles && (
      <div className="mt-2 ">
        <label htmlFor="miercolesinicio" className="text-gray-700 font-medium block mb-1">Desde:</label>
        <input type="time" id="miercolesinicio" name="miercolesinicio" 
         value={perfil.miercolesinicio || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />

<label htmlFor="miercolesfin" className="text-gray-700 font-medium block mb-1">Hasta:</label>
        <input type="time" id="lunesfin" name="miercolesfin" 
         value={perfil.miercolesfin || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />
      </div>
      
    )}
  </div>
</div>



<div className='col-span-4 xs:col-span-2 lg:col-span-1 border border-gray-700 '>
  <div className='border-b border-gray-600'> 
    <h1 className='font-nunito'>Jueves</h1>
  </div>
  <div className=" mt-3">
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="jueves"
        id="jueves"
        className="form-switch absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        checked={perfil.jueves || false}
        onChange={ e => setPerfil({
          ...perfil,
          [e.target.name] : e.target.checked
        })} />
      <label
        htmlFor="jueves"
        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer 
        ${perfil.jueves ? 'bg-green-500' : 'bg-red-500 '} transition-all duration-200`}
      ></label>
    </div>
    <label htmlFor="jueves" className="text-gray-700 font-medium mr-2">{perfil.jueves ? 
      "Sí puedo" : "No puedo"}
    </label>
    {perfil.jueves && (
      <div className="mt-2 ">
        <label htmlFor="juevesinicio" className="text-gray-700 font-medium block mb-1">Desde:</label>
        <input type="time" id="juevesinicio" name="juevesinicio" 
         value={perfil.juevesinicio || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />

<label htmlFor="juevesfin" className="text-gray-700 font-medium block mb-1">Hasta:</label>
        <input type="time" id="lunesfin" name="juevesfin" 
         value={perfil.juevesfin || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />
      </div>
      
    )}
  </div>
</div>



<div className='col-span-4 xs:col-span-2 lg:col-span-1 border-t border-b border-l border-gray-700 '>
  <div className='border-b border-gray-600'> 
    <h1 className='font-nunito'>Viernes</h1>
  </div>
  <div className=" mt-3">
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="viernes"
        id="viernes"
        className="form-switch absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        checked={perfil.viernes || false}
        onChange={ e => setPerfil({
          ...perfil,
          [e.target.name] : e.target.checked
        })} />
      <label
        htmlFor="viernes"
        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer 
        ${perfil.viernes ? 'bg-green-500' : 'bg-red-500 '} transition-all duration-200`}
      ></label>
    </div>
    <label htmlFor="viernes" className="text-gray-700 font-medium mr-2">{perfil.viernes ? 
      "Sí puedo" : "No puedo"}
    </label>
    {perfil.viernes && (
      <div className="mt-2 ">
        <label htmlFor="viernesinicio" className="text-gray-700 font-medium block mb-1">Desde:</label>
        <input type="time" id="viernesinicio" name="viernesinicio" 
         value={perfil.viernesinicio || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />

<label htmlFor="viernesfin" className="text-gray-700 font-medium block mb-1">Hasta:</label>
        <input type="time" id="viernesfin" name="viernesfin" 
         value={perfil.viernesfin || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />
      </div>
      
    )}
  </div>
</div>




<div className='col-span-4 xs:col-span-2 lg:col-span-1 border border-gray-700 '>
  <div className='border-b border-gray-600'> 
    <h1 className='font-nunito'>Sábado</h1>
  </div>
  <div className=" mt-3">
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="sabado"
        id="sabado"
        className="form-switch absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        checked={perfil.sabado || false}
        onChange={ e => setPerfil({
          ...perfil,
          [e.target.name] : e.target.checked
        })} />
      <label
        htmlFor="sabado"
        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer 
        ${perfil.sabado ? 'bg-green-500' : 'bg-red-500 '} transition-all duration-200`}
      ></label>
    </div>
    <label htmlFor="sabado" className="text-gray-700 font-medium mr-2">{perfil.sabado ? 
      "Sí puedo" : "No puedo"}
    </label>
    {perfil.sabado && (
      <div className="mt-2 ">
        <label htmlFor="sabadoinicio" className="text-gray-700 font-medium block mb-1">Desde:</label>
        <input type="time" id="sabadoinicio" name="sabadoinicio" 
         value={perfil.sabadoinicio || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />

<label htmlFor="sabadofin" className="text-gray-700 font-medium block mb-1">Hasta:</label>
        <input type="time" id="lunesfin" name="sabadofin" 
         value={perfil.sabadofin || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />
      </div>
      
    )}
  </div>
</div>



<div className='col-span-4 xs:col-span-2 lg:col-span-1 border border-gray-700 '>
  <div className='border-b border-gray-600'> 
    <h1 className='font-nunito'>Domingo</h1>
  </div>
  <div className=" mt-3">
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="domingo"
        id="domingo"
        className="form-switch absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        checked={perfil.domingo || false}
        onChange={ e => setPerfil({
          ...perfil,
          [e.target.name] : e.target.checked
        })} />
      <label
        htmlFor="domingo"
        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer 
        ${perfil.domingo ? 'bg-green-500' : 'bg-red-500 '} transition-all duration-200`}
      ></label>
    </div>
    <label htmlFor="domingo" className="text-gray-700 font-medium mr-2">{perfil.domingo ? 
      "Sí puedo" : "No puedo"}
    </label>
    {perfil.domingo && (
      <div className="mt-2 ">
        <label htmlFor="domingoinicio" className="text-gray-700 font-medium block mb-1">Desde:</label>
        <input type="time" id="domingoinicio" name="domingoinicio" 
         value={perfil.domingoinicio || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />

<label htmlFor="domingofin" className="text-gray-700 font-medium block mb-1">Hasta:</label>
        <input type="time" id="lunesfin" name="domingofin" 
         value={perfil.domingofin || ''}
         onChange={ e => setPerfil({
           ...perfil,
           [e.target.name] : e.target.value
         })}
         />
      </div>
      
    )}
  </div>
</div>




          <div className='col-span-4 sm:col-span-2 lg:col-span-1 ml-2 mt-10 border-gray-700 '>
          <input type="submit" value="Guardar Horario" className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-regular text-md rounded cursor-pointer" />
          </div>
        </div>
 
      </form>

    </>
  )
}

export default FormularioMiHorario;

