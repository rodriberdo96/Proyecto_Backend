# Proyecto_Backend

Se realizó el backend de una aplicación de ecommerce integrando administración de usuarios y notificaciones a los mismos.

Secciones:

Auth:

Register: Registra un usuario nuevo, encriptando la contraseña.
Login: Da acceso al usuario, generando el token de autenticación.
Products:

Crea un producto nuevo.
Muestra todos los productos guardados en la base de datos.
Muestra un producto por id.
Muestra productos en base a su categoria.
Actualiza un producto.
Elimina un producto.
Cart:

Crea un carrito.
Muestra todos los carritos generados en la base de datos.
Elimina un carrito por id.
Agrega un producto en el carrito.
Muestra los productos de un carrito.
Modifica la cantidad de un producto de un carrito.
Elimina un producto de un carrito.
Order:

Crea una orden de compra de un carrito.
Muestra todas las ordenes generadas.
Chat:

Envia un mensaje del usuario que ha iniciado sesión.
Muestra todos los mensajes.
Muestra los mensajes de un usuario específico.
Instalación
Intalar node.js https://nodejs.org/es/

Clonar repositorio:

git clone https://github.com/rodriberdo96/Proyecto_Backend.git
Abrir la terminal y en la carpeta base del proyecto ejecutar:
npm install
Antes de poder ejecutar, se deberá crear el archivo .env y configurarle las variables de entorno, se deja un archivo .env.example con el nombre de las variables necesarias en el proyecto, las cuales son:
MONGODB= (Url de mongo)
TIEMPO_EXPIRACION= (Tiempo de expiración de la sesión)
ADMIN_MAIL= (Mail donde se enviaran los mails de orden generada y registro de usuario)
PASS= (password utilizada para nodemailer)
COOKIE_TIME= (Tiempo de expiración de la sesión)
JWT_TIME= (Tiempo de expiración de la sesión)
JWT_SECRET= (Codigo de codificación)
Una vez que se hayan descargado las dependencias, ejecutar:
npm start
