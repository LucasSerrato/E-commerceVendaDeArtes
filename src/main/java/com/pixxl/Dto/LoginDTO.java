// src/main/java/com/pixxl/dto/LoginDTO.java
package com.pixxl.Dto;

public class LoginDTO {
    private String email;
    private String senha;
    private String imagen;

    // Getters e Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
}
