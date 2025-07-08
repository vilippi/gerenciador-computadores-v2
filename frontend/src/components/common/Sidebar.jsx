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
    Tooltip,
    IconButton,
    Stack,
    useTheme,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

import { useAuth } from '../../context/AuthContext';
import { useTema } from '../../context/ThemeContext';

const drawerWidth = 240;

const Sidebar = ({onGerenciarUsuario, children }) => {

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const navigate = useNavigate();
    
    const { logout } = useAuth();

    const location = useLocation();
    const routeTitles = {
        '/': 'Dashboard',
        '/computadores': 'Computadores Registrados',
        '/registrar': 'Registrar Computador',
        '/usuarios': 'Gerenciar Usuários',
        '/IA': 'Assistente Virtual'
    };
    const currentTitle = routeTitles[location.pathname] || 'Gerenciador de Computadores';

    const { modoEscuro, toggleModo } = useTema();

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
                        backgroundImage: isDark
                            ? 'linear-gradient(to top left,rgb(109, 43, 196),rgb(73, 26, 161))' // gradiente escuro
                            : 'linear-gradient(to top left, rgb(42, 143, 236), rgb(34, 97, 192))', // gradiente claro
                        color: 'white',
                    },
                }}
            >
                {/* Logo no topo */}
                <Toolbar sx={{ justifyContent: 'center', }}>
                    <Box
                        component="img"
                        src="/logo_softdevice_transparent.png"
                        alt="Logo"
                        sx={{
                        height: 60,
                            maxWidth: '80%',
                            objectFit: 'contain',
                        }}
                    />
                </Toolbar>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/')}>
                                <ListItemIcon>
                                    <HomeOutlinedIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/registrar-computadores')}>
                                <ListItemIcon>
                                    <AddCircleOutlineOutlinedIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Registrar PC" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/computadores')}>
                                <ListItemIcon>
                                    <ComputerOutlinedIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Computadores" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={onGerenciarUsuario}>
                                <ListItemIcon>
                                    <GroupOutlinedIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Gerenciar Usuários" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/IA')}>
                                <ListItemIcon>
                                    <TipsAndUpdatesOutlinedIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="IA" />
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
                    backgroundColor: 'background.default',
                    color: '#000',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Typography variant="h6" noWrap color="text.primary">
                        {currentTitle}
                    </Typography>
                    <Stack display={'flex'} direction={'row'}>
                        <Tooltip title={modoEscuro ? "Modo Claro" : "Modo Escuro"}>
                            <IconButton onClick={toggleModo} >
                                {modoEscuro ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Sair">
                            <IconButton onClick={logout}>
                                <LogoutOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Conteúdo principal */}
            <Box
                component="main"
                sx={{
                    mt:8, // espaço para o AppBar
                    ml: `${drawerWidth}px`,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Sidebar;
