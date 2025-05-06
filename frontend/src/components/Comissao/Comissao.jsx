import styles from './Comissao.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ImgSelecionada from '../../assets/imgs/illustration_dragon.jpg'

function Comissao() {
    const [images, setImages] = useState([]);

    const handleFiles = (files) => {
        const newImages = Array.from(files).filter(file => file.type.startsWith('image/'));
        const previews = newImages.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }));
        setImages(prev => [...prev, ...previews]);
    };

    const removeImage = (url) => {
        setImages(prev => prev.filter(img => img.url !== url));
    };
    return (
        <section className={styles.comissao_container}>

            <form className={styles.form_comissao}>
                <div className={styles.infoDa_solicitacao}>
                    <img src={ImgSelecionada} alt='imagem da solicitação selecionado' />
                    <h4>Illustração</h4>
                    <p> de<span>R$100</span></p>
                </div>

                <div className={styles.right_left}>
                    <div className={styles.right}>
                        <label>Nome:</label>
                        <input type='name' placeholder='joao.carlos' readOnly />

                    </div>

                    <div className={styles.left}>
                        <label>Descreve sua solicitação</label>
                        <textarea placeholder="Mensagem" required></textarea>
                    </div>
                </div>

                {/* DRAG AND DROP ZONE */}
                <div
                    className={styles.dropzone}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        handleFiles(e.dataTransfer.files);
                    }}
                    onClick={() => document.getElementById('multiImageInput').click()}
                >
                    Arraste uma ou mais imagens de referência aqui ou clique para selecionar
                    <input
                        type="file"
                        id="multiImageInput"
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                        onChange={(e) => handleFiles(e.target.files)}
                    />
                </div>

                <Link to="/painel_cliente" className={styles.botao_solicitarSer}>
                    Solicitar serviço
                </Link>
            </form>

            {/* lISTA DE IMAGENS CARREGADAS */}
            <div className={styles.previewGrid}>
                {images.map((img, index) => (
                    <div key={index} className={styles.previewItem}>
                        <img src={img.url} alt={`Preview ${index}`} className={styles.previewImage} />
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => removeImage(img.url)}
                        >
                            &#10006;
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )

};

export default Comissao