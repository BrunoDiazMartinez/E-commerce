// src/components/ProductGrid.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductGrid.css';
import Filtros from '../Filtros/Filtros';

function ProductGrid() {
  const [productos, setProductos] = useState([]);

  const [filtros, setFiltros] = useState({
    nombre: '',
    precio: 'todos',
    tipo: 'todos',
    categoria: 'todos'
  });

  const aplicarFiltros = () => {
    return productos.filter(producto => {
      const cumpleNombre = producto.name.toLowerCase().includes(filtros.nombre.toLowerCase());
      const cumplePrecio = filtros.precio === 'todos' || (
        (filtros.precio === 'menos-20' && producto.price < 20) ||
        (filtros.precio === '20-50' && producto.price >= 20 && producto.price <= 50) ||
        (filtros.precio === 'mas-50' && producto.price > 50)
      );
      const cumpleTipo = filtros.tipo === 'todos' || producto.tipo === filtros.tipo;
      const cumpleCategoria = filtros.categoria === 'todos' || producto.categoria === filtros.categoria;
  
      return cumpleNombre && cumplePrecio && cumpleTipo && cumpleCategoria;
    });
  };

  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };
  

  useEffect(() => {
    fetch('http://localhost:5000/productos')
      .then(response => response.json())
      .then(data => {
        const productosConPrecio = data.map(producto => ({
          ...producto,
          price: parseFloat(producto.price) // Asegúrate de que price sea un número
        }));
        setProductos(productosConPrecio);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <Filtros onAplicarFiltros={actualizarFiltros} />
  
      <div className="product-grid">
        {aplicarFiltros().map(producto => (
          <div key={producto.id} className="product-card">
            <Link to={`/producto/${producto.id}`}>
              <img src={producto.image} alt={producto.name} />
              <h2>{producto.name}</h2>
              <p>${producto.price.toFixed(2)}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default ProductGrid;