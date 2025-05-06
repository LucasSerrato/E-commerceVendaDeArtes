import styles from './Post.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Post() {
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
        <section className={styles.post_container}>

            <form className={styles.form_post}>
                <div className={styles.form_left}>
                    <h1>Criar publicação</h1>
                    <label>Texto</label>

                </div>
                <textarea placeholder="Explique sua comissão" required></textarea>

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

                <Link to="/painel_cliente" className={styles.botao_criar}>
                    Criar Publicação
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
}
export default Post;