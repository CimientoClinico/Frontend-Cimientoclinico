import { useState, useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import { BsWhatsapp, BsFillTelephoneFill} from "react-icons/bs";
import{HiOutlineMail}from "react-icons/hi";
import PreguntasClinicas from "../../components/pacienteComponents/Preguntas/PreguntasClinicas"
import Sueño from "../../components/pacienteComponents/Preguntas/Sueño"
import SaludMental from "../../components/pacienteComponents/Preguntas/SaludMental"
import Alimentacion from "../../components/pacienteComponents/Preguntas/Alimentacion"
import Alcohol from "../../components/pacienteComponents/Preguntas/Alcohol"
import Drogas from "../../components/pacienteComponents/Preguntas/Drogas"
import ActividadFisica from "../../components/pacienteComponents/Preguntas/ActividadFisica"
import FormularioVacuna from "../../components/pacienteComponents/FormularioVacuna"
import FormularioVida from "../../components/pacienteComponents/FormularioVida"
import CarruselImg from "../../components/CarruselImg"
import HelpAlerts from "../../components/HelperAlert";
const InicioPacientes = () => {
  const [ perfil, setPerfil ] = useState({});
  const [ perfil2, setPerfil2 ] = useState({});
const {auth, actualizarContacto,  actualizarEstilodevida, cargando} =  useAuth()

const alerts = [
  {
    message: 'Primera alerta',
  },
  {
    message: 'Segunda alerta',
  },
  {
    message: 'Tercera alerta',
  },
];

useEffect(() => {
  setPerfil(auth)

}, [])
useEffect(() => {
  setPerfil2(auth)

}, [])

const handleSubmit = async e =>{
  e.preventDefault()
  await actualizarContacto(perfil)
  
 }
 const handleSubmit2 = async e =>{
  e.preventDefault()
  await  actualizarEstilodevida(perfil2)
  
 }
 

  return (
    <>

      <div className="App">
      <header className="App-header">
      </header>
      <HelpAlerts alerts={alerts} />
    </div>




          <div className="bg-teal-600 margen  py-8 shadow-md  dark:bg-slate-700 ">
            
  <h1 className="text-center font-regular font-nunito text-4xl dark:text-white shado">Bienvenido<span className="font-semibold"> {auth.nombres} {auth.apellidos}  </span> </h1>
       </div>
       <div className="columns-3 text-center mt-2">  
        <h4 className="font-nunito text-regular text-lg hover:underline hover:text-teal-800  dark:text-white dark:hover:text-gray-300">Preguntas frecuentes</h4>
        <h4  className="font-nunito text-regular text-lg hover:underline hover:text-teal-800  dark:text-white dark:hover:text-gray-300">Seguridad de tus datos</h4>
        <h4  className="font-nunito text-regular text-lg hover:underline hover:text-teal-800  dark:text-white dark:hover:text-gray-300">Contacto</h4>
       </div>

    <div className="container px-2 py-10 mx-auto ">


 <div className="  mx-auto container max-w-5xl md:w-3/4 shadow-md bg-white ">

  <div className="col-span-12 border border-gray-400 rounded-lg fondo bg-white p-4 sm:col-span-6 dark:bg-slate-800">

  <h1 className="font-nunito font-semibold text-2xl mb-4 text-indigo-900 text-left dark:text-white">¿Como te gustaría que te contactemos?</h1>
  <div className=" mb-2 flex items-center ">
{auth.contacto=='Whatsapp' ?
<div className=" "> <h1 className="font-regular text-lg flex items-center dark:text-white "> Actualmente te contactaremos por: <span className="font-bold text-lg text-green-600 flex items-center ml-2">Whatsapp </span> <BsWhatsapp className="ml-1 text-green-600"/>   </h1>  </div>  
 :' '}
 {auth.contacto=='Correo' ?
 <div className=" "> <h1 className="font-regular text-lg flex items-center dark:text-white "> Actualmente te contactaremos por: <span className="font-bold text-lg text-red-600 flex items-center ml-2">Correo Electrónico </span> <HiOutlineMail className="ml-1 text-red-600"/>   </h1>  </div>  
 :' '}
 {auth.contacto=='Celular' ?
<div className=" "> <h1 className="font-regular text-lg flex items-center dark:text-white "> Actualmente te contactaremos por: <span className="font-bold text-lg text-blue-600 flex items-center ml-2">Celular </span> <BsFillTelephoneFill className="ml-1 text-blue-600"/>   </h1>  </div>  
 :' '}
</div>

<div className="grid grid-cols-1  gap-4 ">
<form onSubmit={handleSubmit}>
      <div
    className="container rounded-lg  mx-auto md:grid grid-cols-4 gap-8 bg-indigo-300 p-2">
    <div>
      <input type="radio" name="contacto" id="1" className="peer hidden"    value='Whatsapp'
                  onChange={ e => setPerfil({
                    ...perfil,
                    [e.target.name] : e.target.value
                  })} />
      <label
        htmlFor="1"
        className="flex font-nunito text-slate-900 justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-green-500 peer-checked:font-bold peer-checked:text-white"
        >Whatsapp  <BsWhatsapp className="mt-1.5 ml-2 " /></label>
    </div>
    <div>
      <input type="radio" name="contacto" id="2" className="peer hidden"   value='Correo'
                  onChange={ e => setPerfil({
                    ...perfil,
                    [e.target.name] : e.target.value
                  })} />
      <label
        htmlFor="2"
        className="flex font-nunito text-slate-900  justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-red-500 peer-checked:font-bold peer-checked:text-white">
          Correo  <HiOutlineMail className="mt-1.5 ml-2  " /></label>
    </div>

    <div>
      <input type="radio" name="contacto" id="3" className="peer hidden" value='Celular'
                  onChange={ e => setPerfil({
                    ...perfil,
                    [e.target.name] : e.target.value
                  })} />
      <label
        htmlFor="3"
        className=" flex font-nunito text-slate-900   justify-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
          Celular  <BsFillTelephoneFill className="mt-1.5 ml-2 " /></label>
    </div>

    <button  className="text-sm text-gray-100 bg-teal-600 hover:bg-teal-700 pt-1 pb-1 pl-2 pr-2 rounded-lg ">Guardar</button>

  </div>

  </form>
  </div>
  </div>
</div>
  

<div  className="col-span-9 rounded-lg p-6  dark:bg-slate-800 ">
           
<div className=" fondo mx-auto grid grid-cols-12 gap-4 bg-zinc-50 p-1 rounded-md  dark:bg-slate-800">

  <div className="col-span-12 rounded-lg fondo bg-white p-4 sm:col-span-6 dark:bg-slate-800">

  <div className=" mx-auto container max-w-5xl md:w-4/4 shadow-md bg-white  ">      
  <div className="bg-white shadow-md  my-6">
    <table className="text-left w-full border-collapse "> 
      <tbody>
        <tr >
          <td className="py-3 px-3 border-b  border-grey-light  border-r bg-[#96858f] text-white">Estado general:</td>
          <td className="py-2 px-2 border-b border-grey-light bg-[#d5d5d5]">
          <PreguntasClinicas/>
          </td>
        </tr>
        <tr className="hover:bg-grey-lighter">
        <td className="py-3 px-3 border-b  border-grey-light  border-r bg-[#96858f] text-white ">Sueño:</td>
          <td className="py-2 px-2 border-b border-grey-light bg-[#d5d5d5]">
          <Sueño/>   
          </td>
        </tr>
        <tr className="hover:bg-grey-lighter">
        <td className="py-3 px-3 border-b  border-grey-light  border-r bg-[#96858f] text-white">Salud mental:</td>
          <td className="py-2 px-2 border-b border-grey-light bg-[#d5d5d5]">
        <SaludMental/>
          </td>
        </tr>
        <tr className="hover:bg-grey-lighter">
        <td className="py-3 px-3 border-b  border-grey-light  border-r bg-[#96858f] text-white">Alimentación:</td>
          <td className="py-2 px-2 border-b border-grey-light bg-[#d5d5d5]">
        <Alimentacion/>
          </td>
        </tr>
        <tr className="hover:bg-grey-lighter">
        <td className="py-3 px-3 border-b  border-grey-light  border-r  bg-[#96858f] text-white">Tabaquismo:</td>
          <td className="py-4 px-2 border-b border-grey-light bg-[#d5d5d5]">
          <FormularioVida/>
          </td>
        </tr>
 
      </tbody>
    </table>
  </div>
</div>
  </div>
  <div className="col-span-12 rounded-lg fondo bg-white p-4 sm:col-span-6 dark:bg-slate-800">
  <div className=" mx-auto container max-w-5xl md:w-4/4 shadow-md bg-white  ">      
  <div className="bg-white shadow-md  my-6">
    <table className="text-left w-full border-collapse "> 
      <tbody>

        <tr className="hover:bg-grey-lighter">
        <td className="py-3 px-3 border-b  border-grey-light  border-r  bg-[#96858f] text-white">Alcohol:</td>
          <td className="py-4 px-6 border-b border-grey-light bg-[#d5d5d5]">
         <Alcohol/>
          </td>
        </tr>
        <tr className="hover:bg-grey-lighter">
        <td className="py-3 px-3 border-b  border-grey-light  border-r  bg-[#96858f] text-white">Drogas:</td>
          <td className="py-4 px-6 border-b border-grey-light bg-[#d5d5d5]">
         <Drogas/>
          </td>
        </tr>
        <tr className="hover:bg-grey-lighter">
        <td className="py-3 px-3 border-b  border-grey-light  border-r  bg-[#96858f] text-white">Actividad física:</td>
          <td className="py-4 px-6 border-b border-grey-light bg-[#d5d5d5]">
         <ActividadFisica/>
          </td>
        </tr>
        <tr className="hover:bg-grey-lighter">
        <td className="py-3 px-3 border-b  border-grey-light  border-r  bg-[#96858f] text-white">Vacunas:</td>
          <td className="py-4 px-3 border-b border-grey-light bg-[#d5d5d5]">
          <FormularioVacuna/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  </div>
</div>
                   
</div>


<div  className="col-span-9 bg-sky-600 rounded-lg p-6 mb-8 dark:bg-slate-800 ">
<div>    
<div className="mx-auto grid grid-cols-12  bg-sky-600 p-1 rounded-md  dark:bg-slate-800">

<div className="col-span-12 rounded-lg    bg-sky-600 p-4 sm:col-span-6  dark:bg-slate-800">

<CarruselImg/>
</div>
<div className="col-span-12 text-center rounded-md  fondo p-4 sm:col-span-6 dark:bg-slate-400">
<p className="text-xl italic font-nunito lg:mt-20 sm:mt-2 text-center flex justify-center">
    Lorem Ipsum is simply dummy text of the printing and 
    typesetting  Lorem Ipsum is simply
     dummy text of the printing and typesetting 
     Lorem Ipsum is simply dummy text of the printing and 
    typesetting  Lorem Ipsum is simply
     dummy text of the printing and typesetting
    </p>
<button  className=" bg-teal-600 mt-12 block w-full font-nunito py-2 rounded-2xl hover:bg-teal-700 hover:-translate-y-1 transition-all duration-300 text-white font-semibold mb-2">Mas info</button>

</div>
</div>
</div>  
</div>
</div>

   
   
    </>
  )
}

export default InicioPacientes