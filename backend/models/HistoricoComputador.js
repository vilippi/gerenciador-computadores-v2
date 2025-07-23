import mongoose from 'mongoose';

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

const Historico = mongoose.model('HistoricoComputador', historicoSchema);
export default Historico;