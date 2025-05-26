import styles from "./HeroSection.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/artistas_clientes?busca=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className={styles.hero}>
      <h1>Plataforma de artistas independentes</h1>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Descreva sua arte"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      <button
        className={styles.button}
        onClick={() => navigate("/artistas_clientes")}
      >
        Descubra artistas
      </button>
    </section>
  );
}

export default HeroSection;
