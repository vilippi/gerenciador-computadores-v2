const express = require('express');
const { verificarToken } = require('../../middleware/authMiddleware');
const Historico = require('../../models/HistoricoComputador');

const router = express.Router();

// GET /api/historico/:computadorId
router.get('/:computadorId', verificarToken, async (req, res) => {
    const { computadorId } = req.params;

    try {
        const historico = await Historico.find({ computadorId }).sort({ alteradoEm: -1 });
        res.status(200).json(historico);
    } catch (error) {
        console.error('Erro ao buscar histórico:', error);
        res.status(500).json({ message: 'Erro ao buscar histórico do computador.' });
    }
});

module.exports = router;