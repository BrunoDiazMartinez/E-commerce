import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistroCliente = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar los campos del formulario
        if (!nombre || !apellido || !email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            // Enviar los datos del cliente al backend
            const response = await fetch('http://localhost:5000/registrar-cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, apellido, email, password }),
            });

            const data = await response.json();

            if (data.success) {
                // Registro exitoso, redirigir a la página de pago
                navigate('/pago');  // Cambiar a la ruta correcta para el pago
            } else {
                // Mostrar un mensaje de error si el registro falla
                alert('Error al registrar el cliente: ' + data.message);
            }
        } catch (error) {
            alert('Error al conectar con el servidor: ' + error.message);
        }
    };

    return (
        <div className="contenedor">
            <main>
                <h1>Registro de Nuevo Cliente</h1>
                <form className="formulario__registro" onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Introduce tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    
                    <label htmlFor="apellido">Apellido</label>
                    <input
                        id="apellido"
                        type="text"
                        placeholder="Introduce tu apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Introduce tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Introduce tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="registro__button">
                        <input className="registro__submit" type="submit" value="Registrar" />
                    </div>
                </form>
            </main>
        </div>
    );
};

export default RegistroCliente;
