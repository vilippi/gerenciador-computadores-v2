const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.login = async (req, res) => {
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

        const token = jwt.sign(
            { id: usuario._id, user: usuario.user },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ token });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro interno ao tentar logar.' });
    }
};
