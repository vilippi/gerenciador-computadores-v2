const express = require('express');
const fs = require('fs');
const path = require('path');
const { verificarToken } = require('../../middleware/authMiddleware'); // ajuste o caminho conforme necessário

const router = express.Router();

router.post('/', verificarToken, (req, res) => {
    const novoComputador = req.body;
    const filePath = path.join(__dirname, '../../data/computadores/computadores.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        let lista = [];

        if (!err && data) {
            try {
                lista = JSON.parse(data);
            } catch (e) {
                return res.status(500).json({ message: 'Erro ao ler dados existentes.' });
            }
        }

        const novoId = lista.length > 0 ? lista[lista.length - 1].id + 1 : 1;
        const computadorComId = { id: novoId, ...novoComputador };
        lista.push(computadorComId);

        fs.writeFile(filePath, JSON.stringify(lista, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao salvar novo computador.' });
            }

            res.status(201).json({
                message: 'Computador cadastrado com sucesso.',
                computador: computadorComId
            });
        });
    });
});

module.exports = router;
