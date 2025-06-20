const express = require('express');
const { verificarToken } = require('../../middleware/authMiddleware');
const Computador = require('../../models/Computador'); // model Mongoose

const router = express.Router();

router.get('/', verificarToken, async (req, res) => {
    try {
        const computadores = await Computador.find(); // ← Busca todos no MongoDB
        res.status(200).json(computadores);
    } catch (error) {
        console.error('Erro ao buscar computadores:', error);
        res.status(500).json({ message: 'Erro ao buscar computadores.' });
    }
});

module.exports = router;