
import proAuth from "../../hooks/proAuth"
const InicioProfesional = () => {
  const {authpro} =  proAuth()
  return (
    <>
    
    <div className="container px-6 py-10 mx-auto">
    <h1 className=" mb-10 text-center font-regular font-nunito text-2xl dark:text-white">Bienvenido Profesional <span className="font-semibold">{authpro.nombres} {authpro.apellidos}  </span> </h1>
    </div>
    
     
    </>
  )
}

export default InicioProfesional