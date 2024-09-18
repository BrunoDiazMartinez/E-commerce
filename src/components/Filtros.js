import React, { useState } from 'react';

const Filtros = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('todos');
  const [tipo, setTipo] = useState('todos');
  const [categoria, setCategoria] = useState('todos');

  const aplicarFiltros = () => {
    // Aquí puedes manejar la lógica de filtrado
    console.log({ nombre, precio, tipo, categoria });
  };

  const limpiarFiltros = () => {
    setNombre('');
    setPrecio('todos');
    setTipo('todos');
    setCategoria('todos');
  };

  return (
    <div className="filtros">
      <div>
        <label htmlFor="filtro-nombre">Buscar por nombre:</label>
        <input type="text" id="filtro-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del producto" />
      </div>

      <div>
        <label htmlFor="filtro-precio">Filtrar por precio:</label>
        <select id="filtro-precio" value={precio} onChange={(e) => setPrecio(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="menos-20">Menos de $20</option>
          <option value="20-50">$20 - $50</option>
          <option value="mas-50">Más de $50</option>
        </select>
      </div>

      <div>
        <label htmlFor="filtro-tipo">Filtrar por producto:</label>
        <select id="filtro-tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="pantalon">Pantalon</option>
          <option value="playera">Playera</option>
          <option value="pijama">Pijamas</option>
          <option value="calzado">Calzado</option>
          <option value="sudaderas">Sudaderas</option>
          <option value="chamarras">Chamarras</option>
        </select>
      </div>

      <div>
        <label htmlFor="filtro-categoria">Filtrar por Categoría:</label>
        <select id="filtro-categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
          <option value="niño">Niño</option>
          <option value="niña">Niña</option>
          <option value="bebé">Bebé</option>
        </select>
      </div>

      <button onClick={aplicarFiltros}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-filter-search" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M11.36 20.213l-2.36 .787v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414"
          />
          <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M20.2 20.2l1.8 1.8" />
        </svg>
      </button>

      <button onClick={limpiarFiltros}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-filter-x" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M13.758 19.414l-4.758 1.586v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v1.5"
          />
          <path d="M22 22l-5 -5" />
          <path d="M17 22l5 -5" />
        </svg>
      </button>
    </div>
  );
};

export default Filtros;
