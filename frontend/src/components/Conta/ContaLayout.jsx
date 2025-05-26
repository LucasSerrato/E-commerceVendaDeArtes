import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./styles/ContaLayout.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ContaLayout() {
  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    return <div className={styles.loading}>Carregando...</div>;
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
