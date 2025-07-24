import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

export async function login(req, res) {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
    }

    try {
        const usuario = await Usuario.findOne({ user });
        if (!usuario) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }

        const senhaConfere = await usuario.compararSenha(password);
        if (!senhaConfere) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        // ✅ Agora incluindo o role no payload do token
        const token = jwt.sign(
            {
                id: usuario._id,
                user: usuario.user,
                role: usuario.role // 👈 ESSENCIAL
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ token });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro interno ao tentar logar.' });
    }
}
