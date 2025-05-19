import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./styles/Sidebar.module.css";

function Sidebar({ role }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) setIsOpen(false); // Feche a barra lateral
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const linkClass = ({ isActive }) =>
    `${styles.linkClass} ${isActive ? "bg-gray-300 font-semibold" : ""}`;

  const commonLinkPerfil = [
    { to: "/conta/perfil", label: "Perfil", icon: "fas fa-user-circle" },
  ];

  const roleLinks =
    role === "artista"
      ? [
          {
            to: "/conta/editar_portfolio",
            label: "Editar Portfolio",
            icon: "far fa-edit",
          },
          {
            to: "/conta/pagamentos",
            label: "Pagamentos",
            icon: "fas fa-wallet",
          },
        ]
      : [{ to: "/conta/ver_posts", label: "Posts", icon: "far fa-newspaper" }];

  const commonLinkSuporte = [
    { to: "/conta/suporte", label: "Suporte", icon: "fa fa-headphones" },
  ];

  return (
    <>
      {isMobile && (
        <div
          className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <aside
        className={`${styles.sidebar_container} ${
          isMobile ? (isOpen ? styles.sidebar_open : "") : ""
        }`}
      >
        <nav className={styles.menu}>
          {[...commonLinkPerfil, ...roleLinks, ...commonLinkSuporte].map(
            ({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={linkClass}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <i className={`${icon}`}></i>
                {label}
              </NavLink>
            ),
          )}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
