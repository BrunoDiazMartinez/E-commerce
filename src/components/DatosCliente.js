import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DatosCliente() {
  const [esCliente, setEsCliente] = useState(null);
  const [emailCliente, setEmailCliente] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const manejarSeleccion = (e) => {
    setEsCliente(e.target.value);
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(emailCliente)) {
      alert('Por favor, introduce un email válido.');
      return;
    }
    e.preventDefault();

    if (esCliente === 'si') {
      try {
        const response = await axios.post('http://localhost:5000/validar-usuario', {
          email: emailCliente,
          password: password
        });

        if (response.data.existe) {
          // Si el usuario es válido, redirige a la página de pago
          navigate('/pago');
        } else {
          alert('Email o contraseña incorrectos. Por favor, intenta de nuevo.');
        }
      } catch (error) {
        console.error('Error al validar el usuario:', error);
        alert('Hubo un problema al validar el usuario. Intenta de nuevo más tarde.');
      }
    }
  };

  const handleRegistro = () => {
    navigate('/registro');
  };

  const handleContinuarPago = () => {
    navigate('/pago');
  };

  return (
    <div className="contenedor">
      <h1>¿Eres cliente?</h1>
      <form onSubmit={handleSubmit} className="formulario__cliente">
        <label>Selecciona una opción:</label>
        <div className="formulario__cliente__campos">
          <label>
            <input type="radio" name="es_cliente" value="si" onChange={manejarSeleccion} />
            Sí
          </label>
          <label>
            <input type="radio" name="es_cliente" value="no" onChange={manejarSeleccion} />
            No
          </label>
        </div>

        {esCliente === 'si' && (
          <div>
            <label>Email Cliente</label>
            <input
              type="email"
              value={emailCliente}
              onChange={(e) => setEmailCliente(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Continuar al Pago</button>
          </div>
        )}

        {esCliente === 'no' && (
          <div id="opciones-no-cliente">
            <h2>No eres cliente. ¿Qué deseas hacer?</h2>
            <button onClick={handleRegistro}>Registrarme</button>
            <button onClick={handleContinuarPago}>Continuar sin registrarme</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default DatosCliente;
