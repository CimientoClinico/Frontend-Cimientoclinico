import  {useState} from 'react';

export const Paginacion = ({pagina, setPagina, maximo}) => {
  const [input, setInput] = useState (1);

  const nextPage = () => {
    setInput (parseInt(input) + 1);
    setPagina (parseInt(pagina) + 1);
  };

  const previousPage = () => {
    setInput (parseInt(input) - 1);
    setPagina (parseInt(pagina) - 1);
  };

  const onKeyDown = e => {
    if (e.keyCode == 13) {
      setPagina (parseInt (e.target.value));
      if (
        parseInt (e.target.value < 1) ||
        parseInt (e.target.value) > Math.ceil (maximo) ||
        isNaN (parseInt (e.target.value))
      ) {
        setPagina (1);
        setInput (1);
      } else {
        setPagina (parseInt (e.target.value));
      }
    }
  };

  const onChange = e => {
    setInput (e.target.value);
  };

  return (
    <>

    <div className="flex justify-center mt-2">
  <nav aria-label="Page navigation example">
    <ul className="flex list-style-none">
    <li className="page-item"><button disabled={pagina === 1 || pagina < 1} onClick={previousPage}
          className="page-link  block py-1.5 px-3   border-0  mr-4 text-white outline-none transition-all duration-300 rounded   hover:bg-slate-400"
          href="#">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
	 width="20px" height="30px" viewBox="0 0 612 612">
<g>
	<g id="Left">
		<g>
			<path d="M353.812,172.125c-7.478,0-14.21,2.926-19.335,7.612l-0.058-0.077L219.67,284.848c-5.91,5.451-9.295,13.101-9.295,21.152
				s3.385,15.701,9.295,21.152L334.42,432.34l0.058-0.076c5.125,4.686,11.857,7.611,19.335,7.611
				c15.836,0,28.688-12.852,28.688-28.688c0-8.357-3.634-15.836-9.353-21.076l0.058-0.076L281.52,306l91.685-84.054l-0.058-0.077
				c5.719-5.221,9.353-12.68,9.353-21.057C382.5,184.977,369.648,172.125,353.812,172.125z M306,0C137.012,0,0,137.012,0,306
				s137.012,306,306,306s306-137.012,306-306S474.988,0,306,0z M306,554.625C168.912,554.625,57.375,443.088,57.375,306
				S168.912,57.375,306,57.375S554.625,168.912,554.625,306S443.088,554.625,306,554.625z"/>
		</g>
	</g>
</g>

</svg>
            </button></li>
        <input
        className=' w-6 h-7  text-mb-10  mt-2  rounded-lg border'
        onChange={e => onChange (e)}
        onKeyDown={e => onKeyDown (e)}
        name="page"
        autoComplete="off"
        value={input}
      />
      <p className=' text-center ml-1 mt-2.5'> de {maximo} </p>
      <li className="page-item"><a
          className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded   hover:bg-gray-200 focus:shadow-none"
          href="#"></a></li>
      <li className="page-item"><button
      disabled={pagina === Math.ceil (maximo) || pagina > Math.ceil (maximo)}
      onClick={nextPage}
          className="page-link block py-1.5 px-3   border-0  ml-1 text-white outline-none transition-all duration-300 rounded   hover:bg-slate-400 focus:shadow-none"
          href="#">
            
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
	 width="20px" height="30px" viewBox="0 0 612 612" >
<g>
	<g id="Right">
		<g>
			<path d="M277.58,179.679l-0.057,0.077c-5.125-4.705-11.857-7.631-19.335-7.631c-15.835,0-28.688,12.852-28.688,28.688
				c0,8.377,3.634,15.835,9.352,21.076l-0.057,0.077L330.48,306l-91.686,84.055l0.057,0.076c-5.718,5.221-9.352,12.68-9.352,21.057
				c0,15.836,12.852,28.688,28.688,28.688c7.478,0,14.21-2.926,19.335-7.611l0.057,0.076l114.75-105.188
				c5.91-5.451,9.295-13.101,9.295-21.152s-3.385-15.702-9.295-21.152L277.58,179.679z M306,0C137.012,0,0,137.012,0,306
				s137.012,306,306,306s306-137.012,306-306S474.988,0,306,0z M306,554.625C168.912,554.625,57.375,443.088,57.375,306
				S168.912,57.375,306,57.375S554.625,168.912,554.625,306S443.088,554.625,306,554.625z"/>
		</g>
	</g>
</g>

</svg>
            
            </button></li>
    </ul>
  </nav>
</div>
   </>
   
    
  );
};