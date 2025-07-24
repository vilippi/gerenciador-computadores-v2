import express from 'express';
import { verificarToken } from '../../middleware/authMiddleware.js';
import { verificarPermissao } from '../../middleware/verificarPermissao.js';
import Computador from '../../models/Computador.js';

const router = express.Router();

router.get('/', verificarToken, verificarPermissao(['admin', 'tecnico', 'visualizador']), async (req, res) => {
    try {
        const computadores = await Computador.find();
        res.status(200).json(computadores);
    } catch (error) {
        console.error('Erro ao buscar computadores:', error);
        res.status(500).json({ message: 'Erro ao buscar computadores.' });
    }
});

export default router;