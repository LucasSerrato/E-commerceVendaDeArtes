import { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles/Perfil.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const { usuario, login, logout } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [randomColor] = useState(
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
  );
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState(usuario?.nome || "");
  const [email, setEmail] = useState(usuario?.email || "");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/clientes/email/${usuario.email}`
        );
        if (response.ok) {
          const data = await response.json();
          setNome(data.nome);
          setEmail(data.email);
          setProfileImage(
            data.imagem
              ? `http://localhost:8080/api/clientes/imagem/${data.imagem}`
              : null
          );
        } else {
          console.error("Falha ao buscar dados do usuário");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    if (usuario?.email) {
      fetchUserData();
    }
  }, [usuario?.email]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      let updatedUser = null;

      // Atualiza o nome
      const response = await fetch(
        `http://localhost:8080/api/clientes/email/${email}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome }),
        }
      );

      if (response.ok) {
        updatedUser = await response.json();
      } else {
        alert("Erro ao atualizar o nome.");
        return;
      }

      // Envia a imagem, se houver
      if (selectedFile && updatedUser?.id) {
        const formData = new FormData();
        formData.append("imagem", selectedFile);

        const uploadResponse = await fetch(
          `http://localhost:8080/api/clientes/upload/${updatedUser.id}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (uploadResponse.ok) {
          const updatedUserWithImage = await uploadResponse.json();
          updatedUser = updatedUserWithImage;
        } else {
          const errMsg = await uploadResponse.text();
          alert("Erro ao enviar imagem. Detalhes: " + errMsg);
          console.error(errMsg);
        }
      }

      // Atualiza contexto e imagem
      if (updatedUser) {
        login(updatedUser);

        if (updatedUser.imagem) {
          setProfileImage(
            `http://localhost:8080/api/clientes/imagem/${updatedUser.imagem}`
          );
        }

        // Mensagem única de sucesso
        setMensagemSucesso("Perfil atualizado com sucesso!");
        setTimeout(() => setMensagemSucesso(""), 3000);
      }
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  const confirmDelete = async () => {
    setShowModal(false);
    try {
      const response = await fetch(
        `http://localhost:8080/api/clientes/email/${email}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Conta apagada com sucesso!");
        logout();
        navigate("/");
      } else {
        alert("Erro ao apagar a conta.");
      }
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.perfil_container}>
      <div
        className={`${styles.profile_pic_wrapper} ${
          usuario?.role === "artista" ? styles.editable : ""
        }`}
        onClick={usuario?.role === "artista" ? openFileSelector : undefined}
      >
        {usuario?.role === "artista" ? (
          <>
            <img
              src={
                profileImage ||
                "https://img.icons8.com/plumpy/96/user-male-circle.png"
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

      {mensagemSucesso && (
        <div className={styles.sucesso_alerta}>{mensagemSucesso}</div>
      )}

      <form className={styles.perfil_form} onSubmit={handleUpdateProfile}>
        <label>Nome do usuário</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <label>Email</label>
        <input value={email} readOnly />
        <button className={styles.botao_salvar} type="submit">
          Salvar
        </button>
      </form>

      <button className={styles.delete_btn} onClick={() => setShowModal(true)}>
        Apagar conta
      </button>

      {showModal && (
        <div className={styles.apagar_modal_overlay}>
          <div className={styles.apagar_modal}>
            <h3>Tem certeza que deseja apagar sua conta?</h3>
            <p className={styles.apagar_p}>
              Sua conta será permanentemente excluída e não poderá ser
              recuperada.
            </p>
            <div className={styles.botao_modal}>
              <button
                className={styles.cancelar_btn}
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className={styles.confirm_delete_btn}
                onClick={confirmDelete}
              >
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
