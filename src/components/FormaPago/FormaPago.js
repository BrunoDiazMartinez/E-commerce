import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormaPago.css';

const FormaPago = () => {
    const [formaPago, setFormaPago] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormaPago(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validar que se ha seleccionado un método de pago
        if (!formaPago) {
            alert('Por favor, selecciona un método de pago.');
            return;
        }

        // Datos a enviar
        let datosPago = {};
        if (formaPago === 'tarjeta') {
            datosPago = {
                metodo: formaPago,
                nombre: document.getElementById('nombre').value,
                numeroTarjeta: document.getElementById('numero-tarjeta').value,
                fechaExpiracion: document.getElementById('fecha-expiracion').value,
                cvv: document.getElementById('cvv').value,
            };
            if (!datosPago.nombre || !datosPago.numeroTarjeta || !datosPago.fechaExpiracion || !datosPago.cvv) {
                alert('Por favor, completa todos los campos de la tarjeta.');
                return;
            }
        } else if (formaPago === 'paypal') {
            datosPago = {
                metodo: formaPago,
                correoPaypal: document.getElementById('correo-paypal').value,
            };
            if (!datosPago.correoPaypal) {
                alert('Por favor, introduce tu correo de PayPal.');
                return;
            }
        } else if (formaPago === 'transferencia') {
            datosPago = {
                metodo: formaPago,
                // Agrega más datos si es necesario para validación
            };
        }

        // Validar datos en la base de datos
        try {
            const response = await fetch('http://localhost:5000/validar-pago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosPago),
            });

            const resultado = await response.json();

            if (resultado.valido) {
                alert('Pago realizado con éxito');
                navigate('/confirmacion'); // Redirigir a la página de confirmación
            } else {
                alert('Los datos de pago son incorrectos.');
            }
        } catch (error) {
            console.error('Error al validar el pago:', error);
            alert('Error en la validación del pago. Intenta de nuevo.');
        }
    };

    return (
        <main className="contenedor">
            <h1>Forma de Pago</h1>

            <form onSubmit={handleSubmit} className="formulario__pago">
                <h2>Selecciona una forma de pago:</h2>
                <div className="formulario__campo">
                    <label>
                        <input
                            type="radio"
                            name="forma-pago"
                            value="tarjeta"
                            checked={formaPago === 'tarjeta'}
                            onChange={handleChange}
                        /> Tarjeta de Crédito/Débito
                    </label>
                </div>
                <div className="formulario__campo">
                    <label>
                        <input
                            type="radio"
                            name="forma-pago"
                            value="paypal"
                            checked={formaPago === 'paypal'}
                            onChange={handleChange}
                        /> PayPal
                    </label>
                </div>
                <div className="formulario__campo">
                    <label>
                        <input
                            type="radio"
                            name="forma-pago"
                            value="transferencia"
                            checked={formaPago === 'transferencia'}
                            onChange={handleChange}
                        /> Transferencia Bancaria
                    </label>
                </div>

                {/* Campos para Tarjeta de Crédito/Débito */}
                {formaPago === 'tarjeta' && (
                    <div id="seccion-tarjeta">
                        <h3>Pago con Tarjeta de Crédito/Débito</h3>
                        <div className="formulario__campo">
                            <label htmlFor="nombre">Nombre del Titular</label>
                            <input id="nombre" type="text" placeholder="Nombre del titular de la tarjeta" required />
                        </div>

                        <div className="formulario__campo">
                            <label htmlFor="numero-tarjeta">Número de Tarjeta</label>
                            <input id="numero-tarjeta" type="text" placeholder="1234 5678 9101 1121" required />
                        </div>

                        <div className="formulario__campo">
                            <label htmlFor="fecha-expiracion">Fecha de Expiración</label>
                            <input id="fecha-expiracion" type="text" placeholder="MM/AA" required />
                        </div>

                        <div className="formulario__campo">
                            <label htmlFor="cvv">CVV</label>
                            <input id="cvv" type="text" placeholder="123" required />
                        </div>
                    </div>
                )}

                {/* Campos para PayPal */}
                {formaPago === 'paypal' && (
                    <div id="seccion-paypal">
                        <h3>Pago con PayPal</h3>
                        <div className="formulario__campo">
                            <label htmlFor="correo-paypal">Correo Electrónico</label>
                            <input id="correo-paypal" type="email" placeholder="Introduce tu correo de PayPal" required />
                        </div>
                    </div>
                )}

                {/* Campos para Transferencia Bancaria */}
                {formaPago === 'transferencia' && (
                    <div id="seccion-transferencia">
                        <h3>Pago con Transferencia Bancaria</h3>
                        <p>Para completar la compra, realiza la transferencia a la siguiente cuenta bancaria:</p>
                        <ul>
                            <li>Banco: Ejemplo Banco</li>
                            <li>Número de Cuenta: 1234567890</li>
                            <li>CLABE: 012345678901234567</li>
                        </ul>
                    </div>
                )}

                <input className="formulario__submit" type="submit" value="Pagar" />
            </form>
        </main>
    );
};

export default FormaPago;
