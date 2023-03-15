
import useAuth from "../../hooks/useAuth"

import CarruselImg from "../../components/CarruselImg"
const InicioPacientes = () => {

const {auth} =  useAuth()



  return (
    <>

          <div className="bg-teal-600 margen  py-8 shadow-md  dark:bg-slate-700 ">
  <h1 className="text-center font-regular font-nunito text-4xl dark:text-white shado">Bienvenido Paciente <span className="font-semibold"> {auth.nombres} {auth.apellidos}  </span> </h1>
       </div>
       <div className="columns-3 text-center mt-2">  
        <h4 className="font-nunito text-regular text-lg hover:underline hover:text-teal-800  dark:text-white dark:hover:text-gray-300">Preguntas frecuentes</h4>
        <h4  className="font-nunito text-regular text-lg hover:underline hover:text-teal-800  dark:text-white dark:hover:text-gray-300">Seguridad de tus datos</h4>
        <h4  className="font-nunito text-regular text-lg hover:underline hover:text-teal-800  dark:text-white dark:hover:text-gray-300">Contacto</h4>
       </div>

       

    <div className="container px-2 py-10 mx-auto ">
    <div className="rounded-lg mb-10 h-1/4 fondo  p-10 border border-gray-400  dark:bg-slate-300">
      <h1 className=" mb-10 text-center font-regular text-black  font-nunito text-xl dark:text-black">Aqui va información </h1>

        <div className=" mb-12 flex items-center">
         
        </div>
      </div>
  

    
    <div  className="col-span-9 rounded-lg p-6  dark:bg-slate-800 ">

            <div >
                
                <div class=" fondo mx-auto grid grid-cols-12 gap-4 bg-zinc-50 p-1 rounded-md  dark:bg-slate-800">

  <div class="col-span-12 rounded-lg fondo bg-white p-4 sm:col-span-6 dark:bg-slate-800">

  <CarruselImg/>
  </div>
  <div class="col-span-12 rounded-lg fondo bg-white p-4 sm:col-span-6 dark:bg-slate-800">
  <CarruselImg/>
  </div>
</div>
                    </div>
                    
                    </div>


<div  className="col-span-9 bg-sky-600 rounded-lg p-6 mb-8 dark:bg-slate-800 ">
<div>    
<div class="mx-auto grid grid-cols-12  bg-sky-600 p-1 rounded-md  dark:bg-slate-800">

<div class="col-span-12 rounded-lg    bg-sky-600 p-4 sm:col-span-6  dark:bg-slate-800">

<CarruselImg/>
</div>
<div class="col-span-12 text-center rounded-md  fondo p-4 sm:col-span-6 dark:bg-slate-400">
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