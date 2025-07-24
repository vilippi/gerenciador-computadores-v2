import express from 'express';
import { verificarToken } from '../../middleware/authMiddleware.js';
import { verificarPermissao } from '../../middleware/verificarPermissao.js';
import Computador from '../../models/Computador.js';

const router = express.Router();

router.post('/', verificarToken, verificarPermissao(['admin', 'tecnico']), async (req, res) => {
    try {
        const novoComputador = new Computador(req.body);
        const computadorSalvo = await novoComputador.save();

        res.status(201).json({
            message: 'Computador cadastrado com sucesso no MongoDB.',
            computador: computadorSalvo
        });
    } catch (error) {
        console.error('Erro ao cadastrar computador:', error);
        res.status(500).json({ message: 'Erro ao cadastrar computador.' });
    }
});

export default router;