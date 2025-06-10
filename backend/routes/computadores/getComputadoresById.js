const express = require('express');
const fs = require('fs');
const path = require('path');
const { verificarToken } = require('../../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', verificarToken, (req, res) => {
    const filePath = path.join(__dirname, '../../data/computadores/computadores.json');
    const { id } = req.params;

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler JSON:', err);
            return res.status(500).json({ message: 'Erro ao ler os dados' });
        }

        const computadores = JSON.parse(data);
        const computador = computadores.find((c) => c.id === parseInt(id));

        if (!computador) {
            return res.status(404).json({ message: 'Computador não encontrado' });
        }

        res.json(computador);
    });
});

module.exports = router;
