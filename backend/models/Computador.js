import mongoose from 'mongoose'; // ← ESSENCIAL, e precisa estar na primeira linha!

const computadorSchema = new mongoose.Schema({
    numero: String,
    marca: String,
    modelo: String,
    ram: String,
    armazenamento: String,
    processador: String,
    placaVideo: String,
    antigoDono: String,
    emailAntigoDono: String,
    setorAntigoDono: String,
    empresaAntigoDono: String,
    status: String,
    atualDono: String,
    emailAtualDono: String,
    setorAtualDono: String,
    empresaAtualDono: String,
}, { timestamps: true });

const Computador = mongoose.model('Computador', computadorSchema);
export default Computador;