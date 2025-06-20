const express = require('express');
const { verificarToken } = require('../../middleware/authMiddleware');
const Computador = require('../../models/Computador');

const router = express.Router();

router.put('/:id', verificarToken, async (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
        const computadorAtualizado = await Computador.findByIdAndUpdate(
            id,
            { $set: dadosAtualizados },
            { new: true, runValidators: true }
        );

        if (!computadorAtualizado) {
            return res.status(404).json({ message: 'Computador não encontrado.' });
        }

        res.status(200).json({
            message: 'Computador atualizado com sucesso no MongoDB.',
            computador: computadorAtualizado
        });
    } catch (error) {
        console.error('Erro ao atualizar computador:', error);
        res.status(500).json({ message: 'Erro ao atualizar computador.' });
    }
});

module.exports = router;
