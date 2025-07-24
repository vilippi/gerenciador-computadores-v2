import { createContext, useContext, useState, useEffect } from 'react';
import { loginRequest } from '../services/authService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setRole(decoded.role);
        }
    }, []);

    const login = async (username, password) => {
        try {
            const data = await loginRequest(username, password);
            sessionStorage.setItem('token', data.token);
            const decoded = jwtDecode(data.token);
            setRole(decoded.role);
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error(error.message || 'Erro ao fazer login');
        }
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
