import styles from "./Navbar.module.css";
import logo from '../../assets/imgs/logo_white.png';
import logoRoxo from '../../assets/imgs/logo_purple.png';
import buscarIcon from '../../assets/imgs/buscar_icon.png';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
    const location = useLocation();
    const { logado, logout } = useContext(AuthContext);

    const isLandingPage = location.pathname === "/";
    const navbarClass = isLandingPage ? styles.navbarRoxo : styles.navbarBranco;

    return (
        <nav className={navbarClass}>
            <section className={styles.navbar_container}>
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

                <div className={styles.button_container}>
                    {!logado ? (
                        <>
                            <Link to="/login" className={styles.loginButton}>Entre</Link>
                            <Link to="/cadastro" className={styles.registerButton}>Cadastrar-se</Link>
                        </>
                    ) : (
                        <button onClick={logout} className={styles.loginButton}>Sair</button>
                    )}
                </div>
            </section>
        </nav>
    );
}

export default Navbar;
