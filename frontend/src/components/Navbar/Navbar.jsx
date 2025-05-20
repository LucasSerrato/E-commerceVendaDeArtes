import styles from "./Navbar.module.css";
import logo from "../../assets/imgs/logo_white.png";
import logoRoxo from "../../assets/imgs/logo_purple.png";
import buscarIcon from "../../assets/imgs/buscar_icon.png";
import MensagensIcon from "../../assets/imgs/mensagens_icon.png";
import MensagensIconBranco from "../../assets/imgs/mensagens_icon_branco.png";
import PerfilIcon from "../../assets/imgs/pro_icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logado, logout, usuario } = useContext(AuthContext);
  const role = usuario?.role || "usuario";
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const [clientColor, setClientColor] = useState("");
  const [imagemPerfil, setImagemPerfil] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    if (role === "cliente") {
      // Gerar uma vez por sessão
      const storedColor = sessionStorage.getItem("clientColor");
      if (storedColor) {
        setClientColor(storedColor);
      } else {
        const newColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
        setClientColor(newColor);
        sessionStorage.setItem("clientColor", newColor);
      }
    }
  }, [role]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchImagemPerfil = async () => {
      if (usuario?.role === "artista") {
        try {
          const response = await fetch(
            `http://localhost:8080/api/clientes/email/${usuario.email}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data.imagem) {
              setImagemPerfil(
                `http://localhost:8080/api/clientes/imagem/${data.imagem}`
              );
            }
          } else {
            console.error("Erro ao buscar dados do perfil.");
          }
        } catch (error) {
          console.error("Erro ao buscar imagem de perfil:", error);
        }
      }
    };

    fetchImagemPerfil();
  }, [usuario]);

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
            <h1
              className={`${styles.logoTitle} ${
                isLandingPage ? styles.corBranco : styles.corRoxo
              }`}
            >
              FrameWix
            </h1>
          </Link>
        </div>

        {!isLandingPage && (
          <div className={styles.pesquisar}>
            <img
              src={buscarIcon}
              alt="Buscar icon"
              className={styles.buscar_icon}
            />
            <input
              type="text"
              placeholder="Descreva sua comissão"
              className={styles.pesquisar_input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const termo = searchTerm.trim();
                  if (termo !== "") {
                    navigate(`/artistas_clientes?busca=${encodeURIComponent(termo)}`);
                  }
                }
              }}
            />
          </div>
        )}

        <div className={styles.button_container}>
          {!logado ? (
            <>
              <Link to="/login" className={styles.loginButton}>
                Entre
              </Link>
              <Link
                to="/cadastro"
                className={
                  isLandingPage
                    ? styles.registerButton
                    : styles.registerButton_roxo
                }
              >
                Cadastrar-se
              </Link>
            </>
          ) : (
            <section className={styles.nav_cli_container}>
              {/* Ícone de mensagens */}
              <Link
                to="/mensagens"
                className={
                  isLandingPage ? styles.msg_icon_branco : styles.msg_icon_roxo
                }
              >
                <img
                  src={isLandingPage ? MensagensIconBranco : MensagensIcon}
                  alt="Ícone de mensagens"
                  className={styles.icon_msg}
                />
              </Link>

              {/* Se for cliente, mostra botão de "Postar" */}
              {role === "cliente" && (
                <Link
                  to="/post"
                  className={
                    isLandingPage
                      ? styles.post_btn_branco
                      : styles.post_btn_roxo
                  }
                >
                  <i
                    className={`far fa-plus ${
                      isLandingPage ? styles.iconAddBranco : styles.iconAddRoxo
                    }`}
                  ></i>
                  <span
                    className={
                      isLandingPage ? styles.textoBranco : styles.textoRoxo
                    }
                  >
                    Post
                  </span>
                </Link>
              )}

              {/* Se for artista, mostra botão de "Portfólio" */}
              {role === "artista" && (
                <Link
                  to="/portfolio"
                  className={
                    isLandingPage
                      ? styles.post_btn_branco
                      : styles.post_btn_roxo
                  }
                >
                  <span
                    className={
                      isLandingPage ? styles.textoBranco : styles.textoRoxo
                    }
                  >
                    Portfólio
                  </span>
                </Link>
              )}

              {/* Botão de Painel (para ambos) */}
              <Link
                to={role === "artista" ? "/painel_artista" : "/painel_cliente"}
                className={
                  isLandingPage
                    ? styles.painel_btn_branco
                    : styles.painel_btn_roxo
                }
              >
                <span
                  className={
                    isLandingPage ? styles.textoBranco : styles.textoRoxo
                  }
                >
                  Painel
                </span>
              </Link>

              {/* Menu do perfil com opções adicionais */}
              <div
                className={
                  isLandingPage
                    ? styles.perfilWrapper
                    : styles.perfilWrapper_roxo
                }
                ref={menuRef}
              >
                <div
                  className={styles.perfil}
                  onClick={() => setOpen(!open)}
                  title="Perfil"
                >
                  {role === "artista" ? (
                    <img
                      src={imagemPerfil || PerfilIcon}
                      alt="Perfil Artista"
                      className={styles.avatar}
                    />
                  ) : (
                    <div
                      className={styles.perfilArtist}
                      style={{ backgroundColor: clientColor }}
                    ></div>
                  )}
                </div>

                {open && (
                  <div className={styles.perfilMenu}>
                    <Link to="/conta" className={styles.conta_btn}>
                      Perfil
                    </Link>
                    <Link to="/conta/suporte" className={styles.conta_btn}>
                      Ajuda
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                        setTimeout(() => {
                          navigate("/");
                          setTimeout(() => {
                            window.location.reload();
                          }); // Espera 100ms após a navegação para recarregar
                        }, 600);
                      }}
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
