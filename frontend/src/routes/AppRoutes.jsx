import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Componentes
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard.jsx';

// Layouts
import SidebarLayout from '../layout/SidebarLayout.jsx';

const AppRoutes = () => {
    const { isAuthenticated, login } = useAuth();

    return (
        <Routes>
            {!isAuthenticated ? (
                <Route path="/*" element={<Login onLogin={login} />} />
            ) : (
                    <>
                    <Route element={
                        <SidebarLayout
                            onRegistrar={() => console.log('Registrar')}
                            onListar={() => console.log('Listar')}
                            onGerenciarUsuario={() => console.log('Usuário')}
                        />
                    }>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/computadores" element={<></>} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                    </>
            )}
        </Routes>
    );
};

export default AppRoutes;