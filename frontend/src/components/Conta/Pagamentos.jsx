import { useOutletContext, Navigate } from "react-router-dom";
import styles from './styles/Pagamentos.module.css';

function Pagamentos() {
    const { role } = useOutletContext();

    if (role !== 'artista') return <Navigate to="/conta/perfil" replace />

    return (
        <section className={styles.pagamentos_container}>
            PAGAMENTOS
        </section>
    )

}

export default Pagamentos;
