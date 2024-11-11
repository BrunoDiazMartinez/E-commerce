import React, { useState } from 'react';
import './Filtros.css';

const Filtros = ({ onAplicarFiltros }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('todos');
  const [tipo, setTipo] = useState('todos');
  const [categoria, setCategoria] = useState('todos');

  const aplicarFiltros = () => {
    onAplicarFiltros({ nombre, precio, tipo, categoria });
  };

  const limpiarFiltros = () => {
    setNombre('');
    setPrecio('todos');
    setTipo('todos');
    setCategoria('todos');
    onAplicarFiltros({ nombre: '', precio: 'todos', tipo: 'todos', categoria: 'todos' });
  };

  return (
    <div className="filtros">
      <div>
        <label htmlFor="filtro-nombre">Buscar por nombre:</label>
        <input
          type="text"
          id="filtro-nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del producto"
        />
      </div>
      <div>
        <label htmlFor="filtro-precio">Filtrar por precio:</label>
        <select id="filtro-precio" value={precio} onChange={(e) => setPrecio(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="menos-500">Menos de $500</option>
          <option value="500-550">$500-$550</option>
          <option value="mas-550">Más de $550</option>
        </select>
      </div>
      <div>
        <label htmlFor="filtro-tipo">Filtrar por producto:</label>
        <select id="filtro-tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="pantalon">Pantalón</option>
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
      
      {/* Contenedor de los botones a la derecha */}
      <div className="filtros-buttons">
        <button onClick={aplicarFiltros}>Aplicar filtros</button>
        <button onClick={limpiarFiltros}>Limpiar filtros</button>
      </div>
    </div>
  );
};

export default Filtros;
