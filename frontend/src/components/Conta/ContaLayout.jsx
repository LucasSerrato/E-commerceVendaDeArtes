import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';
import styles from './styles/ContaLayout.module.css';

function ContaLayout() {
    const user = { role: 'artista' };

    return (
        <div className={styles.layout}>
            <Sidebar role={user.role} />
            <main className={styles.context}>
                <Outlet context={{ role: user.role }} />
            </main>
        </div>
    )

}

export default ContaLayout;
