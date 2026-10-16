const dbService = require('../bd/Conexion');

class ActivarClienteModelo {
    static async Modificarestado(id) {
        const query = `UPDATE clientes SET estado = ? WHERE idcliente = ?`;

        try {
            const est = 'Activo';

            // Ejecutar la consulta en la base de datos
            const resultado = await dbService.query(query, [est, id]);

            // Verificar si se encontró el cliente
            if (resultado.affectedRows === 0) {
                throw new Error('No se encontró ningún cliente.');
            }

            return resultado;

        } catch (err) {
            throw new Error(
                `Error al modificar el estado del cliente: ${err.message}`
            );
        }
    }
}

module.exports = ActivarClienteModelo;