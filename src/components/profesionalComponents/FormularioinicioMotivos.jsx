import { useEffect, useState } from "react"
import clientAxios from "../../config/axios";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ModalMotivo } from "./ModalMotivo";
import proAuth from "../../hooks/proAuth"
import { startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
dayjs.extend(utc);
dayjs.extend(timezone);
const FormularioinicioMotivos= ({}) => {

    const [motivos, setMotivos] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [motivo, setMotivo] = useState(null);
    const {authpro} =  proAuth()
    const [orden, setOrden] = useState("descendente");
    const [searchValue, setSearchValue] = useState('');
    const [filtroGenero, setFiltroGenero] = useState("");
    const [filtroEdad, setFiltroEdad] = useState("");
    const [filtroEdadMin, setFiltroEdadMin] = useState("");
const [filtroMesMin, setFiltroMesMin] = useState("");
const [filtroEdadMax, setFiltroEdadMax] = useState("");
const [filtroMesMax, setFiltroMesMax] = useState("");
const [searchDias, setSearchDias] = useState([]);


const handleSearchDiasChange = (event) => {
  const { value } = event.target;
  setSearchDias(value.trim() === "" ? [] : value.split(","));
};

const filtrarPorDias = (motivo) => {
  if (searchDias.length === 0) return true;
  return searchDias.some((dia) => motivo.paciente[dia.trim().toLowerCase()]);
};
  
    const handleClick = async (id) => {
      const tokenPro = localStorage.getItem('tokenPro');
      if (!tokenPro) return;
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenPro}`
        }
      };
      
      const {data } = await clientAxios(`/profesional/obtener-motivo/${id}`,config);

      setMotivo(data);
      setShowModal(true);
    };
    const formatearFecha = (fecha) => {
      const nuevaFecha = new Date(fecha)
      nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
      return new Intl.DateTimeFormat('es-CL', {dateStyle: 'long'}).format(nuevaFecha) }
      
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
      const calcularMes = (fecha) => {
        const fechaNacimiento = new Date(fecha);
        const mesActual = new Date().getMonth();
        const mesNacimiento = fechaNacimiento.getMonth();
        let edadMeses = mesActual - mesNacimiento ; 
      
        if (edadMeses <= 0) { // si la resta da 0 o menos, sumamos 12 para obtener el mes correcto
          edadMeses += 12;
        }
      
        if (edadMeses > 12) { // si la edad en meses es mayor a 12, la ajustamos a 12
          edadMeses = 12;
        }

        return edadMeses;
      }
      
      function getDiasDeLaSemanaParaEsteMes(diaDeLaSemana) {
        const hoy = new Date();
        const inicioDeMes = startOfMonth(hoy);
        const finDeMes = endOfMonth(hoy);
        const diasDelMes = eachDayOfInterval({ start: inicioDeMes, end: finDeMes });
        const diasDeLaSemana = diasDelMes.filter(d => getDay(d) === diaDeLaSemana);
        const mesActual = hoy.toLocaleString('default', { month: 'long' });
        return diasDeLaSemana.map(d => ` ${d.getDate()}  ${mesActual}`);
      }
      
      // Ejemplo de uso para lunes, martes y miércoles
      const lunesEnEsteMes = getDiasDeLaSemanaParaEsteMes(1);
      const martesEnEsteMes = getDiasDeLaSemanaParaEsteMes(2);
      const miercolesEnEsteMes = getDiasDeLaSemanaParaEsteMes(3);
      const juevesEnEsteMes = getDiasDeLaSemanaParaEsteMes(4);
      const viernesEnEsteMes = getDiasDeLaSemanaParaEsteMes(5);
      const sabadoEnEsteMes = getDiasDeLaSemanaParaEsteMes(6);
      const domingoEnEsteMes = getDiasDeLaSemanaParaEsteMes(0);
      const hoy = new Date();
      const mesActual = hoy.toLocaleString('default', { month: 'long' });


      

    useEffect(()=>{
        const obtenerMotivosConsulta = async() =>{
          try {
            const tokenPro = localStorage.getItem('tokenPro')
            if(!tokenPro) return
      
            const config={
              headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenPro}`
            }
            }
            const { data } = await clientAxios.get('/profesional/obtener-motivos',config)
            setMotivos(data)
          } catch (error) {
            console.log(error)
          }
      
        }
        obtenerMotivosConsulta()      
      },[motivos])
      useEffect(()=>{
        const obtenerMotivosConsulta = async() =>{
          try {
            const tokenPro = localStorage.getItem('tokenPro')
            if(!tokenPro) return
      
            const config={
              headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenPro}`
            }
            }
            const { data } = await clientAxios.get('/profesional/obtener-consultas',config)
            setConsultas(data)
          } catch (error) {
            console.log(error)
          }
      
        }
        obtenerMotivosConsulta()      
      },[consultas])
      const filtrarPorEdad = (motivos) => {
        return motivos.filter((motivo) => {
          const edad = calcularEdad(motivo.paciente.fechaNacimiento);
          const mes = calcularMes(motivo.paciente.fechaNacimiento);
      
          if (filtroEdadMin !== "" && filtroEdadMax !== "") {
            const edadMin = parseInt(filtroEdadMin);
            const edadMax = parseInt(filtroEdadMax);
            if (edad < edadMin || edad > edadMax) {
              return false;
            }
            if (edad === edadMin && mes < filtroMesMin) {
              return false;
            }
            if (edad === edadMax && mes > filtroMesMax) {
              return false;
            }
            return true;
          } else if (filtroEdadMin !== "") {
            const edadMin = parseInt(filtroEdadMin);
            if (edad < edadMin || (edad === edadMin && mes < filtroMesMin)) {
              return false;
            }
            return true;
          } else if (filtroEdadMax !== "") {
            const edadMax = parseInt(filtroEdadMax);
            if (edad > edadMax || (edad === edadMax && mes > filtroMesMax)) {
              return false;
            }
            return true;
          } else {
            return true;
          }
        });
      };
      
      
    
      const handleFiltroEdadMinChange = (event) => {
        setFiltroEdadMin(event.target.value);
      };
    
      const handleFiltroEdadMaxChange = (event) => {
        setFiltroEdadMax(event.target.value);
      };
      const handleFiltroMesMinChange = (event) => {
        const newFiltroMesMin = Math.max(parseInt(event.target.value), 0);
        let newFiltroEdadMin = filtroEdadMin ? parseInt(filtroEdadMin) : 0;
        setFiltroMesMin(newFiltroMesMin);
        if (!filtroEdadMin) {
          newFiltroEdadMin = Math.floor(newFiltroMesMin / 13);
          setFiltroEdadMin(newFiltroEdadMin);
        }
      };
      
      
      const handleFiltroMesMaxChange = (event) => {
        const newFiltroMesMax = Math.max(parseInt(event.target.value), 0);
        const newFiltroEdadMax = filtroEdadMax ? parseInt(filtroEdadMax) : 0;
      
        if (!filtroEdadMax) {
          setFiltroEdadMax(newFiltroEdadMax + Math.floor(newFiltroMesMax / 13));
        }
        
        setFiltroMesMax(newFiltroMesMax);
      };
      
      const motivosfiltrados = motivos
      .filter(
        (motivo) =>
          motivo.estado === "publicado" &&
          motivo.visible === true &&
          !consultas.some(
            (con) =>
              con.motivoconsulta === motivo._id &&
              con.profesional === authpro._id
          ) &&
          (filtroGenero === "" || motivo.paciente.sexo === filtroGenero)
      )
  .filter(motivo => motivo.titulo.toString().toLowerCase().includes(searchValue.toLowerCase())
  ||motivo.descripcion.toString().toLowerCase().includes(searchValue.toLowerCase())
   )
   
  
  .sort((a, b) => {
    if (orden === "descendente") {
      return new Date(b.fecha) - new Date(a.fecha);
    } else {
      return new Date(a.fecha) - new Date(b.fecha);
    }
  })
  .filter((motivo) => filtrarPorEdad([motivo]).length > 0)
  .filter(
    (motivo) => filtrarPorDias(motivo) 
  );
  const motivosFiltradosOrdenados = filtrarPorEdad(motivosfiltrados);
  
  if (orden === "descendente") {
    motivosFiltradosOrdenados.reverse();
  }
  ;

  
  return (
    <>
<div>
  <h1 className="text-center text-xl mt-2 mb-4">Motivos de consulta</h1>
</div>

<div className="flex flex-col md:flex-row md:items-center justify-center my-2 gap-2 w-full">

<div className="flex justify-end px-1 py-2 ">
    <label htmlFor="orden" className="mr-2 font-semibold">Buscar:</label>
    <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Buscar motivos de consulta" className="p-1 border rounded-md w-80 placeholder:text-sm" />

</div>
<div className="flex justify-end px-1 py-2 ">
    <label htmlFor="orden" className="mr-2 font-semibold">Buscar por día:</label>
    <input
      type="text"
      value={searchDias.join(",")}
      onChange={handleSearchDiasChange}
      placeholder="Días separados por coma (ej: Lunes, Miércoles)"
      className="p-1 border rounded-md w-80 placeholder:text-sm"
    />

</div>

</div>
<div className="flex flex-col md:flex-row md:items-center justify-center my-2 gap-2 w-full">
<div className="flex flex-col md:flex-row justify-center items-center gap-2">
  <label htmlFor="filtroEdadMin">Edad mínima:</label>
  <input
  className="w-12 rounded-lg"
  type="number"
  id="filtroEdadMin"
  value={filtroEdadMin}
  onChange={handleFiltroEdadMinChange}
  min="0"
  step="1"
  onKeyDown={(evt) =>
    ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
  }
/>

<label htmlFor="filtroEdadMax">Edad máxima:</label>  
<input
  className="w-12 rounded-lg"
  type="number"
  id="filtroEdadMax"
  value={filtroEdadMax}
  onChange={handleFiltroEdadMaxChange}
  min="0"
  step="1"
  onKeyDown={(evt) =>
    ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
  }
/>
<label htmlFor="filtroMesMin">Mes mínimo:</label>
<input
  className="w-12 rounded-lg"
  type="number"
  id="filtroMesMin"
  value={filtroMesMin}
  onChange={handleFiltroMesMinChange}
  min="0"
  max="12"
/>

<label htmlFor="filtroMesMax">Mes máximo:</label>
<input
  className="w-12 rounded-lg"
  type="number"
  id="filtroMesMax"
  value={filtroMesMax}
  min="0"
  max="12"
  onChange={handleFiltroMesMaxChange}
/>
    <label className="font-regular" htmlFor="genero">Filtrar por género:</label>
    <select id="genero" value={filtroGenero} onChange={(e) => setFiltroGenero(e.target.value)} className="p-1 border rounded-md md:w-auto">
      <option value="">Todos</option>
      <option value="Hombre">Masculino</option>
      <option value="Mujer">Femenino</option>
    </select>
    <button onClick={() => { setFiltroGenero(""); setOrden("descendente"); setFiltroEdad("");
     setFiltroEdadMax(""); setFiltroEdadMin("");setFiltroMesMin("");setFiltroMesMax("")}} className="bg-blue-400 text-white px-2 py-1 rounded-lg md:w-auto">Borrar filtros</button>
  </div>
</div>
<hr  />
<div className="grid grid-cols-1 md:grid-cols-1 xl:px-60  gap-4 mt-2 mr-20">
  {motivosfiltrados.map((motivo) => (
    <div key={motivo._id} className="bg-white rounded-lg shadow-md w-full mb-10 ">
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-800 text-center">
          {motivo.titulo}
        </h2>
        <div className="flex justify-between items-center ">
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
            Publicado: {formatearFecha(motivo.fecha)}
          </span>
          <div className="flex space-x-2">
            <div className="inline-block bg-gray-200 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700">
              <p className="text-xs font-medium text-gray-700">Sexo</p>
              <p className="text-xs font-regular text-slate-800">{motivo.paciente.sexo}</p>
            </div>
            <div className="inline-block bg-gray-200 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700">
              <p className="text-xs font-medium text-gray-700">Edad</p>
              <p className="text-xs font-regular text-slate-800">{calcularEdad(motivo.paciente.fechaNacimiento)} {'años'} </p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-lg font-regular text-slate-800">{motivo.descripcion}</p>
        <div className="mt-2 bg-gray-200 text-gray-700 py-1 px-4 rounded-xl">
  <h1 className="font-bold text-sm mb-2">Horario de la semana:</h1>
  {motivo.paciente.lunes || motivo.paciente.martes || motivo.paciente.miercoles || motivo.paciente.jueves || motivo.paciente.viernes ? (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="flex flex-col">
        {motivo.paciente.lunes && (
          <div className="flex items-center">
            <span className="font-bold mr-2 ">Lunes:</span>
            <span className="">{lunesEnEsteMes}</span>
          </div>
        )}

        {motivo.paciente.miercoles && (
          <div className="flex items-center">
            <span className="font-bold mr-2 ">Miércoles:</span>
            <span>{miercolesEnEsteMes}</span>
          </div>
        )}

        {motivo.paciente.viernes && (
          <div className="flex items-center">
            <span className="font-bold mr-2">Viernes:</span>
            <span>{viernesEnEsteMes}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col">
      {motivo.paciente.martes && (
          <div className="flex items-center">
            <span className="font-bold mr-2">Martes:</span>
            <span>{martesEnEsteMes}</span>
          </div>
        )}
         {motivo.paciente.jueves && (
          <div className="flex items-center">
            <span className="font-bold mr-2">Jueves:</span>
            <span>{juevesEnEsteMes}</span>
          </div>
        )}
        <div>
          
        <div className="bg-gray-100 border border-gray-200 rounded-md p-2 mb-2">
  <div className="flex items-center gap-2">
    {motivo.paciente.horasemanainicio && (
      <div>
        <span className="font-bold mr-2">Desde:</span>
        <span>{motivo.paciente.horasemanainicio}</span>
      </div>
    )}
    {motivo.paciente.horasemanafin && (
      <div className="">
        <span className="font-bold mr-2">Hasta:</span>
        <span>{motivo.paciente.horasemanafin}</span>
      </div>
    )}
  </div>
</div>

        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1>El paciente no ha agregado sus horarios para la semana</h1>
      </div>
  )}
</div>
<div className="mt-2 bg-gray-200 text-gray-700 py-1 px-4 rounded-xl">
  <h1 className="font-bold text-sm mb-2">Horario de la semana:</h1>
  {motivo.paciente.lunes || motivo.paciente.martes || motivo.paciente.miercoles || motivo.paciente.jueves || motivo.paciente.viernes ? (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="flex flex-col">
        {motivo.paciente.sabado && (
          <div className="flex items-center">
            <span className="font-bold mr-2 ">Sábado:</span>
            <span className="">{sabadoEnEsteMes}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col">
      {motivo.paciente.domingo && (
          <div className="flex items-center">
            <span className="font-bold mr-2">Domingo:</span>
            <span>{domingoEnEsteMes}</span>
          </div>
        )}
        <div>
          
        <div className="bg-gray-100 border border-gray-200 rounded-md p-2 mb-2">
  <div className="flex items-center gap-2">
    {motivo.paciente.horafindesemanainicio && (
      <div>
        <span className="font-bold mr-2">Desde:</span>
        <span>{motivo.paciente.horafindesemanainicio}</span>
      </div>
    )}
    {motivo.paciente.horafindesemanafin && (
      <div className="">
        <span className="font-bold mr-2">Hasta:</span>
        <span>{motivo.paciente.horafindesemanafin}</span>
      </div>
    )}
  </div>
</div>

        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1> El paciente no ha agregado sus horarios para la semana</h1>
     </div>
  )}
</div>
      </div>
      <div className="bg-gray-100 px-4 py-3 flex gap-2">
        <button
          className="bg-green-500 hover:bg-green-600 px-5 py-1 rounded-md text-white"
          onClick={() => handleClick(motivo._id)}
        >
          Ver Más
        </button>
      </div>
    </div>
  ))}
  {showModal && <ModalMotivo motivo={motivo} onClose={() => setShowModal(false)} />}
</div>

  </>
  )
}

export default FormularioinicioMotivos