import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logado, setLogado] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    const nome = localStorage.getItem("userNome");
    const id = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");

    if (token && email) {
      setLogado(true);
      setUsuario({ id, email, nome, role });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("token", "token-ficticio");
    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("userNome", userData.nome);
    localStorage.setItem("userId", userData.id);
    localStorage.setItem("userRole", userData.artista ? "artista" : "cliente");

    setUsuario({
      id: userData.id,
      email: userData.email,
      nome: userData.nome,
      role: userData.artista ? "artista" : "cliente",
    });
    setLogado(true);
  };

  const logout = () => {
    localStorage.clear();
    setLogado(false);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ logado, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
