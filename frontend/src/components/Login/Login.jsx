import styles from './Login.module.css'

function Login() {
    return (
        <section className={styles.login_container}>

            {/* FORM */}
            <form className={styles.form_login}>
                <h1> Login </h1>
                <input type='text' id='email' placeholder='E-mail' required />
                <input type='password' id='senha' placeholder='Senha' required />

                <button className={styles.login_botao}>Entrar</button>

                <p>Não tem conta? <a href='/cadastro'>Clique aqui</a> para fazer cadastro</p>
            </form>
        </section>
    );
}

export default Login;