import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistroCliente = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar los campos del formulario
        if (!nombre || !apellido || !email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Guardar los datos del cliente (opcional: puedes conectarlo con el backend o localStorage)
        localStorage.setItem('cliente-nuevo', JSON.stringify({ nombre, apellido, email }));

        // Redirigir a la página de pago
        navigate('/forma-pago');  // Ruta a la página de pago
    };

    return (
        <div className="contenedor">
            <header className="header">
                <a href="/">
                    <img className="header__logo" src="/img/logo.png" alt="logoTipo" />
                </a>
            </header>
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
            <footer className="footer">
                <p className="footer__texto">Todos los derechos reservados. @Bruno_tz</p>
            </footer>
        </div>
    );
};

export default RegistroCliente;
