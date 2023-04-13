import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useState, useEffect } from 'react';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction' // a plugin!
import clientAxios from '../../config/axios';
import FormularioMiHorario from '../../components/pacienteComponents/FormularioMiHorario';
const Horarios= () => {
    const [eventos, setEventos] = useState([]);
    useEffect(() => {
      const obtenerMotivosConsulta = async () => {
        try {
          const token = localStorage.getItem('token')
          if (!token) return
    
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
          const { data } = await clientAxios.get('/pacientes/obtener-motivodeconsultas', config)
          const eventos = data.map((motivo) => ({
            title: motivo.titulo,
            start: new Date(motivo.fecha),
            end: new Date(motivo.fecha),
          }));
          setEventos(eventos);
        } catch (error) {
          console.log(error)
        }
      }
    
      obtenerMotivosConsulta()
    }, [])
  
    return (
      
        <div className='py-10 px-10'>
          <FormularioMiHorario/>
          <div>
        <FullCalendar
        locales={[ esLocale ]}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      //events={eventos}
       
      contentHeight={600}
      />
      </div>
      </div>
    );
  };
  
  export default Horarios;