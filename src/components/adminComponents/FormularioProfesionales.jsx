import { useState, useEffect } from "react"
import Alerta from '../../components/AlertaModal';
import useProfesionales from "../../hooks/admin/useProfesionales";
import Modal from "../../components/Modal"
import { Paginacion } from "../Paginacion";
const FormularioProfesionales = () => {
    const [email, setEmail] = useState('')
    const [rut, setRut] = useState('')
    const [nombres, setNombres] = useState('')
    const [especialidad, setEspecialidad] = useState(''); 
    const [apellidos, setApellidos] = useState('')
    const [password, setPassword] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [sexo, setSexo] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta ]= useState({})
    const [id, setId] = useState(null)
    const [showModalGuardar, setShowModalGuardar]= useState(false)
    const [showModalEditar, setShowModalEditar]= useState(false)
    const[busqueda, setBusqueda]= useState('')

   
    const {guardarProfesional, profesional} = useProfesionales()
    const {setEdicion, eliminarProfesional,setProfesionales, tablaUsuarios, pagina, setPagina, porPagina, maximo } =  useProfesionales()
    
    const {profesionales} = useProfesionales()
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
        return new Intl.DateTimeFormat('es-CL', {dateStyle: 'long'}).format(nuevaFecha) }
  
    useEffect(() => {
       if(profesional?.nombres){
        setRut(profesional.rut)
        setEmail(profesional.email)
        setNombres(profesional.nombres)
        setApellidos(profesional.apellidos)
        setEspecialidad(profesional.especialidad)
        setTelefono(profesional.telefono)
        setSexo(profesional.sexo)
        setFechaNacimiento(new Date(profesional.fechaNacimiento).toISOString().split('T')[0]);
        setId(profesional._id)

       }
    }, [profesional])
    

    //AGREGANDO PROFESIONAL
    const handleSubmit = async e =>{
        e.preventDefault();
        if([email,rut,nombres,apellidos,password,repetirPassword,especialidad].includes('')){
          setAlerta({msg: 'Hay campos vac??os', error: true})
          return;
        }
    
        if(password !== repetirPassword){
          setAlerta({msg: 'Las contrase??as deben ser iguales', error: true})
          return;
        }
        if(rut.length < 9 || rut.length > 10 ){
          setAlerta({msg: 'RUT no v??lido. Ejemplo:11111111-1', error: true})
          return;
        }
    
        if(password.length < 6 ){
          setAlerta({msg: 'La contrase??a debe tener al menos 6 caracteres', error: true})
          return;
        }
    
        setAlerta({})
        guardarProfesional({email,rut,nombres,apellidos,password,especialidad})
      

       }
    //EDITANDO PROFESIONAL
    const Editar = async e =>{
      e.preventDefault();
      if([email,rut,nombres].includes('')){
        setAlerta({msg: 'Email, rut y nombres no pueden estar vac??os', error: true})
        return;
      }

      
      guardarProfesional({email,rut,nombres,apellidos,sexo,fechaNacimiento,especialidad,telefono,id})
      if(guardarProfesional){

      }
      setEmail('')
      setRut('')
      setNombres('')
      setApellidos('')
      setSexo('')
      setFechaNacimiento('')
      setEspecialidad('')
      setTelefono('')
      setId('')

     }

       const { msg } = alerta
       const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
      }

      const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
          if(elemento.nombres.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          || elemento.rut.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          || elemento.apellidos.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ||elemento.email.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ||elemento.especialidad.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ){
            return elemento;
          }
        });
        setProfesionales(resultadosBusqueda);
      }

  return (
    <>
    <h1 id="textologo" className="font-bold font-nunito text-center text-2xl ">Cimiento Cl??nico</h1>
<h3 className="font-semibold font-nunito text-center text-mb mb-2">Mantenedor de profesionales</h3>
<div class="flex w-full items-center justify-between border-b pb-3">
      <button onClick={()=> setShowModalGuardar(true)} className=" bg-blue-500 text-sm text-white hover:bg-blue-600 font-bold uppercase  px-2 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
Agregar Profesional
</button>	
      <div class="flex items-center space-x-8">
      <div class="pt-2 relative mx-auto text-gray-600">
        <input class=" text-black px-2  font-semibold  text-sm py-3 rounded-md shadow-md hover:shadow-lg  focus:outline-none mr-1 mb-1  transition-all duration-150"
          value={busqueda}
          placeholder="Buscar Profesional"
          onChange={handleChange}/>

      </div>
      </div>
    </div>





<div className="p-1 xs:p-0 mx-auto md:w-full md:max-w-sm ">

<div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
 
   <Modal isVisible={showModalGuardar} onClose={()=> setShowModalGuardar(false)}  >
   <h3 className="font-semibold font-nunito text-center text-mb mb-2">Registro de profesionales</h3>
   {msg && <Alerta 
              alerta={alerta}
              />}
  <form  className="px-10 py-2 shadow-lg" onSubmit={handleSubmit} >
    <label htmlFor="email" className="font-semibold text-sm text-gray-700 pb-0 block" >Correo Electr??nico</label>
    <input 
    id="email"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Ingresar Correo electr??nico"
    type="email" 
    value={email}
    onChange={e => setEmail(e.target.value) }
    />

     <label htmlFor="nombres" className="font-semibold text-sm text-gray-600 pb-1 block" >Nombres</label>
    <input 
    id="nombres"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Ingresa ambos nombres"
    value={nombres}
    onChange={e => setNombres(e.target.value) } 

    />
     <label htmlFor="apellidos" className="font-semibold text-sm text-gray-600 pb-1 block" >Apellidos</label>
    <input 
    id="apellidos"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Ingresa ambos apellidos" 
    value={apellidos}
    onChange={e => setApellidos(e.target.value) }


    />
     <label htmlFor="rut" className="font-semibold text-sm text-gray-600 pb-1 block" >Rut</label>
    <input 
    id="rut"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="RUT.Ejemplo:11111111-1" 
    value={rut}
    onChange={e => setRut(e.target.value) }


    />
      <label htmlFor="especialidad" className="font-semibold text-sm text-gray-600 pb-1 block" >Especialidad</label>
    <input
    id="especialidad"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Tipo de profesional" 
    value={especialidad}
    onChange={e => setEspecialidad(e.target.value) }/> 



    <label htmlFor="password" className="font-semibold text-sm text-gray-600 pb-1 block">Contrase??a</label>
    <input 
    id="password"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full"  
    placeholder="Ingresar ultimos 6 digitos del RUT"
    type="password" 
    value={password}
    onChange={e => setPassword(e.target.value) }
   

    />
      <label  htmlFor="repetirPassword" className="font-semibold text-sm text-gray-600 pb-1 block">Confirmar Contrase??a</label>
    <input 
    id="repetirPassword"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    type="password"  
    placeholder="Confirma la contrase??a" 
    value={repetirPassword}
    onChange={e => setRepetirPassword(e.target.value) }

    />
    
    <input  type="submit" className=" bg-blue-500 block w-full font-nunito py-1 rounded-xl hover:bg-blue-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2" value='Registrar profesional'/>
  </form> 
  </Modal>
  <Modal isVisible={showModalEditar} onClose={()=> setShowModalEditar(false)}  >
  <h3 className="font-semibold font-nunito text-center text-mb mb-2">Actualizaci??n de profesionales</h3>
  {msg && <Alerta 
              alerta={alerta}
              />}
  <form  className="px-10 py-2 shadow-lg" onSubmit={Editar}  >
    <label htmlFor="email" className="font-semibold text-sm text-gray-700 pb-0 block" >Correo Electr??nico</label>
    <input 
    id="email"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Ingresar Correo electr??nico"
    type="email" 
    value={email}
    onChange={e => setEmail(e.target.value) }
    />

     <label htmlFor="nombres" className="font-semibold text-sm text-gray-600 pb-1 block" >Nombres</label>
    <input 
    id="nombres"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Ingresa ambos nombres"
    value={nombres}
    onChange={e => setNombres(e.target.value) } 

    />
     <label htmlFor="apellidos" className="font-semibold text-sm text-gray-600 pb-1 block" >Apellidos</label>
    <input 
    id="apellidos"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Ingresa ambos apellidos" 
    value={apellidos}
    onChange={e => setApellidos(e.target.value) }


    />
     <label htmlFor="rut" className="font-semibold text-sm text-gray-600 pb-1 block" >Rut</label>
    <input 
    id="rut"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="RUT.Ejemplo:11111111-1" 
    value={rut}
    onChange={e => setRut(e.target.value) }


    />
      <label htmlFor="especialidad" className="font-semibold text-sm text-gray-600 pb-1 block" >Especialidad</label>
    <input
    id="especialidad"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Tipo de profesional" 
    value={especialidad}
    onChange={e => setEspecialidad(e.target.value) }/> 
        <label htmlFor="sexo" className="font-semibold text-sm text-gray-600 pb-1 block" >Genero</label>
    <select
    id="sexo"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="sexo" 
    value={sexo}
    onChange={e => setSexo(e.target.value) }> 
    <option value="Masculino">Masculino</option>
    <option value="Femenino" >Femenino</option>
    <option value="No espec??fica" >No espec??fica</option>
    </select>
        <label htmlFor="telefono" className="font-semibold text-sm text-gray-600 pb-1 block" >Tel??fono</label>
    <input
    id="telefono"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Tel??fono contacto" 
    value={telefono}
    onChange={e => setTelefono(e.target.value) }/> 
        <label htmlFor="fecha" className="font-semibold text-sm text-gray-600 pb-1 block" >Fecha de Nacimiento</label>
        

        
    <input 
     type="date"
    id="fecha"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full " 
    placeholder="Fecha Nacimiento" 
    value={fechaNacimiento}
    onChange={e => setFechaNacimiento(e.target.value) }/> 

    
    <input   type="submit" className=" bg-blue-500 block w-full font-nunito py-1 rounded-xl hover:bg-blue-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2" value='Actualizar profesional'/>

     </form>
  </Modal>
</div>
</div>



<div className="container mx-auto shadow-lg">

  <div className="-mx-4 flex flex-wrap">
    <div className="w-full px-4">
      <div className="max-w-full overflow-x-auto overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="border-collapse w-full min-w-full divide-y divide-gray-300" >
                <thead className="bg-blue-500 ">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 font-nunito pr-3 text-center text-sm  font-semibold text-white sm:pl-6">RUT</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">Nombres</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">Apellidos</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito  text-center text-sm font-semibold text-white">Email</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">Fecha Creaci??n</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">Especialidad</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">Telefono</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">Genero</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">Fecha nacimiento</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">??Confirmado?</th>
                        <th scope="col" className="font-bold font-nunito text-center text-white ">Acciones </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {profesionales.slice(
                (pagina - 1)* porPagina,
                (pagina - 1 ) * porPagina + porPagina
                ).map((profe)=>(
                    <tr key={profe._id}>
                        <td className="text-center py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6">{profe.rut}</td>
                        <td className="text-center px-3 py-4 text-sm">{profe.nombres}</td>
                        <td className="text-center px-3 py-4 text-sm">{profe.apellidos} </td>
                        <td className="text-center px-3 py-4 text-sm">{profe.email} </td>
                        <td className="text-center px-3 py-4 text-sm">{formatearFecha(profe.fecha)}</td>
                        <td className="text-center px-3 py-4 text-sm">{profe.especialidad}</td>
                        <td className="text-center px-3 py-4 text-sm">{profe.telefono}</td>
                        <td className="text-center px-3 py-4 text-sm">{profe.sexo}</td>
                        <td className="text-center px-3 py-4 text-sm">{formatearFecha(profe.fechaNacimiento)}</td>
                        <td className="text-center px-3 py-4 text-sm">
                            <span className="flex justify-center">
                            {(profe.confirmado== true ?<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>:<svg fill="#FA5252" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px">    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16.414,15 c0,0,3.139,3.139,3.293,3.293c0.391,0.391,0.391,1.024,0,1.414c-0.391,0.391-1.024,0.391-1.414,0C18.139,19.554,15,16.414,15,16.414 s-3.139,3.139-3.293,3.293c-0.391,0.391-1.024,0.391-1.414,0c-0.391-0.391-0.391-1.024,0-1.414C10.446,18.139,13.586,15,13.586,15 s-3.139-3.139-3.293-3.293c-0.391-0.391-0.391-1.024,0-1.414c0.391-0.391,1.024-0.391,1.414,0C11.861,10.446,15,13.586,15,13.586 s3.139-3.139,3.293-3.293c0.391-0.391,1.024-0.391,1.414,0c0.391,0.391,0.391,1.024,0,1.414C19.554,11.861,16.414,15,16.414,15z"/></svg> )}
                            </span>
                        </td>   
                        <td className="p-2  md:border md:border-grey-500 text-center block md:table-cell">
					              
					              <button
                                  onClick={()=>{setShowModalEditar(true); setEdicion(profe)} }
                                   className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-nunito font-semibold py-1 mr-1 mb-1 px-2 border border-blue-500 rounded"
                                   >Editar</button>
					              <button
                                   onClick={()=> eliminarProfesional(profe._id)}
                                   className="bg-red-500 hover:bg-red-700 text-white text-sm font-nunito font-semibold py-1 px-2 border border-red-500 rounded">Eliminar</button>
			             	</td>
                    </tr>
                    

                    ))}
                    
                </tbody>
            </table>
            </div>
            
            </div>
            </div>
          
        </div>
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
 

    
    </>
  )
}

export default FormularioProfesionales