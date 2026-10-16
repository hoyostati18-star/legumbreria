const modelo = require('../../modelo/admin/CrearTrabajadorModelo');
const bcrypt = require('bcrypt');

class CrearTrabajadorControlador {
    static async crearTrabajador(req, res) {
        try {
            // Recibir los datos igual que en el registro de clientes
            const {
                t1: tipodocumento,
                t2: Numerodocumento,
                t3: nombre,
                t4: direccion,
                t5: telefono,
                t6: correo,
                t7: contrasena,
            } = req.body;

            // Validar campos obligatorios
            const campos = {
                t1: tipodocumento,
                t2: Numerodocumento,
                t3: nombre,
                t4: direccion,
                t5: telefono,
                t6: correo,
                t7: contrasena,    
            };

            const faltantes = Object.entries(campos)
                .filter(([campo, valor]) =>
                    typeof valor !== 'string' || !valor.trim()
                )
                .map(([campo]) => campo);

            if (faltantes.length > 0) {
                return res.status(400).json({
                    mensaje: 'Debe completar todos los campos obligatorios.',
                    camposFaltantes: faltantes
                });
            }

            // Validar tipo de documento
            if (!/^(CC|TI|CE)$/.test(tipodocumento.trim())) {
                return res.status(400).json({
                    mensaje: 'Tipo de documento inválido. Utiliza CC, TI o CE.'
                });
            }

            // Validar número de documento
            if (!/^\d{8,10}$/.test(Numerodocumento.trim())) {
                return res.status(400).json({
                    mensaje: 'El documento debe tener entre 8 y 10 dígitos.'
                });
            }

            // Validar nombre
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/.test(nombre.trim())) {
                return res.status(400).json({
                    mensaje: 'El nombre debe contener entre 3 y 100 caracteres y solo letras y espacios.'
                });
            }

            // Validar teléfono
            if (!/^\d{10}$/.test(telefono.trim())) {
                return res.status(400).json({
                    mensaje: 'El teléfono debe tener exactamente 10 dígitos.'
                });
            }

            // Validar correo
            const correoLimpio = correo.trim().toLowerCase();

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
                return res.status(400).json({
                    mensaje: 'El correo electrónico no tiene un formato válido.'
                });
            }

            // Validar contraseña
            if (
                contrasena.length < 8 ||
                !/[a-z]/.test(contrasena) ||
                !/[A-Z]/.test(contrasena) ||
                !/\d/.test(contrasena) ||
                !/[^A-Za-z0-9]/.test(contrasena)
            ) {
                return res.status(400).json({
                    mensaje: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.'
                });
            }

            // Verificar documento o correo duplicado
            const duplicados = await modelo.buscarDuplicados(
                Numerodocumento.trim(),
                correoLimpio
            );

            if (duplicados.length > 0) {
                const existeDocumento = duplicados.some(
                    t => String(t.Numerodocumento) === Numerodocumento.trim()
                );

                const existeCorreo = duplicados.some(
                    t => String(t.correo).toLowerCase() === correoLimpio
                );

                if (existeDocumento) {
                    return res.status(409).json({
                        mensaje: 'El número de documento ya está registrado.'
                    });
                }

                if (existeCorreo) {
                    return res.status(409).json({
                        mensaje: 'El correo electrónico ya está registrado.'
                    });
                }
            }

            // Proteger la contraseña
            const contrasenaHash = await bcrypt.hash(contrasena, 10);

            // Guardar el trabajador
            await modelo.crearTrabajador(
            tipodocumento.trim(),
            Numerodocumento.trim(),
            nombre.trim(),
            direccion.trim(),
            telefono.trim(),
            correoLimpio,
            contrasenaHash,
            'Activo'
);

            return res.status(201).json({
                mensaje: 'La cuenta del trabajador fue creada exitosamente.'
            });

        } catch (error) {
            console.error('Error al crear trabajador:', error);

            return res.status(500).json({
                mensaje: 'No fue posible crear la cuenta del trabajador.'
            });
        }
    }
}

module.exports = CrearTrabajadorControlador;