import express from 'express';
import { verificarToken } from '../../middleware/authMiddleware.js';
import { verificarPermissao } from '../../middleware/verificarPermissao.js';
import Computador from '../../models/Computador.js';
import Historico from '../../models/HistoricoComputador.js';

const router = express.Router();

router.put('/:id', verificarToken, verificarPermissao(['admin', 'tecnico']), async (req, res) => {
    const { id } = req.params;
    const novosDados = req.body;

    try {
        const computadorAtual = await Computador.findById(id);
        if (!computadorAtual) {
            return res.status(404).json({ message: 'Computador não encontrado.' });
        }

        const alteracoes = [];
        const nomePC = computadorAtual.modelo || 'PC';

        // Melhorias técnicas
        if (novosDados.ram && novosDados.ram !== computadorAtual.ram) {
            alteracoes.push(`Computador Melhorado!\nRAM ${computadorAtual.ram} -> ${novosDados.ram}`);
        }

        if (novosDados.armazenamento && novosDados.armazenamento !== computadorAtual.armazenamento) {
            alteracoes.push(`Computador Melhorado!\nArmazenamento ${computadorAtual.armazenamento} -> ${novosDados.armazenamento}`);
        }

        // Mudança de status
        if (novosDados.status && novosDados.status !== computadorAtual.status) {
            const de = computadorAtual.status;
            const para = novosDados.status;

            if (de === 'Mal Funcionamento' && para === 'No Suporte') {
                alteracoes.push('Computador enviado para o Suporte!');
            } else if (de === 'No Suporte' && para === 'Disponível') {
                alteracoes.push('Computador Disponível!');
            } else if (de === 'Em Uso' && para === 'Disponível') {
                alteracoes.push('Computador Disponível!');
            } else {
                alteracoes.push(`${de} -> ${para}`);
            }
        }

        // Mudança de dono
        if (novosDados.atualDono && novosDados.atualDono !== computadorAtual.atualDono) {
            const de = computadorAtual.atualDono || 'Sem Dono';
            const para = novosDados.atualDono;

            if (para === 'Sem Dono') {
                alteracoes.push('Computador sem dono!');
            } else {
                alteracoes.push(`Computador Transferido de ${de} para ${para}!`);
            }
        }

        const computadorAtualizado = await Computador.findByIdAndUpdate(id, novosDados, { new: true });

        if (alteracoes.length > 0) {
            await Historico.create({
                computadorId: computadorAtualizado._id,
                descricao: alteracoes.join('\n'),
                alteradoPor: req.user?.user || 'Sistema'
            });
        }

        res.status(200).json({
            message: 'Computador atualizado com sucesso.',
            computador: computadorAtualizado
        });
    } catch (error) {
        console.error('Erro ao editar computador:', error);
        res.status(500).json({ message: 'Erro ao editar computador.' });
    }
});

export default router;