import { useState } from 'react';
import styles from './Cadastro.module.css';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [isArtista, setIsArtista] = useState(null);
    const navigate = useNavigate();

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
            const response = await fetch('http://localhost:8080/api/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                navigate('/login');
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
                    placeholder='Nome de usuário'
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
                    <label>
                        Sim
                        <input
                            type="radio"
                            name="tipo"
                            checked={isArtista === true}
                            onChange={() => setIsArtista(true)}
                        />
                    </label>
                    <label>
                        Não
                        <input
                            type="radio"
                            name="tipo"
                            checked={isArtista === false}
                            onChange={() => setIsArtista(false)}
                        />
                    </label>
                </div>

                <button className={styles.cadastro_botao} type='submit'>Cadastrar</button>
                <p>Já possui cadastro? <a href='/login'>Clique aqui</a> para fazer login</p>
            </form>
        </section>
    );
}

export default Cadastro;
