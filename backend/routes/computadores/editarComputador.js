const express = require('express');
const { verificarToken } = require('../../middleware/authMiddleware');
const Computador = require('../../models/Computador');
const Historico = require('../../models/HistoricoComputador');

const router = express.Router();

router.put('/:id', verificarToken, async (req, res) => {
    const { id } = req.params;
    const novosDados = req.body;

    try {
        const computadorAtual = await Computador.findById(id);
        if (!computadorAtual) {
            return res.status(404).json({ message: 'Computador não encontrado.' });
        }

        const computadorAtualizado = await Computador.findByIdAndUpdate(id, novosDados, { new: true });

        const alteracoes = [];
        const nomePC = computadorAtual.modelo || 'PC';
        const donoAntes = computadorAtual.atualDono || 'Sem Dono';
        const donoDepois = novosDados.atualDono || donoAntes;
        const statusAntes = computadorAtual.status;
        const statusDepois = novosDados.status || statusAntes;

        // Mudança de dono
        if (novosDados.atualDono && novosDados.atualDono !== computadorAtual.atualDono) {
            alteracoes.push(`${nomePC} / ${donoAntes} / ${statusAntes} → ${nomePC} / ${donoDepois} / ${statusDepois}`);
        }

        // Mudança de status
        if (novosDados.status && novosDados.status !== computadorAtual.status) {
            alteracoes.push(`${nomePC} / ${statusAntes} → ${statusDepois}`);
        }

        // Melhorias técnicas
        ['ram', 'armazenamento', 'processador', 'placaVideo'].forEach((campo) => {
            if (novosDados[campo] && novosDados[campo] !== computadorAtual[campo]) {
                alteracoes.push(`${nomePC} / ${campo.toUpperCase()} ${computadorAtual[campo]} → ${novosDados[campo]}`);
            }
        });

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

module.exports = router;