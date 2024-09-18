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

// Ruta para obtener un producto específico por ID
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

// server.js

// Agregar producto al carrito
app.post('/carrito', (req, res) => {
    const { productoId, cantidad, carritoId } = req.body;

    let clienteId = null; // Asignar clienteId como NULL si no está presente en el request

    if (!carritoId) {
        db.query('INSERT INTO carritos (cliente_id, fecha_creacion) VALUES (?, NOW())', [clienteId], (err, result) => {
            if (err) {
                console.error('Error creando carrito:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            const nuevoCarritoId = result.insertId;
            db.query('INSERT INTO carrito_detalle (carrito_id, producto_id, cantidad) VALUES (?, ?, ?)', [nuevoCarritoId, productoId, cantidad], (err) => {
                if (err) {
                    console.error('Error agregando producto al carrito:', err);
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.status(201).json({ carritoId: nuevoCarritoId, message: 'Producto agregado al carrito' });
            });
        });
    } else {
        db.query('INSERT INTO carrito_detalle (carrito_id, producto_id, cantidad) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE cantidad = cantidad + VALUES(cantidad)', [carritoId, productoId, cantidad], (err) => {
            if (err) {
                console.error('Error agregando producto al carrito:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Producto agregado al carrito' });
        });
    }
});


// Obtener productos del carrito
app.get('/carrito/:carritoId', (req, res) => {
    const { carritoId } = req.params;
    db.query(`
        SELECT p.*, cp.cantidad 
        FROM carrito_detalle cp
        JOIN productos p ON cp.producto_id = p.id
        WHERE cp.carrito_id = ?
    `, [carritoId], (err, results) => {
        if (err) {
            console.error('Error fetching cart:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Modificar cantidad del producto en el carrito
app.put('/carrito/:carritoId/producto/:productoId', (req, res) => {
    const { carritoId, productoId } = req.params;
    const { cantidad } = req.body;

    db.query('UPDATE carrito_detalle SET cantidad = ? WHERE carrito_id = ? AND producto_id = ?', [cantidad, carritoId, productoId], (err) => {
        if (err) {
            console.error('Error updating quantity:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Cantidad actualizada' });
    });
});

// Eliminar producto del carrito
app.delete('/carrito/:carritoId/producto/:productoId', (req, res) => {
    const { carritoId, productoId } = req.params;

    db.query('DELETE FROM carrito_detalle WHERE carrito_id = ? AND producto_id = ?', [carritoId, productoId], (err, result) => {
        if (err) {
            console.error('Error removing product from cart:', err);
            res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
            return;
        }
        res.status(200).json({ message: 'Producto eliminado del carrito' });
    });
});

// Vaciar carrito
app.delete('/carrito/:carritoId', (req, res) => {
    const { carritoId } = req.params;

    db.query('DELETE FROM carrito_detalle WHERE carrito_id = ?', [carritoId], (err) => {
        if (err) {
            console.error('Error clearing cart:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Carrito vaciado' });
    });
});

// Finalizar la compra
app.post('/compra', (req, res) => {
    const { carritoId, clienteId, metodoPagoId } = req.body;

    // Crear una nueva orden de pago
    db.query('INSERT INTO ordenes_pago (carrito_id, cliente_id, metodo_pago_id, fecha, total) SELECT carrito_id, ?, ?, NOW(), SUM(p.price * cp.cantidad) FROM carrito_detalle cp JOIN productos p ON cp.producto_id = p.id WHERE carrito_id = ? GROUP BY carrito_id', [clienteId, metodoPagoId, carritoId], (err, result) => {
        if (err) {
            console.error('Error creating payment order:', err);
            res.status(500).json({ error: err.message });
            return;
        }

        // Vaciar el carrito
        db.query('DELETE FROM carrito_detalle WHERE carrito_id = ?', [carritoId], (err) => {
            if (err) {
                console.error('Error clearing cart after purchase:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: 'Compra realizada con éxito' });
        });
    });
});

// Inicia el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
