import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from 'react';
import { getHistoricoPorComputador } from "../../services/computadores/getHistoricoService";



const HistoricoComputador = ({ computadorId }) => {

    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        const carregarHistorico = async () => {
            const token = sessionStorage.getItem('token');
            try {
                const dados = await getHistoricoPorComputador(computadorId, token);
                setHistorico(dados);
            } catch (error) {
                console.error('Erro ao carregar histórico:', error);
            }
        };

        if (computadorId) carregarHistorico();
    }, [computadorId]);


    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Descrição</TableCell>
                    {/* <TableCell>Alterado</TableCell> */}
                    <TableCell>Data</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {historico.map((item) => (
                    <TableRow key={item._id}>
                        <TableCell>{item.descricao}</TableCell>
                        {/* <TableCell>{item.alteradoPor}</TableCell> */}
                        <TableCell>{new Date(item.alteradoEm).toLocaleString('pt-BR')}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default HistoricoComputador