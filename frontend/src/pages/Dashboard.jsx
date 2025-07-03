import { Box } from '@mui/material';
import TestarHardware from '../context/TesteHardware';

const Dashboard = () => {
    return (
        <Box style={{ padding: 32 }}>
            <h1>🎉 Login realizado com sucesso!</h1>
            <p>Bem-vindo ao Dashboard.</p>
            <TestarHardware />
        </Box>
    );
};

export default Dashboard;