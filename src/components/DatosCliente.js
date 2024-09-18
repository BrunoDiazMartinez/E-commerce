import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DatosCliente() {
  const [esCliente, setEsCliente] = useState(null);
  const [idCliente, setIdCliente] = useState('');
  const [password, setPassword] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [apellidoCliente, setApellidoCliente] = useState('');
  const navigate = useNavigate();

  const usuariosExistentes = [
    { id: '12345', password: 'password123', nombre: 'Juan', apellido: 'Pérez' },
    { id: '67890', password: 'password456', nombre: 'María', apellido: 'García' }
  ];

  const manejarSeleccion = (e) => {
    setEsCliente(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (esCliente === 'si') {
      const usuarioValido = usuariosExistentes.find(usuario =>
        usuario.id === idCliente &&
        usuario.password === password &&
        usuario.nombre === nombreCliente &&
        usuario.apellido === apellidoCliente
      );

      if (!usuarioValido) {
        alert('ID, contraseña, nombre o apellido incorrectos. Por favor, intenta de nuevo.');
        return;
      }

      // Si el usuario es válido, redirige a la página de pago
      navigate('/pago');
    } 
  };

  const handleRegistro = () => {
    // Redirige a la página de registro si elige registrarse
    navigate('/registro');
  };

  const handleContinuarPago = () => {
    // Redirige a la página de pago si elige continuar sin registrarse
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
            <label>ID Cliente</label>
            <input
              type="text"
              value={idCliente}
              onChange={(e) => setIdCliente(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Nombre</label>
            <input
              type="text"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              required
            />
            <label>Apellido</label>
            <input
              type="text"
              value={apellidoCliente}
              onChange={(e) => setApellidoCliente(e.target.value)}
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

