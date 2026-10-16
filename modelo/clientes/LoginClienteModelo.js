const dbService = require('../bd/Conexion');

class LoginClienteModelo {

    static async buscarCliente(correo) {
        const query = `
            SELECT idcliente, nombres, correo, contrasena
            FROM clientes
            WHERE correo = ?
            LIMIT 1
        `;

        return await dbService.query(query, [correo]);
    }
}

module.exports = LoginClienteModelo;
