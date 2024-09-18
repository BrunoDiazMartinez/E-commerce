// src/components/ProductGrid.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductGrid.css';


function ProductGrid() {
  const [productos, setProductos] = useState([]);

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
    <div className="product-grid">
      {productos.map(producto => (
        <div key={producto.id} className="product-card">
          <Link to={`/producto/${producto.id}`}>
            <img src={producto.image} alt={producto.name} />
            <h2>{producto.name}</h2>
            <p>${producto.price.toFixed(2)}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;