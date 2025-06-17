import { createContext, useMemo, useState, useContext } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [modoEscuro, setModoEscuro] = useState(false);

    const toggleModo = () => setModoEscuro((prev) => !prev);

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode: modoEscuro ? "dark" : "light",
                primary: {
                    main: "#1976d2",
                },
            },
        }), [modoEscuro]
    );

    return (
        <ThemeContext.Provider value={{ modoEscuro, toggleModo }}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTema = () => useContext(ThemeContext);
