# Projeto: Pokédex com ReactJS & Electron

## Descrição
Este projeto é uma Pokédex desenvolvida utilizando **ReactJS**, **Electron** (opcional), e **PokéAPI** para exibir informações sobre Pokémons. O projeto conta com **tema dark/light**, **pesquisa por nome, número e tipo**, **tabela responsiva**, **sistema de paginação**, e **detalhamento de cada Pokémon incluindo suas evoluções**.

---

## 📌 Funcionalidades
✔ Escolha entre tema **claro** e **escuro**
✔ Pesquisa por **nome, número ou tipo** do Pokémon
✔ Exibição dos Pokémons em **tabela responsiva**
✔ **Detalhamento** do Pokémon selecionado
✔ Exibição da **cadeia de evolução**
✔ **Paginação** para facilitar a navegação
✔ **ElectronJS** para possibilitar uso como aplicativo desktop (opcional)
✔ **Testes unitários com Jest & Testing Library**

---

## 🚀 Tecnologias Utilizadas
- **ReactJS**
- **TypeScript**
- **Styled Components** (para estilização)
- **Context API** (gerenciamento de tema)
- **PokéAPI** (consumo de dados)
- **React Router** (navegação)
- **ElectronJS** (para aplicação desktop)
- **Jest & Testing Library** (testes automatizados)

---

## 📥 Instalação e Execução

### **1️⃣ Clonar o Repositório**
```sh
 git clone https://github.com/seu-usuario/projeto-pokedex.git
 cd projeto-pokedex
```

### **2️⃣ Instalar dependências**
```sh
npm install
```

### **3️⃣ Rodar o projeto**
#### 💻 **Modo Web**
```sh
npm start
```

#### 🖥 **Modo Electron** (Opcional)
```sh
npm run electron:start
```

---

## 📌 Estrutura do Projeto
```
projeto-pokedex/
├── public/
├── src/
│   ├── components/         # Componentes reutilizáveis
│   ├── context/            # Context API para gerenciamento de estado
│   ├── pages/              # Páginas principais (Home, Search, Details)
│   ├── services/           # Serviços para consumo da API
│   ├── tests/              # Testes unitários com Jest
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Entrada principal do React
├── electron/               # Arquivos do ElectronJS (se utilizado)
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração do TypeScript
└── README.md               # Documentação do projeto
```

---

## 🔍 Testes
Para rodar os testes automatizados, execute:
```sh
npm test
```

---

## 📌 Melhorias Futuras
🔹 Implementar cache para otimizar requisições à API
🔹 Criar uma versão mobile-first aprimorada
🔹 Adicionar gráficos estatísticos sobre os Pokémons



