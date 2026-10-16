const modelo = require('../../modelo/admin/CrearClienteModelo');

class CrearClienteControlador {

    // Función para crear un nuevo cliente
    static async crearCliente(req, res) {

        const {
            t1: tipoD,
            t2: numeroD,
            t3: nom,
            t4: dir,
            t5: tel,
            t6: email,
            t7: contras
        } = req.body;

        // Validar campos vacíos
        const errorCampos = CrearClienteControlador.verCampos(
            tipoD, numeroD, nom, dir, tel, email, contras
        );

        if (errorCampos) {
            return res.status(400).json({ error: errorCampos });
        }

        // Validar tipo de documento
        const errorTipoD = CrearClienteControlador.vertipoD(tipoD);

        if (errorTipoD) {
            return res.status(400).json({ error: errorTipoD });
        }

        // Validar número de documento
        const errorIde = CrearClienteControlador.verIde(numeroD);

        if (errorIde) {
            return res.status(400).json({ error: errorIde });
        }

        // Validar nombres completos
        const errorNom = CrearClienteControlador.vernom(nom);

        if (errorNom) {
            return res.status(400).json({ error: errorNom });
        }

        // Validar dirección
        const errorDir = CrearClienteControlador.verdir(dir);

        if (errorDir) {
            return res.status(400).json({ error: errorDir });
        }

        // Validar teléfono
        const errorTel = CrearClienteControlador.verTel(tel);

        if (errorTel) {
            return res.status(400).json({ error: errorTel });
        }

        // Validar correo electrónico
        const errorEmail = CrearClienteControlador.veremail(email);

        if (errorEmail) {
            return res.status(400).json({ error: errorEmail });
        }

        // Validar contraseña
        const errorKey = CrearClienteControlador.verkey(contras);

        if (errorKey) {
            return res.status(400).json({ error: errorKey });
        }

        // Verificar datos repetidos y crear el cliente
        try {

            const existentes = await modelo.verificarCliente(
                numeroD,
                tel,
                email
            );

            // Verificar si el documento, teléfono o correo ya están registrados
            const documentoExiste = existentes.some(
                cliente =>
                    String(cliente.Numerodocumento) === String(numeroD)
            );

            const telefonoExiste = existentes.some(
                cliente =>
                    String(cliente.telefono) === String(tel)
            );

            const correoExiste = existentes.some(
                cliente =>
                    String(cliente.correo).toLowerCase() ===
                    String(email).toLowerCase()
            );

            if (documentoExiste) {
                return res.status(409).json({
                    error: 'Este número de documento ya está registrado.'
                });
            }

            if (telefonoExiste) {
                return res.status(409).json({
                    error: 'Este teléfono ya está registrado.'
                });
            }

            if (correoExiste) {
                return res.status(409).json({
                    error: 'Este correo electrónico ya está registrado.'
                });
            }

            // Crear el cliente si los datos no están repetidos
            const result = await modelo.crearClientes(
                tipoD,
                numeroD,
                nom,
                dir,
                tel,
                email,
                contras
            );

            return res.status(201).json({
                mensaje: 'Cliente creado con éxito.',
                id: result.insertId
            });

        } catch (err) {

            console.error('Error al crear cliente:', err.message);

            // Controlar posibles registros duplicados
            if (
                err.code === 'ER_DUP_ENTRY' ||
                err.message.includes('Duplicate entry')
            ) {
                return res.status(409).json({
                    error: 'Uno de los datos ingresados ya está registrado.',
                    sugerencia: 'Verifica el documento, teléfono y correo.'
                });
            }

            // Controlar otros errores
            return res.status(500).json({
                error: 'No fue posible crear la cuenta del cliente.'
            });
        }
    }

    // Validar que todos los campos estén completos
    static verCampos(tipoD, numeroD, nom, dir, tel, email, contras) {

        if (
            !tipoD ||
            !numeroD ||
            !nom ||
            !dir ||
            !tel ||
            !email ||
            !contras
        ) {
            return 'Todos los campos son obligatorios.';
        }

        return null;
    }

    // Validar tipo de documento
    static vertipoD(tipoD) {

        const tip = /^(CC|TI|CE)$/;

        if (!tip.test(tipoD)) {
            return 'Tipo de documento inválido. Utiliza CC, TI o CE.';
        }

        return null;
    }

    // Validar número de documento
    static verIde(numeroD) {

        if (!/^\d{8,10}$/.test(numeroD)) {
            return 'La identificación debe tener entre 8 y 10 dígitos numéricos.';
        }

        return null;
    }

    // Validar nombres y apellidos
    static vernom(nom) {

        const name = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;

        if (!name.test(nom.trim())) {
            return 'Los nombres y apellidos deben tener entre 3 y 100 caracteres y contener solo letras y espacios.';
        }

        return null;
    }

    // Validar dirección
    static verdir(direccion) {

        const dirRegex =
            /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,#\/ºª\-]{5,200}$/;

        if (!dirRegex.test(direccion.trim())) {
            return 'Dirección inválida. Debe tener entre 5 y 200 caracteres.';
        }

        return null;
    }

    // Validar teléfono
    static verTel(tel) {

        if (!/^\d{10}$/.test(tel)) {
            return 'El teléfono debe tener exactamente 10 dígitos numéricos.';
        }

        return null;
    }

    // Validar correo electrónico
    static veremail(email) {

        const correo = email.trim();
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!er.test(correo) || correo.length > 200) {
            return 'Correo inválido. Ingresa un correo válido de máximo 200 caracteres.';
        }

        return null;
    }

    // Validar contraseña
    static verkey(contras) {

        const key =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!key.test(contras)) {
            return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
        }

        return null;
    }
}

module.exports = CrearClienteControlador;