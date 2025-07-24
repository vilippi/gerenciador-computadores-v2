export function verificarPermissao(rolesPermitidos = []) {
    return (req, res, next) => {
        try {
            const { role } = req.user;

            if (!role) {
                return res.status(403).json({ message: 'Permissão não definida para este usuário.' });
            }

            if (!rolesPermitidos.includes(role)) {
                return res.status(403).json({ message: 'Acesso negado: permissão insuficiente.' });
            }

            next();
        } catch (err) {
            console.error('Erro no middleware de permissão:', err);
            return res.status(500).json({ message: 'Erro interno ao verificar permissões.' });
        }
    };
}
