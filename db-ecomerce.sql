-- Active: 1717617630336@@127.0.0.1@3308
create database db_ecommerce;
use db_ecommerce;
-- Tabla de productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    link VARCHAR(255),
    type VARCHAR(50),
    category VARCHAR(50)
);

-- Tabla de clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);


-- Tabla de carritos (un único carrito por cliente)
CREATE TABLE carritos (
    id INT AUTO_INCREMENT PRIMARY KEY,                  
    numero_orden VARCHAR(50) NOT NULL UNIQUE,           
    cliente_id INT NOT NULL,                            
    cantidad_productos INT NOT NULL,                    
    monto_total DECIMAL(10, 2) NOT NULL,                
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);


-- Tabla de detalles del carrito (productos en el carrito)
CREATE TABLE carrito_detalle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrito_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    talla VARCHAR(50),
    FOREIGN KEY (carrito_id) REFERENCES carritos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Tabla de métodos de pago
CREATE TABLE metodos_pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_pago ENUM('tarjeta', 'paypal', 'transferencia') NOT NULL
);

CREATE TABLE tarjeta_pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metodo_pago_id INT,
    nombre_titular VARCHAR(100) NOT NULL,
    numero_tarjeta VARCHAR(16) NOT NULL,
    fecha_expiracion VARCHAR(5) NOT NULL,
    codigo_seguridade VARCHAR(4) NOT NULL,
    monto DECIMAL(10, 2) NOT NULL, -- Monto para la transacción
    FOREIGN KEY (metodo_pago_id) REFERENCES metodos_pago(id)
);

CREATE TABLE paypal_pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metodo_pago_id INT,
    correo_paypal VARCHAR(100) NOT NULL,
    monto DECIMAL(10, 2) NOT NULL, -- Monto para la transacción
    FOREIGN KEY (metodo_pago_id) REFERENCES metodos_pago(id)
);

CREATE TABLE transferencia_pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metodo_pago_id INT,
    banco VARCHAR(100) NOT NULL,
    numero_cuenta VARCHAR(30) NOT NULL,
    nombre_titular VARCHAR(100) NOT NULL,
    monto DECIMAL(10, 2) NOT NULL, -- Monto para la transacción
    FOREIGN KEY (metodo_pago_id) REFERENCES metodos_pago(id)
);


-- Tabla de órdenes de pago (creada cuando el cliente paga)
CREATE TABLE ordenes_pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    carrito_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,  -- Total del carrito
    metodo_pago_id INT,
    fecha_orden TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (carrito_id) REFERENCES carritos(id),
    FOREIGN KEY (metodo_pago_id) REFERENCES metodos_pago(id)
);


INSERT INTO productos (name, price, image, link, type, category) VALUES
('pantalon beige', 549, 'img/img1.webp', 'productos.html', 'pantalon', 'hombre'),
('pantalon mezclilla', 679, 'img/img2.webp', 'productos.html', 'pantalon', 'mujer'),
('pantalon mezclilla', 489, 'img/img3.webp', 'productos.html', 'pantalon', 'hombre'),
('pantalon formal', 699, 'img/img4.webp', 'productos.html', 'pantalon', 'mujer'),
('pantalon mezclilla', 479, 'img/img5.webp', 'productos.html', 'pantalon', 'hombre'),
('pantalon mezclilla', 389, 'img/img6.webp', 'productos.html', 'pantalon', 'hombre'),
('pantalon formal', 729, 'img/img7.webp', 'productos.html', 'pantalon', 'mujer'),
('pantalon mezclilla', 579, 'img/img8.webp', 'productos.html', 'pantalon', 'mujer'),
('pantalon jogger', 899, 'img/img9.webp', 'productos.html', 'pantalon', 'mujer'),
('pantalon jogger', 699, 'img/img10.webp', 'productos.html', 'pantalon', 'hombre'),
('pantalon jogger', 699, 'img/img11.webp', 'productos.html', 'pantalon', 'hombre'),
('pantalon mezclilla', 659, 'img/img12.webp', 'productos.html', 'pantalon', 'mujer'),
('pantalon mezclilla', 769, 'img/img13.webp', 'productos.html', 'pantalon', 'mujer'),
('pantalon formal', 749, 'img/img14.webp', 'productos.html', 'pantalon', 'mujer'),
('pantalon mezclilla', 449, 'img/img15.webp', 'productos.html', 'pantalon', 'hombre'),
('pantalon mezclilla', 489, 'img/img16.webp', 'productos.html', 'pantalon', 'hombre'),
('pantalon rojo', 499, 'img/img17.webp', 'productos.html', 'pantalon', 'niña'),
('pantalon mezclilla', 489, 'img/img18.webp', 'productos.html', 'pantalon', 'niño'),
('pantalon mezclilla', 469, 'img/img19.webp', 'productos.html', 'pantalon', 'niño'),
('pantalon jogger', 449, 'img/img20.webp', 'productos.html', 'pantalon', 'niño'),
('pantalon formal', 389, 'img/img21.webp', 'productos.html', 'pantalon', 'niño'),
('pantalon mezclilla', 589, 'img/img22.webp', 'productos.html', 'pantalon', 'niña'),
('pantalon jogger', 629, 'img/img23.webp', 'productos.html', 'pantalon', 'niño'),
('pantalon mezclilla', 559, 'img/img24.webp', 'productos.html', 'pantalon', 'niña'),
('pantalon mezclilla', 699, 'img/img25.webp', 'productos.html', 'pantalon', 'niño'),
('pantalon jogger', 499, 'img/img26.webp', 'productos.html', 'pantalon', 'niña'),
('pantalon jogger', 579, 'img/img27.webp', 'productos.html', 'pantalon', 'niña'),
('pantalon mezclilla', 499, 'img/img28.webp', 'productos.html', 'pantalon', 'niña'),
('pantalon jogger', 579, 'img/img29.webp', 'productos.html', 'pantalon', 'niña'),
('pantalon jogger', 799, 'img/img30.webp', 'productos.html', 'pantalon', 'niña'),
('pantalon licra', 599, 'img/img31.webp', 'productos.html', 'pantalon', 'niña'),
('Playera Blanca', 359, 'img/img32.webp', 'productos.html', 'playera', 'mujer'),
('Playera Negra Puma', 239, 'img/img33.webp', 'productos.html', 'playera', 'mujer'),
('Playera Camuflaje GAP', 289, 'img/img34.webp', 'productos.html', 'playera', 'mujer'),
('Playera Blanca LOVE', 229, 'img/img35.webp', 'productos.html', 'playera', 'mujer'),
('Playera Negra', 239, 'img/img36.webp', 'productos.html', 'playera', 'mujer'),
('Playera Beige', 219, 'img/img37.webp', 'productos.html', 'playera', 'mujer'),
('Playera Azul', 259, 'img/img38.webp', 'productos.html', 'playera', 'mujer'),
('Playera Negra Nike', 229, 'img/img39.webp', 'productos.html', 'playera', 'mujer'),
('Playera Negra', 209, 'img/img40.webp', 'productos.html', 'playera', 'mujer'),
('Playera Negra Levis', 229, 'img/img41.webp', 'productos.html', 'playera', 'mujer'),
('Playera Rosa', 209, 'img/img42.webp', 'productos.html', 'playera', 'mujer'),
('Playera Negra', 259, 'img/img43.webp', 'productos.html', 'playera', 'mujer'),
('Playera Gris/Negra', 189, 'img/img44.webp', 'productos.html', 'playera', 'hombre'),
('Playera Blanca', 209, 'img/img45.webp', 'productos.html', 'playera', 'hombre'),
('Playera Blanca', 189, 'img/img46.webp', 'productos.html', 'playera', 'hombre'),
('Playera Azul Marino', 199, 'img/img47.webp', 'productos.html', 'playera', 'hombre'),
('Playera Gris', 179, 'img/img48.webp', 'productos.html', 'playera', 'hombre'),
('Playera Blanca Estampada', 179, 'img/img49.webp', 'productos.html', 'playera', 'hombre'),
('Playera Negra', 169, 'img/img50.webp', 'productos.html', 'playera', 'hombre'),
('Playera Negra/Gris/Blanca', 189, 'img/img51.webp', 'productos.html', 'playera', 'hombre'),
('Playera Negra Estampada', 199, 'img/img52.webp', 'productos.html', 'playera', 'hombre'),
('Playera Blanca', 259, 'img/img53.webp', 'productos.html', 'playera', 'hombre'),
('Playera Rosa', 209, 'img/img54.webp', 'productos.html', 'playera', 'hombre'),
('Playera Negra', 199, 'img/img55.webp', 'productos.html', 'playera', 'hombre'),
('Playera Blanca', 159, 'img/img56.webp', 'productos.html', 'playera', 'hombre'),
('Playera Negra', 129, 'img/img57.webp', 'productos.html', 'playera', 'hombre'),
('Playera Blanca', 199, 'img/img58.webp', 'productos.html', 'playera', 'hombre'),
('Playera Negra Estampada', 209, 'img/img59.webp', 'productos.html', 'playera', 'hombre'),
('Playera Blanca Estampada', 259, 'img/img60.webp', 'productos.html', 'playera', 'hombre'),
('Playera Negra Estampada', 289, 'img/img61.webp', 'productos.html', 'playera', 'hombre'),
('Playera Negra Estampada', 209, 'img/img62.webp', 'productos.html', 'playera', 'hombre'),
('Playera Blanca Estampada', 259, 'img/img63.webp', 'productos.html', 'playera', 'hombre'),
('Playera Negra Estampada', 219, 'img/img64.webp', 'productos.html', 'playera', 'hombre'),
('Playera Blanca Estampada', 259, 'img/img65.webp', 'productos.html', 'playera', 'hombre'),
('Playera Negra Estampada', 299, 'img/img66.webp', 'productos.html', 'playera', 'hombre'),
('Playera Negra Estampada', 299, 'img/img67.webp', 'productos.html', 'playera', 'hombre'),
('Playera Negra/Azul', 209, 'img/img68.webp', 'productos.html', 'playera', 'hombre');


INSERT INTO clientes (nombre, apellido, email, password) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', 'password123'),
('María', 'García', 'maria.garcia@example.com', 'password456'),
('Carlos', 'López', 'carlos.lopez@example.com', 'password789'),
('Ana', 'Martínez', 'ana.martinez@example.com', 'password321'),
('Luis', 'Hernández', 'luis.hernandez@example.com', 'password654');


-- Insertar tipos de pago
INSERT INTO metodos_pago (tipo_pago) VALUES ('tarjeta'), ('paypal'), ('transferencia');

-- Insertar detalles para tarjeta
INSERT INTO tarjeta_pago (metodo_pago_id, nombre_titular, numero_tarjeta, fecha_expiracion, codigo_seguridade, monto) 
VALUES (1, 'Juan Pérez', '1234567812345678', '12-31', '123', 100.50);

-- Insertar detalles para PayPal
INSERT INTO paypal_pago (metodo_pago_id, correo_paypal, monto) 
VALUES (2, 'juan.perez@example.com', 50.75);

-- Insertar detalles para transferencia
INSERT INTO transferencia_pago (metodo_pago_id, banco, numero_cuenta, nombre_titular, monto) 
VALUES (3, 'Banco Ejemplo', '1234567890', 'Juan Pérez', 200.00);

