const dbService = require('../bd/Conexion');

class ActivarTrabajadorModelo {
    static async Modificarestado(id) {
        const query = `UPDATE trabajadores SET estado = ? WHERE idtrabajador = ?`;

        try {
            const est = 'activo';

            // Ejecutar la consulta en la base de datos
            const resultado = await dbService.query(query, [est, id]);

            // Verificar si se encontró el cliente
            if (resultado.affectedRows === 0) {
                throw new Error('No se encontró ningún trabajador.');
            }

            return resultado;

        } catch (err) {
            throw new Error(
                `Error al modificar el estado del trabajador: ${err.message}`
            );
        }
    }
}

module.exports = ActivarTrabajadorModelo;