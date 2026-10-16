const modelo = require('../../modelo/Trabajador/LoginTrabajadorModelo');

class LoginTrabajadorControlador {
    static async validarCredencial(req, res) {
        const { t1: correo, t2: contrasena } = req.body;

        // Validar que los campos estén completos
        if (!correo || !contrasena) {
            return res.status(400).json({
                mensaje: 'El correo y la contraseña son obligatorios.'
            });
        }

        try {
            // Validar las credenciales del trabajador
            const trabajador = await modelo.validarCredenciales(
                correo,
                contrasena
            );

            // Si los datos no coinciden
            if (!trabajador) {
                return res.status(401).json({
                    mensaje: 'Correo o contraseña incorrectos.'
                });
            }

            // Si el inicio de sesión es exitoso
            return res.status(200).json({
                mensaje: 'Inicio de sesión del trabajador exitoso.',
                trabajador
            });

        } catch (error) {
            console.error('Error en el login del trabajador:', error);

            return res.status(500).json({
                mensaje: 'Ocurrió un error al validar las credenciales.'
            });
        }
    }
}

module.exports = LoginTrabajadorControlador;