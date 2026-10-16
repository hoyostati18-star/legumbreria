const dbService = require('../bd/Conexion');

class CrearTrabajadorModelo {

    // Función para crear nuevos trabajadores por el administrador
    static async crearTrabajador(tipodocumento, Numerodocumento, nombres, direccion, telefono, correo, contrasena, estado) {

        const query = `
            INSERT INTO trabajadores
            (tipodocumento, Numerodocumento, nombres, direccion, telefono, rol, correo, \`contraseña\`, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const rol = 'trabajador';

        try {
            return await dbService.query(query, [
                tipodocumento,
                Numerodocumento,
                nombres,
                direccion,
                telefono,
                rol,
                correo,
                contrasena,
                estado
            ]);
        } catch (error) {
            console.error('Error al crear trabajador en el modelo:', error);
            throw error;
        }
    }

    // Buscar trabajadores con el mismo documento o correo
    static async buscarDuplicados(Numerodocumento, correo) {
        const query = `
            SELECT Numerodocumento, correo
            FROM trabajadores
            WHERE Numerodocumento = ? OR correo = ?
        `;

        return await dbService.query(query, [
            Numerodocumento,
            correo
        ]);
    }
}

module.exports = CrearTrabajadorModelo;