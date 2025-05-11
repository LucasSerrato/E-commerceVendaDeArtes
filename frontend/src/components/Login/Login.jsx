import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';
import { AuthContext } from '../../context/AuthContext'; // ✅ Caminho corrigido

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // usa o login do contexto

    const handleLogin = async (e) => {
        e.preventDefault();

        const payload = { email, senha };

        try {
            const response = await fetch('http://localhost:8080/api/clientes/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const usuario = await response.json();
                alert(`Login bem-sucedido! Bem-vindo(a), ${usuario.nome}`);

                login(); // seta como logado e salva o token
                navigate('/home');
            } else if (response.status === 401) {
                alert('E-mail ou senha inválidos.');
            } else {
                alert('Erro no servidor. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao conectar com o servidor.');
        }
    };

    return (
        <section className={styles.login_container}>
            <form className={styles.form_login} onSubmit={handleLogin}>
                <h1>Login</h1>

                <input
                    type='text'
                    id='email'
                    placeholder='E-mail'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    type='password'
                    id='senha'
                    placeholder='Senha'
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                />

                <button className={styles.login_botao} type="submit">Entrar</button>

                <p>Não tem conta? <Link to="/cadastro">Clique aqui</Link> para fazer cadastro</p>
            </form>
        </section>
    );
}

export default Login;
