import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [logado, setLogado] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLogado(true);
        }
    }, []);

    const login = () => {
        localStorage.setItem("token", "token-ficticio");
        setLogado(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setLogado(false);
    };

    return (
        <AuthContext.Provider value={{ logado, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
