// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    port: 3308, // Cambia este puerto si es necesario
    user: 'root',
    password: 'root',
    database: 'db_ecommerce'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const productos = results.map(producto => ({
            ...producto,
            price: parseFloat(producto.price)
        }));
        res.json(productos);
    });
});

// Endpoint para validar el pago
app.post('/validar-pago', (req, res) => {
    const { metodo, ...datos } = req.body;

    if (metodo === 'tarjeta') {
        const { nombre, numeroTarjeta, fechaExpiracion, cvv } = datos;

        // Verificar que todos los campos estén completos
        if (!nombre || !numeroTarjeta || !fechaExpiracion || !cvv) {
            return res.status(400).json({ valido: false, mensaje: 'Todos los campos son requeridos para el pago con tarjeta.' });
        }

        // Consulta para validar la tarjeta
        db.query('SELECT * FROM tarjeta_pago WHERE nombre_titular = ? AND numero_tarjeta = ? AND fecha_expiracion = ? AND codigo_seguridade = ?',
            [nombre, numeroTarjeta, fechaExpiracion, cvv],
            (error, results) => {
                if (error) {
                    console.error('Error en la consulta de tarjeta:', error);
                    return res.status(500).json({ valido: false, mensaje: 'Error en la base de datos.' });
                }
                // Si se encuentra la tarjeta válida
                if (results.length > 0) {
                    return res.json({ valido: true });
                } else {
                    return res.json({ valido: false, mensaje: 'Datos de tarjeta incorrectos.' });
                }
            }
        );

    } else if (metodo === 'paypal') {
        const { correoPaypal } = datos;

        // Verificar que todos los campos estén completos
        if (!correoPaypal) {
            return res.status(400).json({ valido: false, mensaje: 'El correo de PayPal es requerido.' });
        }

        // Consulta para validar el correo de PayPal
        db.query('SELECT * FROM paypal WHERE correo = ?', [correoPaypal], (error, results) => {
            if (error) {
                console.error('Error en la consulta de PayPal:', error);
                return res.status(500).json({ valido: false, mensaje: 'Error en la base de datos.' });
            }
            // Si se encuentra el correo de PayPal
            if (results.length > 0) {
                return res.json({ valido: true });
            } else {
                return res.json({ valido: false, mensaje: 'Correo de PayPal incorrecto.' });
            }
        });

    } else if (metodo === 'transferencia') {
        const { numeroCuenta } = datos;

        // Verificar que todos los campos estén completos
        if (!numeroCuenta) {
            return res.status(400).json({ valido: false, mensaje: 'El número de cuenta es requerido.' });
        }

        // Consulta para validar la transferencia
        db.query('SELECT * FROM transferencias WHERE numero_cuenta = ?', [numeroCuenta], (error, results) => {
            if (error) {
                console.error('Error en la consulta de transferencia:', error);
                return res.status(500).json({ valido: false, mensaje: 'Error en la base de datos.' });
            }
            // Si se encuentra la transferencia válida
            if (results.length > 0) {
                return res.json({ valido: true });
            } else {
                return res.json({ valido: false, mensaje: 'Número de cuenta de transferencia incorrecto.' });
            }
        });

    } else {
        res.status(400).json({ valido: false, mensaje: 'Método de pago no válido.' });
    }
});


// Ruta para validar usuario
app.post('/validar-usuario', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM clientes WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            console.error('Error al validar usuario:', err);
            return res.status(500).json({ error: 'Error al validar usuario' });
        }
        if (results.length > 0) {
            res.json({ existe: true });
        } else {
            res.json({ existe: false });
        }
    });
});

// Inicia el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
