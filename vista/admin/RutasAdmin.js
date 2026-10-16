const express = require('express');

const TRutas = require('../../controlador/admin/CrearTrabajadorControlador');
const ARutas = require('../../controlador/admin/CrearAdminControlador');
const LoginAdminControlador = require('../../controlador/admin/LoginAdminControlador');
const LoginTrabajadorControlador = require('../../controlador/Trabajador/LoginTrabajadorControlador');

const router = express.Router();

// RF-04: Crear trabajador
router.post('/trabajadores', TRutas.crearTrabajador);

// Crear administrador
router.post('/admins', ARutas.crearAdmin);

// Login del administrador
router.post('/login-admin', LoginAdminControlador.validarCredencial);

// Login del trabajador
router.post('/login-trabajador', LoginTrabajadorControlador.validarCredencial);

module.exports = router;
