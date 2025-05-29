import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    AppBar,
    Typography,
    Box,
    Paper,
    ListItemIcon,
} from '@mui/material';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

const drawerWidth = 240;

const Sidebar = ({ onRegistrar, onListar, onGerenciarUsuario, children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar  */}
            <Drawer
                variant="permanent"
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#1976d2',
                        color: 'white',
                    },
                }}
            >
                {/* Logo no topo */}
                <Toolbar sx={{ justifyContent: 'center', }}>
                    <Box
                        component="img"
                        src="../../public/logo_softdevice_transparent.png" 
                        alt="Logo"
                        sx={{ width: '100%', maxWidth: '150px', }}
                    />
                </Toolbar>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={onRegistrar}>
                                <ListItemIcon>
                                    <AddCircleOutlineOutlinedIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Registrar PC" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={onListar}>
                                <ListItemIcon>
                                    <ComputerOutlinedIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Ver Computadores" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={onGerenciarUsuario}>
                                <ListItemIcon>
                                    <GroupOutlinedIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Gerenciar Usuário" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Header branco */}
            <AppBar
                position="fixed"
                elevation={1}
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    backgroundColor: '#fff',
                    color: '#000',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Gerenciador de Computadores
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Conteúdo principal */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8, // espaço para o AppBar
                    ml: `${drawerWidth}px`,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Sidebar;
