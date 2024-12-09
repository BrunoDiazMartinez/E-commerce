from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
db_config = {
    'host': 'localhost',
    'port': 3308,
    'user': 'root',
    'password': 'root',
    'database': 'db_ecommerce'
}

# Ruta para obtener todos los productos
@app.route('/productos', methods=['GET'])
def get_productos():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM productos")
        productos = cursor.fetchall()
        for producto in productos:
            producto['price'] = float(producto['price'])
        return jsonify(productos)
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# Ruta para obtener un producto por ID
@app.route('/productos/<int:id>', methods=['GET'])
def get_producto_by_id(id):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM productos WHERE id = %s", (id,))
        producto = cursor.fetchone()
        if producto:
            producto['price'] = float(producto['price'])
            return jsonify(producto)
        else:
            return jsonify({'error': 'Producto no encontrado'}), 404
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# Ruta para validar pago
@app.route('/validar-pago', methods=['POST'])
def validar_pago():
    data = request.json
    metodo = data.get('metodo')
    
    if metodo == 'tarjeta':
        nombre = data.get('nombre')
        numero_tarjeta = data.get('numeroTarjeta')
        fecha_expiracion = data.get('fechaExpiracion')
        cvv = data.get('cvv')
        
        if not all([nombre, numero_tarjeta, fecha_expiracion, cvv]):
            return jsonify({'valido': False, 'mensaje': 'Todos los campos son requeridos para el pago con tarjeta.'}), 400
        
        try:
            connection = mysql.connector.connect(**db_config)
            cursor = connection.cursor(dictionary=True)
            query = """
                SELECT * FROM tarjeta_pago 
                WHERE nombre_titular = %s AND numero_tarjeta = %s 
                AND fecha_expiracion = %s AND codigo_seguridade = %s
            """
            cursor.execute(query, (nombre, numero_tarjeta, fecha_expiracion, cvv))
            result = cursor.fetchone()
            if result:
                return jsonify({'valido': True})
            else:
                return jsonify({'valido': False, 'mensaje': 'Datos de tarjeta incorrectos.'})
        except mysql.connector.Error as err:
            return jsonify({'valido': False, 'mensaje': 'Error en la base de datos.'}), 500
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    elif metodo == 'paypal':
        correo_paypal = data.get('correoPaypal')
        if not correo_paypal:
            return jsonify({'valido': False, 'mensaje': 'El correo de PayPal es requerido.'}), 400
        
        try:
            connection = mysql.connector.connect(**db_config)
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT * FROM paypal_pago WHERE correo_paypal = %s", (correo_paypal,))
            result = cursor.fetchone()
            if result:
                return jsonify({'valido': True})
            else:
                return jsonify({'valido': False, 'mensaje': 'Correo de PayPal incorrecto.'})
        except mysql.connector.Error as err:
            return jsonify({'valido': False, 'mensaje': 'Error en la base de datos.'}), 500
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    elif metodo == 'transferencia':
        return jsonify({'valido': True, 'mensaje': 'Pago por transferencia aceptado.'})

    else:
        return jsonify({'valido': False, 'mensaje': 'Método de pago no válido.'}), 400

# Ruta para registrar cliente
@app.route('/registrar-cliente', methods=['POST'])
def registrar_cliente():
    data = request.json
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    email = data.get('email')
    password = data.get('password')
    
    if not all([nombre, apellido, email, password]):
        return jsonify({'success': False, 'message': 'Por favor, completa todos los campos.'}), 400
    
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM clientes WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({'success': False, 'message': 'El correo electrónico ya está registrado.'}), 400
        
        cursor.execute("INSERT INTO clientes (nombre, apellido, email, password) VALUES (%s, %s, %s, %s)",
                       (nombre, apellido, email, password))
        connection.commit()
        return jsonify({'success': True, 'message': 'Cliente registrado correctamente.'})
    except mysql.connector.Error as err:
        return jsonify({'success': False, 'message': 'Error al registrar el cliente en la base de datos.'}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == '__main__':
    app.run(port=5000, debug=True)
