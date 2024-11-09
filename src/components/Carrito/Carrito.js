import React, { useState, useEffect } from 'react';
import './Carrito.css';

function Carrito() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];
    setProductos(carritoLocalStorage);
    console.log(localStorage.getItem('carrito'));

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
    localStorage.removeItem('carrito');
    setProductos([]);
    setTotal(0);
  };

  const handleIrADatosCliente = () => {
    if (productos.length > 0) {
      window.location.href = '/datos-cliente';
    } else {
      alert('El carrito está vacío. Agrega productos para proceder al pago.');
    }
  };

  return (
    <div className="carrito-container">
      <h1>Carrito de Compras</h1>
      <ul>
        {productos.map(producto => (
          <li key={`${producto.id}-${producto.talla}`}>
            <img src={producto.imagen ? `/${producto.imagen}` : '/img/default.webp'} alt={producto.nombre} />
            {console.log('Producto Imagen:', producto.imagen)}
            <div>
              {producto.nombre} (Talla: {producto.talla}) - ${producto.precio.toFixed(2)} x {producto.cantidad}
              <div>
                <button onClick={() => handleModificarCantidad(producto.id, producto.talla, producto.cantidad + 1)}>+</button>
                <button onClick={() => handleModificarCantidad(producto.id, producto.talla, Math.max(producto.cantidad - 1, 1))}>-</button>
                <button onClick={() => handleEliminarProducto(producto.id, producto.talla)}>Eliminar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="carrito-total">Total: ${total.toFixed(2)}</p>
      <div className="carrito-actions">
        <button onClick={handleVaciarCarrito}>Vaciar Carrito</button>
        <button onClick={handleIrADatosCliente}>Proceder al Pago</button>
      </div>
    </div>
  );
}

export default Carrito;
