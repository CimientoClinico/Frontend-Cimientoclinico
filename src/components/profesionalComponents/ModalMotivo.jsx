import {  useState,useEffect } from "react";
import moment from 'moment-timezone';
import { Link } from "react-router-dom";
import clientAxios from "../../config/axios";
export const ModalMotivo = ({ motivo, onClose}) => {

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [fecha, setFecha] = useState('');
  const [horarioinicio, setHoraInicio] = useState('');
  const [horariofin, setHoraFin] = useState('');
  const [tarifaId, setTarifaId] = useState('');
  const [tarifaGlobalId, setTarifaGlobal] = useState('');
  const [esTarifaGlobal, setEsTarifaGlobal] = useState(true);
  const[ tarifas, setTarifas]= useState([])
  const[ tarifasglobales, setTarifasglobales]= useState([])

  const abrirFormulario = () => {
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
  };
  useEffect(() => {
    const obtenertarifas = async() =>{
      try {
        const tokenPro = localStorage.getItem('tokenPro')
        if(!tokenPro) return
  
        const config={
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenPro}`
        }
        }
        const { data } = await clientAxios.get('/profesional/obtener-tarifas',config)
        setTarifas(data)
      } catch (error) {
        console.log(error)
      }
  
    }
    obtenertarifas()
  }, []);
  useEffect(() => {
    const obtenertarifasglobales = async() =>{
      try {
        const tokenPro = localStorage.getItem('tokenPro')
        if(!tokenPro) return
  
        const config={
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenPro}`
        }
        }
        const { data } = await clientAxios.get('/profesional/obtener-tarifas-global',config)
        setTarifasglobales(data)
      } catch (error) {
        console.log(error)
      }
  
    }
    obtenertarifasglobales()
  }, []);
  function calcularHoraFin(horaInicio) {
    const tarifasArray = esTarifaGlobal ? tarifasglobales : tarifas;
    const tarifaSeleccionada = tarifasArray.find((tari) => tari._id === (esTarifaGlobal ? tarifaGlobalId : tarifaId));
    const tiempoEnMinutos = tarifaSeleccionada.tiempo;
    const fechaInicio = new Date(`2023-04-19T${horaInicio}:00`);
    const fechaFin = new Date(fechaInicio.getTime() + tiempoEnMinutos * 60000);
    const horaFin = fechaFin.toTimeString().slice(0, 5);
    return horaFin;
  }
  
  const handleToggleTarifa = () => {
    setEsTarifaGlobal(!esTarifaGlobal);
  }

  const enviarNotificacion = async( ) => {
    try{
      const tokenPro = localStorage.getItem("tokenPro");
      if (!tokenPro) return;
      if (!fecha) {
        Swal.fire('¡Error!', 'Por favor, seleccione una fecha.', 'error');
        return;
      }

      if (!horarioinicio) {
        Swal.fire('¡Error!', 'Por favor, agregue un horario de inicio para la consulta.', 'error');
        return;
      }
      if (!horariofin) {
        Swal.fire('¡Error!', 'Por favor, agrege hora de fin para la consulta.', 'error');
        return;
      }
      if (esTarifaGlobal && tarifaId) {
        Swal.fire('¡Error!', 'No puede agregar una tarifa global y una tarifa personalizada al mismo tiempo.', 'error');
        return;
      }
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenPro}`,
        },
      };

      const resultado = await Swal.fire({
        title: `¿Enviar propuesta de consulta al paciente?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
      });
      if (resultado.isConfirmed) {
      const fechaConZonaHoraria = moment.tz(fecha, 'America/Santiago').format();

      const data = new FormData();
      data.append('idMotivoConsulta', motivo._id);
      data.append('idPaciente', motivo.paciente._id);
      data.append('mensaje', mensaje);
      data.append('horarioinicio', horarioinicio);
      data.append('horariofin', horariofin);
      if (esTarifaGlobal) {
        data.append('tarifaGlobalId', tarifaGlobalId);
      } else {
        data.append('tarifaId', tarifaId);
      }
      data.append('fecha', fechaConZonaHoraria);
      await clientAxios.post('/profesional/generar-consulta', data, config);

      Swal.fire('¡Listo!', 'La propuesta de consulta fue enviada correctamente.', 'success');

    }
    setMostrarFormulario(false)
    setMensaje('')
    setHoraFin('')
    setHoraInicio('')
    setFecha('')
    onClose()
   
  } catch (error) {
      console.log(error)
    }
  }
  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha)
    nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
    return new Intl.DateTimeFormat('es-CL', {dateStyle: 'long'}).format(nuevaFecha) }
  

  return (
    
    <div className={`fixed z-10 inset-0 overflow-y-auto ${motivo ? "" : "hidden"}`}>
    <div className="flex items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-screen-lg sm:max-w-4xl">
        <div className="bg-white px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            📄
            </div>
            
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-xl leading-6 font-medium text-gray-900" id="modal-headline">
               Motivo: {motivo.titulo}
              </h3>
              <div className="mt-2">
                <div className="text-sm text-gray-500 ">
                    <p className='text-sm font-regular '> <span className='font-bold'>Descripción del caso:</span> {' '}{motivo.descripcion}</p>
                    <p className='text-sm  font-regular '> <span className='font-semibold'>Publicado:</span> {formatearFecha(motivo.fecha)}</p> 
                    <p className='text-sm  font-regular '> <span className='font-semibold'>Sexo:</span> {motivo.paciente?.sexo}</p> 
                    <p className='text-sm  font-regular '> <span className='font-semibold'>¿Es fumador?:</span>  {motivo.paciente.historiaclinica?.fumador}</p>
                    <p className='text-sm  font-regular '> <span className='font-semibold'>¿Consume alcohol?:</span> {motivo.paciente.historiaclinica?.alcohol}</p> 
                    <p className='text-sm  font-regular '> <span className='font-semibold'>¿Consume Drogas?:</span> {motivo.paciente.historiaclinica?.drogas}</p> 
                    <p className='text-sm font-regular'> <span className='font-semibold'>¿Realiza actividad fisica?:</span> {motivo.paciente.historiaclinica?.actividadfisica}</p> 
                </div>

                <div className="max-w-screen-xl mx-auto mt-10">
  <div className=" text-sm text-gray-500">
    {motivo.enfermedades.length ? (
      <div>
        <h3 className="text-lg font-bold mb-2">Enfermedades</h3>
        <ul className="list-disc ml-4">
          {motivo.enfermedades.map(enfermedad => (
            <li key={enfermedad._id} className="mb-4">
              <h4 className="text-md font-bold mb-2">{enfermedad.nombre}</h4>
              {enfermedad.fechadiagnostico ? (
                <p className="text-gray-700 mb-2">Fecha de diagnóstico: {formatearFecha(enfermedad.fechadiagnostico)}</p>
              ) : (
                ''
              )}

               {enfermedad.tratamiento ? (
                <p className="text-gray-700 mb-2">Tratamiento: {enfermedad.tratamiento}</p>
              ) : (
                ''
              )}
              {enfermedad.ultimocontrol ? (
                <p className="text-gray-700 mb-2">Último control: {formatearFecha(enfermedad.ultimocontrol)}</p>
              ) : (
                ''
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
                ''
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
              </div>
            </div>
            <div class="flex justify-end">
        <button class="text-gray-400 hover:text-gray-500 focus:outline-none"onClick={onClose}>
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.707 6.293a1 1 0 011.414 0L12 10.586l3.879-3.88a1 1 0 111.414 1.414L13.414 12l3.88 3.879a1 1 0 01-1.414 1.414L12 13.414l-3.879 3.88a1 1 0 01-1.414-1.414L10.586 12 6.707 8.121a1 1 0 010-1.414z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
          </div>
        </div>
        {mostrarFormulario ? (
        <div class="fixed  z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start ">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  
                  <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Formulario consulta</h3>
                  <h1 className="text-md "> ⌚ Horarios disponibles Paciente:</h1>
                
                {motivo.paciente.lunes === false && motivo.paciente.martes === false && motivo.paciente.miercoles === false 
                && motivo.paciente.jueves === false  && motivo.paciente.viernes === false   && motivo.paciente.sabado === false 
                 && motivo.paciente.domingo === false 
                 ?'Paciente no tiene horarios agregados':  
                 <div className=" grid grid-cols-2  mr-20 gap-2 w-full rounded-md  bg-gray-200 py-4 px-2 text-sm text-gray-800"> 
                 
                  {motivo.paciente.lunes === true && motivo.paciente.lunesinicio && motivo.paciente.lunesfin  ? 
                    <div className="bg-indigo-300 px-2 rounded-lg">
                      <h1 className="font-semibold">Lunes</h1>
                  <p className="text-sm"> {motivo.paciente.lunesdia.split(',').map((num) => {
                    const date = new Date();
                    date.setDate(num);
                    const mes = date.toLocaleString('es', {month: 'long'});
                    return ` ${num} de ${mes}`;
                  }).join(', ')}
                      </p>
                  <div>{' Horario:'} {motivo.paciente.lunesinicio}  {'-'} {motivo.paciente.lunesfin}</div>     
                     </div>        
                  : ''}
      {motivo.paciente.martes === true && motivo.paciente.martesinicio && motivo.paciente.martesfin  ? 
    <div className="bg-indigo-300 px-2 rounded-lg">
        <h1 className="font-semibold">Martes</h1>
        <p className="text-sm"> {motivo.paciente.martesdia.split(',').map((num) => {
            const date = new Date();
            date.setDate(num);
            const mes = date.toLocaleString('es', {month: 'long'});
            return ` ${num} de ${mes}`;
        }).join(', ')}
        </p>
        <div>{' Horario:'} {motivo.paciente.martesinicio}  {'-'} {motivo.paciente.martesfin}</div>     
    </div>        
: ''}

{motivo.paciente.miercoles === true && motivo.paciente.miercolesinicio && motivo.paciente.miercolesfin  ? 
    <div className="bg-indigo-300 px-2 rounded-lg">
        <h1 className="font-semibold">Miércoles</h1>
        <p className="text-sm"> {motivo.paciente.miercolesdia.split(',').map((num) => {
            const date = new Date();
            date.setDate(num);
            const mes = date.toLocaleString('es', {month: 'long'});
            return ` ${num} de ${mes}`;
        }).join(', ')}
        </p>
        <div>{' Horario:'} {motivo.paciente.miercolesinicio}  {'-'} {motivo.paciente.miercolesfin}</div>     
    </div>        
: ''}
{motivo.paciente.jueves === true && motivo.paciente.juevesinicio && motivo.paciente.juevesfin ? 
  <div className="bg-indigo-300 px-2 rounded-lg">
    <h1 className="font-semibold">Jueves</h1>
    <p className="text-sm"> {motivo.paciente.juevesdia.split(',').map((num) => {
      const date = new Date();
      date.setDate(num);
      const mes = date.toLocaleString('es', {month: 'long'});
      return ` ${num} de ${mes}`;
    }).join(', ')}
    </p>
    <div>{' Horario:'} {motivo.paciente.juevesinicio}  {'-'} {motivo.paciente.juevesfin}</div>     
  </div>            
: ''}

{motivo.paciente.viernes === true && motivo.paciente.viernesinicio && motivo.paciente.viernesfin ? 
  <div className="bg-indigo-300 px-2 rounded-lg">
    <h1 className="font-semibold">Viernes</h1>
    <p className="text-sm"> {motivo.paciente.viernesdia.split(',').map((num) => {
      const date = new Date();
      date.setDate(num);
      const mes = date.toLocaleString('es', {month: 'long'});
      return ` ${num} de ${mes}`;
    }).join(', ')}
    </p>
    <div>{' Horario:'} {motivo.paciente.viernesinicio}  {'-'} {motivo.paciente.viernesfin}</div>     
  </div>            
: ''}

{motivo.paciente.sabado === true && motivo.paciente.sabadoinicio && motivo.paciente.sabadofin ? 
  <div className="bg-indigo-300 px-2 rounded-lg">
    <h1 className="font-semibold">Sábado</h1>
    <p className="text-sm"> {motivo.paciente.sabadodia.split(',').map((num) => {
      const date = new Date();
      date.setDate(num);
      const mes = date.toLocaleString('es', {month: 'long'});
      return ` ${num} de ${mes}`;
    }).join(', ')}
    </p>
    <div>{' Horario:'} {motivo.paciente.sabadoinicio}  {'-'} {motivo.paciente.sabadofin}</div>     
  </div>            
: ''}

{motivo.paciente.domingo === true && motivo.paciente.domingoinicio && motivo.paciente.domingofin ? 
  <div className="bg-indigo-300 px-2 rounded-lg">
    <h1 className="font-semibold">Domingo</h1>
    <p className="text-sm"> {motivo.paciente.domingodia.split(',').map((num) => {
      const date = new Date();
      date.setDate(num);
      const mes = date.toLocaleString('es', {month: 'long'});
      return ` ${num} de ${mes}`;
    }).join(', ')}
    </p>
    <div>{' Horario:'} {motivo.paciente.domingoinicio}  {'-'} {motivo.paciente.domingofin}</div>     
  </div>            
: ''}
                 </div>
                 

                }  
               
                
  <div class="mb-4">
  <label for="mensaje" class="block text-gray-700 font-bold mb-2">Mensaje</label>
  <textarea
    id="mensaje"
    name="mensaje"
    value={mensaje}
    onChange={(e) => setMensaje(e.target.value)}
   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
   ></textarea>
    </div>
    <div>
 <div className="bg-blue-400 px-1 py-1 rounded-lg w-3/4">
  
  <h1 className="text-white text-xs"> <span className="font-bold">Nota:</span> Solo puedes agregar un tipo de tarifa para cada consulta. </h1>
 </div>
<div className="flex px-2 justify-between w-full pt-2">
      <div class="mb-4">
        <label for="valor" class="block text-gray-700 font-bold mb-2">
          Tarifas globales:
        </label>
        <select
          className="w-full border border-gray-300 p-2 rounded-lg appearance-none"
          value={tarifaGlobalId}
          onChange={(e) => {setTarifaGlobal(e.target.value);
            setEsTarifaGlobal(true);}} 
        >
          <option value="">Selecciona una tarifa global</option>
          {tarifasglobales.map((tari) => (
            <option key={tari._id} value={tari._id}>
              {tari.nombre} ({'$'}{tari.valor.toLocaleString('es-CL')}, {tari.tiempo} {'Min'})
            </option>
          ))}
        </select>
        {tarifas.length > 0 ? (
         ''
        ) : (
          <button className="text-blue-500 hover:text-blue700">Crea tus propias tarifas</button>
        )}
      </div>

      <div class="mb-4">
        <label for="valor" class="block text-gray-700 font-bold mb-2">
          Tarifas personalizadas:
        </label>
        <select
          className="w-full border border-gray-300 p-2 rounded-lg appearance-none"
          value={tarifaId}
          onChange={(e) => {
            setTarifaId(e.target.value);
            setEsTarifaGlobal(false);
          }}
        >
          <option value="">Selecciona una tarifa</option>
          {tarifas.map((tari) => (
            <option key={tari._id} value={tari._id}>
               {tari.nombre} ({'$'}{tari.valor.toLocaleString('es-CL')}, {tari.tiempo} {'Min'})
            </option>
          ))}
        </select>

      </div>
</div>      

  </div>

  <div class="mb-4">
  <label for="horaInicio" class="block text-gray-700 font-bold mb-2">Fecha:</label>
  <input
  type="date"
  id="fecha"
  name="fecha"
  value={fecha}
  onChange={(e) => setFecha(e.target.value)}
  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
  </div>
  <div class="mb-4">
  <label for="horaInicio" class="block text-gray-700 font-bold mb-2">Hora de inicio</label>
  <input
    type="time"
    id="horarioinicio"
    name="horarioinicio"
    value={horarioinicio}
    onChange={(e) => {
      setHoraInicio(e.target.value);
      setHoraFin(calcularHoraFin(e.target.value));
    }}
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
</div>
<div class="mb-4">
  <label for="horariofin" class="block text-gray-700 font-bold mb-2">Hora de fin</label>
  <input
    type="time"
    id="horariofin"
    name="horariofin"
    value={horariofin}
    onChange={(e) => setHoraFin(e.target.value)}
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
</div>

                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button class="bg-blue-500 px-2 py-2 rounded-md text-white hover:bg-blue-700" onClick={() =>enviarNotificacion()}>Tomar este caso</button>
              </span>
                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <button type="button" onClick={cerrarFormulario} className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                        Cancelar
                        </button>
                        </span>
                        </div>
                        </div>
                        </div>
                        </div>
                        ) : (
                          <div className=" bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-center">
                        <button onClick={abrirFormulario} className="  w-full inline-flex justify-center rounded-md border border-transparent px-10 py-2 mb-2 bg-blue-600  font-regular text-white hover:bg-blue-700  sm:ml-3 sm:w-auto sm:text-md">
                        Tomar caso
                        </button>
                        </div>
                        )}
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
    
          <button
            onClick={onClose}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 mb-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cerrar
          </button>
          <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 mb-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm ">
        <Link to={`/profesional/vermotivo/${motivo._id}`}>Abrir Mótivo</Link>
      </button>
        </div>
      </div>
    </div>
    
  </div>
  );
};
