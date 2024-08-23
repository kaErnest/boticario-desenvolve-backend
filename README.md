# Programa Desenvolve - BackEnd | Grupo Boticário
Bem-vindo ao projeto Solamigo, a loja online de cosméticos especializada em produtos de proteção solar e cuidados para pets e seus donos. Este backend foi desenvolvido como parte do curso Desenvolve, administrado pela escola de Tecnologia Alura, onde aprendi conceitos fundamentais de desenvolvimento web e a construção de APIs com Node.js e MongoDB. 🐾

## Índice
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Descrição 📄](#Descrição 📄)
- [Funcionalidades](#Funcionalidades)
- [Instalação](#instalação)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Execução](#execução)
- [Testes](#testes)
- [Contribuição](#contribuição)

## Descrição 📄
O backend do projeto Solamigo é responsável por gerenciar os dados da loja online, como produtos e kits, bem como a lógica de negócio para a aplicação. A API RESTful foi desenvolvida com Node.js e Express.js, e utiliza o MongoDB para armazenar as informações dos produtos e kits.

## Funcionalidades 🚀
- CRUD de produtos e kits
- Gerenciamento de imagens de produtos
- Integração com MongoDB para persistência de dados
- Validação e tratamento de erros

## Tecnologias Utilizadas 🛠️

- Node.js
- Express
- MongoDB
- Mongoose
- Jest (para testes automatizados)
- Supertest (para testes de integração)
- MongoDB Memory Server
- Multer  (para upload de imagens)
- CORS
- Dotenv

## Integração com Frontend 🔗
O backend foi projetado para fornecer uma API RESTful que permite ao frontend acessar e manipular os dados do MongoDB. A comunicação é feita via requisições HTTP, garantindo que os dados exibidos na página web estejam sempre atualizados e sincronizados com o banco de dados.

Como Funciona:

- Backend: Gerencia as operações de leitura, criação, atualização e exclusão de produtos e kits.
- API REST: Permite a comunicação entre o frontend e o banco de dados.
- Frontend: Consome a API para exibir dinamicamente as informações dos produtos e kits.

## Instalação

1. Clone os repositórios:
   ```bash
   mkdir ~/boticario-desenvolve
   cd ~/boticario-desenvolve
   git clone https://github.com/seu-usuario/backend-desenvolver backend
   git clone https://github.com/seu-usuario/frontend-desenvolver frontend

2. Instale as dependências: 💻
   ```bash
   cd backend
   npm install

3. Configuração do Banco de Dados:
   Este projeto usa o MongoDB. Para configurar:
   Crie um arquivo .env na raiz do projeto e adicione a variável MONGO_URI com a URI de conexão ao seu banco de dados MongoDB:
   ```bash
   MONGO_URI=mongodb://localhost:27017/nome-do-banco
   PORT=3000

4. Execução do BackEnd ▶️
   Inicie o servidor backend:
   ```bash
   npm run dev

5. Execução do FrontEnd:
   Navegue até o diretório do frontend e abra o arquivo index.html no navegador:
   ```bash
   cd ../frontend
   open index.html
   
O servidor será iniciado em http://localhost:3000.

6. Testes
   Este projeto inclui testes automatizados para garantir a qualidade do código. Para rodar os testes:
   ```bash
   npm test

🤝 Contribuição
<br>Contribuições são bem-vindas! 
<br>Sinta-se à vontade para enviar pull requests ou sugerir melhorias.

✍️ Autor
<br>Karoline Ernest
<br>Desenvolvedora Full Stack
