import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Antes de salvar, criptografa a senha se for nova ou modificada
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar senhas
usuarioSchema.methods.compararSenha = function (senhaDigitada) {
    return bcrypt.compare(senhaDigitada, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;