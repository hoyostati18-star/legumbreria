const modelo = require('../../modelo/admin/ActivarTrabajadorModelo');

class ActivarTrabajadorControlador {

    static async Modificarestado(req, res) {
        try {
            const { id } = req.params;

            const errorCampos = ActivarTrabajadorControlador.verCampos(id);

            if (errorCampos) {
                return res.status(400).json({
                    error: errorCampos
                });
            }

            await modelo.Modificarestado(id);

            return res.status(200).json({
                mensaje: 'La cuenta del Trabajador fue activada correctamente.'
            });

        } catch (error) {
            console.error('Error al activar el Trabajador:', error);

            return res.status(500).json({
                error: 'Error inesperado: ' + error.message
            });
        }
    }

    static verCampos(id) {
        if (!id) {
            return 'No se reconoce la identificación del Trabajador.';
        }

        return null;
    }
}

module.exports = ActivarTrabajadorControlador;