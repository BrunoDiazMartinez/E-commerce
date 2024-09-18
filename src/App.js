import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'; // Asegúrate de que el nombre del archivo es correcto
import Header from './components/Header'; // Asegúrate de que el nombre del archivo es correcto
import Footer from './components/Footer'; // Asegúrate de que el nombre del archivo es correcto
import ProductGrid from './components/ProductGrid';
import ProductoDetalle from './components/ProductoDetalle';
import Carrito from './components/Carrito';
import DatosCliente from './components/DatosCliente';
import RegistroCliente from './components/RegistroCliente';
import FormaPago from './components/FormaPago'; // Asegúrate de que el nombre del archivo es correcto

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
        .finally(() => setIsLoading(false)); // Set loading to false once the request is done
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <p>Cargando...</p>; // Mostrar un mensaje de carga o un spinner mientras se inicializa el carrito
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
