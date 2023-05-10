import { useEffect, useState } from "react"
import clientAxios from "../../config/axios";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ModalMotivo } from "./ModalMotivo";
import {ModalHora} from "./ModalHora"
import proAuth from "../../hooks/proAuth"
dayjs.extend(utc);
dayjs.extend(timezone);
const FormularioinicioMotivos= ({}) => {

    const [motivos, setMotivos] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [motivo, setMotivo] = useState(null);
    const [hora, setHora] = useState(null);
    const [showModalHora, setShowModalHora] = useState(false);
    const [motivoId, setMotivoId] = useState(null);
    const {authpro} =  proAuth()
    const [orden, setOrden] = useState("descendente");
    const [searchValue, setSearchValue] = useState('');
    const [filtroGenero, setFiltroGenero] = useState("");
    const [filtroRangoEdad, setFiltroRangoEdad] = useState("");
const [searchDias, setSearchDias] = useState([]);
const [edadMin, setEdadMin] = useState("");
const [edadMax, setEdadMax] = useState("");
const [activeMotivo, setActiveMotivo] = useState(null);
const rangosEdad = [
  { id: 1, nombre: '0 meses a 1 mes', edadMin: 0, edadMax: 0, mesMin: 0, mesMax: 1 },
  { id: 2, nombre: '1 mes a 12 meses', edadMin: 0, edadMax: 1, mesMin: 1, mesMax: 12 },
  { id: 3, nombre: '12 meses a 2 años', edadMin: 1, edadMax: 2, mesMin: 0, mesMax: 0 },
  { id: 4, nombre: '2 años a 6 años', edadMin: 2, edadMax: 6, mesMin: 0, mesMax: 0 },
  { id: 5, nombre: '6 años a 13 años', edadMin: 6, edadMax: 13, mesMin: 0, mesMax: 0 },
  { id: 6, nombre: '13 años a 17 años', edadMin: 13, edadMax: 17, mesMin: 0, mesMax: 0 },
  { id: 7, nombre: 'Adultos', edadMin: '', edadMax: '', mesMin: 0, mesMax: 0 },

];


const handleHover = async (id) => {
  const tokenPro = localStorage.getItem('tokenPro');
  if (!tokenPro) return;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenPro}`
    }
  };
  
  const {data } = await clientAxios(`/profesional/obtener-motivo/${id}`,config);

  setHora(data);
  setShowModalHora(true);
};
const handleCloseModal = () => {
  setTimeout(() => {
    setShowModalHora(false);
    setHora(null);
  }, 1000);
};
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

      

      const filtrarPorEdad = (motivos) => {
        if (filtroRangoEdad === "") {
          return motivos;
        } else {
          const rangoEdad = rangosEdad.find((rango) => rango.id === parseInt(filtroRangoEdad));
      
          if (rangoEdad.id === 7) {
            return motivos.filter((motivo) => {
              const edad = calcularEdad(motivo.paciente.fechaNacimiento);
              const mes = calcularMes(motivo.paciente.fechaNacimiento);
      
              if (edad < edadMin || edad > edadMax) {
                return false;
              }
              if (edad === edadMin && mes < 0) {
                return false;
              }
              if (edad === edadMax && mes > 0) {
                return false;
              }
              return true;
            });
          } else {
            return motivos.filter((motivo) => {
              const edad = calcularEdad(motivo.paciente.fechaNacimiento);
              const mes = calcularMes(motivo.paciente.fechaNacimiento);
              if (edad < rangoEdad.edadMin || edad > rangoEdad.edadMax) {
                return false;
              }
              if (edad === rangoEdad.edadMin && mes < rangoEdad.mesMin) {
                return false;
              }
              if (edad === rangoEdad.edadMax && mes > rangoEdad.mesMax) {
                return false;
              }
              return true;
            });
          }
        }
      };
      
      
      
      const handleSelectChange = (event) => {
        setFiltroRangoEdad(event.target.value);
        setEdadMin("18");
        setEdadMax("");
      };


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
  <h1 className="text-center font-bold text-4xl text-lila-300 mt-2 mb-4">Motivos de consulta</h1>
</div>

<div className="flex flex-col md:flex-row md:items-center justify-center my-2 gap-2 w-full">

<div className="flex justify-end px-1 py-2 ">
    <label htmlFor="orden" className="mr-2 font-semibold">Buscar:</label>
    <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Buscar motivos de consulta" className="p-1 border rounded-md w-80 placeholder:text-sm" />

</div>


</div>
<div className="flex flex-col md:flex-row md:items-center justify-center my-2 gap-2 w-full">
<div className="flex flex-col md:flex-row justify-center items-center gap-2">

      <label htmlFor="filtro-edad">Filtrar por edad:</label>
      <select className="border rounded-md" id="filtro-edad" value={filtroRangoEdad} onChange={handleSelectChange}>
  <option value="">Todos los rangos</option>
  <option value="1">0 meses a 1 mes</option>
  <option value="2">1 mes a 12 meses</option>
  <option value="3">12 meses a 2 años</option>
  <option value="4">2 años a 6 años</option>
  <option value="5">6 años a 13 años</option>
  <option value="6">13 años a 17 años</option>
  <option value="7">Adultos</option>
</select>

    {filtroRangoEdad === "7" && (
  <div className="flex flex-col md:flex-row justify-center items-center gap-2">
    <label htmlFor="edad-minima">Edad mínima:</label>
    <input
    className="w-12 border rounded-md"
      id="edad-minima"
      type="number"
      value={edadMin}
      onChange={(e) => setEdadMin(e.target.value)}
    />
    <label htmlFor="edad-maxima">Edad máxima:</label>
    <input
       className="w-12 border rounded-md "
      id="edad-maxima"
      type="number"
      value={edadMax}
      onChange={(e) => setEdadMax(e.target.value)}
    />
  </div>
)}
    <label className="font-regular" htmlFor="genero">Filtrar por género:</label>
    <select id="genero" value={filtroGenero} onChange={(e) => setFiltroGenero(e.target.value)} className="p-1 border rounded-md md:w-auto">
      <option value="">Todos</option>
      <option value="Hombre">Masculino</option>
      <option value="Mujer">Femenino</option>
    </select>
    <button onClick={() => { setFiltroGenero(""); setOrden("descendente"); setFiltroRangoEdad(""); 
    }} className="bg-lila-200 hover:bg-lila-100 text-white px-2 py-1 rounded-lg md:w-auto">Borrar filtros</button>
  </div>
</div>
<hr  />
<div className="grid grid-cols-1 md:grid-cols-1 xl:px-60  gap-4 mt-2 mr-20">
  {motivosfiltrados.map((motivo) => (
    
    <div key={motivo._id} className="bg-white rounded-lg shadow-md w-full mb-10 ">
      <div className="flex justify-end">
        <button
      className="bg-lila-200 hover:bg-lila-100 px-2 py-1 rounded-md text-sm text-white"
      onMouseOver={() => handleHover(motivo._id)}
      onMouseLeave={() => handleCloseModal()}>
     🕒Horarios
    </button>
    {activeMotivo === motivo._id && (
            <div >
              <p>Información adicional:</p>
              <p>{motivo.horariopaciente }</p>
            </div>
          )}
          </div>
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
     

      </div>
      <div className="bg-gray-100 px-4 py-3 flex gap-2">
        <button
          className="bg-lila-200 hover:bg-lila-100 px-5 py-1 rounded-md text-white"
          onClick={() => handleClick(motivo._id)}
    
        >
          Ver Más
        </button>
      </div>
    
    
    </div>
  ))}
  {showModal && <ModalMotivo motivo={motivo} onClose={() => setShowModal(false)} />}
  {showModalHora && (
      <ModalHora motivo={hora} onClose={() => handleCloseModal()} />
    )}
</div>

  </>
  )
}

export default FormularioinicioMotivos