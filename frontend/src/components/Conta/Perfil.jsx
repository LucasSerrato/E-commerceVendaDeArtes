import { useContext, useEffect, useRef, useState } from "react";
import styles from './styles/Perfil.module.css';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Perfil() {
    const { usuario, login, logout } = useContext(AuthContext);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(null);
    const [randomColor] = useState(
        `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
    );
    const [showModal, setShowModal] = useState(false);
    const [nome, setNome] = useState(usuario?.nome || "");
    const [email, setEmail] = useState(usuario?.email || "");

    // Obter dados do usuário ao carregar o componente
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/clientes/${usuario.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setNome(data.nome);
                    setEmail(data.email);
                    login(data); // Atualiza contexto com dados mais recentes
                } else {
                    console.error("Falha ao buscar dados do usuário");
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };

        if (usuario?.id) {
            fetchUserData();
        }
    }, [usuario?.id, login]);

    // Selecionar nova imagem de perfil (simples preview local)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    // Abrir seletor de arquivos
    const openFileSelector = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Atualiza dados do perfil do usuário
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/clientes/${email}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                login(updatedUser); // Atualiza contexto com dados novos
                alert("Nome atualizado com sucesso!");
            } else {
                alert("Erro ao atualizar o perfil.");
            }
        } catch (error) {
            console.error("Erro ao atualizar o perfil:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };

    // Confirma exclusão da conta
    const confirmDelete = async () => {
        setShowModal(false);
        try {
            const response = await fetch(`http://localhost:8080/api/clientes/${email}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Conta apagada com sucesso!");
                logout(); // Limpa contexto do usuário
                navigate("/"); // Redireciona para a home
            } else {
                alert("Erro ao apagar a conta.");
            }
        } catch (error) {
            console.error("Erro ao excluir conta:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className={styles.perfil_container}>
            {/* Imagem do perfil */}
            <div
                className={`${styles.profile_pic_wrapper} ${usuario?.role === "artista" ? styles.editable : ""}`}
                onClick={usuario?.role === "artista" ? openFileSelector : undefined}
            >
                {usuario?.role === "artista" ? (
                    <>
                        <img
                            src={
                                profileImage ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt="Perfil"
                            className={styles.profile_pic}
                        />
                        <div className={styles.edit_icon}>
                            <i className="fas fa-pen"></i>
                        </div>
                    </>
                ) : (
                    <div
                        className={styles.profile_pic}
                        style={{ backgroundColor: randomColor }}
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                />
            </div>

            {/* Formulário de edição do perfil */}
            <form className={styles.perfil_form} onSubmit={handleUpdateProfile}>
                <label>Nome do usuário</label>
                <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <label>Email</label>
                <input value={email} readOnly />

                <button className={styles.botao_salvar} type="submit">Salvar</button>
            </form>

            {/* Botão de apagar conta */}
            <button className={styles.delete_btn} onClick={() => setShowModal(true)}>
                Apagar conta
            </button>

            {/* Modal de confirmação de exclusão */}
            {showModal && (
                <div className={styles.apagar_modal_overlay}>
                    <div className={styles.apagar_modal}>
                        <h3>Tem certeza que deseja apagar sua conta?</h3>
                        <p className={styles.apagar_p}>
                            Sua conta será permanentemente excluída e não poderá ser recuperada.
                        </p>
                        <div className={styles.botao_modal}>
                            <button className={styles.cancelar_btn} onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                            <button className={styles.confirm_delete_btn} onClick={confirmDelete}>
                                Apagar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Perfil;
