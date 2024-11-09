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
        // Validar y procesar el pago (como en el código original)
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
