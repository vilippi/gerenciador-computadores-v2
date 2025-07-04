import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import { listaComputadores } from "../../services/computadores/listaComputadoresService";
import { useEffect, useState } from "react";

const CardsDashboard = () => {

    const [computadores, setComputadores] = useState([]);
    const [loading, setLoading] = useState(true);

    const [contagem, setContagem] = useState({
        total: 0,
        disponiveis: 0,
        emUso: 0,
        manutencao: 0,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await listaComputadores();

                const total = data.length;
                const disponiveis = data.filter((pc) => pc.status === 'Disponível').length;
                const emUso = data.filter((pc) => pc.status === 'Em Uso').length;
                const manutencao = data.filter((pc) => pc.status === 'manutenção').length;

                setContagem({ total, disponiveis, emUso, manutencao });
                setComputadores(data);
            } catch (error) {
                console.error('Erro ao buscar computadores:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const cards = [
        {
            title: 'Total',
            value: contagem.total,
            icon: <ComputerOutlinedIcon fontSize="large" />,
            color: '#1976d2',
        },
        {
            title: 'Disponíveis',
            value: contagem.disponiveis,
            icon: <CheckCircleOutlineOutlinedIcon fontSize="large" />,
            color: '#2e7d32',
        },
        {
            title: 'Em Uso',
            value: contagem.emUso,
            icon: <PeopleOutlineOutlinedIcon fontSize="large" />,
            color: '#f9a825',
        },
        {
            title: 'Em Manutenção',
            value: contagem.manutencao,
            icon: <BuildOutlinedIcon fontSize="large" />,
            color: '#d32f2f',
        },
    ];

    return (
        <Grid container spacing={2}>
            {cards.map((card, index) => (
                <Grid size={{ xs: 12, md: 3, sm:6 }} key={index}>
                    <Card sx={{ display: 'flex', alignItems: 'center', backgroundColor: card.color, color: 'white' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle2">{card.title}</Typography>
                            <Typography variant="h5" fontWeight="bold">{card.value}</Typography>
                        </CardContent>
                        <Box sx={{ p: 2 }}>
                            {card.icon}
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardsDashboard;
