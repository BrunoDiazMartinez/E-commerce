// src/components/ProductoDetalle.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductoDetalle() {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [talla, setTalla] = useState("");

  useEffect(() => {
    // Verificar si existe un carritoId en el localStorage
    let carritoId = localStorage.getItem('carritoId');
    if (!carritoId) {
      // Si no existe, crear un nuevo carrito
      axios.post('http://localhost:5000/carrito', { carritoId: null })
        .then(response => {
          carritoId = response.data.carritoId;
          localStorage.setItem('carritoId', carritoId);
        })
        .catch(error => {
          console.error('Error creando un nuevo carrito:', error);
        });
    }
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/productos/${id}`)
      .then(response => {
        const producto = response.data;
        setProducto({
          ...producto,
          price: parseFloat(producto.price)
        });
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  const handleAgregarAlCarrito = (event) => {
    event.preventDefault();

    const carritoId = localStorage.getItem('carritoId');

    if (!producto) {
      console.error('Producto no disponible.');
      return;
    }

    axios.post('http://localhost:5000/carrito', {
      productoId: producto.id,
      cantidad,
      carritoId
    })
      .then(response => {
        alert('Producto agregado al carrito');
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };

  return (
    producto ? (
      <div>
        <h1>{producto.name}</h1>
        <img src={producto.image_url} alt={producto.name} />
        <p>Precio: ${producto.price.toFixed(2)}</p>
        <form onSubmit={handleAgregarAlCarrito}>
          <label>
            Cantidad:
            <input
              type="number"
              value={cantidad}
              min="1"
              onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
            />
          </label>
          <label>
            Talla:
            <select value={talla} onChange={(e) => setTalla(e.target.value)}>
              <option value="">Selecciona una talla</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </label>
          <button type="submit">Agregar al carrito</button>
        </form>
      </div>
    ) : (
      <p>Cargando...</p>
    )
  );
}

export default ProductoDetalle;
