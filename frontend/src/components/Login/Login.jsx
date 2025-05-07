import { useState } from 'react';
import styles from './Login.module.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const payload = {
            email,
            senha
        };

        try {
            const response = await fetch('http://localhost:8080/api/clientes/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const usuario = await response.json();
                alert(`Login bem-sucedido! Bem-vindo(a), ${usuario.nome}`);
                // redirecionar para outra página ou salvar estado de login
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

                <button className={styles.login_botao}>Entrar</button>

                <p>Não tem conta? <a href='/cadastro'>Clique aqui</a> para fazer cadastro</p>
            </form>
        </section>
    );
}

export default Login;
