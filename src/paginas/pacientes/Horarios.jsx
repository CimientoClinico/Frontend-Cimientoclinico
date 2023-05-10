import { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // importa la localización en español
import clientAxios from '../../config/axios';
import useAuth from "../../hooks/useAuth"
import moment from 'moment'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const Horarios= () => {
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
  const handleSelectEvent = (event) => {
    setSelectedEvent(event); // Establece el evento seleccionado en el estado
    setShowModal(true); // Muestra el modal al seleccionar un evento
  };

  const handleDelete = () => {
    eliminarHorario(selectedEvent.id); // Llama a la función para eliminar el evento seleccionado
    setSelectedEvent(null); // Desmarca el evento seleccionado después de eliminarlo
    setShowModal(false); // Oculta el modal al eliminar el evento
  };
  const handleEdit = () => {
    setSelectedEvent(selectedEvent.id); // Establece el evento seleccionado en el estado
    // Abre un formulario de edición para que el usuario pueda actualizar la información del evento
    // Puede utilizar la misma función para manejar la eliminación del evento
  };
  const closeModal = () => {
    setSelectedEvent(null); // Desmarca el evento seleccionado al cerrar el modal
    setShowModal(false); // Oculta el modal al cerrarlo
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fechaSantiago = moment.tz(fecha, 'YYYY-MM-DD', 'America/Santiago');
    const data = {
      fecha: fechaSantiago.format(), // Formatear la fecha para enviarla al servidor
      horarioinicio: horarioinicio,
      horariofin: horariofin
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
      closeModal();
    })
    .catch((error) => {
      console.log(error);
    });
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
      };
    });
  };

  const eventosFormateados = formatEventos(eventos);
const consultasFormateadas = formatconsultas(consultasPendientes);
const eventosCombinados = eventosFormateados.concat(consultasFormateadas);
    return (
     
      <div>
      <Calendar
        culture='es'
        localizer={localizer}
        events={eventosCombinados}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable={true}
        onSelectEvent={handleSelectEvent}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
  <div className="flex items-center justify-center min-h-screen">
    <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
    <div className="z-20 relative w-96 max-w-full mx-auto rounded-lg shadow-lg overflow-hidden">
      <div className="bg-white p-6">
      <form onSubmit={handleSubmit}>
  <label htmlFor="fecha">Fecha:</label>
  <input type="date" id="fecha" name="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />

  <label htmlFor="horarioInicio">Horario de inicio:</label>
  <input type="time" id="horarioInicio" name="horarioinicio" value={horarioinicio} onChange={(e) => setHorarioInicio(e.target.value)} />

  <label htmlFor="horariofin">Horario de fin:</label>
  <input type="time" id="horariofin" name="horariofin" value={horariofin} onChange={(e) => setHorarioFin(e.target.value)} />

  <button
        className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
        type="submit"
      >
        Guardar
      </button>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded mr-2"
        onClick={handleDelete}
      >
        Eliminar
      </button>
      <button
        className="bg-gray-500 text-white py-2 px-4 rounded"
        onClick={closeModal}
      >
        Cerrar
      </button>
</form>
      </div>
    </div>
  </div>
</div>
      )}
    </div>

    );
  };
  
  export default Horarios;