import styles from './Cadastro.module.css';

function Cadastro() {
    return (
        <section className={styles.cadastro_container}>

            {/* FORM */}
            <form className={styles.form_cadastro}>
                <h1>Cadastro</h1>

                <input type='email' id='email' placeholder='E-mail' required />
                <input type='name' id='nome' placeholder='Username' required />
                <input type='password' id='senha' placeholder='Senha' required />

                {/* TIPO DE CADASTRO */}
                <div className={styles.verificacao}>
                    <p>Você é artista?</p>

                    <div className={styles.sim}>
                        <label htmlFor='artista'>Sim</label>
                        <input type='radio' id='artista' required />
                    </div>

                    <div className={styles.nao}>
                        <label htmlFor='user'>Não</label>
                        <input type='radio' id='user' required />
                    </div>
                </div>

                <button className={styles.cadastro_botao}>Cadastrar</button>

                <p>Já possui cadastro? <a href='/login'>Clique aqui</a> para fazer login</p>
            </form>
        </section>

    );
}

export default Cadastro;