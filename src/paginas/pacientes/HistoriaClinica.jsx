import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom"

const HistoriaClinica = () => {
    
const {auth} =  useAuth()

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
    <div className="bg-teal-600 margen  py-1 pb-5 shadow-md  dark:bg-slate-700 ">
    <nav class="nav font-regular font-nunito ">
        <ul class="flex items-center dark:text-white">
            <li class="p-4  cursor-pointer active hover:text-slate-300 hover:underline">
            <Link to="/paciente/perfil-paciente"> <h2 className=" text-md">Perfil de usuario   </h2></Link>
            </li>
            &gt;
            <li class="p-4 cursor-pointer  hover:text-slate-300 hover:underline">
            <Link to="/paciente/historia-clinica"> <h2 className="text-md ">Historia clinica</h2></Link>
            </li>
       
        </ul>
    </nav>

 

  <h1 className="text-left xl:px-64 font-regular mt-4 font-nunito text-4xl dark:text-white shado"><span className="font-semibold"> {auth.nombres} {auth.apellidos}  </span> </h1>
       </div>
   <div className="container px-6 py-10 mx-auto mt-20">


      <div className="rounded-lg mb-10 bg-teal-900 h-1/4  p-10 shadow-lg dark:bg-slate-700">
<form className=" font-nunito">

  <div class="grid xl:grid-cols-2 xl:gap-8">
    <div class="relative z-0 mb-6 w-full group">
      <div type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required > {auth.rut} </div>
      <label for="floating_first_name" class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Rut</label>

    </div>
    <div class="relative z-0 mb-6 w-full group">
 <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
      <label for="floating_first_name" class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tabaquismo</label>
       
    </div>
    <div class="relative z-0 mb-6 w-full group">
    <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
      <label for="floating_first_name" class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">FN</label>
    </div>
    <div class="relative z-0 mb-6 w-full group">
 <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
      <label for="floating_first_name" class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Alcohol</label>
    </div>
    <div class="relative z-0 mb-10 w-full group">
 <div type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required >{`${calcularEdad()} Años`}</div>
      <label for="floating_first_name" class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Edad</label>
    </div>
    <div class="relative z-0 mb-6 w-full group">
 <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
      <label for="floating_first_name" class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Actividad Física</label>
    </div>
    
    
  </div>
  <div class="grid xl:grid-cols-2 xl:gap-8">
    <div class="relative z-0 mb-6  w-full group">
       <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
      <label for="floating_first_name" class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Educación</label>
    </div>
    <div class="relative z-0 mb-6  w-full group">
       <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
      <label for="floating_first_name" class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Horarios de sueño</label>
    </div>
    <div class="relative z-0 mb-6 w-full group ">
      <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
      <label for="floating_first_name" class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ocupación</label>
    </div>
    <div class="relative z-0 mb-6 w-full group">
 <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
      <label for="floating_first_name" class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tratamiento</label>
    </div>
    <div class="relative z-0 mb-6 w-full group">
 <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
      <label for="floating_first_name" class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Previsión de salud</label>
    </div>
    <div class="relative z-0 mb-6 w-full group">
 <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" " required />
      <label for="floating_first_name" class="absolute text-sm text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Farmacológico actual</label>
    </div>
    
  </div>
  <button type="submit" class="text-white shadow-xl bg-blue-500 hover:bg-teal-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar datos</button>
</form>


      </div>

      <div className="rounded-lg mb-10 h-1/4 bg-teal-700 p-10 shadow-lg dark:bg-slate-700">
         <h1 className=" mb-10 text-center  text-white font-regular font-nunito text-2xl">Mi consulta actual:</h1>
            <div className="rounded-lg mb-3 h-1/4 bg-teal-500 p-10 shadow-lg dark:bg-slate-700">
                <h1 className="text-center text-white  text-3xl font-nunito font-bold">Quiero un chequeo general</h1>
           </div> 

           <div className="rounded-lg mb-3 h-1/4 bg-teal-500 p-10 shadow-lg dark:bg-slate-700">
                <h1 className="text-center text-white  text-xl font-nunito font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores facilis ullam nulla modi architecto laboriosam id repellendus quod, neque vitae, voluptatibus molestiae deleniti quasi numquam nemo dolorem alias aliquid?</h1>
           </div> 

      </div>

      <div className="rounded-lg mb-10 h-1/4 bg-teal-700 p-10 shadow-lg dark:bg-slate-700">
         <h1 className=" mb-10 text-center  text-white font-regular font-nunito text-2xl">Antecedentes Clínicos</h1>
         

      </div>
      <div className="rounded-lg mb-10 h-1/4 bg-teal-700 p-10 shadow-lg dark:bg-slate-700">
         <h1 className=" mb-10 text-center  text-white font-regular font-nunito text-2xl">Mi tratamiento:</h1>
         <section class=" pt-5">
    <details open class=" bg-teal-500 p-4 rounded-xl shadow-md group dark:bg-slate-500  duration-500 overflow-hidden">
      <summary
        class="outline-none cursor-pointer text-white focus:underline  focus:text-blue-600 font-semibold marker:text-transparent group-open:before:rotate-90  before:origin-center relative before:w-[18px] before:h-[18px] before:transition-transform before:duration-200 before:-left-1 before:top-2/4 before:-translate-y-2/4 before:absolute before:bg-no-repeat before:bg-[length:18px_18px] before:bg-center before:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22h-6%20w-6%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%3E%0A%20%20%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M9%205l7%207-7%207%22%20%2F%3E%0A%3C%2Fsvg%3E')]"
      >
       Tratamiento
      </summary>
  
      <hr class="my-1 scale-x-150"/>
  
      <div class="text-sm -m-4 -mt-2 p-4 bg-gray-50 dark:bg-slate-400 ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium nisi
        at turpis euismod malesuada. Nulla ultrices ullamcorper justo, ut aliquet
        purus lacinia vitae. Nunc vitae tempus odio, nec molestie magna. Proin non
        tortor enim. Fusce eget dui enim. Phasellus tristique vitae arcu molestie
        porta. Etiam vitae dui sed lorem viverra pulvinar ac sed ligula. Etiam
        hendrerit felis risus, in laoreet dui viverra eget. Nunc lobortis turpis
        tellus, ac dignissim felis suscipit sed. Cras consequat, erat eget
        lobortis vehicula, velit justo consectetur dolor, sit amet pretium elit
        tortor eget est. Phasellus ut laoreet lacus, ut tincidunt sem.
      </div>
    </details>
  </section>

      </div>
      </div>


   
   
    </>
    

  )
}

export default HistoriaClinica