import { useState, useEffect } from "react"
import Alerta from '../../components/AlertaModal';
import usePacientes from "../../hooks/admin/usePaciente";
import Modal from "../../components/Modal"
import { Paginacion } from "../Paginacion";

const FormularioPaciente = () => {
  const [email, setEmail] = useState('')
  const [rut, setRut] = useState('')
  const [nombres, setNombres] = useState('')
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
  const {guardarPaciente, paciente} = usePacientes()
  const {setEdicion, eliminarPaciente,setPacientes, tablaUsuarios, pagina, setPagina, porPagina, maximo } =  usePacientes()
  const {pacientes} = usePacientes()
  const formatearFecha = (fecha) => {
      const nuevaFecha = new Date(fecha)
      nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
      return new Intl.DateTimeFormat('es-CL', {dateStyle: 'long'}).format(nuevaFecha) }

  useEffect(() => {
     if(paciente?.nombres){
      setRut(paciente.rut)
      setEmail(paciente.email)
      setNombres(paciente.nombres)
      setApellidos(paciente.apellidos)
      setTelefono(paciente.telefono)
      setSexo(paciente.sexo)
      setFechaNacimiento(new Date(paciente.fechaNacimiento).toISOString().split('T')[0]);
      setId(paciente._id)

     }
  }, [paciente])

      //AGREGANDO PACIENTE
      const handleSubmit = async e =>{
        e.preventDefault();
        if([email,rut,nombres,apellidos].includes('')){
          setAlerta({msg: 'Hay campos vacíos', error: true})
          setTimeout(()=> setAlerta({}),5000)
          return;
        }

        if(rut.length < 9 || rut.length > 10 ){
          setAlerta({msg: 'rut no válido. Ejemplo:11111111-1', error: true})
          setTimeout(()=> setAlerta({}),5000)
          return;
        }
        const rutDigits = rut.split('-')[0]; // Obtiene los dígitos del RUT sin el guión
        const passwordrut = rutDigits.slice(-6); // Obtiene los últimos 6 dígitos del RUT
        setAlerta({})
        guardarPaciente({email,rut,nombres,apellidos,fechaNacimiento,password:passwordrut})
      setShowModalGuardar(false)
      setEmail('')
      setRut('')
setNombres('')
setApellidos('')
setPassword('')
setFechaNacimiento('')
setSexo('')
setRepetirPassword('')

       }
    //EDITANDO PACIENTE
    const Editar = async e =>{
      e.preventDefault();
      if([email,rut,nombres].includes('')){
        setAlerta({msg: 'Email, rut y nombres no pueden estar vacíos', error: true})
        setTimeout(()=> setAlerta({}),5000)
        return;
      }

      
      guardarPaciente({email,rut,nombres,apellidos,sexo,fechaNacimiento,telefono,id})
      if(guardarPaciente){

      }
      setEmail('')
      setRut('')
      setNombres('')
      setApellidos('')
      setSexo('')
      setFechaNacimiento('')
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
          ){
            return elemento;
          }
        });
        setPacientes(resultadosBusqueda);
      }
  return (
    <>
    <div>
    
    <h1  className="font-bold font-nunito text-center text-2xl text-teal-600 dark:text-white ">Cimiento Clínico</h1>
<h3 className="font-semibold font-nunito text-center text-mb mb-2 dark:text-white">Mantenedor de pacientes</h3>
<div className="flex w-full items-center justify-between border-b pb-3">
      <button onClick={()=> setShowModalGuardar(true)} className=" bg-teal-500 text-sm text-white hover:bg-teal-600 font-regular px-2 py-3 rounded-lg shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
Agregar paciente
</button>	
      <div className="flex items-center space-x-8">
      <div className="pt-2 relative mx-auto text-gray-600">
        <input className=" text-black px-2  font-semibold  text-sm py-3 rounded-md shadow-md hover:shadow-lg  focus:outline-none mr-1 mb-1  transition-all duration-150"
          value={busqueda}
          placeholder="Buscar paciente"
          onChange={handleChange}/>

      </div>
      </div>
    </div>





<div className="p-1 xs:p-0 mx-auto md:w-full md:max-w-sm ">

<div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
 
   <Modal isVisible={showModalGuardar} onClose={()=> setShowModalGuardar(false)}  >
   <h3 className="font-semibold font-nunito text-center text-mb mb-2">Registro de pacientes</h3>
   {msg && <Alerta 
              alerta={alerta}
              />}
  <form  className="px-10 py-2 shadow-lg" onSubmit={handleSubmit} >
    <label htmlFor="email" className="font-semibold text-sm text-gray-700 pb-0 block" >Correo Electrónico</label>
    <input 
    id="email"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Ingresar Correo electrónico"
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
     <label htmlFor="Rut2" className="font-semibold text-sm text-gray-600 pb-1 block" >Rut</label>
    <input 
    id="Rut2"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Rut.Ejemplo:11111111-1" 
    value={rut}
    onChange={e => {
      setRut(e.target.value);
      const rutDigits = e.target.value.split('-')[0];
      const passwordrut= rutDigits.slice(-6);
      setPassword(passwordrut);
      setRepetirPassword(passwordrut);
    }}


    />
    <label htmlFor="Rut" className="font-semibold text-sm text-gray-600 pb-1 block" >Fecha de nacimiento</label>
    <input 
    id="Rut"
    type="date"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Rut.Ejemplo:11111111-1" 
    value={fechaNacimiento}
    onChange={e => setFechaNacimiento(e.target.value) }


    />
         <label htmlFor="genero" className="font-semibold text-sm text-gray-600 pb-1 block" >Genero</label>
    <select
    id="genero"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Genero" 
    value={sexo}
    onChange={e => setSexo(e.target.value) }> 
    <option value="No especifica" >No específica</option>
    <option value="Hombre">Hombre</option>
    <option value="Mujer" >Mujer</option>
    </select>
    <label className="text-gray-600 text-sm">
  La contraseña de este usuario será: {password}
</label>
    
    <input  type="submit" className=" bg-teal-500 block w-full font-nunito py-1 rounded-xl hover:bg-teal-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2" value='Registrar paciente'/>
  </form> 
  </Modal>
  <Modal isVisible={showModalEditar} onClose={()=> setShowModalEditar(false)}  >
  <h3 className="font-semibold font-nunito text-center text-mb mb-2">Actualización de Pacientes</h3>
  {msg && <Alerta 
              alerta={alerta}
              />}
  <form  className="px-10 py-2 shadow-lg" onSubmit={Editar}  >
    <label htmlFor="email2" className="font-semibold text-sm text-gray-700 pb-0 block" >Correo Electrónico</label>
    <input 
    id="email2"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Ingresar Correo electrónico"
    type="email" 
    value={email}
    onChange={e => setEmail(e.target.value) }
    />

     <label htmlFor="nombres2" className="font-semibold text-sm text-gray-600 pb-1 block" >Nombres</label>
    <input 
    id="nombres2"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Ingresa ambos nombres"
    value={nombres}
    onChange={e => setNombres(e.target.value) } 

    />
     <label htmlFor="apellidos2" className="font-semibold text-sm text-gray-600 pb-1 block" >Apellidos</label>
    <input 
    id="apellidos2"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Ingresa ambos apellidos" 
    value={apellidos}
    onChange={e => setApellidos(e.target.value) }


    />
     <label htmlFor="Rut" className="font-semibold text-sm text-gray-600 pb-1 block" >Rut</label>
    <input 
    id="Rut"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Rut.Ejemplo:11111111-1" 
    value={rut}
    onChange={e => setRut(e.target.value) }


    />

        <label htmlFor="sexo" className="font-semibold text-sm text-gray-600 pb-1 block" >Genero</label>
    <select
    id="sexo"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="sexo" 
    value={sexo}
    onChange={e => setSexo(e.target.value) }> 
    <option value="No especifica" >No específica</option>
    <option value="Hombre">Hombre</option>
    <option value="Mujer" >Mujer</option>
    </select>
        <label htmlFor="telefono" className="font-semibold text-sm text-gray-600 pb-1 block" >Teléfono</label>
    <input
    id="telefono"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full" 
    placeholder="Teléfono contacto" 
    value={telefono}
    onChange={e => setTelefono(e.target.value) }/> 
        <label htmlFor="fecha2" className="font-semibold text-sm text-gray-600 pb-1 block" >Fecha de Nacimiento</label>
        

        
    <input 
     type="date"
    id="fecha2"
    className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full " 
    placeholder="Fecha Nacimiento" 
    value={fechaNacimiento}
    onChange={e => setFechaNacimiento(e.target.value) }/> 

    
    <input   type="submit" className=" bg-teal-500 block w-full font-nunito py-1 rounded-xl hover:bg-teal-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2" value='Actualizar paciente'/>

     </form>
  </Modal>
</div>
</div>



<div className="container mx-auto shadow-lg">

  <div className="-mx-4 flex flex-wrap">
    <div className="w-full px-4">
      <div className="max-w-full overflow-x-auto overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="border-collapse w-full min-w-full divide-y divide-gray-300" >
                <thead className="bg-teal-500 ">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 font-nunito pr-3 text-center text-sm  font-semibold text-white sm:pl-6">Rut</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">Nombres</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">Apellidos</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito  text-center text-sm font-semibold text-white">Email</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">Fecha Creación</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">Telefono</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">Genero</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">Fecha nacimiento</th>
                        <th scope="col" className="px-3 py-3.5 font-nunito text-center text-sm font-semibold text-white">¿Confirmado?</th>
                        <th scope="col" className="font-bold font-nunito text-center text-white ">Acciones </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {pacientes.slice(
                (pagina - 1)* porPagina,
                (pagina - 1 ) * porPagina + porPagina
                ).map((pacien)=>(
                    <tr key={pacien._id}>
                        <td className="text-center py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6">{pacien.rut}</td>
                        <td className="text-center px-3 py-4 text-sm">{pacien.nombres}</td>
                        <td className="text-center px-3 py-4 text-sm">{pacien.apellidos} </td>
                        <td className="text-center px-3 py-4 text-sm">{pacien.email} </td>
                        <td className="text-center px-3 py-4 text-sm">{formatearFecha(pacien.fecha)}</td>
                        <td className="text-center px-3 py-4 text-sm">{pacien.telefono}</td>
                        <td className="text-center px-3 py-4 text-sm">{pacien.sexo}</td>
                        <td className="text-center px-3 py-4 text-sm">{formatearFecha(pacien.fechaNacimiento)}</td>
                        <td className="text-center px-3 py-4 text-sm">
                            <span className="flex justify-center">
                            {(pacien.confirmado== true ?<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>:<svg fill="#FA5252" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px">    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16.414,15 c0,0,3.139,3.139,3.293,3.293c0.391,0.391,0.391,1.024,0,1.414c-0.391,0.391-1.024,0.391-1.414,0C18.139,19.554,15,16.414,15,16.414 s-3.139,3.139-3.293,3.293c-0.391,0.391-1.024,0.391-1.414,0c-0.391-0.391-0.391-1.024,0-1.414C10.446,18.139,13.586,15,13.586,15 s-3.139-3.139-3.293-3.293c-0.391-0.391-0.391-1.024,0-1.414c0.391-0.391,1.024-0.391,1.414,0C11.861,10.446,15,13.586,15,13.586 s3.139-3.139,3.293-3.293c0.391-0.391,1.024-0.391,1.414,0c0.391,0.391,0.391,1.024,0,1.414C19.554,11.861,16.414,15,16.414,15z"/></svg> )}
                            </span>
                        </td>   
                        <td className="p-2  md:border md:border-grey-500 text-center block md:table-cell">
					              
					              <button
                                  onClick={()=>{setShowModalEditar(true); setEdicion(pacien)} }
                                   className="bg-teal-500 hover:bg-teal-700 text-white text-sm font-nunito font-semibold py-1 mr-1 mb-1 px-2 border border-teal-500 rounded"
                                   >Editar</button>
                                   {/*
                                   	<button
                                   onClick={()=> eliminarPaciente(pacien._id)}
                                   className="bg-red-500 hover:bg-red-700 text-white text-sm font-nunito font-semibold py-1 px-2 border border-red-500 rounded">Eliminar</button>
                                   */}

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
    </div>
    
    </>
  )
}

export default FormularioPaciente