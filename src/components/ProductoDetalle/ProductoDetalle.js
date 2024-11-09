import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductoDetalle.css';

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [talla, setTalla] = useState("");

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

    if (!producto || !talla) {
      alert('Selecciona una talla.');
      return;
    }

    const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carritoLocalStorage.find(p => p.id === producto.id && p.talla === talla);

    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      carritoLocalStorage.push({
        id: producto.id,
        nombre: producto.name,
        precio: producto.price,
        imagen: producto.image_url,
        talla,
        cantidad
      });
      
    }

    localStorage.setItem('carrito', JSON.stringify(carritoLocalStorage));
    alert('Producto agregado al carrito');
  };

  return (
    producto ? (
      <div className="product-card">
        <h1 className="product-card__title">{producto.name}</h1>
        <img
          className="product-card__image"
          src={producto.image ? `/${producto.image}` : '/img/img.webp'}
          alt={producto.name}
        />
        <p className="product-card__price">Precio: ${producto.price.toFixed(2)}</p>
        <form onSubmit={handleAgregarAlCarrito} className="product-card__form">
          <label>
            Cantidad:
            <input
              type="number"
              value={cantidad}
              min="1"
              onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
              className="product-card__input"
            />
          </label>
          <label>
            Talla:
            <select value={talla} onChange={(e) => setTalla(e.target.value)} className="product-card__select">
              <option value="">Selecciona una talla</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </label>
          <button type="submit" className="product-card__button">Agregar al carrito</button>
        </form>
      </div>
    ) : (
      <p>Cargando...</p>
    )
  );
}

export default ProductoDetalle;