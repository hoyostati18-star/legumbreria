const modelo = require('../../modelo/admin/DesactivarTrabajadorModelo');

class DesactivarTrabajadorControlador {

    static async Modificarestado(req, res) {
        try {
            const { id } = req.params;

            const errorCampos = DesactivarTrabajadorControlador.verCampos(id);

            if (errorCampos) {
                return res.status(400).json({
                    error: errorCampos
                });
            }

            await modelo.Modificarestado(id);

            return res.status(200).json({
                mensaje: 'La cuenta del Trabajador fue desactivada correctamente.'
            });

        } catch (error) {
            console.error('Error al desactivar el Trabajador:', error);

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

module.exports = DesactivarTrabajadorControlador;