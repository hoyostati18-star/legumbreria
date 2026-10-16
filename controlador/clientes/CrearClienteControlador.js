const modelo = require('../../modelo/clientes/CrearClienteModelo');

class CrearClienteControlador {

    // Registrar una cuenta desde el lado del cliente
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

        // Validar campos obligatorios
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

        // Validar nombres
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

        // Validar correo
        const errorEmail = CrearClienteControlador.veremail(email);
        if (errorEmail) {
            return res.status(400).json({ error: errorEmail });
        }

        // Validar contraseña
        const errorKey = CrearClienteControlador.verkey(contras);
        if (errorKey) {
            return res.status(400).json({ error: errorKey });
        }

        try {
            // Consultar si ya existen los datos
            const existentes = await modelo.verificarCliente(
                numeroD, tel, email
            );

            const documentoExiste = existentes.some(
                cliente => String(cliente.Numerodocumento) === String(numeroD)
            );

            const telefonoExiste = existentes.some(
                cliente => String(cliente.telefono) === String(tel)
            );

            const correoExiste = existentes.some(
                cliente => String(cliente.correo).toLowerCase() ===
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

            // Crear la cuenta
            const result = await modelo.crearClientes(
                tipoD, numeroD, nom, dir, tel, email, contras
            );

            return res.status(201).json({
                mensaje: 'Cuenta de cliente creada con éxito.',
                id: result.insertId
            });

        } catch (err) {
            console.error('Error al registrar cliente:', err.message);

            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    error: 'Uno de los datos ingresados ya está registrado.'
                });
            }

            return res.status(500).json({
                error: 'No fue posible crear la cuenta del cliente.'
            });
        }
    }

    static verCampos(tipoD, numeroD, nom, dir, tel, email, contras) {
        if (!tipoD || !numeroD || !nom || !dir ||
            !tel || !email || !contras) {
            return 'Todos los campos son obligatorios.';
        }
        return null;
    }

    static vertipoD(tipoD) {
        if (!/^(CC|TI|CE)$/.test(tipoD)) {
            return 'Tipo de documento inválido. Utiliza CC, TI o CE.';
        }
        return null;
    }

    static verIde(numeroD) {
        if (!/^\d{8,10}$/.test(String(numeroD))) {
            return 'La identificación debe tener entre 8 y 10 dígitos numéricos.';
        }
        return null;
    }

    static vernom(nom) {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/.test(nom.trim())) {
            return 'Los nombres y apellidos deben tener entre 3 y 100 caracteres y contener solo letras y espacios.';
        }
        return null;
    }

    static verdir(direccion) {
        if (typeof direccion !== 'string' ||
            direccion.trim().length < 5 ||
            direccion.trim().length > 200) {
            return 'Dirección inválida. Debe tener entre 5 y 200 caracteres.';
        }
        return null;
    }

    static verTel(tel) {
        if (!/^\d{10}$/.test(String(tel))) {
            return 'El teléfono debe tener exactamente 10 dígitos numéricos.';
        }
        return null;
    }

    static veremail(email) {
        const correo = String(email).trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) ||
            correo.length > 200) {
            return 'Correo inválido. Ingresa un correo válido de máximo 200 caracteres.';
        }
        return null;
    }

    static verkey(contras) {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(contras)) {
            return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
        }
        return null;
    }
}

module.exports = CrearClienteControlador;
