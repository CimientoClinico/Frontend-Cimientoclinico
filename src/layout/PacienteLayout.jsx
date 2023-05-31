import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/pacienteComponents/Sidebar";
import NotificacionDolor from "../components/pacienteComponents/Notificaciondolor";

const PacienteLayout = () => {
  const { auth, cargando } = useAuth();

  if (cargando) {
    return null; 
  }

  return (
    <>
      {auth?._id ? (
        <section className="gap-6 contenedor dark:bg-slate-600  ">
          <aside className="sidebar">
            <Sidebar />
          </aside>

          <section className="contenido ">
            <article className="main  ">
              {!cargando && <NotificacionDolor />}
              <Outlet />
            </article>
          </section>
        </section>
      ) : (
        <Navigate to="/ingresa" />
      )}
    </>
  );
};

export default PacienteLayout;
