import { useParams } from 'react-router-dom';
import clientAxios from '../../config/axios';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// habilita los plugins utc y timezone
dayjs.extend(utc);
dayjs.extend(timezone);

// define la zona horaria deseada
dayjs.tz.setDefault('America/Santiago');
const fechaActual = dayjs();
const formatoFecha = fechaActual.format('DD/MM/YYYY HH:mm');

const VerMotivo = () => {
  const { id } = useParams();
  const [motivo, setMotivo] = useState(null);
  const formatearFecha = (fecha) => {
    const fechaSantiago = dayjs.utc(fecha).tz('America/Santiago');
    return fechaSantiago.format('DD/MM/YYYY HH:mm');
  };
  const formatearmesesFecha= (fecha) => {
    const nuevaFecha = new Date(fecha)
    nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
    return new Intl.DateTimeFormat('es-CL', {dateStyle: 'long'}).format(nuevaFecha) }

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
        const response = await clientAxios.get(`/profesional/obtener-motivo/${id}`, config);
        setMotivo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!motivo) {
    return <div className='flex justify-center mt-10' role="status">
    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>;
  }

  return (
    <div>
    <div className='text-center bg-blue-400 py-6'>
    <h1 className="text-xl text-white font-semibold mb-4">Motivo de consulta</h1>
    </div>
    <div className="max-w-screen-xl mx-auto mt-10">
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 className='text-xl  font-regular mb-4'><span className='font-bold'>Motivo de consulta: </span> {' '} {motivo.titulo}</h2>
    <p className='text-xl font-regular mb-4'> <span className='font-bold'>Descripción del caso:</span> {' '}{motivo.descripcion}</p>
    <p className='text-lg  font-regular mb-4'> <span className='font-semibold'>Publicado:</span> {formatearFecha(motivo.fecha)}</p> 
    <p className='text-lg  font-regular mb-4'> <span className='font-semibold'>Sexo:</span> {motivo.paciente?.sexo}</p> 
    <p className='text-lg  font-regular mb-4'> <span className='font-semibold'>¿Es fumador?:</span>  {motivo.paciente.historiaclinica?.fumador}</p>
    <p className='text-lg  font-regular mb-4'> <span className='font-semibold'>¿Consume alcohol?:</span> {motivo.paciente.historiaclinica?.alcohol}</p> 
    <p className='text-lg  font-regular mb-4'> <span className='font-semibold'>¿Consume Drogas?:</span> {motivo.paciente.historiaclinica?.drogas}</p> 
    <p className='text-lg  font-regular mb-4'> <span className='font-semibold'>¿Realiza actividad fisica?:</span> {motivo.paciente.historiaclinica?.actividadfisica}</p> 

    </div>
    </div>

    <div className="max-w-screen-xl mx-auto mt-10">
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    {motivo.enfermedades.length ? (
      <div>
        <h3 className="text-lg font-bold mb-2">Enfermedades</h3>
        <ul className="list-disc ml-4">
          {motivo.enfermedades.map(enfermedad => (
            <li key={enfermedad._id} className="mb-4">
              <h4 className="text-md font-bold mb-2">{enfermedad.nombre}</h4>
              {enfermedad.fechadiagnostico ? (
                <p className="text-gray-700 mb-2">Fecha de diagnóstico: {formatearmesesFecha(enfermedad.fechadiagnostico)}</p>
              ) : (
                <p className="text-gray-700 mb-2">Fecha de diagnóstico: No especificado</p>
              )}

               {enfermedad.tratamiento ? (
                <p className="text-gray-700 mb-2">Tratamiento: {enfermedad.tratamiento}</p>
              ) : (
                <p className="text-gray-700 mb-2">Tratamiento:No especificado</p>
              )}
              {enfermedad.ultimocontrol ? (
                <p className="text-gray-700 mb-2">Último control: {formatearmesesFecha(enfermedad.ultimocontrol)}</p>
              ) : (
                <p className="text-gray-700 mb-2">Último control:No especificado</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    ):
    <div> 
     <h3 className="text-lg font-bold mb-2">Enfermedades</h3>
     <h3 className="text-lg font-regular mb-2">Paciente no tiene o aún no agrega enfermedades</h3>
     </div>
    }
   
<hr />
{motivo.antecedentesfam.length ? (
      <div>
        <h3 className="text-lg font-bold mb-2">Antecedentes familiares</h3>
        <ul className="list-disc ml-4">
          {motivo.antecedentesfam.map(antecedentesfa => (
            <li key={antecedentesfa._id} className="mb-4">
              <h4 className="text-md font-bold mb-2">{antecedentesfa.nombre}</h4>
            </li>
          ))}
        </ul>
      </div>
    ):    <div> 
    <h3 className="text-lg font-bold mb-2">Antecedentes familiares </h3>
    <h3 className="text-lg font-regular mb-2">Paciente no tiene o aún no agrega enfermedades</h3>
    </div>}
<hr />
    {motivo.alergias.length ? (
      <div>
        <h3 className="text-lg font-bold mb-2">Alergias </h3>
        <ul className="list-disc ml-4">
          {motivo.alergias.map(alergia => (
            <li key={alergia._id} className="mb-4">
              <h4 className="text-md font-bold mb-2">{alergia.nombre}</h4>
              {alergia.tratamiento ? (
                <p className="text-gray-700 mb-2">Tratamiento: {alergia.tratamiento}</p>
              ) : (
                <p className="text-gray-700 mb-2">Tratamiento: No especificado</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    ):    <div> 
    <h3 className="text-lg font-bold mb-2">Alergias</h3>
    <h3 className="text-lg font-regular mb-2">Paciente no tiene o aún no agrega Alergias</h3>
    </div>}
    <hr />
    {motivo.farmaco.length ? (
      <div>
        <h3 className="text-lg font-bold mb-2">Tratamiento farmacológico </h3>
        <ul className="list-disc ml-4">
          {motivo.farmaco.map(farma => (
            <li key={farma._id} className="mb-4">
              <h4 className="text-md font-bold mb-2">{farma.nombre}</h4>
            </li>
          ))}
        </ul>
      </div>
    ):    <div> 
    <h3 className="text-lg font-bold mb-2">Tratamiento farmacológico</h3>
    <h3 className="text-lg font-regular mb-2">Paciente no tiene o aún no agrega el tratamiento farmacológico</h3>
    </div>}
    <hr />
    {motivo.quirurgico.length ? (
      <div>
        <h3 className="text-lg font-bold mb-2">Antecedentes Quirúrgicos </h3>
        <ul className="list-disc ml-4">
          {motivo.quirurgico.map(qui => (
            <li key={qui._id} className="mb-4">
              <h4 className="text-md font-bold mb-2">{qui.nombre}</h4>
            </li>
          ))}
        </ul>
      </div>
    ):    <div> 
    <h3 className="text-lg font-bold mb-2">Antecedentes Quirúrgicos</h3>
    <h3 className="text-lg font-regular mb-2">Paciente no tiene o aún no agrega Antecedentes Quirúrgicos</h3>
    </div>}

    <hr />
    {motivo.hospitalizaciones.length ? (
      <div>
        <h3 className="text-lg font-bold mb-2">Hospitalizaciones</h3>
        <ul className="list-disc ml-4">
          {motivo.hospitalizaciones.map(hos => (
            <li key={hos._id} className="mb-4">
              <h4 className="text-md font-bold mb-2">{hos.nombre}</h4>
            </li>
          ))}
        </ul>
      </div>
    ):    <div> 
    <h3 className="text-lg font-bold mb-2">Hospitalizaciones</h3>
    <h3 className="text-lg font-regular mb-2">Paciente no tiene o aún no agrega Hospitalizaciones</h3>
    </div>}
    <hr />
    {motivo.urgencia.length ? (
      <div>
        <h3 className="text-lg font-bold mb-2">Urgencias</h3>
        <ul className="list-disc ml-4">
          {motivo.urgencia.map(urg => (
            <li key={urg._id} className="mb-4">
              <h4 className="text-md font-bold mb-2">{urg.nombreUrg}</h4>
            </li>
          ))}
        </ul>
      </div>
    ):    <div> 
    <h3 className="text-lg font-bold mb-2">Urgencias</h3>
    <h3 className="text-lg font-regular mb-2">Paciente no tiene o aún no agrega visitas a urgencias</h3>
    </div>}
    <hr />

    {motivo.paciente?.sexo === 'Mujer' ?
     <div>
     <h3 className="text-lg font-bold mb-2">Antecedentes ginecoobstétricos</h3>
     <h2>{motivo.paciente?.nginecoobstetrico || 'Paciente no tiene o aún no agrega Antecedentes ginecoobstétricos' } </h2>
   </div>

    :  ' '}

    
    
  </div>
</div>
<div className=' flex justify-center py-2'>
<button className=' text-white text-xl text-center bg-blue-400 py-4 px-10 hover:bg-blue-500'>
  Tomar este caso
</button>
</div>
 </div>
  );
};

export default VerMotivo;