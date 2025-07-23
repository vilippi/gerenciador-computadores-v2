import express from 'express';
import { verificarToken } from '../../middleware/authMiddleware.js';
import Computador from '../../models/Computador.js';

const router = express.Router();

router.delete('/:id', verificarToken, async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await Computador.findByIdAndDelete(id);

        if (!resultado) {
            return res.status(404).json({ message: 'Computador não encontrado.' });
        }

        res.status(200).json({ message: 'Computador excluído com sucesso do MongoDB.' });
    } catch (error) {
        console.error('Erro ao excluir computador:', error);
        res.status(500).json({ message: 'Erro ao excluir computador.' });
    }
});

export default router;