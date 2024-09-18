// src/components/Carrito.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Carrito() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [carritoId, setCarritoId] = useState(localStorage.getItem('carritoId') || null);

  useEffect(() => {
    if (carritoId) {
      axios.get(`http://localhost:5000/carrito/${carritoId}`)
        .then(response => {
          const productos = response.data;
          setProductos(productos);

          const nuevoTotal = productos.reduce((acc, producto) => acc + (producto.price * producto.cantidad), 0);
          setTotal(nuevoTotal);
        })
        .catch(error => {
          console.error('Error fetching cart products:', error);
        });
    }
  }, [carritoId]);

  const handleModificarCantidad = (productoId, cantidad) => {
    axios.put(`http://localhost:5000/carrito/${carritoId}/producto/${productoId}`, { cantidad })
      .then(() => {
        setProductos(productos.map(p => p.id === productoId ? { ...p, cantidad } : p));
      })
      .catch(error => {
        console.error('Error modifying quantity:', error);
      });
  };

  const handleEliminarProducto = (productoId) => {
    axios.delete(`http://localhost:5000/carrito/${carritoId}/producto/${productoId}`)
      .then(() => {
        setProductos(productos.filter(p => p.id !== productoId));
      })
      .catch(error => {
        console.error('Error removing product from cart:', error);
      });
  };

  const handleVaciarCarrito = () => {
    axios.delete(`http://localhost:5000/carrito/${carritoId}`)
      .then(() => {
        setProductos([]);
        setTotal(0);
        localStorage.removeItem('carritoId');
        setCarritoId(null);
      })
      .catch(error => {
        console.error('Error clearing cart:', error);
      });
  };

  const handlePagar = () => {
    const clienteId = 1; // Obtén el ID del cliente desde la sesión o el estado
    const metodoPagoId = 1; // Obtén el método de pago desde el estado o formulario

    axios.post('http://localhost:5000/compra', { carritoId, clienteId, metodoPagoId })
      .then(() => {
        handleVaciarCarrito();
        alert('Compra realizada con éxito');
      })
      .catch(error => {
        console.error('Error processing payment:', error);
      });
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            {producto.name} - ${producto.price.toFixed(2)} x {producto.cantidad}
            <button onClick={() => handleModificarCantidad(producto.id, producto.cantidad + 1)}>+</button>
            <button onClick={() => handleModificarCantidad(producto.id, Math.max(producto.cantidad - 1, 1))}>-</button>
            <button onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={handleVaciarCarrito}>Vaciar Carrito</button>
      <button onClick={handlePagar}>Proceder al Pago</button>
    </div>
  );
}

export default Carrito;
