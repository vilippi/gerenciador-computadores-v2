import { Box } from '@mui/material';
import TestarHardware from '../context/TesteHardware';
import CardsDashboard from '../components/dashboard/CardsStatusPC';

const Dashboard = () => {
    return (
        <Box style={{ padding: 32 }}>
            <CardsDashboard />
            <TestarHardware />
        </Box>
    );
};

export default Dashboard;