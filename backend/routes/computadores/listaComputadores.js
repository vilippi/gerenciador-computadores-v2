const express = require('express');
const fs = require('fs');
const path = require('path');
const { verificarToken } = require('../../middleware/authMiddleware');

const router = express.Router();

router.get('/', verificarToken, async (req, res) => {
    const filePath = path.join(__dirname, '../../data/computadores/computadores.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler JSON:', err);
            return res.status(500).json({ message: 'Erro ao ler dados dos computadores' });
        }

        const computadores = JSON.parse(data);
        res.json(computadores);
    });
});

module.exports = router;