const modelo = require('../../modelo/clientes/LoginClienteModelo');
const bcrypt = require('bcrypt');

class LoginClienteControlador {

    static async iniciarSesion(req, res) {
        try {
            const { correo, contrasena } = req.body;

            if (!correo || !contrasena) {
                return res.status(400).json({
                    mensaje: 'Debe ingresar el correo y la contraseña.'
                });
            }

            const resultado = await modelo.buscarCliente(correo);

            if (!resultado || resultado.length === 0) {
                return res.status(401).json({
                    mensaje: 'Correo o contraseña incorrectos.'
                });
            }

            const cliente = resultado[0];
            const coincide = await bcrypt.compare(
                contrasena,
                cliente.contrasena
            );

            if (!coincide) {
                return res.status(401).json({
                    mensaje: 'Correo o contraseña incorrectos.'
                });
            }

            return res.status(200).json({
                mensaje: 'Inicio de sesión exitoso.',
                cliente: {
                    idcliente: cliente.idcliente,
                    nombres: cliente.nombres,
                    correo: cliente.correo
                }
            });

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return res.status(500).json({
                mensaje: 'Error interno al iniciar sesión.'
            });
        }
    }
}

module.exports = LoginClienteControlador;
