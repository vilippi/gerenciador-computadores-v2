import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { getComputadorById } from '../../services/computadores/getComputadorById';
import { editarComputador } from '../../services/computadores/editarComputadorService';

const EditarComputador = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        marca: '',
        modelo: '',
        numero: '',
        processador: '',
        placaVideo: '',
        ram: '',
        armazenamento: '',
        antigoDono: '',
        setor: '',
        email: '',
        empresa: '',
        status: ''
    });

    useEffect(() => {
    async function fetchData() {
        try {
            const token = sessionStorage.getItem('token');
            const computador = await getComputadorById(id, token);
            setFormData(computador);
        } catch (error) {
            console.error('Erro ao buscar computador:', error);
        }
    }
    fetchData();
}, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        await editarComputador(id, formData);
        navigate('/computadores');
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h6">Editar Computador</Typography>

            <TextField
                label="Marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            {/* ... outros campos ... */}

            <Button variant="contained" onClick={handleSubmit}>
                Salvar Alterações
            </Button>
        </Box>
    );
};

export default EditarComputador;