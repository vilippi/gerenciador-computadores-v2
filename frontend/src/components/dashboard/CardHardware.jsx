import { useEffect, useState } from 'react';

import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined';

export default function CardHardware() {
  const [hardware, setHardware] = useState(null);

  useEffect(() => {
    async function carregarHardware() {
      try {
        const info = await window.hardwareAPI.reconhecer();
        setHardware(info);
      } catch (err) {
        console.error('Erro ao reconhecer hardware:', err);
      }
    }

    carregarHardware();
  }, []);

  return (
    <Card sx={{ backgroundColor: '#1976d2', color: 'white', minHeight: 120, height: 400, px: 2, mt: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <MemoryOutlinedIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            Hardware do Usuário
          </Typography>
        </Box>

        {!hardware ? (
          <Typography>Carregando informações...</Typography>
        ) : (
          <List dense disablePadding>
            <ListItem disableGutters>
              <MemoryOutlinedIcon sx={{ mr: 2, fontSize:"large" }} />
              <ListItemText primary={`Processador: ${hardware.processador}`} />
            </ListItem>
            <ListItem disableGutters>
              <StorageOutlinedIcon sx={{ mr: 2, fontSize:"large" }} />
              <ListItemText primary={`RAM: ${hardware.ram}`} />
            </ListItem>
            <ListItem disableGutters>
              <DnsOutlinedIcon sx={{ mr: 2, fontSize:"large" }} />
              <ListItemText primary={`Armazenamento: ${hardware.armazenamento}`} />
            </ListItem>
            <ListItem disableGutters>
              <DeveloperBoardOutlinedIcon sx={{ mr: 2, fontSize:"large" }} />
              <ListItemText primary={`Placa de Vídeo: ${hardware.placaVideo}`} />
            </ListItem>
          </List>
        )}
      </CardContent>
    </Card>
  );
}
