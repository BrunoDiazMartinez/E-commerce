// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: 'root',
    database: 'db_ecommerce'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

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

app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        const producto = results[0];
        producto.price = parseFloat(producto.price);
        res.json(producto);
    });
});

app.post('/validar-pago', (req, res) => {
    const { metodo, ...datos } = req.body;

    if (metodo === 'tarjeta') {
        const { nombre, numeroTarjeta, fechaExpiracion, cvv } = datos;

        if (!nombre || !numeroTarjeta || !fechaExpiracion || !cvv) {
            return res.status(400).json({ valido: false, mensaje: 'Todos los campos son requeridos para el pago con tarjeta.' });
        }

        db.query('SELECT * FROM tarjeta_pago WHERE nombre_titular = ? AND numero_tarjeta = ? AND fecha_expiracion = ? AND codigo_seguridade = ?',
            [nombre, numeroTarjeta, fechaExpiracion, cvv],
            (error, results) => {
                if (error) {
                    console.error('Error en la consulta de tarjeta:', error);
                    return res.status(500).json({ valido: false, mensaje: 'Error en la base de datos.' });
                }
                if (results.length > 0) {
                    return res.json({ valido: true });
                } else {
                    return res.json({ valido: false, mensaje: 'Datos de tarjeta incorrectos.' });
                }
            }
        );

    } else if (metodo === 'paypal') {
        const { correoPaypal } = datos;

        if (!correoPaypal) {
            return res.status(400).json({ valido: false, mensaje: 'El correo de PayPal es requerido.' });
        }

        db.query('SELECT * FROM paypal_pago WHERE correo_paypal = ?', [correoPaypal], (error, results) => {
            if (error) {
                console.error('Error en la consulta de PayPal:', error);
                return res.status(500).json({ valido: false, mensaje: 'Error en la base de datos.' });
            }
            if (results.length > 0) {
                return res.json({ valido: true });
            } else {
                return res.json({ valido: false, mensaje: 'Correo de PayPal incorrecto.' });
            }
        });

    } else if (metodo === 'transferencia') {
        return res.json({ valido: true, mensaje: 'Pago por transferencia aceptado.' });

    } else {
        res.status(400).json({ valido: false, mensaje: 'Método de pago no válido.' });
    }
});

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

app.post('/registrar-cliente', (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ success: false, message: 'Por favor, completa todos los campos.' });
    }
    const sqlCheck = 'SELECT * FROM clientes WHERE email = ?';
    db.query(sqlCheck, [email], (checkError, results) => {
        if (checkError) {
            return res.status(500).json({ success: false, message: 'Error en la base de datos.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ success: false, message: 'El correo electrónico ya está registrado.' });
        }
        const sql = 'INSERT INTO clientes (nombre, apellido, email, password) VALUES (?, ?, ?, ?)';

        db.query(sql, [nombre, apellido, email, password], (error, result) => {
            if (error) {
                return res.status(500).json({ success: false, message: 'Error al registrar el cliente en la base de datos.' });
            }
            res.json({ success: true, message: 'Cliente registrado correctamente.' });
        });
    });
});

app.post('/crear-orden', async (req, res) => {//bandera apagada
    const { cliente_id, carrito_id, metodo_pago_id, total } = req.body;
    if (!cliente_id || !carrito_id || !metodo_pago_id || !total) {
        return res.status(400).json({ error: 'Faltan datos para crear la orden' });
    }

    try {
        const query = `
            INSERT INTO ordenes_pago (cliente_id, carrito_id, metodo_pago_id, total)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [cliente_id, carrito_id, metodo_pago_id, total]);

        res.status(200).json({ message: 'Orden creada con éxito', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al crear la orden' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});