import express from 'express';
import { verificarToken } from '../../middleware/authMiddleware.js';
import { verificarPermissao } from '../../middleware/verificarPermissao.js';
import Computador from '../../models/Computador.js';

const router = express.Router();

router.get('/:id', verificarToken, verificarPermissao(['admin', 'tecnico', 'visualizador']), async (req, res) => {
    const { id } = req.params;

    try {
        const computador = await Computador.findById(id);

        if (!computador) {
            return res.status(404).json({ message: 'Computador não encontrado.' });
        }

        res.status(200).json(computador);
    } catch (error) {
        console.error('Erro ao buscar computador por ID:', error);
        res.status(500).json({ message: 'Erro ao buscar computador.' });
    }
});

export default router;