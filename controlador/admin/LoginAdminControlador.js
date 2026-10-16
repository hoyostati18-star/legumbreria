const modelo = require('../../modelo/admin/LoginAdminModelo');

class LoginAdminControlador {

    // Validar las credenciales del administrador
    static async validarCredencial(req, res) {
        const { t1: correo, t2: contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({
                mensaje: 'El correo y la contraseña son obligatorios.'
            });
        }

        try {
            const administrador = await modelo.validarCredenciales(
                correo,
                contrasena
            );

            if (!administrador) {
                return res.status(401).json({
                    mensaje: 'Correo o contraseña incorrectos.'
                });
            }

            return res.status(200).json({
                mensaje: 'Inicio de sesión de administrador exitoso.',
                administrador
            });

        } catch (error) {
            console.error('Error en el login del administrador:', error);

            return res.status(500).json({
                mensaje: 'Ocurrió un error al validar las credenciales.'
            });
        }
    }
}

module.exports = LoginAdminControlador;