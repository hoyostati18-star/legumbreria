const dbService = require('../bd/Conexion');

class CrearAdminModelo {

    // Crear una cuenta de administrador
    static async crearAdmin(
        tipodocumento,
        Numerodocumento,
        nombres,
        direccion,
        telefono,
        correo,
        contrasena,
        estado
    ) {
        const query = `
            INSERT INTO trabajadores
            (
                tipodocumento,
                Numerodocumento,
                nombres,
                direccion,
                telefono,
                rol,
                correo,
                \`contraseña\`,
                estado
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const rol = 'Admin';

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
            console.error('Error al crear admin en el modelo:', error);
            throw error;
        }
    }

    // Buscar si el documento o el correo ya están registrados
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

module.exports = CrearAdminModelo;