import React from 'react';

const PagoPayPal = () => {
    return (
        <div id="seccion-paypal">
            <h3>Pago con PayPal</h3>
            <div className="formulario__campo">
                <label htmlFor="correo-paypal">Correo Electrónico</label>
                <input id="correo-paypal" type="email" placeholder="Introduce tu correo de PayPal" required />
            </div>
        </div>
    );
};

export default PagoPayPal;
