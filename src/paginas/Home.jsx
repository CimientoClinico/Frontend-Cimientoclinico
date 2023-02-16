import { Link } from 'react-router-dom'
import home from '../assets/img/s2.webp'
import icon1 from '../assets/img/icon1.png'
import icon2 from '../assets/img/icon2.png'
import icon3 from '../assets/img/icon3.png'
import icon4 from '../assets/img/icon4.png'
import beneficio1 from '../assets/img/beneficio1.png'
import beneficio2 from '../assets/img/beneficio2.png'
import paciente from '../assets/img/paciente.png'
import profesional from '../assets/img/profesional.png'
const Home = () => {

    return(
        <>
       <div id="primario" className=" flex items-center  ">
		 <div className="container  mx-auto  text-left text-white">
			<div className=" flex flex-col md:flex-row   gap-16 items-center py-10">
				<div className="  lg:w-1/2 md:3/4 sm:w-3/4 text-center ">
					<h1 className=" font-nunito font-bold text-4xl   mb-6">Bienvenido a Cimiento Clínico</h1>
					<p className=" font-nunito font-regular text-xl  mb-12">Lorem Ipsum is simply dummy text of the printing and mply dummy text of the printing andmply dummy text of the printing and  <span id="bold" className=" font-bold">typesetting industry</span></p>
					<Link to="/ingresa"  id="boton"className="  font-nunito font-semibold text-white py-2 px-12 rounded-full ">Pide tu consulta aquí</Link>
				</div>
				    <div className="lg:w-1/2 md:3/4 sm:w-3/4 ">
                        <img className=' h-96 p-2 max-w-full rounded-xl' src={home} alt="" />
      </div>
			</div>
		</div>
	</div>

	<div id="requisitos"className=" text-white py-10 ">
  <div className="container mx-auto ">
    <div className="grid grid-cols-5 gap-4  " >
      <div className="col-span-5 md:col-span-1">
        <div className="p-4 rounded-lg text-center">
          <h2 className="mt-12 text-2xl font-nunito font-medium">¿Que necesito para  mi teleconsulta?</h2>
        </div>
      </div>
      <div className="col-span-5 md:col-span-1 flex items-center justify-center   ">
        <div className=" p-4 rounded-lg ">
		<img className='  h-32 ' src={icon3}  />
          <h2 className=" font-nunito text-md font-regular">Crear una cuenta y agregar antecedentes médicos</h2>
        </div>
      </div>
      <div className="col-span-5 md:col-span-1 flex items-center justify-center">
        <div className=" p-4 rounded-lg ">
		<img className=' h-32 ' src={icon2}  />
          <h2 className="font-nunito text-md font-regular">Ingresar desde un dispositivo con cámara y micrófono</h2>
        </div>
      </div>
	  <div className="col-span-5 md:col-span-1 flex items-center justify-center">
        <div className=" p-4 rounded-lg ">
		<img className=' h-32 ' src={icon1}  />
          <h2 className="font-nunito text-md font-regular">Publicar tu caso para acordar horario y profesional</h2>
        </div>
      </div>
	  <div className="col-span-5 md:col-span-1  flex items-center justify-center">
        <div className=" p-4 rounded-lg ">
		<img className=' h-32 ' src={icon4}  />
          <h2 className="font-nunito text-md font-regular">Realizar el pago e ingresar al link de la consulta</h2>
        </div>
      </div>
    </div>
  </div>
 </div>







 <div className="container-full mx-auto shadow-md bg-white p-4 lg:p-24">
	<h1 className=' p-7 font-nunito text-gray-600 font-semibold text-3xl text-center'>Beneficios de utilizar <span className='font-extrabold'> Cimiento Clínico</span></h1>
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <div className="overflow-hidden rounded-2xl bg-blue-50 p-4 lg:p-16">
      <h2 className="mt-4 font-nunito text-3xl font-semibold text-slate-800">This is an Amazing Feature</h2>
      <p className="font-nunito mt-4 text-lg text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
	  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled 
	  it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
      <div className=" mt-12 flex transform items-center justify-center ">
		<img className=' transition-transform  ease-in-out hover:scale-110 h-36' src={beneficio1} alt="" />
      </div>
    </div>
    <div className="overflow-hidden rounded-2xl bg-teal-100 p-4 lg:p-16">
	<div className="mt-12 flex transform items-center justify-center transition-transform duration-150 ease-in-out hover:scale-125">
      <img className=' transition-transform duration-150 ease-in-out hover:scale-110 h-36' src={beneficio2} alt="" />
      </div>
      <h2 className="mt-4 text-3xl font-semibold text-slate-800">This is an Amazing Feature</h2>
      <p className="mt-4 text-lg text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
	  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled 
	  it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
    </div>
  </div>
</div>



<div className="container mx-auto p-4 lg:p-24">
	<h1 className=' p-1 font-nunito text-gray-600 font-semibold text-3xl text-center'>Pensado para <span className='font-extrabold'>Pacientes </span>y<span className='font-extrabold'> Profesionales </span> </h1>
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <div className="overflow-hidden rounded-2xl  p-4 lg:p-32">
    <div className=" mt-1 flex transform items-center justify-center ">
		<img className=' transition-transform  ease-in-out hover:scale-110 h-36' src={paciente} alt="" />
      </div>
      <h2 className="text-center mt-4 font-nunito text-3xl font-semibold text-slate-800">Tus beneficios como <span className='font-bold '>Paciente</span>:</h2>
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
    <div className="overflow-hidden rounded-2xl  p-4 lg:p-32">
    <div className=" mt-1 flex transform items-center justify-center ">
		<img className=' transition-transform  ease-in-out hover:scale-110 h-36' src={profesional} alt="" />
      </div>
      <h2 className="text-center mt-4 font-nunito text-3xl font-semibold text-slate-800">Tus beneficios como <span className='font-bold '>Profesional</span>:</h2>
      <p className="text-center font-nunito mt-4 text-lg text-slate-600">   </p>
      <ul className="list-disc font-nunito">
       <li>Now this is a story all about how, my life got flipped-turned upside down</li>
       <li>Now this is a story all about how, my life got flipped-turned upside down</li>
       <li>Now this is a story all about how, my life got flipped-turned upside down</li>
       <li>Now this is a story all about how, my life got flipped-turned upside down</li>
        </ul>
   
      <div className=' mt-10 flex items-center justify-center'>
      <a  id="boton" href="#" className=" font-nunito font-semibold text-white py-3 px-12 rounded-full ">Leer más</a>
      </div>
    </div>
  </div>
</div>
 


        </>
    );
};

export default Home;