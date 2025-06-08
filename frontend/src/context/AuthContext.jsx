import { createContext, useContext, useState } from 'react';
import { loginRequest } from '../services/authService'; // manter esse import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!sessionStorage.getItem('token')
    );

    const login = async (username, password) => {
        try {
            const data = await loginRequest(username, password); // usar função externa
            sessionStorage.setItem('token', data.token);
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error(error.message || 'Erro ao fazer login');
        }
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);