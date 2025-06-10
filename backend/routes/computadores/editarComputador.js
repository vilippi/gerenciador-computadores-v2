const express = require('express');
const fs = require('fs');
const path = require('path');
const { verificarToken } = require('../../middleware/authMiddleware');

const router = express.Router();

router.put('/:id', verificarToken, (req, res) => {
    const filePath = path.join(__dirname, '../../data/computadores/computadores.json');
    const { id } = req.params;
    const dadosAtualizados = req.body;

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler JSON:', err);
            return res.status(500).json({ message: 'Erro ao acessar os dados' });
        }

        let computadores = JSON.parse(data);
        const index = computadores.findIndex(c => c.id === parseInt(id));

        if (index === -1) {
            return res.status(404).json({ message: 'Computador não encontrado' });
        }

        // Atualiza os dados
        computadores[index] = { ...computadores[index], ...dadosAtualizados };

        fs.writeFile(filePath, JSON.stringify(computadores, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar JSON:', err);
                return res.status(500).json({ message: 'Erro ao salvar os dados' });
            }

            res.json({ message: 'Computador atualizado com sucesso', computador: computadores[index] });
        });
    });
});

module.exports = router;