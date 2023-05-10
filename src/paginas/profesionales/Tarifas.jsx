import React from 'react'
import { useEffect,useState } from 'react'
import clientAxios from '../../config/axios'


const Tarifas = () => {
    const [nombre, setNombre] = useState("");
    const [valor, setValor] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [tarifas, setTarifas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({});
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
            const { data } = await clientAxios.get('/profesional/traer-tarifas',config)
            setTarifas(data)
            setIsLoading(false);
          } catch (error) {
            console.log(error)
          }
      
        }
        obtenerMotivosConsulta()      
      },[tarifas])
      const eliminarTarifa = async (id) => {
        
        try {
          const tokenPro = localStorage.getItem('tokenPro');
          if (!tokenPro) return;
      
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${tokenPro}`,
            },
          };
          const resultado = await Swal.fire({
            title: '¿Quieres eliminar esta tarifa?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5d5ddb',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
          });
          if (resultado.isConfirmed) {
          const response = await clientAxios.delete(`/profesional/borrar-tarifa/${id}`, config);
          Swal.fire('¡Listo!', 'Tu Tarifa fue eliminada', 'success');
          if (response.status === 200) {
            const nuevasTarifas = tarifas.filter((tar) => tar._id !== id);
            setTarifas(nuevasTarifas);
          }
        }
        } catch (error) {
          console.log(error);
        }
      };
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const tarifa = { nombre, valor, tiempo };
    
        try {
            if (!nombre) {
                Swal.fire('¡Error!', 'Por favor, Agregue un nombre a su tarifa.', 'error');
                return;
              }
              if (!valor) {
                Swal.fire('¡Error!', 'Por favor, Agregue un valor a su tarifa', 'error');
                return;
              }
              if (!tiempo) {
                Swal.fire('¡Error!', 'Por favor, Agregue el tiempo a su tarifa', 'error');
                return;
              }
            const tokenPro = localStorage.getItem('tokenPro')
            if(!tokenPro) return
      
            const config={
              headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenPro}`
            }
            }
          const response = await clientAxios.post("/profesional/crear-tarifa", tarifa, config);
          Swal.fire('¡Perfecto!', 'Tu tarifa fue publicada', 'success');
        } catch (error) {
          console.log(error);
        }
       setNombre('')
       setTiempo('')
       setValor('')
      };
      const handleEditClick = (tar) => {
        setModalOpen(true);
        setFormValues({
          id: tar._id,
          nombre: tar.nombre,
          valor: tar.valor,
          tiempo: tar.tiempo
        });
      };
      const handleFormSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const tokenPro = localStorage.getItem('tokenPro')
          if(!tokenPro) return
      
          const config={
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenPro}`
            }
          }
      
          const { data } = await clientAxios.put(`/profesional/actualizar-tarifa/${formValues.id}`, formValues, config);
      
          // Actualizar la lista de tarifas con la nueva tarifa actualizada
          setTarifas((prevTarifas) => {
            return prevTarifas.map((tar) => {
              if (tar._id === data._id) {
                return data;
              } else {
                return tar;
              }
            });
          });
      
          // Cerrar el modal
          setModalOpen(false);
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <>
    <div className='bg-lila-200 py-10 shadow-lg'>
        <h1 className='text-center text-3xl font-bold text-white  '> Registra tus Tarifas para las consultas</h1>
    </div>
    <div class=" py-10 px-2">
  <div class="w-full ">
    <form onSubmit={handleSubmit}>
    <div class="w-max-2xl mx-auto shadow-md rounded-md p-4 bg-lila-200">
      <div class="flex gap-2 flex-col md:flex-row center">
        <div class="relative flex-1">
          <input  type="text"  class="peer h-10 w-full border border-1.5 rounded-md border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-600 focus:border-2 p-3" placeholder="quelquechose" 
            id="nombre"
            value={nombre || ''}
            onChange={(event) => setNombre(event.target.value)}
          />
          <label for="nombre" class="absolute left-2 px-1 -top-2.5 bg-white text-red-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-white peer-focus:bg-lila-200 peer-focus:text-sm">Nombre de la tarifa</label>
          <div class="absolute right-0 top-0 mt-2 mr-2 text-xl">
          📄
          </div>
        </div>
        <div class="relative flex-1">
          <input  name="etd" type="number" class=" appearance-none peer h-10 w-full border border-1.5 rounded-md border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-600  focus:border-2 p-3" placeholder="quelquechose" 
          id="valor"
          value={valor}
          onChange={(event) => {
            const newValue = event.target.value.trim(); // Elimina los espacios en blanco al principio y al final
            if (newValue === "") {
              setValor(''); // Si el valor está vacío, establece el estado en null
            } else {
              setValor(Number(newValue)); // Si el valor no está vacío, convierte y establece el estado
            }
          }}/>
          <label for="valor" class="absolute left-2 px-1 -top-2.5 bg-white text-red-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-white peer-focus:bg-lila-200 peer-focus:text-sm">$ Valor {'(Precio de la consulta)'}</label>
          <div class="absolute right-0 top-0 mt-2 mr-2 text-xl">
          💲
          </div>
        </div>
        <div class="relative flex-1">
          <input  name="etd" type="number" class=" appearance-none peer h-10 w-full border border-1.5 rounded-md border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-600 focus:border-2 p-3" placeholder="quelquechose" 
            id="tiempo"
            value={tiempo}
            onChange={(event) => {
                const newValue = event.target.value.trim(); 
                if (newValue === "") {
                  setTiempo(''); 
                } else {
                  setTiempo(Number(newValue)); 
                }
              }}
          />
          <label for="tiempo" class="absolute left-2 px-1 -top-2.5 bg-white text-red-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-white peer-focus:bg-lila-200 peer-focus:text-sm">Tiempo{'(minutos de la consulta)'} </label>
          <div class="absolute right-0 top-0 mt-2 mr-2 text-xl">
          🕐
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <button class="bg-coral-200 hover:bg-coral-100 text-white font-extrabold text-lg rounded-full px-6 py-3">Guardar Tarifa</button>
      </div>
    </div>
    </form>
  </div>
</div>



{isLoading ?
  <div className="sk-circle">
  <div className="sk-circle1 sk-child"></div>
  <div className="sk-circle2 sk-child"></div>
  <div className="sk-circle3 sk-child"></div>
  <div className="sk-circle4 sk-child"></div>
  <div className="sk-circle5 sk-child"></div>
  <div className="sk-circle6 sk-child"></div>
  <div className="sk-circle7 sk-child"></div>
  <div className="sk-circle8 sk-child"></div>
  <div className="sk-circle9 sk-child"></div>
  <div className="sk-circle10 sk-child"></div>
  <div className="sk-circle11 sk-child"></div>
  <div className="sk-circle12 sk-child"></div>
</div>
  
    : 
    <div className="col-span-12 mt-6 px-10 p-10">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    { tarifas.length?
    
        <div class="flex flex-col items-center justify-center relative">
    {tarifas.map((tar) => (
                <div
                key={tar._id}
                    class="bg-[#1c1c1c] text-gray-50 overflow-hidden rounded-md max-w-sm p-2 min-h-[250px] flex flex-col" >
                    <div>
                        <h3 class="text-left pl-8 pb-4 pt-2 text-xl">
                            Tu Tarifa
                        </h3>
                    </div>

                    <div class="flex items-center justify-center bg-[#2a2a2a] min-h-[150px]">
                       <h1 className='text-3xl italic'>{tar.nombre}</h1>
                    </div>
                    <div class="grid grid-cols-4">
                        <div class="p-4 pr-0 text-md col-span-3">

                                <h4 class="font-bold mt-5">
                                   Valor: $ {tar.valor.toLocaleString('es-CL')}

                                </h4>
                                <h4 class="font-bold  mt-5">
                                    Tiempo: {tar.tiempo} Minutos
                                </h4>
                        </div>
                        <div class="flex-buttons pt-2">
  <button
    class="w-20 h-15 bg-lila-200 hover:bg-lila-100 flex items-center justify-center rounded-lg"
    onClick={() => handleEditClick(tar)}
  >
    <p class="text-semibold text-xl text-center">Editar ✏️</p>
  </button>
  <button
    onClick={() => eliminarTarifa(tar._id)}
    class="w-20 h-15 bg-lila-200 hover:bg-lila-100 flex items-center justify-center rounded-lg"
  >
    <p class="text-semibold text-xl text-center">Eliminar 🗑</p>
  </button>
</div>
                    </div>
                </div>
           ))}
        </div>
        :<h1 className="font-semibold text-xl">Aquí se publicaran tus tarifas...</h1> }
        </div>
        </div>
    }
    
    {modalOpen && (
  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <form onSubmit={handleFormSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="nombre">
                Nombre:
              </label>
              <input
                type="text"
                name="nombre"
                value={formValues.nombre || ''}
                onChange={(e) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    nombre: e.target.value
                  }))
                }
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="valor">
                Valor:
              </label>
              <input
            placeholder='Precio o valor de la consulta'
            type="text"
            name="valor"
            value={formValues.valor || ''}
            onChange={(e) => {
                const re = /^[0-9\b]+$/; // Expresión regular que acepta solo números
                if (e.target.value === '' || re.test(e.target.value)) {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    valor: e.target.value
                }));
                }
            }}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            />
            </div>
            <input
            placeholder='Tiempo(Minutos que durara la consulta)'
            type="text"
            name="tiempo"
            value={formValues.tiempo || ''}
            onChange={(e) => {
                const re = /^[0-9\b]+$/; // Expresión regular que acepta solo números
                if (e.target.value === '' || re.test(e.target.value)) {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    tiempo: e.target.value
                }));
                }
            }}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            />

          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Guardar
            </button>
    <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setModalOpen(false)}>
      Cancelar
    </button>
  </div>
</form>
                </div>
                </div>
                </div>
                )}

   

    </>
  )
}

export default Tarifas