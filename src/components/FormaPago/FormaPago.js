import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PagoTarjeta from './PagoTarjeta/PagoTarjeta';
import PagoPayPal from './PagoPaypal/PagoPaypal';
import PagoTransferencia from './PagoTransferencia/PagoTransferencia';
import Spinner from '../Spinner/Spinner';
import './FormaPago.css';

const FormaPago = () => {
    const [formaPago, setFormaPago] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formaPago) {
            alert('Por favor, selecciona un método de pago.');
            return;
        }

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
            };
        }

        setIsProcessing(true);

        setTimeout(async () => {
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
                    navigate('/confirmacion');
                } else {
                    alert('Los datos de pago son incorrectos.');
                }
            } catch (error) {
                console.error('Error al validar el pago:', error);
                alert('Error en la validación del pago. Intenta de nuevo.');
            } finally {
                setIsProcessing(false);
            }
        }, 2000);
    };

    return (
        <main className="contenedor">
            <h1>Forma de Pago</h1>

            {isProcessing && (
                <div className="overlay">
                    <div className="spinner-container">
                        <Spinner />
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="formulario__pago">
                <h2>Selecciona una forma de pago:</h2>
                <div className="formulario__campo">
                    <label>
                        <input
                            type="radio"
                            name="forma-pago"
                            value="tarjeta"
                            checked={formaPago === 'tarjeta'}
                            onChange={(e) => setFormaPago(e.target.value)}
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
                            onChange={(e) => setFormaPago(e.target.value)}
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
                            onChange={(e) => setFormaPago(e.target.value)}
                        /> Transferencia Bancaria
                    </label>
                </div>

                {formaPago === 'tarjeta' && <PagoTarjeta />}
                {formaPago === 'paypal' && <PagoPayPal />}
                {formaPago === 'transferencia' && <PagoTransferencia />}

                <input className="formulario__submit" type="submit" value="Pagar" />
            </form>
        </main>
    );
};

export default FormaPago;
