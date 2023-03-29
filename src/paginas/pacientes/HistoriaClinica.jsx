import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom"
import FormularioAlergia from "../../components/pacienteComponents/FormularioAlergia"
import FormularioEnfermedad from "../../components/pacienteComponents/FormularioEnfermedades"
import FormularioFarmaco from "../../components/pacienteComponents/FormularioFarmaco"
import FormularioQuirurgico from "../../components/pacienteComponents/FormularioQuirurgico"
import HeaderHistoria from "../../components/pacienteComponents/HeaderHistoria"
import FormularioAntecedentesfam from "../../components/pacienteComponents/FormularioAntecedentesfam"
import FormularioHospitalizaciones from "../../components/pacienteComponents/FormularioHospitalizaciones"
import FormularioIdentificacion from "../../components/pacienteComponents/FormularioIdentificacion"
import FormularioTabaquismo from "../../components/pacienteComponents/FormularioTabaquismo"
import FormularioAlcoholismo from "../../components/pacienteComponents/FormularioAlcoholismo"
import FormularioDrogas from "../../components/pacienteComponents/FormularioDrogas"
import FormularioGinecoobstetrico from "../../components/pacienteComponents/FormularioGinecoobstetrico"
const HistoriaClinica = () => {
const {auth} =  useAuth()
const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha)
  nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
  return new Intl.DateTimeFormat('es-CL', {dateStyle: 'long'}).format(nuevaFecha) }
const calcularEdad = (fechaNacimiento)=>{
fechaNacimiento=(auth.fechaNacimiento)
  const fechaActual= new Date();
  const anoActual = parseInt(fechaActual.getFullYear());
  const mesActual = parseInt(fechaActual.getMonth()) + 1;
  const diaActual = parseInt(fechaActual.getDate());

  const anoNacimiento = parseInt(String(auth.fechaNacimiento).substring(0,4));
  const mesNacimiento = parseInt(String(auth.fechaNacimiento).substring(5,7));
  const diaNacimiento = parseInt(String(auth.fechaNacimiento).substring(8,10));
  let edad = anoActual - anoNacimiento;
  if (mesActual < mesNacimiento ){
    edad--;
  }else if(mesActual === mesNacimiento){
    if(diaActual  < diaNacimiento){
      edad--;
    }

  }
  return edad;
}

  return (
    <>
    

    <div className="bg-teal-600 margen  py-1 pb-5 shadow-md dark:bg-slate-700 ">
    <nav className="nav font-regular font-nunito ">
        <ul className="flex items-center dark:text-white">
            <li className="p-4  cursor-pointer active hover:text-slate-300 hover:underline">
            <Link to="/paciente/perfil-paciente"> <h2 className=" text-md">Perfil de usuario   </h2></Link>
            </li>
            &gt;
            <li className="p-4 cursor-pointer  hover:text-slate-300 hover:underline">
            <Link to="/paciente/historia-clinica"> <h2 className="text-md ">Historia clinica</h2></Link>
            </li>
       
        </ul>
    </nav>

 

  <h1 className="text-left xl:px-64 font-regular mt-4 font-nunito text-4xl dark:text-white shado"><span className="font-semibold"> {auth.nombres} {auth.apellidos}  </span> </h1>
       </div>
      <HeaderHistoria/>
       <div className="py-10 bg-gray-100  bg-opacity-50  " >
      <FormularioIdentificacion/>
       </div>




       <div className="py-10 bg-gray-100  bg-opacity-50   ">
      <div className="mx-auto container max-w-5xl md:w-3/4 shadow-md bg-[#6d7993] ">
        <div className="bg-gray-100 p-4  bg-opacity-5  rounded-t ">
          <div className="max-w-sm mx-auto md:w-full md:mx-0 ">
             <h1 className="text-white font-nunito">Antecedentes Clínicos</h1>
          </div>
        </div>
        <div className="bg-white space-y-1 ">
        <FormularioEnfermedad/>
          <hr />
          <FormularioFarmaco/>
          <hr />
          <FormularioQuirurgico/>
          <hr />
          <FormularioAntecedentesfam/>
          <hr />
          <FormularioAlergia/>
          <hr />
          <FormularioTabaquismo/>
          <hr />
          <FormularioAlcoholismo/>
          <hr />
          <FormularioDrogas/>
          <hr />
          <FormularioHospitalizaciones/>
          <hr />
          {auth.sexo==='Mujer' ?<FormularioGinecoobstetrico/> :'' }
          

        </div>
      </div>
    </div>




   
   
    </>
    

  )
}

export default HistoriaClinica