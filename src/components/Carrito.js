import React, { useState, useEffect } from 'react';

function Carrito() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];
    setProductos(carritoLocalStorage);

    const nuevoTotal = carritoLocalStorage.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    setTotal(nuevoTotal);
  }, []);

  const handleModificarCantidad = (productoId, talla, nuevaCantidad) => {
    const carritoActualizado = productos.map(p => 
      p.id === productoId && p.talla === talla ? { ...p, cantidad: nuevaCantidad } : p
    );
    setProductos(carritoActualizado);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    recalcularTotal(carritoActualizado);
  };

  const handleEliminarProducto = (productoId, talla) => {
    const carritoActualizado = productos.filter(p => !(p.id === productoId && p.talla === talla));
    setProductos(carritoActualizado);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    recalcularTotal(carritoActualizado);
  };

  const recalcularTotal = (carrito) => {
    const nuevoTotal = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    setTotal(nuevoTotal);
  };

  const handleVaciarCarrito = () => {
    // Vaciar el carrito en localStorage y en el estado
    localStorage.removeItem('carrito');
    setProductos([]);
    setTotal(0);
  };

  const handleIrADatosCliente = () => {
    // Validar si hay al menos un producto en el carrito
    if (productos.length > 0) {
      // Redirigir a la página de datos del cliente
      window.location.href = '/datos-cliente';
    } else {
      alert('El carrito está vacío. Agrega productos para proceder al pago.');
    }
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <ul>
        {productos.map(producto => (
          <li key={`${producto.id}-${producto.talla}`}>
            <img src={producto.imagen} alt={producto.nombre} style={{ width: '50px' }} />
            {producto.nombre} (Talla: {producto.talla}) - ${producto.precio.toFixed(2)} x {producto.cantidad}
            <button onClick={() => handleModificarCantidad(producto.id, producto.talla, producto.cantidad + 1)}>+</button>
            <button onClick={() => handleModificarCantidad(producto.id, producto.talla, Math.max(producto.cantidad - 1, 1))}>-</button>
            <button onClick={() => handleEliminarProducto(producto.id, producto.talla)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={handleVaciarCarrito}>Vaciar Carrito</button>
      <button onClick={handleIrADatosCliente}>Proceder al Pago</button>
    </div>
  );
}

export default Carrito;
