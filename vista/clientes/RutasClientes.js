const express = require('express');

const CRutas = require('../../controlador/clientes/CrearClienteControlador');
const LoginClienteControlador = require('../../controlador/clientes/LoginClienteControlador');

const router = express.Router();

// Ruta para registrar un cliente
router.post('/registro', CRutas.crearCliente);

// Ruta para iniciar sesión del cliente
router.post('/login', LoginClienteControlador.iniciarSesion);

module.exports = router;
