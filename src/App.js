import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductGrid from './components/ProductGrid/ProductGrid';
import ProductoDetalle from './components/ProductoDetalle/ProductoDetalle';
import Confirmacion from './components/Confirmacion/Confirmacion';
import Carrito from './components/Carrito/Carrito';
import DatosCliente from './components/DatosCliente/DatosCliente';
import RegistroCliente from './components/RegistroCliente/RegistroCliente';
import FormaPago from './components/FormaPago/FormaPago';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carritoId = localStorage.getItem('carritoId');
    if (!carritoId) {
      axios.post('http://localhost:5000/carrito', { carritoId: null })
        .then(response => {
          localStorage.setItem('carritoId', response.data.carritoId);
        })
        .catch(error => {
          console.error('Error initializing cart:', error);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <Router>
      <div>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductGrid />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/datos-cliente" element={<DatosCliente />} />
          <Route path="/registro" element={<RegistroCliente />} />
          <Route path="/pago" element={<FormaPago />} />
          <Route path="/Confirmacion" element={<Confirmacion />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
