const express = require('express');

const CRutas = require('../../controlador/admin/CrearClienteControlador');
const TRutas = require('../../controlador/admin/CrearTrabajadorControlador');
const ARutas = require('../../controlador/admin/CrearAdminControlador');
const LoginAdminControlador = require('../../controlador/admin/LoginAdminControlador');
const LoginTrabajadorControlador = require('../../controlador/Trabajador/LoginTrabajadorControlador');
const DesactivarClienteControlador = require('../../controlador/admin/DesactivarClienteControlador');
const DesactivarTrabajadorControlador = require('../../controlador/admin/DesactivarTrabajadorControlador');
const ActivarClienteControlador = require('../../controlador/admin/ActivarClienteControlador');
const ActivarTrabajadorControlador = require('../../controlador/admin/ActivarTrabajadorControlador');

const router = express.Router();

// Crear Cliente 
router.post('/seguridadd/crearclientes', CRutas.crearCliente);

// RF-04: Crear trabajador
router.post('/seguridad/creartrabajadores', TRutas.crearTrabajador);

// Crear administrador
router.post('/seguridad/crearadmin', ARutas.crearAdmin);

// Login del administrador
router.post('/seguridad/loginAdmin', LoginAdminControlador.validarCredencial);

// Login del trabajador
router.post('/Seguridad/loginTrabajador', LoginTrabajadorControlador.validarCredencial);

// Ruta para desactivar la cuenta del cliente
router.put('/Seguridad/desactivar/cliente/:id', DesactivarClienteControlador.Modificarestado);

// Ruta para desactivar la cuenta del Trabajador
router.put('/Seguridad/desactivar/trabajador/:id', DesactivarTrabajadorControlador.Modificarestado);

// Ruta para activar la cuenta del cliente
router.put('/Seguridad/activar/cliente/:id', ActivarClienteControlador.Modificarestado);

// Ruta para activar la cuenta del Trabajador
router.put('/Seguridad/activar/trabajador/:id', ActivarTrabajadorControlador.Modificarestado);

module.exports = router;