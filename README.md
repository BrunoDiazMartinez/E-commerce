# OVERVIEW DEL SISTEMA

## El proyecto es una aplicación de e-commerce desarrollada con React en el frontend y una base de datos MySQL en el backend. Incluye funcionalidades clave para gestionar productos, carritos de compra, clientes y órdenes de pago. A continuación se da un overview de los principales componentes y funcionalidades que este contiene:

### Frontend:

# Página de productos: Lista los productos disponibles en un formato de cuadrícula.
# Carrito de compras: Los usuarios pueden agregar productos al carrito, modificar cantidades y eliminar productos. El estado del carrito se gestiona principalmente en el localStorage.
# Validación de clientes: Los usuarios pueden registrarse o continuar como "usuario provisional". Los clientes registrados son verificados por correo y contraseña.
# Generación de tickets en PDF: Al confirmar una compra, se genera un ticket en formato PDF con detalles del carrito, el número de orden y la información del cliente.
# Redirección y manejo del localStorage: Al finalizar la compra, se limpia el localStorage y se redirige al usuario a la página principal.

### Backend:

# Tablas de la base de datos: Gestión de productos, clientes, carritos, órdenes de pago y métodos de pago. Se incluyó la relación entre carritos y clientes.
# Lógica del carrito y órdenes: Implementación de la lógica para manejar un número único de orden, asociar el carrito con un cliente o un usuario provisional, y calcular la cantidad de 
# productos y el total.

## Flujo de Usuario:

### Los usuarios pueden navegar por los productos, añadirlos al carrito y proceder al pago, ya sea como cliente registrado o como un usuario provisional. Tras confirmar la compra, se genera un ticket con los detalles y se redirige al inicio.

