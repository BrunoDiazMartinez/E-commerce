import React from 'react';

const PagoTarjeta = () => {
    return (
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
    );
};

export default PagoTarjeta;
