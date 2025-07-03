import { createContext, useMemo, useState, useContext } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [modoEscuro, setModoEscuro] = useState(false);

    const toggleModo = () => setModoEscuro((prev) => !prev);

    const theme = useMemo(() => createTheme({
        palette: {
            mode: modoEscuro ? "dark" : "light",
            primary: {
                main: modoEscuro ? "#7c4dff" : "#1976d2", 
            },
            secondary: {
                main: modoEscuro ? "#536dfe" : "#2196f3",
            },
            background: {
                default: modoEscuro ? "#0c1024" : "#fff", 
                paper: modoEscuro ? "#1a2035" : "#ffffff",
            },
            text: {
                primary: modoEscuro ? "#ffffff" : "#000", 
                secondary: modoEscuro ? "#a0a8c3" : "#5c5c5c",
            },
        },
        typography: {
            fontFamily: 'Inter, Roboto, sans-serif',
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
        },
        components: {
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: modoEscuro ? '#a0a8c3' : '#4a4a4a',
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '& fieldset': {
                            borderColor: modoEscuro ? '#3f3f3f' : '#ccc',
                        },
                        '&:hover fieldset': {
                            borderColor: modoEscuro ? '#ffffff88' : '#1976d2',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1976d2',
                        },
                        color: modoEscuro ? '#fff' : '#000',
                    },
                },
            },
            MuiStepLabel: {
                styleOverrides: {
                    label: ({ theme }) => ({
                        color: theme.palette.text.primary,
                        '&.Mui-completed': {
                            color: theme.palette.primary.main,
                        },
                        '&.Mui-active': {
                            fontWeight: 700,
                        },
                    }),
                },
            },
            MuiStepIcon: {
                styleOverrides: {
                    root: ({ theme }) => ({
                    // 👉 Cinza quando está "pendente" (nem ativa nem completa)
                        color: theme.palette.mode === 'dark' ? '#888888' : '#9e9e9e',
                        
                        // Quando a etapa está concluída
                        '&.Mui-completed': {
                            color: theme.palette.primary.main,
                        },

                        // Quando a etapa está ativa
                        '&.Mui-active': {
                            color: theme.palette.primary.main,
                        },
                    }),
                },
            },
        }
    }), [modoEscuro]);

    return (
        <ThemeContext.Provider value={{ modoEscuro, toggleModo }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTema = () => useContext(ThemeContext);
