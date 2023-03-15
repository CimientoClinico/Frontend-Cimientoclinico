import { Link } from 'react-router-dom'
import paciente from '../assets/img/paciente.png'
import profesional from '../assets/img/profesional.png'
import CarruselHome from '../components/CarruselHome'
const Home = () => {

    return(
        <>
        <div  className='  py-5  pb-10'>
        <h1 className='text-center text-2xl font-nunito font-semibold'>Ingresar/Registrarse</h1> 
        <div className='flex gap-6 justify-center'>
             <div className="mt-3 space-y-2  ">
                  <Link  to="/ingresa"className="bg-teal-500 hover:bg-teal-600 inline-block w-full px-4 py-2 text-center text-white font-nunito  rounded-md shadow ">Soy Paciente</Link>
             </div>
              <div className="mt-3 space-y-2">
                   <Link to="/ingresa-profesional"className=" bg-blue-500 hover:bg-blue-700 inline-block w-full px-4 py-2 text-center text-white font-nunito  rounded-md shadow ">Soy Profesional</Link>
              </div>

        </div>
      
         </div>
       <div className="">

        <CarruselHome/>


	    </div>


<div className="container mx-auto p-4 lg:p-28 ">
	<h1 className=' p-1 font-nunito text-gray-600 font-semibold text-3xl text-center'>Pensado para <span className='font-extrabold'>Pacientes </span>y<span className='font-extrabold'> Profesionales </span> </h1>
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <div className="overflow-hidden rounded-2xl  p-4 lg:p-12 border border-gray-400 ">
    <div className=" mt-1 flex transform items-center justify-center ">
		<img className=' transition-transform  ease-in-out hover:scale-110 h-36' src={paciente} alt="" />
      </div>
      <h2 className="text-center mt-4 font-nunito text-2xl font-semibold text-slate-800">Tus beneficios como <span className='font-bold '>Paciente</span>:</h2>
      <p className="text-center font-nunito mt-4 text-lg text-slate-600"> </p>
      <ul className="list-disc font-nunito">
       <li>Now this is a story all about how, my life got flipped-turned upside down</li>
       <li>Now this is a story all about how, my life got flipped-turned upside down</li>
       <li>Now this is a story all about how, my life got flipped-turned upside down</li>
       <li>Now this is a story all about how, my life got flipped-turned upside down</li>
        </ul>
     
      <div className='mt-10 flex items-center justify-center'>
      <a  id="boton" href="#" className=" font-nunito font-semibold text-white py-3 px-12 rounded-full ">Leer más</a>
      </div>
    </div>
    <div className="overflow-hidden rounded-2xl border  border-gray-400  p-4 lg:p-12">
    <div className=" mt-1 flex transform items-center justify-center ">
		<img className=' transition-transform  ease-in-out hover:scale-110 h-36' src={profesional} alt="" />
      </div>
      <h2 className="text-center mt-4 font-nunito text-2xl font-semibold text-slate-800">Tus beneficios como <span className='font-bold '>Profesional</span>:</h2>
      <p className="text-center font-nunito mt-4 text-lg text-slate-600">   </p>
      <ul className="list-disc font-nunito">
       <li>Now this is a story all about how, my life got flipped-turned upside down</li>
       <li>Now this is a story all about how, my life got flipped-turned upside down</li>
       <li>Now this is a story all about how, my life got flipped-turned upside down</li>
       <li>Now this is a story all about how, my life got flipped-turned upside down</li>
        </ul>
   
      <div className=' mt-10 flex items-center justify-center'>
      <a  id="boton" href="/portal-profesional" className=" font-nunito font-semibold text-white py-3 px-12 rounded-full ">Leer más</a>
      </div>
    </div>
  </div>
</div>





<div class="bg-slate-700 text-white py-36 ">
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold mb-4 py-8 px-2">Vídeos informativos </h1>
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-2 md:col-span-1">
      <div class="aspect-video">
    <iframe
      class="w-full h-full"
      src="https://www.youtube.com/embed/tGrMDGfW0Qw"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen="true"
      >
    </iframe>
  </div>
      </div>
      <div class="col-span-2 md:col-span-1">
      <div class="aspect-video">
    <iframe
      class="w-full h-full"
      src="https://www.youtube.com/embed/tGrMDGfW0Qw"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      >
    </iframe>
  </div>
      </div>

    </div>
  </div>
</div>






 


        </>
    );
};

export default Home;