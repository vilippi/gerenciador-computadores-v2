import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper
} from '@mui/material';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = () => {
        // futuramente: chamar API aqui
        onLogin(email, senha);
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(to top right,rgb(42, 143, 236),rgb(34, 97, 192))',
            }}
        >
            <Paper elevation={3} sx={{ p: 4, width: 300 }}>
                <Typography variant="h5" mb={2} textAlign="center">
                    SoftDevice
                </Typography>

                <TextField
                    label="Usuário"
                    type="email"
                    fullWidth
                    size='small'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Senha"
                    type="password"
                    fullWidth
                    size='small'
                    sx={{ mt: 2 }}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleLogin}
                >
                    Entrar
                </Button>
            </Paper>
        </Box>
    );
};

export default Login;