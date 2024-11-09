// Spinner.js
import React from 'react';
import './Spinner.css'; // Estilos para el spinner

const Spinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <p>Procesando tu pago...</p>
  </div>
);

export default Spinner;