const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../../data/computadores/computadores.json');
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const computadores = JSON.parse(data);
        res.json(computadores);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao ler dados dos computadores' });
    }
});

module.exports = router;
