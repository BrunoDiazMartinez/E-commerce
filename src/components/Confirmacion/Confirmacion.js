import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';

const Confirmacion = () => {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [cliente, setCliente] = useState({});
    const [numeroOrden, setNumeroOrden] = useState('');
    const navigate = useNavigate(); // Para redireccionar

    const generarNumeroOrden = () => {
        const numeroAleatorio = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase();
        return `ORD-${numeroAleatorio}`;
    };

    useEffect(() => {
        const carritoData = JSON.parse(localStorage.getItem('carrito')) || [];
        setCarrito(carritoData);

        const clienteData = JSON.parse(localStorage.getItem('cliente')) || {};
        setCliente(clienteData);

        let numeroOrdenExistente = localStorage.getItem('numeroOrden');
        if (!numeroOrdenExistente) {
            numeroOrdenExistente = generarNumeroOrden();
            localStorage.setItem('numeroOrden', numeroOrdenExistente);
        }
        setNumeroOrden(numeroOrdenExistente);

        const totalCalculado = carritoData.reduce((acc, producto) => {
            const precio = producto.precio ? producto.precio : 0;
            return acc + (precio * producto.cantidad);
        }, 0);
        setTotal(totalCalculado.toFixed(2));
    }, []);

    const generarPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Ticket de Compra', 10, 10);
        doc.setFontSize(12);
        doc.text(`Número de Orden: ${numeroOrden}`, 10, 20);
        const clienteInfo = cliente.email ? `Cliente: ${cliente.email}` : `Usuario: ${cliente.usuario}`;
        doc.text(clienteInfo, 10, 30);
        doc.text('Detalles de la compra:', 10, 40);
        let yPos = 50;
        carrito.forEach((producto, index) => {
            const precio = producto.precio ? producto.precio.toFixed(2) : '0.00';
            const detalleProducto = `${index + 1}. ${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${precio}`;
            doc.text(detalleProducto, 10, yPos);
            yPos += 10;
        });
        doc.text(`Total: $${total}`, 10, yPos + 10);
        doc.save('ticket_compra.pdf');
        localStorage.removeItem('carrito');
        localStorage.removeItem('cliente');
        localStorage.removeItem('numeroOrden');

        navigate('/');
    };

    return (
        <div className="contenedor">
            <main>
                <h1>Compra realizada con éxito</h1>
                <h2>Resumen del Carrito</h2>

                {carrito.length > 0 ? (
                    <div>
                        <ul>
                            {carrito.map((producto, index) => (
                                <li key={index}>
                                    {producto.nombre} - {producto.cantidad} unidad(es) - $
                                    {producto.precio ? producto.precio.toFixed(2) : '0.00'}
                                </li>
                            ))}
                        </ul>
                        <h3>Total: ${total}</h3>
                    </div>
                ) : (
                    <p>No hay productos en el carrito.</p>
                )}
                <button onClick={generarPDF}>Generar tu Ticket </button>
            </main>
        </div>
    );
};

export default Confirmacion;