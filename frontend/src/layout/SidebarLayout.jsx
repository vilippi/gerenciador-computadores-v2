import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import { Box } from '@mui/material';

const drawerWidth = 240;

const SidebarLayout = ({ onRegistrar, onListar, onGerenciarUsuario }) => {
    return (
        <>
            <Sidebar
                onRegistrar={onRegistrar}
                onListar={onListar}
                onGerenciarUsuario={onGerenciarUsuario}
            />
            <Box marginLeft={'240px'}>
                <Outlet />
            </Box>
        </>
    );
};

export default SidebarLayout;