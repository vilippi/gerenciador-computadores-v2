const express = require('express');
const { verificarToken } = require('../../middleware/authMiddleware');
const Computador = require('../../models/Computador'); // <- Mongoose model

const router = express.Router();

router.post('/', verificarToken, async (req, res) => {
    try {
        const novoComputador = new Computador(req.body);
        const computadorSalvo = await novoComputador.save(); // <-- Grava no Atlas

        res.status(201).json({
            message: 'Computador cadastrado com sucesso no MongoDB.',
            computador: computadorSalvo
        });
    } catch (error) {
        console.error('Erro ao cadastrar computador:', error);
        res.status(500).json({ message: 'Erro ao cadastrar computador.' });
    }
});

module.exports = router;