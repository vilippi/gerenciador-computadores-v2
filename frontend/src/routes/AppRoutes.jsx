import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Páginas
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

// Layouts
import SidebarLayout from '../layout/SidebarLayout';
import Computadores from '../pages/computadores/Computadores';
import RegistrarComputador from '../pages/computadores/RegistrarComputador';
import EditarComputador from '../pages/computadores/EditarComputador';
import IA from '../pages/ia/IA';

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            {!isAuthenticated ? (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </>
            ) : (
                <>
                    <Route
                        element={
                            <SidebarLayout
                                onListar={() => console.log('Listar')}
                                onGerenciarUsuario={() => console.log('Usuário')}
                            />
                        }
                    >
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/computadores" element={<Computadores />} />
                        <Route path="/registrar-computadores" element={<RegistrarComputador />} />
                        <Route path="/computadores/editar/:id" element={<EditarComputador />} />
                        <Route path="/IA" element={<IA />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </>
            )}
        </Routes>
    );
};

export default AppRoutes;