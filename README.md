<h1 align="center">:spaghetti: TheRestaurant :spaghetti:</h1>

The restaurant é uma aplicação web que permite o usuário acessar o menu, ver informações sobre um restaurante e até mesmo reservar mesas online.

A cereja do bolo é o dashboard que o usuarío possui acesso caso realize o login, lá ele encontra um painel com todas as reservas feitas no intervalo de tempo selecionado.
### ✨ Recursos
- **🌍 Navegação no Menu:** Os usuários podem explorar os pratos do restaurante, organizados por categorias.
- **:tropical_drink: Sistema de Reservas:** Permite que os usuários reservem mesas para uma data e hora específicas.
- **💅 Design Responsivo:** Otimizado para uso em vários dispositivos, incluindo dispositivos móveis e desktop.
- **🚀 Painel Administrativo:** Os administradores podem gerenciar reservas, atualizar o menu e visualizar o feedback dos clientes.

### 💻 Deploy
Você pode acessar ele agora mesmo pelo link: https://br-restaurant.netlify.app/


### 📦 Instalação
> ❗️ IMPORTANTE: Os links tanto do servidor quanto do front apontam para os links do deploy, para utilizar este projeto localmente você precisará alterar todas as aparições dos links,
> (frontend) `https://br-restaurant.netlify.app` para `http://localhost:5173` e (backend) `https://therestaurantbackend.onrender.com` para `http://localhost:3000`.

1. Clone esse repositório:
   ```bash
   git clone https://github.com/sergiotales1/therestaurant.git
   
2. Instale as dependências e inicie o front end da aplicação:
   ```bash
   npm install && npm run dev
   
3. Navegue para o servidor e intale as dependências também, logo em seguida inicie o backend da aplicação (recomendo nodemon para esse caso, mas node serve tambem):
   ```bash
   cd therestaurant\server
   npm install
   nodemon server.js
