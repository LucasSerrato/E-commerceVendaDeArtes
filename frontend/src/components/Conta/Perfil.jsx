import { useOutletContext } from "react-router-dom";
import { useRef, useState } from "react";
import styles from './styles/Perfil.module.css';

function Perfil() {
    const { role } = useOutletContext();
    const fileInputRef = useRef(null);

    const [profileImage, setProfileImage] = useState(null);
    const [randomColor] = useState(
        `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
    );
    const [showModal, setShowModal] = useState(false);

    // TROCAR DE IMAGEM
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    // ABRIR PASTA PARA SELECIONAR IMAGEM NOVA
    const openFileSelector = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // APAGAR CONTA
    const confirmDelete = () => {
        setShowModal(false);
        alert("Conta apagada!");
    };

    return (
        <div className={styles.perfil_container}>

            {/* IMG PERFIL */}
            <div
                className={`${styles.profile_pic_wrapper} ${role === "artista" ? styles.editable : ""}`}
                onClick={role === "artista" ? openFileSelector : undefined}
            >
                {role === "artista" ? (
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

            {/* FORM */}
            <form className={styles.perfil_form}>
                <label>Nome do usuário</label>
                <input placeholder="pearls.art" />
                <label>Email</label>
                <input placeholder="pearlart@gmail.com" readOnly />

                
                <button className={styles.botao_salvar} type="submit">Salvar</button>
            </form>

            <button className={styles.delete_btn} onClick={() => setShowModal(true)}>
                Apagar conta
            </button>


            {/* Modal para apagar a conta*/}
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
