import React from 'react'

const FormularioMotivoRechazo = () => {
    const handleCambiarEstado = async (id) => {
        // Mostrar una alerta de confirmación con SweetAlert
        Swal.fire({
          title: '¿Estás seguro que deseas cambiar el estado de la consulta?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, cambiar estado',
          cancelButtonText: 'Cancelar',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const token = localStorage.getItem('token')
              if(!token){
                setCargando(false)
                return
              } 
              const config ={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
              }
              // Hacer la solicitud PUT a la API para cambiar el estado de la consulta
              const response = await clientAxios.put(`/pacientes/rechazar-consulta/${id}`, {
                estado: 'rechazada',
              }, config);
    
              // Si la solicitud PUT tiene éxito, mostrar una alerta de éxito
              if (response.status === 200) {
                Swal.fire({
                  title: 'Estado de la consulta cambiado',
                  text: 'El estado de la consulta ha sido cambiado a rechazado',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Ok',
                });
              }
            } catch (error) {
              console.error(error);
              // Si hay un error, mostrar una alerta de error
              Swal.fire({
                title: 'Hubo un error',
                text: 'No se pudo cambiar el estado de la consulta',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
              });
            }
          }
        });
      };
  return (
    <>
     <button className="bg-red-600 px-0.5 py-0.5 rounded-lg text-white" onClick={() => handleCambiarEstado(con._id)}>Rechazar</button>
     
     </>
  )
}

export default FormularioMotivoRechazo