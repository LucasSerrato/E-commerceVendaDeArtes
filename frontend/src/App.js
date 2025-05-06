import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import FeatureSection from "./components/FeatureSection/FeatureSection";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import "./styles/global.css";
import HowItWorksSection from './components/HowItWorks/HowItWorksSection';
import ArtistasEclientes from './components/ArtistasEclientes/ArtistasEclientes';
import Login from './components/Login/Login';
import Cadastro from './components/Cadastro/Cadastro';
import VerArte from './components/VerArte/VerArte';
import PainelArtista from './components/PainelArtista/PainelArtista';
import PainelCliente from './components/PainelCliente/PainelCliente';
import Comissao from './components/Comissao/Comissao';
import Post from './components/Post/Post';
import ContaLayout from './components/Conta/ContaLayout';
import Perfil from './components/Conta/Perfil';
import EditarPortfolio from './components/Conta/EditarPortfolio';
import VerPost from './components/Conta/VerPost';
import Pagamentos from './components/Conta/Pagamentos';
import Suporte from './components/Conta/Suporte';
import AdiconarNovo from './components/Conta/AdicionarNovo';
import Editar from './components/Conta/Editar';

// Dentro do return:
<HowItWorksSection />


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={
                    <>
                        <HeroSection />
                        <FeatureSection />
                        <HowItWorksSection />
                        <FAQ />
                    </>
                } />
                <Route path="/conta" element={<ContaLayout />}>
                    <Route index element={<Navigate to="perfil" replace />} />
                    <Route path="perfil" element={<Perfil />} />
                    <Route path="editar_portfolio" element={<EditarPortfolio />} />
                    <Route path="ver_posts" element={<VerPost />} />
                    <Route path="pagamentos" element={<Pagamentos />} />
                    <Route path="suporte" element={<Suporte />} />
                    <Route path="add_novo" element={<AdiconarNovo />} />
                    <Route path="editar" element={<Editar />} />
                </Route>

                <Route path="/artistas_clientes" element={<ArtistasEclientes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/ver_arte" element={<VerArte />} />
                <Route path="/painel_artista" element={<PainelArtista />} />
                <Route path="/painel_cliente" element={<PainelCliente />} />
                <Route path="/comissao" element={<Comissao />} />
                <Route path="/post" element={<Post />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
