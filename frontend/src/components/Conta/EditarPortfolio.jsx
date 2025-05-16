import styles from './styles/EditarPortfolio.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Illustracao from '../../assets/imgs/illustration_dragon.jpg';
import MeioCorpo from '../../assets/imgs/half_body.jpg';
import Retrato from '../../assets/imgs/portrait_man.jpg';


function EditarPortfolio() {
    const navigate = useNavigate();
    const [showBioModal, setShowBioModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // APAGAR ARTE
    const confirmDelete = () => {
        setShowDeleteModal(false);
        alert("Arte apagada!");
    };

    return (
        <section className={styles.edit_container}>

            {/* BOTAO ADICIONAR ARTE E BIOGRAFIA */}
            <div className={styles.item} onClick={() => navigate('/conta/add_novo')}>
                <span>Adicionar novo arte</span>
                <i className="fas fa-angle-right" />
            </div>


            <div className={styles.item} onClick={() => setShowBioModal(true)}>
                <span>Biografia</span>
                <i className="fas fa-pen" />
            </div>


            {/* GENRENCIAR ARTE CARD */}
            <section className={styles.editar_card_container}>
                <div className={styles.editar_card}>
                    <img src={Illustracao} alt='imagem do portfolio' />

                    <div className={styles.card_info}>
                        <h4>Illustração</h4>
                        <p> de <span>R$100</span></p>
                    </div>

                    <div className={styles.card_btn}>
                        <i className={styles.edit_btn} onClick={() => navigate('/conta/editar')} class="fas fa-pen"></i>
                        <i className={styles.trash_btn} onClick={() => setShowDeleteModal(true)} class='fas fa-trash'></i>
                    </div>
                </div>

                <div className={styles.editar_card}>
                    <img src={MeioCorpo} alt='imagem do portfolio' />

                    <div className={styles.card_info}>
                        <h4>Illustração</h4>
                        <p> de <span>R$100</span></p>
                    </div>

                    <div className={styles.card_btn}>
                        <i className={styles.edit_btn} onClick={() => navigate('/conta/editar')} class="fas fa-pen"></i>
                        <i className={styles.trash_btn} onClick={() => setShowDeleteModal(true)} class='fas fa-trash'></i>
                    </div>
                </div>

                <div className={styles.editar_card}>
                    <img src={Retrato} alt='imagem do portfolio' />

                    <div className={styles.card_info}>
                        <h4>Illustração</h4>
                        <p> de <span>R$100</span></p>
                    </div>

                    <div className={styles.card_btn}>
                        <i className={styles.edit_btn} onClick={() => navigate('/conta/editar')} class="fas fa-pen"></i>
                        <i className={styles.trash_btn} onClick={() => setShowDeleteModal(true)} class='fas fa-trash'></i>
                    </div>
                </div>
            </section>

            {/* MODAL BIOGRAFIA */}
            {showBioModal && (
                <div className={styles.overlay_modal} onClick={() => setShowBioModal(false)}>
                    <div className={styles.content} onClick={e => e.stopPropagation()}>
                        <h2>Editar Biografia</h2>

                         <label>Portfólio público</label>
                         <input className={styles.input} type="url" placeholder="https://artistree.io/pearls.art" />

                         <label>Bio</label>
                         <textarea className={styles.textarea} placeholder="Digite sua biografia..." />

                        <button className={styles.bio_btn} onClick={() => setShowBioModal(false)}>Salvar</button>
                    </div>
                </div>
            )}

            {/* Modal para apagar arte*/}
            {showDeleteModal && (
                <div className={styles.overlay_modal}>
                    <div className={styles.delete_modal}>
                        <h3>Tem certeza que deseja apagar a arte?</h3>
                        <div className={styles.botao_modal}>
                            <button className={styles.cancelar_btn} onClick={() => setShowDeleteModal(false)}>
                                Cancelar
                            </button>
                            <button className={styles.confirm_delete_btn} onClick={confirmDelete}>
                                Apagar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
};

export default EditarPortfolio;
