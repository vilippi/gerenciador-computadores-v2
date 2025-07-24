import express from 'express';
import { verificarToken } from '../../middleware/authMiddleware.js';
import { verificarPermissao } from '../../middleware/verificarPermissao.js';
import Historico from '../../models/HistoricoComputador.js';

const router = express.Router();

// GET /api/historico/:computadorId
router.get('/:computadorId', verificarToken, verificarPermissao(['admin', 'tecnico', 'visualizador']), async (req, res) => {
    const { computadorId } = req.params;

    try {
        const historico = await Historico.find({ computadorId }).sort({ alteradoEm: -1 });
        res.status(200).json(historico);
    } catch (error) {
        console.error('Erro ao buscar histórico:', error);
        res.status(500).json({ message: 'Erro ao buscar histórico do computador.' });
    }
});

export default router;