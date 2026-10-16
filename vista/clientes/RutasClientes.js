const express = require('express');

const CRutas = require('../../controlador/clientes/CrearClienteControlador');
const LoginClienteControlador = require('../../controlador/clientes/LoginClienteControlador');
const DesactivarClienteControlador = require('../../controlador/clientes/DesactivarClienteControlador');

const router = express.Router();

// Ruta para registrar un cliente
router.post('/usuario/crear', CRutas.crearCliente);

// Ruta para iniciar sesión del cliente
router.post('/cliente/login', LoginClienteControlador.iniciarSesion);

// Ruta para desactivar la cuenta del cliente
router.put('/usuario/desactivar/:id', DesactivarClienteControlador.Modificarestado);

module.exports = router;