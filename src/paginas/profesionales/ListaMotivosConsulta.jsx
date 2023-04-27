import proAuth from "../../hooks/proAuth"
import FormularioinicioMotivos from "../../components/profesionalComponents/FormularioinicioMotivos"

const ListaMotivosConsulta = () => {
  const {authpro} =  proAuth()
  return (
    <>
    
    <div className=" px-6 py-10 mx-auto bg-blue-400 ">
    <h1 className=" mb-10 text-center font-regular font-nunito text-2xl text-white dark:text-white">Bienvenido Profesional <span className="font-semibold">{authpro.nombres} {authpro.apellidos}  </span> </h1>
    </div>
    <FormularioinicioMotivos/>

  
     
    </>
  )
}

export default ListaMotivosConsulta