

# 🎨 **Pixxl – Digital Art Marketplace for Independent Artists**

**Pixxl** is a complete **full stack web application** developed using **React** (front-end), **Spring Boot** (back-end), and **H2 Database** (for persistence during development). The platform serves as a **marketplace for independent artists** to publish their artwork, receive commissions, and communicate directly with potential buyers. It includes a clean, modern interface tailored separately for **artists (sellers)** and **clients (buyers)**.

Pixxl enables communication, project management, and negotiation through an **integrated internal chat system**, a **project wall** where artists showcase their work, and a **proposal system** where clients can send custom art requests that artists may accept or reject.

---

## 🧠 **Project Overview**

Pixxl was designed with a **user-centric and scalable architecture**, incorporating industry-standard technologies. The application provides a platform that:

- Promotes the work of independent visual artists
- Enables direct artist-client interaction
- Offers tools for managing orders and project requests
- Allows users to browse and explore artistic portfolios

This project showcases advanced front-end and back-end integration using **React components, RESTful APIs, and Java-based persistence**, making it ideal for academic use, professional portfolios, or commercial expansion.

---

## 🛠️ **Technologies & Architecture**

### 🔷 Front-End: React Ecosystem

- **React (JavaScript, JSX)**  
  Utilizes component-based architecture for efficient and modular UI development. Routes and views are separated by user roles (artist/client), promoting better user flow and scalability.

- **React Router DOM**  
  Handles multi-page navigation with smooth transitions between dashboards, project views, profile sections, and chat interfaces.

- **Axios**  
  Responsible for all asynchronous HTTP requests, ensuring secure and fast communication with the Spring Boot REST API.

- **CSS3 / Styled Components**  
  Provides styling with a focus on **responsive design**, **theme consistency**, and a **modern user experience (UX/UI)**.

---

### 🟨 Back-End: Java & Spring Boot

- **Spring Boot (Java)**  
  Powers the RESTful API that handles user authentication, routing, project and message management, and proposal workflows.

- **Spring Web & Spring MVC**  
  Implements REST controllers and service layers under a **Model-View-Controller** structure, promoting code separation and scalability.

- **Spring Data JPA**  
  Simplifies database interactions and CRUD operations by mapping Java objects to relational tables using annotations and repositories.

- **H2 Database**  
  Lightweight, in-memory database used during development and testing. Enables fast startup and real-time visibility via `H2 Console`.

---

## 🔄 **System Architecture**

The platform is built upon a **client-server architecture**, where the React front-end consumes RESTful endpoints exposed by the Spring Boot back-end. HTTP methods used include:

- `GET`: Retrieve artist data, project walls, and chat messages
- `POST`: Submit proposals, send messages, create user accounts
- `PUT`: Update project or user information
- `DELETE`: Remove messages, users, or project entries

---

## 📦 **Core Functionalities**

### 👨‍🎨 Artist (Seller)

- Register, log in, and update profile
- Upload and manage multiple artworks
- Display work in a public project wall
- View, accept, or reject client proposals
- Chat directly with interested buyers
- Manage ongoing or completed commissions

### 🧑‍💼 Client (Buyer)

- Create account and explore artist portfolios
- Send proposals for custom projects
- Navigate project walls and filter artists
- Engage in real-time chat with artists
- Track proposal status and accepted requests

### 🔁 Common Features

- Internal messaging system (chat)
- Role-based UI for artists and clients
- Fully responsive interface (desktop and mobile)
- Intuitive navigation and real-time feedback

---

## ▶️ **How to Run the Project Locally**

### 1. Clone the repository

```bash
git clone https://github.com/LucasSerrato/curriculoTsuda.git
cd curriculoTsuda
```

### 2. Run the Spring Boot back-end

```bash
cd backend
./mvnw spring-boot:run
```

> API available at `http://localhost:8080`  
> H2 Console at `http://localhost:8080/h2-console`

### 3. Run the React front-end

```bash
cd frontend
npm install
npm install @fortawesome/fontawesome-free
npm start
```

> UI available at `http://localhost:3000`

---

## 📚 **Academic Highlights**

Pixxl demonstrates proficiency in:

- Front-end and back-end integration
- MVC architecture and component design
- REST API development with Spring Boot
- CRUD operations and state management
- Role-based user interfaces
- Agile development practices

---

## 🤝 **Contributions**

Feel free to fork, suggest improvements, or open issues and pull requests. Collaboration is welcome!

---

## 📧 **Contact**

**Lucas Serrato**  
[🔗 LinkedIn](https://www.linkedin.com/in/lucasserrato201)  
📩 alfalifeclothes@gmail.com  
☕ [Donate via Pix](https://livepix.gg/lkshow)

## **Read-me by Lucas Serrato Bonito.**

---

---

# 🎨 **Pixxl – Plataforma de Artes Digitais para Artistas Independentes**

**Pixxl** é uma aplicação web **full stack** desenvolvida com **React** (front-end), **Spring Boot** (back-end) e **H2 Database** (para persistência local), que funciona como um **marketplace de artes**. Seu foco é conectar **artistas independentes (vendedores)** a **clientes (compradores)**, facilitando negociações, comissões e comunicação direta.

A plataforma conta com interfaces distintas para artistas e clientes, um **chat interno**, um **mural público de projetos**, e um sistema de **propostas personalizadas**, onde o artista pode **aceitar ou recusar** encomendas feitas pelo cliente.

---

## 🧠 **Visão Geral do Projeto**

Pixxl foi planejado com uma arquitetura escalável, modular e voltada à experiência do usuário. A proposta é proporcionar uma plataforma digital moderna onde:

- Artistas possam expor seus trabalhos e receber propostas
- Clientes possam contratar projetos personalizados
- Haja comunicação direta via chat interno
- Os usuários gerenciem pedidos, perfis e mensagens

O sistema explora conceitos avançados de desenvolvimento web e integra tecnologias amplamente usadas no mercado.

---

## 🛠️ **Tecnologias e Arquitetura**

### 🔷 Front-end: React + CSS3

- **React (JavaScript, JSX)**  
  Interface baseada em componentes reutilizáveis. Rotas distintas são usadas para separar a experiência do artista da experiência do cliente.

- **React Router DOM**  
  Controla a navegação entre as telas (dashboard, mural, perfil, chat, etc.) de forma fluida.

- **Axios**  
  Biblioteca para requisições HTTP assíncronas, responsável por integrar o front-end com a API REST do back-end.

- **CSS3 / Styled Components**  
  Estilização moderna com foco em responsividade, minimalismo e usabilidade.

---

### 🟨 Back-end: Spring Boot + JPA + H2

- **Spring Boot (Java)**  
  Framework que estrutura a API RESTful do projeto, gerenciando autenticação, rotas, lógica de negócio e integrações.

- **Spring MVC + Spring Web**  
  Implementação da arquitetura **MVC**, com controle das rotas, serviços e entidades.

- **Spring Data JPA**  
  Simplifica a manipulação de dados no banco via repositórios e anotações. Entidades como `Artista`, `Cliente`, `Projeto`, `Mensagem` e `Proposta` são persistidas de forma estruturada.

- **H2 Database**  
  Banco de dados relacional **em memória**, ideal para desenvolvimento local e testes. Pode ser acessado via console web.

---

## 🔄 **Arquitetura do Sistema**

O Pixxl utiliza uma **arquitetura cliente-servidor**, com comunicação via API REST usando os métodos HTTP:

- `GET`: recuperar dados de artistas, mensagens, projetos etc.
- `POST`: envio de propostas, mensagens, cadastros
- `PUT`: atualização de projetos, perfis
- `DELETE`: remoção de mensagens ou entradas

---

## 📦 **Funcionalidades**

### 👨‍🎨 Para Artistas (Vendedores)

- Cadastro e login
- Criação de perfil artístico
- Upload de projetos para o mural
- Gerenciamento de propostas
- Aceitar ou recusar pedidos
- Comunicação com compradores via chat interno

### 🧑‍💼 Para Clientes (Compradores)

- Cadastro e login
- Navegação por murais e perfis de artistas
- Envio de propostas para artes sob encomenda
- Acompanhamento do status das propostas
- Chat direto com artistas

### 🔁 Funcionalidades Comuns

- Interface responsiva (desktop/mobile)
- Sistema de mensagens (chat interno)
- Separação de perfis por tipo de usuário
- Interface moderna e fácil de usar

---

## ▶️ **Como Executar Localmente**

### 1. Clone o repositório

```bash
git clone https://github.com/LucasSerrato/curriculoTsuda.git
cd curriculoTsuda
```

### 2. Inicie o back-end (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

> API: `http://localhost:8080`  
> Console H2: `http://localhost:8080/h2-console`

### 3. Inicie o front-end (React)

```bash
cd frontend
npm install
npm start
```

> Front-end: `http://localhost:3000`

---

## 📚 **Destaques Acadêmicos**

Pixxl é um projeto ideal para contextos acadêmicos e portfólios de desenvolvedores, pois demonstra:

- Integração entre front-end e back-end
- Implementação de APIs REST com Spring Boot
- Consumo de APIs com React e Axios
- Operações CRUD completas
- Separação de camadas e responsabilidades (MVC)
- Práticas modernas de desenvolvimento web

---

## 🤝 **Contribuições**

Forks, sugestões e melhorias são sempre bem-vindos!  
Contribua com código, abra issues ou envie pull requests.

---

## 📧 **Contato**

**Lucas Serrato**  
[🔗 LinkedIn](https://www.linkedin.com/in/lucasserrato201)  
📩 alfalifeclothes@gmail.com  
☕ [Doe via Pix](https://livepix.gg/lkshow)

## **Leia-me feito por Lucas Serrato Bonito.**

---
