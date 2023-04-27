import React from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import { useState, useEffect } from 'react';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import clientAxios from '../../config/axios';
import useAuth from "../../hooks/useAuth"
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
const Horarios= () => {
    const [consultas, setConsultas] = useState([])
    const [eventosConBotones, setEventosConBotones] = useState([]);

    const { auth} =  useAuth()
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
        
      const eventos = consultasPendientes.map(consulta => {
        return {
          title: ` Consulta con el Profesional: ${consulta.profesional.nombres} ${consulta.profesional.apellidos} (${consulta.profesional.especialidad})`,
          start: consulta.start,
          end: consulta.end,
          allDay: false,
          id: consulta._id,
        };
      });
    
      if (auth.lunes) {
        const lunesInicio = dayjs().set('hour', auth.lunesinicio.split(":")[0]).set('minute',  auth.lunesinicio.split(":")[1]).toDate();
        const lunesFin = dayjs().set('hour',  auth.lunesfin.split(":")[0]).set('minute',  auth.lunesfin.split(":")[1]).toDate();
    
        const lunesEvento = {
          title: 'Disponible los lunes',
          start: lunesInicio,
          end: lunesFin,
          allDay: false,
          id: 'lunes-disponible'
        };
    
        eventos.push(lunesEvento);
      }
    
      setEventosConBotones(eventos);
    }, [auth, consultas]);
    
    const handleButtonClick = (event) => {
      console.log(`Button clicked for event ID: ${event.id}`);
    };
  
    const eventContent = (eventInfo) => {
      return (
        <div className="fc-content">
          <div className="fc-title evento">
            <div className="fc-event-time">{eventInfo.timeText}</div>
            <div className="fc-event-title">{eventInfo.event.title}</div>
            <button
            className='fcbutton rounded-sm px-4 ml-1'
              type="button"
              onClick={() => handleButtonClick(eventInfo.event)}
            >
              Ver
            </button>

          </div>
        </div>
      );
    };

    return (
     
          
          <div className='px-1 py-4'>
            <h1 className=' flex justify-center text-2xl font-semibold'>Horario de tus consultas</h1>
          <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
          initialView="dayGridMonth"
          locale={esLocale}
          weekends={true}
          events={eventosConBotones}
          headerToolbar={{
    start: 'title',
    center: '',
    end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  }}
  eventTimeFormat={{
    hour: 'numeric',
    minute: '2-digit',
    meridiem: false
  }}
  eventDisplay="block"
  eventDidMount={function(){}}
  eventClick={function(){}}
  dayMaxEvents={true}
  eventClassNames="eventos-fullcalendar"
  height={900}
  eventContent={eventContent}

  
/>

      </div>

    );
  };
  
  export default Horarios;