import styles from "./Navbar.module.css";
import logo from '../../assets/imgs/logo_white.png';
import logoRoxo from '../../assets/imgs/logo_purple.png';
import buscarIcon from '../../assets/imgs/buscar_icon.png';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    // FUNÇÃO PARA ALTERAR A COR DA NAVBAR QUANDO NÃO ESTIVER NA PÁGINA INICIAL
    const location = useLocation();

    const isLandingPage = location.pathname === "/"; // só na home
    const navbarClass = isLandingPage ? styles.navbarRoxo : styles.navbarBranco;

    return (
        <nav className={navbarClass}>
            <section className={styles.navbar_container}>

                {/* NAVEGAR PARA A TELA INICIAL QUANDO CLICA NO LOGO */}
                <div className={styles.logo_container}>
                    <Link to="/" className={styles.logoLink}>
                        <img
                            src={isLandingPage ? logo : logoRoxo}
                            alt="Logo"
                            className={styles.logo}
                        />
                        <h1 className={`${styles.logoTitle} ${isLandingPage ? styles.corBranco : styles.corRoxo}`}>
                            FrameWix
                        </h1>
                    </Link>
                </div>

                {/* EXIBIR A BARRA DE PESQUISA QUANDO NÃO ESTIVER NA TELA INICIAL*/}
                {!isLandingPage && (
                    <div className={styles.pesquisar}>
                        <img src={buscarIcon} alt="Buscar icon" className={styles.buscar_icon} />
                        <input
                            type="text"
                            placeholder="Descreva sua comissão"
                            className={styles.pesquisar_input}
                        />
                    </div>
                )}

                {/* NAV A */}
                <div className={styles.button_container}>
                    <a href="/login" className={styles.loginButton}>Entre</a>
                    <a href="/cadastro" className={styles.registerButton}>Cadastrar-se</a>
                </div>
            </section>
        </nav>
    );
}

export default Navbar;
