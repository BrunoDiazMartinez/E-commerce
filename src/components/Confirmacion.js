import React from 'react';
import jsPDF from 'jspdf';

const Confirmacion = () => {
    const generarPDF = () => {
        const doc = new jsPDF();
        doc.text("Gracias por tu compra", 20, 20);
        doc.text("Número de orden: 123456", 20, 30); // Puedes personalizar esto con datos reales
        doc.text("Total: $100.50", 20, 40);
        doc.save("ticket-confirmacion.pdf");
    };

    return (
        <main className="contenedor">
            <h1>Confirmación de Compra</h1>
            <p>Gracias por tu compra. Tu pedido ha sido procesado con éxito.</p>
            <button onClick={generarPDF}>Descargar Ticket</button>
        </main>
    );
};

export default Confirmacion;
