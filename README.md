# Kenda App Backend

API backend para aplicativo de transporte (pessoas e cargas) com sistema de pagamento em dinheiro e Multicaixa Express.

## 🚀 Início Rápido

```bash
# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env

# Setup do banco de dados
npm run db:setup

# Iniciar servidor
npm run dev
```

**🎉 Pronto!** Acesse `http://localhost:3000/api-docs` para ver a documentação interativa.

## 📚 Documentação

- **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Guia completo de integração com frontend
- **[CHANGELOG.md](CHANGELOG.md)** - Todas as atualizações e funcionalidades adicionadas
- **Swagger** - `http://localhost:3000/api-docs` (quando o servidor estiver rodando)

## ✨ Funcionalidades

- **Autenticação**: Registro e login de usuários (Passageiros, Motoristas, Admin)
- **Gestão de Passageiros**: CRUD completo de passageiros
- **Gestão de Motoristas**: CRUD completo de motoristas com status online/offline e localização
- **Gestão de Viagens**: 
  - Criar viagens (pessoas ou cargas)
  - Aceitar viagens (motoristas)
  - Iniciar, completar e cancelar viagens
  - Cálculo de preço estimado
- **Transações**: Sistema de pagamento com métodos CASH e MULTICAIXA_EXPRESS
- **Avaliações**: Sistema de ratings para motoristas e passageiros
- **Estatísticas**: Métricas de usuários, motoristas e sistema
- **WebSocket**: Notificações em tempo real via Socket.IO
- **Dados Mockados**: Sistema completo de seed para desenvolvimento

## 👥 Dados Mockados (Desenvolvimento)

Após executar `npm run prisma:seed`, você terá acesso a:

**Passageiros:**
- joao.silva@example.com
- maria.santos@example.com
- carlos.mendes@example.com
- ana.costa@example.com

**Motoristas:**
- pedro.driver@example.com (Honda CG 160, Online)
- lucia.driver@example.com (Yamaha Factor 150, Online)
- antonio.driver@example.com (Suzuki Intruder 150, Offline)
- fernanda.driver@example.com (Honda Biz 125, Online)
- manuel.driver@example.com (Yamaha XTZ 125, Online)

**Admin:**
- admin@kenda.ao

**Senha para todos:** `senha123`

Além disso, terá:
- ✅ 4 viagens completadas
- ⏳ 2 viagens pendentes
- 🏃 1 viagem em andamento
- 💰 4 transações
- ⭐ 5 avaliações

## Arquitetura

O projeto segue os princípios de **Clean Code** e **SOLID**:

```
src/
├── controllers/      # Controladores (camada de apresentação)
├── services/         # Lógica de negócio
├── repositories/     # Acesso a dados (Repository Pattern)
├── dtos/            # Data Transfer Objects
├── middlewares/     # Middlewares (autenticação, etc)
├── routes/          # Definição de rotas
├── app.ts           # Configuração do Express
└── server.ts        # Entry point
```

## Tecnologias

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Socket.IO** - WebSocket para real-time
- **bcryptjs** - Hash de senhas

## Setup

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite .env com suas configurações
```

4. Execute as migrações do Prisma:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Inicie o servidor em modo desenvolvimento:
```bash
npm run dev
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor em modo desenvolvimento

# Produção
npm run build            # Compila TypeScript para JavaScript
npm start                # Inicia servidor em produção

# Banco de Dados
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Executa migrações
npm run prisma:studio    # Abre Prisma Studio (GUI do banco)
npm run prisma:seed      # Popula banco com dados mockados
npm run db:reset         # Reseta banco e popula novamente
npm run db:setup         # Setup completo do banco
```

## 📡 Endpoints da API

### Auth
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Login

### Passageiros
- `GET /passengers/profile` - Obter perfil (autenticado)
- `PUT /passengers/profile` - Atualizar perfil (autenticado)
- `GET /passengers` - Listar todos
- `GET /passengers/:id` - Obter por ID
- `DELETE /passengers/:id` - Deletar passageiro

### Motoristas
- `GET /drivers/profile` - Obter perfil (autenticado)
- `PUT /drivers/profile` - Atualizar perfil (autenticado)
- `PUT /drivers/location` - Atualizar localização (autenticado)
- `PUT /drivers/status` - Atualizar status online/offline (autenticado)
- `GET /drivers` - Listar todos
- `GET /drivers/online` - Listar motoristas online
- `GET /drivers/:id` - Obter por ID
- `DELETE /drivers/:id` - Deletar motorista

### Viagens
- `POST /rides` - Criar viagem (autenticado)
- `POST /rides/calculate-price` - Calcular preço estimado
- `GET /rides` - Listar viagens (com filtros)
- `GET /rides/pending` - Listar viagens pendentes
- `GET /rides/:id` - Obter viagem por ID
- `POST /rides/:id/accept` - Aceitar viagem (motorista)
- `POST /rides/:id/start` - Iniciar viagem
- `POST /rides/:id/complete` - Completar viagem
- `POST /rides/:id/cancel` - Cancelar viagem
- `PUT /rides/:id` - Atualizar viagem
- `DELETE /rides/:id` - Deletar viagem

### Transações
- `POST /transactions` - Criar transação
- `GET /transactions` - Listar transações (com filtros)
- `GET /transactions/:id` - Obter por ID
- `GET /transactions/ride/:rideId` - Obter por viagem
- `GET /transactions/user/:userId/total` - Total de transações do usuário
- `DELETE /transactions/:id` - Deletar transação

### Avaliações
- `POST /ratings` - Criar avaliação
- `GET /ratings/:id` - Obter por ID
- `GET /ratings/ride/:rideId` - Obter por viagem
- `GET /ratings/user/:userId` - Obter avaliações do usuário
- `GET /ratings/user/:userId/average` - Média de avaliações

### Estatísticas (Novo!)
- `GET /stats/user` - Estatísticas do usuário autenticado
- `GET /stats/driver/:driverId` - Estatísticas de um motorista
- `GET /stats/system` - Estatísticas do sistema (admin)

**📖 Documentação completa:** `http://localhost:3000/api-docs`

## Métodos de Pagamento

- `CASH` - Dinheiro (numerário)
- `MULTICAIXA_EXPRESS` - Pagamento via Multicaixa Express

## Status de Viagem

- `PENDING` - Aguardando motorista
- `ACCEPTED` - Aceita por motorista
- `IN_PROGRESS` - Em andamento
- `COMPLETED` - Concluída
- `CANCELLED` - Cancelada

## Tipos de Viagem

- `PERSON` - Transporte de pessoas
- `CARGO` - Transporte de cargas

## Contribuindo

Este projeto segue princípios de Clean Code e SOLID. Ao contribuir, mantenha:
- Separação de responsabilidades
- Repository Pattern para acesso a dados
- DTOs para validação e transferência
- Services para lógica de negócio
- Controllers apenas para roteamento

## Licença

ISC
