const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/user/usuarios.json');

exports.login = (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
    }

    const usuarios = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    const usuario = usuarios.find(u => u.user === user && u.password === password);

    if (!usuario) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
        { id: usuario.id, user: usuario.user },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    res.json({ token });
};