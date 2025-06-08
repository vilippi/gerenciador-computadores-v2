import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import { Box } from '@mui/material';



const SidebarLayout = ({ onRegistrar, onGerenciarUsuario }) => {
    return (
        <>
            <Sidebar
                onRegistrar={onRegistrar}
                onGerenciarUsuario={onGerenciarUsuario}
            />
            <Box marginLeft={'240px'}>
                <Outlet />
            </Box>
        </>
    );
};

export default SidebarLayout;