const mongoose = require('mongoose');

const historicoSchema = new mongoose.Schema({
    computadorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Computador',
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    alteradoPor: {
        type: String
    },
    alteradoEm: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('HistoricoComputador', historicoSchema);