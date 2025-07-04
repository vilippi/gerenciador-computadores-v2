import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { listaComputadores } from '../../services/computadores/listaComputadoresService';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';

const cores = {
    'disponível': '#2e7d32',
    'em uso': '#f9a825',
    'manutenção': '#d32f2f',
};

const CardStatusPie = () => {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const computadores = await listaComputadores();

                const contagem = {
                    'disponível': 0,
                    'em uso': 0,
                    'manutenção': 0,
                };

                computadores.forEach(pc => {
                    const status = pc.status?.toLowerCase();
                    if (contagem[status] !== undefined) {
                        contagem[status]++;
                    }
                });

                const dadosFormatados = Object.entries(contagem).map(([status, count]) => ({
                    name: status,
                    value: count,
                }));

                setDados(dadosFormatados);
            } catch (err) {
                console.error('Erro ao buscar computadores:', err);
            }
        }

        fetchData();
    }, []);

    return (
        <Card sx={{ height: 400, px: 2, mt: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ComputerOutlinedIcon sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                        Computadores por Status
                    </Typography>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={dados}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {dados.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={cores[entry.name]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default CardStatusPie;
