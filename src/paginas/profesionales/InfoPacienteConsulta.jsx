import { useEffect,useState } from "react";
import { useParams, } from 'react-router-dom';
import clientAxios from "../../config/axios";
import proAuth from "../../hooks/proAuth"
import FormularioDiagnosticos from "../../components/profesionalComponents/FormularioDiagnosticos";
const InfoPacienteConsulta = () => {
    const [consulta, setConsulta] = useState([]);
    const { id } = useParams();
    const {authpro} =  proAuth()
    const calcularEdad = (fechaNacimiento) => {
        const hoy = new Date();
        const cumpleanos = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();
        const mes = hoy.getMonth() - cumpleanos.getMonth();
      
        if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
          edad--;
        }

        return edad;
      }
    useEffect(() => {
        const tokenPro = localStorage.getItem('tokenPro');
        if (!tokenPro) return;
      
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenPro}`
          }
        };

        const fetchData = async () => {
          try {
            const { data } = await clientAxios.get(`/profesional/informacion-paciente-consulta/${id}`, config);
         setConsulta(data)
         console.log(data)
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();

      }, []);      
      const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
        return new Intl.DateTimeFormat('es-CL', {dateStyle: 'long'}).format(nuevaFecha) }
          if (!consulta || consulta.length === 0) {
            return <p>Cargando...</p>;
          }

          if (consulta && consulta.profesional._id !== authpro._id) {
            return (
                <div className=" bg-coral-100 w-full h-screen flex flex-col items-center justify-center">

                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold  font-nunito md:text-6xl lg:text-9xl text-white  mt-12">403</h1>
                    <h2 className="text-3xl font-semibold  font-nunito md:text-4xl lg:text-5xl text-white mt-12">No tienes permiso</h2>
                    <img  className="h-96"  src="https://res.cloudinary.com/dde62spnz/image/upload/v1683307824/Imagenes%20sitio/mano_nvygfz.png" alt="" />
                    <p className="md:text-lg font-nunito  lg:text-xl text-white mt-8">Lo sentimos no tienes el permiso para ver esta sección</p>

                </div>
            </div>
              );
          }
  return (
    <>
    <div className=" py-8 ">
             <div className="mx-auto container max-w-5xl md:w-3/4 border-t shadow-xl bg-white rounded-md  text-sm">
       
             <div className=" px-10 flex">
  <div className="w-1/4">
    <img src={consulta.paciente.image?.secure_url} alt="pacientefoto" />
  </div>
  <div className="w-3/4 py-6 px-10">
    <h1 className="text-3xl font-bold">{consulta.paciente.nombres}</h1>
    <h1 className="text-3xl font-bold">{consulta.paciente.apellidos}</h1>
    <h1 className="text-lg text-gray-600">{calcularEdad(consulta.paciente.fechaNacimiento)} Años</h1>
  </div>
</div>
       <hr />
       <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-2 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto ">RUT:</h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
              <div className="w-1/2 inline-flex border-b text-gray-600">
              {consulta.paciente.rut} 
              </div>
            </div>
          </div>
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-2 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto">Fecha de nacimiento:</h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
              <div className="w-1/2 inline-flex border-b text-gray-600">
              {formatearFecha(consulta.paciente.fechaNacimiento)}
              </div>
            </div>
          </div>
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-2 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto">Localidad:</h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
              <div className="w-1/2 inline-flex border-b text-gray-600">
              {consulta.paciente.localidad || 'Sin datos'}               
              </div>
            </div>
          </div>
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-2 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto">Ocupación:</h2>
            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
              <div className="w-1/2 inline-flex border-b text-gray-600">
              {consulta.paciente.ocupacion || 'Sin datos'}              
              </div>
            </div>
          </div>
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-2 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto">Previsión de salud:</h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
              <div className="w-1/2 inline-flex border-b text-gray-600">

    {consulta.paciente.previsionsalud || 'Sin datos'}
              </div>
            </div>
          </div>
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-2 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto">Escolaridad:</h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
              <div className="w-1/2 inline-flex border-b text-gray-600">
    {consulta.paciente.escolaridad || 'Sin datos'}
              </div>
            </div>
            
          </div>
          
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-2 text-gray-700 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto">Lugar donde se atiende:</h2>
            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
              <div className="w-1/2 inline-flex border-b text-gray-600">
    {consulta.paciente.lugardeatencion || 'Sin datos'}

              </div>
            </div>
            
          </div>
          <hr />


        </div>
        </div>

        <div className="bg-gray-200 rounded-lg max-w-7xl mx-auto">

  <div className="w-full">
  <h2 className="text-center text-lg mb-2 ">Motivo de consulta y su seguimiento:</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
  <div className="bg-lila-300 text-gray-200 py-2 px-1 mb-4 rounded-md text-sm">
    <h1 className="underline text-md">Motivo de consulta</h1>
    <p className="font-semibold">Fecha: {formatearFecha(consulta.motivoconsulta.fecha)}</p> 
     <p>Motivo: {consulta.motivoconsulta.titulo}</p>
    <p>Descripción: {consulta.motivoconsulta.descripcion}       </p>        
  </div>
    {consulta.seguimientomotivo.length === 0 ? (
      ''
    ) : (
      consulta.seguimientomotivo.map((seguimiento, index) => (
        <div key={index} className="bg-lila-200  text-gray-200 py-2 px-1 mb-4 rounded-md text-sm">
            <h1 className="underline text-md">Actualización del motivo</h1>
          <p className="font-semibold">Fecha: {formatearFecha(seguimiento.fecha)}</p>
          <p>Seguimiento: {seguimiento.nombre}</p>
          <p>Descripción: {seguimiento.descripcion}</p>
        </div>
      ))
    )}
  </div>
</div>
</div>

<div className=" max-w-7xl mx-auto mt-10">
<FormularioDiagnosticos/>
</div>
    </>
  )
}

export default InfoPacienteConsulta