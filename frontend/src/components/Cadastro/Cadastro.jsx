import { useState } from 'react';
import styles from './Cadastro.module.css';

function Cadastro() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [isArtista, setIsArtista] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isArtista === null) {
            alert("Por favor, selecione se você é artista.");
            return;
        }

        const payload = {
            email,
            nome,
            senha,
            artista: isArtista
        };

        try {
            const response = await fetch('http://localhost:8080/api/clientes', { // ✅ URL corrigida
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                setEmail('');
                setNome('');
                setSenha('');
                setIsArtista(null);
            } else {
                alert('Erro ao cadastrar!');
            }
        } catch (err) {
            console.error('Erro:', err);
            alert('Erro ao conectar com o servidor.');
        }
    };

    return (
        <section className={styles.cadastro_container}>
            <form className={styles.form_cadastro} onSubmit={handleSubmit}>
                <h1>Cadastro</h1>

                <input
                    type='email'
                    placeholder='E-mail'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Username'
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Senha'
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                />

                <div className={styles.verificacao}>
                    <p>Você é artista?</p>

                    <div className={styles.sim}>
                        <label htmlFor='artista_sim'>Sim</label>
                        <input
                            type='radio'
                            id='artista_sim'
                            name='tipo'
                            onChange={() => setIsArtista(true)}
                            checked={isArtista === true}
                            required
                        />
                    </div>

                    <div className={styles.nao}>
                        <label htmlFor='artista_nao'>Não</label>
                        <input
                            type='radio'
                            id='artista_nao'
                            name='tipo'
                            onChange={() => setIsArtista(false)}
                            checked={isArtista === false}
                            required
                        />
                    </div>
                </div>

                <button className={styles.cadastro_botao} type='submit'>Cadastrar</button>
                <p>Já possui cadastro? <a href='/login'>Clique aqui</a> para fazer login</p>
            </form>
        </section>
    );
}

export default Cadastro;
