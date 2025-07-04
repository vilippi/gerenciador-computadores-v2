import { Box, Grid } from '@mui/material';
import CardsDashboard from '../components/dashboard/CardsStatusPC';
import CardHardware from '../components/dashboard/CardHardware';
import CardStatusPie from '../components/dashboard/CardStatusPie';

const Dashboard = () => {
    return (
        <Grid sx={{ padding: 4 }}>
            
            {/* Linha dos Cards */}
            <CardsDashboard />
            {/* Linha dos gráficos/cards técnicos */}
            <Grid size={{ xs: 12 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6}}>
                        <CardHardware />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <CardStatusPie />
                    </Grid>
                </Grid>
            </Grid>
            
        </Grid>
    );
};

export default Dashboard;