
import AdminAuth from '../../hooks/adminAuth'
const InicioAdmin = () => {
  const { authadmin} = AdminAuth()

    return (
      <>
     
    
    {authadmin.nombre}

  
      </>
    )
  }
  
  export default InicioAdmin