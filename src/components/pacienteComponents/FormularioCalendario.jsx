import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import clientAxios from '../../config/axios';
const FormularioCalendario = () => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [horarioInicio, setHorarioInicio] = useState("");
    const [horarioFin, setHorarioFin] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);

    const handleFechaSeleccionada = (fecha) => {
        const fechaActual = new Date(); // obtenemos la fecha actual
        if (fecha >= fechaActual.setHours(0, 0, 0, 0)) {
          setFechaSeleccionada(fecha);
          setMostrarModal(true);
        } else {
      
             Swal.fire('¡Error!', 'Por favor, seleccione una fecha mas reciente', 'error');
            return;

        }
    };

    const handleHorarioInicio = (event) => {
      setHorarioInicio(event.target.value);
    };

    const handleHorarioFin = (event) => {
      setHorarioFin(event.target.value);
    };
  
    const GuardarHorario = async () => {
      const data = {
        fecha: fechaSeleccionada,
        horarioinicio: horarioInicio,
        horariofin: horarioFin,
      };
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await clientAxios.post(
          "/pacientes/agregar-Horario",
          data,
          config
        );
        console.log(respuesta.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      GuardarHorario();
      setMostrarModal(false); // Cuando se envía el formulario, ocultar el modal
      setHorarioFin("")
      setHorarioInicio("")
    };
    const tileClassName = ({ activeStartDate, date, view }) => {
        // Agrega la clase 'bg-indigo-600' si la fecha seleccionada es igual a la fecha actual
        if (view === 'month' && date.getTime() === fechaSeleccionada.getTime()) {
          return 'bg-indigo-600 text-white';
        }
        // Agrega la clase 'bg-indigo-300' al pasar el mouse sobre el día
        if (view === 'month' && date.getTime() !== fechaSeleccionada.getTime()) {
          return 'hover:bg-indigo-300';
        }
        // Agrega la clase 'bg-indigo-500' al fondo del calendario
        if (view === 'month' && activeStartDate.getMonth() === date.getMonth()) {
          return 'bg-indigo-500';
        }
        return null;
      };
  
    return (
      <>
<div className='flex justify-center'>

  <div className=''>
  <h1 className='text-4xl text-center font-bold text-lila-300 pb-10 '>Guarda Tu Horario</h1>
    <div className='pb-4 '>
    <h2 className='text-2xl font-regular '>Selecciona aquí tus días disponibles</h2>
    </div>

  <Calendar className="p-4 rounded-lg shadow-lg max-w-xl" value={fechaSeleccionada} onChange={handleFechaSeleccionada} tileClassName={tileClassName}
       />
  {mostrarModal && (
    
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
    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
      Fecha seleccionada: {fechaSeleccionada.toLocaleDateString()}
    </h3>
    <label className="block text-gray-700 font-bold mb-2" htmlFor="horaInicio">
      Hora de inicio:
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="horaInicio"
      type="time"
      value={horarioInicio}
      onChange={handleHorarioInicio}
    />
    <br />
    <label htmlFor="horaFin" className="block text-gray-700 font-bold mb-2">
      Hora de fin:
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="horaFin"
      type="time"
      value={horarioFin}
      onChange={handleHorarioFin}
    />
    <div className="flex justify-end mt-4">
      <button
        type="button"
        className="px-4 py-2 mr-2 text-white bg-red-500 rounded-md shadow-xl hover:bg-red-600 focus:outline-none focus:bg-red-600"
        onClick={() => setMostrarModal(false)}
      >
        Cerrar
      </button>
      <input
        type="submit"
        value="Guarda tu horario"
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
</div>

    </>
  )
}

export default FormularioCalendario