const express = require('express');
const cors = require('cors');
const rutasAdmin = require('./vista/admin/RutasAdmin');
const rutasClientes = require('./vista/clientes/RutasClientes');

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Recibir datos de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas del administrador y de los clientes
app.use('/', rutasAdmin);
app.use('/', rutasClientes);

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola desde mi servidor Node.js!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});