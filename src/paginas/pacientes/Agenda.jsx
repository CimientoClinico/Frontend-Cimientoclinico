import FormularioCalendario from '../../components/pacienteComponents/FormularioCalendario';
import BigCalendar from '../../components/pacienteComponents/BigCalendar';
const Agenda = () => {
  return (
    <>
    
    <div className="grid grid-cols-1  gap-4">
  <div className="w-full">
    <FormularioCalendario/>
  </div>
  <div className="w-full">
    <BigCalendar/>
  </div>
</div>
    </>
  )
}

export default Agenda