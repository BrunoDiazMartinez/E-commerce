import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DatosCliente.css';

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

  // Generar número de orden aleatorio en formato hexadecimal
  const generarNumeroOrden = () => {
    return Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  };

  // Guardar información del cliente en localStorage
  const guardarInformacionCliente = (email, numeroOrden) => {
    localStorage.setItem('cliente', JSON.stringify({ email, numeroOrden }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(emailCliente)) {
      alert('Por favor, introduce un email válido.');
      return;
    }

    if (esCliente === 'si') {
      try {
        const response = await axios.post('http://localhost:5000/validar-usuario', {
          email: emailCliente,
          password: password
        });

        if (response.data.existe) {
          // Generar número de orden
          const numeroOrden = generarNumeroOrden();

          // Guardar la información del cliente y número de orden en localStorage
          guardarInformacionCliente(emailCliente, numeroOrden);

          // Redirigir a la página de pago
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
    // Generar número de orden
    const numeroOrden = generarNumeroOrden();

    // Crear un usuario provisional en el formato "User_#deorden"
    const usuarioProvisional = `User_${numeroOrden}`;

    // Guardar el usuario provisional en el localStorage
    localStorage.setItem('cliente', JSON.stringify({ usuario: usuarioProvisional, numeroOrden }));
    console.log(usuarioProvisional)
    // Redirigir a la página de pago
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
            <button type="button" onClick={handleContinuarPago}>Continuar sin registrarme</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default DatosCliente;
