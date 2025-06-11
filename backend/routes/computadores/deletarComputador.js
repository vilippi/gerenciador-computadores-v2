const express = require('express');
const fs = require('fs');
const path = require('path');
const { verificarToken } = require('../../middleware/authMiddleware');

const router = express.Router();

router.delete('/:id', verificarToken, (req, res) => {
    const { id } = req.params;
    const filePath = path.join(__dirname, '../../data/computadores/computadores.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao ler os dados' });
        }

        let computadores = JSON.parse(data);
        const index = computadores.findIndex((c) => c.id === parseInt(id));

        if (index === -1) {
            return res.status(404).json({ message: 'Computador não encontrado' });
        }

        computadores.splice(index, 1);

        fs.writeFile(filePath, JSON.stringify(computadores, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao excluir computador' });
            }

            res.json({ message: 'Computador excluído com sucesso' });
        });
    });
});

module.exports = router;
