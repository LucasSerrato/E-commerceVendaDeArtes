import { NavLink } from "react-router-dom";
import styles from './styles/Sidebar.module.css';

function Sidebar({ role }) {
    const linkClass = ({ isActive }) =>
        `${styles.linkClass} block py-3 px-4 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-300 font-semibold' : ''
        }`;

    const commonLinkPerfil = [
        { to: "/conta/perfil", label: "Perfil", icon: "fas fa-user-circle" },
    ];

    const roleLinks = role === "artista"
        ? [
            { to: "/conta/editar_portfolio", label: "EditarPortfolio", icon: "far fa-edit" },
            { to: "/conta/pagamentos", label: "Pagamentos", icon: "fas fa-wallet" },
        ]
        : [{ to: "/conta/ver_posts", label: "Posts", icon: "far fa-newspaper" }];

    const commonLinkSuporte = [
        { to: "/conta/suporte", label: "Suporte", icon: "fa fa-headphones" },
    ];

    return (
        <aside className={styles.sidebar_container}>
            <nav className={styles.menu}>
                {[...commonLinkPerfil, ...roleLinks, ...commonLinkSuporte].map(({ to, label, icon }) => (
                    <NavLink key={to} to={to} className={linkClass}>
                        <i className={`${icon} mr-3`}></i>
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;