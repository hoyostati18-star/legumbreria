const dbService = require('../bd/Conexion');
const bcrypt = require('bcrypt');

class LoginTrabajadorModelo {

    // Buscar trabajador por correo
    static async buscaCorreo(correo) {
        const query = `
            SELECT *
            FROM trabajadores
            WHERE correo = ? AND rol = 'trabajador'
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

        const trabajador = await this.buscaCorreo(correo);

        if (!trabajador) {
            return null;
        }

        const coincide = await bcrypt.compare(
            contrasena,
            trabajador.contraseña
        );

        if (!coincide) {
            return null;
        }

        return {
            idtrabajador: trabajador.idtrabajador,
            nombres: trabajador.nombres,
            correo: trabajador.correo,
            rol: trabajador.rol
        };
    }
}

module.exports = LoginTrabajadorModelo;