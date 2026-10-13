
const dbService = require('../bd/Conexion');
const bcrypt = require('bcrypt');

class CrearClienteModelo {

    // Verificar si el documento, teléfono o correo ya existen
    static async verificarCliente(numeroD, tel, email) {
        const query = `
            SELECT idcliente, Numerodocumento, telefono, correo
            FROM clientes
            WHERE Numerodocumento = ?
               OR telefono = ?
               OR correo = ?
        `;

        return await dbService.query(query, [numeroD, tel, email]);
    }

    // Crear una nueva cuenta de cliente
    static async crearClientes(tipoD, numeroD, nom, dir, tel, email, contras) {
        const query = `
            INSERT INTO clientes
            (tipodocumento, Numerodocumento, nombres, direccion, telefono, correo, contrasena)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        try {
            // Proteger la contraseña antes de guardarla
            const contra = await bcrypt.hash(contras, 10);

            return await dbService.query(query, [
                tipoD,
                numeroD,
                nom,
                dir,
                tel,
                email,
                contra
            ]);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = CrearClienteModelo;


