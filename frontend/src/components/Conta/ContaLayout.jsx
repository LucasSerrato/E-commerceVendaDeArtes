import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';
import styles from './styles/ContaLayout.module.css';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ContaLayout() {
    const { usuario } = useContext(AuthContext);

    // Enquanto o usuário não estiver carregado, evita quebrar render
    if (!usuario) {
        return <div className={styles.loading}>Carregando...</div>; // ou um spinner bonito
    }

    const role = usuario.role || "cliente";

    return (
        <div className={styles.layout}>
            <Sidebar role={role} />
            <main className={styles.context}>
                <Outlet context={{ role }} />
            </main>
        </div>
    );
}

export default ContaLayout;
