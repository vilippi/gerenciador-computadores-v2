import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Páginas
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

// Layouts
import SidebarLayout from '../layout/SidebarLayout';
import Computadores from '../pages/computadores/Computadores';

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
                                onRegistrar={() => console.log('Registrar')}
                                onListar={() => console.log('Listar')}
                                onGerenciarUsuario={() => console.log('Usuário')}
                            />
                        }
                    >
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/computadores" element={<Computadores />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </>
            )}
        </Routes>
    );
};

export default AppRoutes;