import { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import clientAxios from '../../config/axios';
import useAuth from "../../hooks/useAuth"
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'

const localizer = dayjsLocalizer(dayjs)

const BigCalendar = () => {
  const [eventos, setEventos] = useState([]);
  const [fecha, setFecha] = useState("")
  const [horarioinicio, setHorarioInicio ] = useState("")
  const [horariofin, setHorarioFin] = useState("")
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { auth} =  useAuth()
  const [showModal, setShowModal] = useState(false); 
  const [consultas, setConsultas] = useState([]);
  const obtenerEventos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await clientAxios.get('/pacientes/ver-MiHorario', config);
      setEventos(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const obtenerMotivosConsulta = async() =>{
      try {
        const token = localStorage.getItem('token')
        if(!token) return
  
        const config={
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
        }
        const { data } = await clientAxios.get('/pacientes/obtener-consultas',config)
        setConsultas(data)
      } catch (error) {
        console.log(error)
      }
  
    }
    obtenerMotivosConsulta()      
  },[])

  useEffect(() => {
    obtenerEventos();
  }, []);
  const eliminarHorario = async (id) => {
    const confirmar = await Swal.fire({
      title: '¿Estás seguro de eliminar tu horario disponible?',
      text: "!No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9ba4ea',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
      }).then((result) => {
      if (result.isConfirmed) {
          return true;
      } else {
          return false;
      }
  })
  if(confirmar) {
    try {
      const token = localStorage.getItem('token')
      if(!token) return
  
      const config={
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
      }
      await clientAxios.delete(`/pacientes/borrar-horario/${id}`,config);
      setEventos(eventos.filter((evento) => evento.id !== id)); 

    } catch (error) {
      console.log(error);
    }
  }
  };

    const consultasPendientes = consultas.filter(con => con.paciente === auth._id && con.estado === 'pagado').map(consulta => {
      
      const [hours, minutes] = consulta.horarioinicio.split(":");
      const start = dayjs.utc(consulta.fecha).tz("America/Santiago").toDate();
      start.setHours(hours);
      start.setMinutes(minutes);
        
      const [hours2, minutes2] = consulta.horariofin.split(":");
      const end = dayjs.utc(consulta.fecha).tz("America/Santiago").toDate();
      end.setHours(hours2);
      end.setMinutes(minutes2);
      
      return {
        ...consulta,
        start,
        end
      };
    });
  const formatconsultas = () => {
    return consultasPendientes.map(consulta => {
        const fecha = dayjs(consulta.fecha);
        const start = fecha.set('hour', consulta.horarioinicio.split(':')[0]).set('minute', consulta.horarioinicio.split(':')[1]).toDate();
        const end = fecha.set('hour', consulta.horariofin.split(':')[0]).set('minute', consulta.horariofin.split(':')[1]).toDate();
      return {
        title: ` Consulta con el Profesional: ${consulta.profesional.nombres} ${consulta.profesional.apellidos} (${consulta.profesional.especialidad})`,
        start,
        end,
        isHorario: false
      };
    });
};

  const formatEventos = (eventos) => {
    return eventos.map((evento) => {
      const fecha = dayjs(evento.fecha);
      const start = fecha.set('hour', evento.horarioinicio.split(':')[0]).set('minute', evento.horarioinicio.split(':')[1]).toDate();
      const end = fecha.set('hour', evento.horariofin.split(':')[0]).set('minute', evento.horariofin.split(':')[1]).toDate();
  
      return {
        title: `Horario disponible ${evento.horarioinicio}-${evento.horariofin}`,
        start,
        end,
        id: evento._id,
        isHorario: true 
      };
    });
  };
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    
    // Obtener la fecha, hora de inicio y hora de fin del evento
    const fecha = event.start.toISOString().substring(0, 10);
    const horarioInicio = new Date(event.start).toLocaleTimeString('es-CL', {timeZone: 'America/Santiago', hour12: false});
const horarioFin = new Date(event.end).toLocaleTimeString('es-CL', {timeZone: 'America/Santiago', hour12: false});
    
    setFecha(fecha);
    setHorarioInicio(horarioInicio);
    setHorarioFin(horarioFin);
    
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedEvent(null); // Desmarca el evento seleccionado al cerrar el modal
    setShowModal(false); // Oculta el modal al cerrarlo
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  // Convertir la fecha y hora a hora de Chile
  const fechaSantiago = moment.tz(fecha, 'YYYY-MM-DD', 'America/Santiago');
  const horaInicioSantiago = moment.tz(horarioinicio, 'HH:mm', 'America/Santiago');
  const horaFinSantiago = moment.tz(horariofin, 'HH:mm', 'America/Santiago');

  // Obtener solo la hora y los minutos
  const horaInicioChile = horaInicioSantiago.format('HH:mm');
  const horaFinChile = horaFinSantiago.format('HH:mm');

  const data = {
    fecha: fechaSantiago.format(), // Formatear la fecha para enviarla al servidor
    horarioinicio: horaInicioChile, // Usar la hora en formato de Chile
    horariofin: horaFinChile // Usar la hora en formato de Chile
  };
    const token = localStorage.getItem('token')
    if(!token) return

    const config={
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
    }
    clientAxios.put(`/pacientes/actualizar-horario-paciente/${selectedEvent.id}`, data, config)
    .then((response) => {
      // Actualizar la lista de eventos para reflejar los cambios
      const updatedEvents = eventos.map(event => {
        if (event.id === selectedEvent.id) {
          return {
            ...event,
            fecha: fecha,
            horarioinicio: horarioinicio,
            horariofin: horariofin
          };
        } else {
          return event;
        }
      });
      setEventos(updatedEvents);
      obtenerEventos();
      closeModal();
    })
    .catch((error) => {
      console.log(error);
    });
  };
  const handleEliminarHorario = async (id) => {
    
   await eliminarHorario(id);
    obtenerEventos();
  };
  const eventosFormateados = formatEventos(eventos);
const consultasFormateadas = formatconsultas(consultasPendientes);
const eventosCombinados = eventosFormateados.concat(consultasFormateadas);
const CustomEvent = ({ event }) => {
  return (
    <div className="custom-event">
      <div className="event-title">{event.title}</div>
      {event.isHorario && (
        <div>
          <button
            title='borrar'
            onClick={() => handleEliminarHorario(event.id)}
          >🗑️</button>
          <button
            title='editar'
            onClick={(e) => {
              handleSelectEvent(event);
            }}
          >✏️</button>
        </div>
      )}

    </div>
  );
};
  const eventStyleGetter = (event) => {
    let backgroundColor = '';
    if (event.title.includes('Horario disponible')) {
      backgroundColor = '#9ecb90'
     

    } else {
      backgroundColor = '#cfb1ff'; 
    }

    return {
      style: {
        backgroundColor,
      },
    };
  };
    return (
     
          
      <div>
            <Calendar
  culture='es'
  localizer={localizer}
  events={eventosCombinados}
  startAccessor="start"
  endAccessor="end"
  style={{ height: 600 }}
  eventPropGetter={eventStyleGetter}
  components={{
    event: CustomEvent
  }}
  

/>
{showModal && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 transition-opacity">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
    <div
      className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
     <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
<form onSubmit={handleSubmit}>
<label htmlFor="horaFin" className="block text-gray-700 font-bold mb-2">
  Fecha:
</label>
<input type="date" name='fecha' value={fecha}  onChange={(e) => setFecha(e.target.value)}/>
<label className="block text-gray-700 font-bold mb-2" htmlFor="horaInicio">
  Hora de inicio:
</label>
<input
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="horaInicio"
  type="time"
  value={horarioinicio}
  onChange={(e) => setHorarioInicio(e.target.value)}
/>
<br />
<label htmlFor="horaFin" className="block text-gray-700 font-bold mb-2">
  Hora de fin:
</label>
<input
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="horaFin"
  type="time"
  value={horariofin}
  onChange={(e) => setHorarioFin(e.target.value)}
/>
<div className="flex justify-end mt-4">
  <button
    type="button"
    className="px-4 py-2 mr-2 text-white bg-red-500 rounded-md shadow-xl hover:bg-red-600 focus:outline-none focus:bg-red-600"
    onClick={closeModal}
  >
    Cerrar
  </button>
  <input
    type="submit"
    value="Editar"
    className="px-2 py-3 text-white font-medium  rounded-md shadow-xl hover:bg-blue-600 bg-blue-500"
  />
</div>
</form>
</div>

    </div>
  </div>
</div>


      )}
    </div>

    );
  };
  

export default BigCalendar;
