const dbService = require('../bd/Conexion');
const bcrypt = require('bcrypt');

class LoginAdminModelo {

    // Buscar administrador por correo
    static async buscaCorreo(correo) {
        const query = `
            SELECT *
            FROM trabajadores
            WHERE correo = ? AND rol = 'Admin'
            LIMIT 1
        `;

        const resultado = await dbService.query(query, [correo]);
        return resultado.length > 0 ? resultado[0] : null;
    }

    // Validar correo y contraseña
    static async validarCredenciales(correo, contrasena) {
        if (!correo || !contrasena) {
            throw new Error('El correo y la contraseña son obligatorios.');
        }

        const administrador = await this.buscaCorreo(correo);

        if (!administrador) {
            return null;
        }

        // Comparar la contraseña ingresada con la contraseña cifrada
        const coincide = await bcrypt.compare(
            contrasena,
            administrador.contraseña
        );

        if (!coincide) {
            return null;
        }

        return {
            idtrabajador: administrador.idtrabajador,
            nombres: administrador.nombres,
            correo: administrador.correo,
            rol: administrador.rol
        };
    }
}

module.exports = LoginAdminModelo;