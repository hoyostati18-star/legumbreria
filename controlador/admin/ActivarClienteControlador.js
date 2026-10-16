const modelo = require('../../modelo/admin/ActivarClienteModelo');

class ActivarClienteControlador {

    static async Modificarestado(req, res) {
        try {
            const { id } = req.params;

            const errorCampos = ActivarClienteControlador.verCampos(id);

            if (errorCampos) {
                return res.status(400).json({
                    error: errorCampos
                });
            }

            await modelo.Modificarestado(id);

            return res.status(200).json({
                mensaje: 'La cuenta del cliente fue activada correctamente.'
            });

        } catch (error) {
            console.error('Error al activar el cliente:', error);

            return res.status(500).json({
                error: 'Error inesperado: ' + error.message
            });
        }
    }

    static verCampos(id) {
        if (!id) {
            return 'No se reconoce la identificación del cliente.';
        }

        return null;
    }
}

module.exports = ActivarClienteControlador;