# Kenda App - Guia de Integração Backend

## 📋 Índice
- [Início Rápido](#início-rápido)
- [Dados Mockados](#dados-mockados)
- [API Endpoints](#api-endpoints)
- [Autenticação](#autenticação)
- [Exemplos de Uso](#exemplos-de-uso)
- [WebSocket](#websocket)

---

## 🚀 Início Rápido

### 1. Configurar Ambiente

```bash
cd Kenda-app-backend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env
```

### 2. Configurar Banco de Dados

Edite o arquivo `.env` e configure a URL do PostgreSQL:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/kenda_db"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3000
```

### 3. Executar Migrations e Seed

```bash
# Gerar cliente Prisma
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# Popular banco com dados mockados
npm run prisma:seed
```

### 4. Iniciar Servidor

```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm run build
npm start
```

O servidor estará rodando em: `http://localhost:3000`

Documentação Swagger: `http://localhost:3000/api-docs`

---

## 👥 Dados Mockados

Após executar o seed, você terá os seguintes dados disponíveis:

### Passageiros (4 usuários)
- **João Silva**: joao.silva@example.com
- **Maria Santos**: maria.santos@example.com
- **Carlos Mendes**: carlos.mendes@example.com
- **Ana Costa**: ana.costa@example.com

### Motoristas (5 usuários)
- **Pedro Motorista**: pedro.driver@example.com (Honda CG 160, Online)
- **Lúcia Motorista**: lucia.driver@example.com (Yamaha Factor 150, Online)
- **António Motorista**: antonio.driver@example.com (Suzuki Intruder 150, Offline)
- **Fernanda Motorista**: fernanda.driver@example.com (Honda Biz 125, Online)
- **Manuel Motorista**: manuel.driver@example.com (Yamaha XTZ 125, Online)

### Admin
- **Admin Kenda**: admin@kenda.ao

**Senha para todos os usuários:** `senha123`

### Viagens
- ✅ 4 viagens completadas (2 de pessoas, 2 de carga)
- ⏳ 2 viagens pendentes (aguardando motorista)
- 🏃 1 viagem em andamento

### Transações
- 💰 4 transações de pagamento (Cash e Multicaixa Express)

### Avaliações
- ⭐ 5 avaliações (motoristas e passageiros)

---

## 🔌 API Endpoints

### Autenticação

#### POST `/auth/register`
Registrar novo usuário (passageiro, motorista ou admin)

```json
{
  "email": "novo@example.com",
  "password": "senha123",
  "name": "Novo Usuário",
  "phone": "+244 923 456 789",
  "role": "PASSENGER"  // PASSENGER | DRIVER | ADMIN
}
```

#### POST `/auth/login`
Fazer login

```json
{
  "email": "joao.silva@example.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "user": {
    "id": "uuid",
    "email": "joao.silva@example.com",
    "name": "João Silva",
    "role": "PASSENGER",
    ...
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Passageiros

#### GET `/passengers/profile`
Obter perfil do passageiro autenticado (requer token)

#### PUT `/passengers/profile`
Atualizar perfil do passageiro

```json
{
  "name": "João Silva Atualizado",
  "phone": "+244 923 999 888",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

#### GET `/passengers`
Listar todos os passageiros (admin)

#### GET `/passengers/:id`
Obter passageiro por ID

---

### Motoristas

#### GET `/drivers/profile`
Obter perfil do motorista autenticado

#### PUT `/drivers/profile`
Atualizar perfil do motorista

```json
{
  "name": "Pedro Motorista",
  "phone": "+244 924 111 222",
  "vehicleModel": "Honda CG 160",
  "vehiclePlate": "LD-23-45-AB"
}
```

#### GET `/drivers`
Listar todos os motoristas

#### GET `/drivers/online`
Listar motoristas online (disponíveis para viagens)

#### PUT `/drivers/location`
Atualizar localização do motorista

```json
{
  "lat": -8.8383,
  "lng": 13.2344
}
```

#### PUT `/drivers/status`
Atualizar status online/offline

```json
{
  "isOnline": true
}
```

---

### Viagens (Rides)

#### POST `/rides/calculate-price`
Calcular preço estimado (não requer autenticação)

```json
{
  "distanceKm": 10.5,
  "durationMin": 25,
  "type": "PERSON"  // PERSON | CARGO
}
```

**Resposta:**
```json
{
  "estimatedPrice": 1500
}
```

#### POST `/rides`
Criar nova viagem (passageiro)

```json
{
  "type": "PERSON",
  "originLat": -8.8383,
  "originLng": 13.2344,
  "originAddress": "Talatona, Luanda Sul",
  "destLat": -8.8150,
  "destLng": 13.2302,
  "destAddress": "Marginal de Luanda",
  "estimatedPrice": 1500
}
```

**Para transporte de carga:**
```json
{
  "type": "CARGO",
  "originLat": -8.8383,
  "originLng": 13.2344,
  "originAddress": "Armazém Talatona",
  "destLat": -8.8150,
  "destLng": 13.2302,
  "destAddress": "Loja Centro",
  "estimatedPrice": 2200,
  "cargoDescription": "Caixas de eletrônicos",
  "cargoWeight": 50,
  "cargoDimensions": "1.5m x 1m x 0.8m"
}
```

#### GET `/rides`
Listar viagens

Query params:
- `passengerId`: filtrar por passageiro
- `driverId`: filtrar por motorista
- `status`: PENDING | ACCEPTED | IN_PROGRESS | COMPLETED | CANCELLED
- `type`: PERSON | CARGO

#### GET `/rides/pending`
Listar viagens pendentes (aguardando motorista)

#### GET `/rides/:id`
Obter viagem por ID

#### POST `/rides/:id/accept`
Aceitar viagem (motorista)

#### POST `/rides/:id/start`
Iniciar viagem (motorista)

#### POST `/rides/:id/complete`
Completar viagem (motorista)

```json
{
  "finalPrice": 1500,
  "distanceKm": 10.5,
  "durationMin": 25,
  "paymentMethod": "CASH"  // CASH | MULTICAIXA_EXPRESS
}
```

#### POST `/rides/:id/cancel`
Cancelar viagem

---

### Transações

#### GET `/transactions`
Listar transações

Query params:
- `userId`: filtrar por usuário
- `type`: RIDE_PAYMENT | REFUND
- `paymentMethod`: CASH | MULTICAIXA_EXPRESS

#### GET `/transactions/:id`
Obter transação por ID

#### GET `/transactions/user/:userId/total`
Obter total de transações de um usuário

**Resposta:**
```json
{
  "total": 5500,
  "count": 3
}
```

---

### Avaliações (Ratings)

#### POST `/ratings`
Criar avaliação

```json
{
  "rideId": "uuid-da-viagem",
  "rating": 5,
  "comment": "Excelente motorista!"
}
```

#### GET `/ratings/ride/:rideId`
Obter avaliações de uma viagem

#### GET `/ratings/user/:userId`
Obter avaliações de um usuário

#### GET `/ratings/user/:userId/average`
Obter média de avaliações de um usuário

**Resposta:**
```json
{
  "average": 4.8,
  "totalRatings": 15
}
```

---

### Estatísticas

#### GET `/stats/user`
Obter estatísticas do usuário autenticado

**Resposta:**
```json
{
  "totalRides": 12,
  "totalSpent": 18500,
  "averageRating": 4.9,
  "totalRatings": 10
}
```

#### GET `/stats/driver/:driverId`
Obter estatísticas de um motorista

**Resposta:**
```json
{
  "totalRides": 45,
  "totalEarnings": 67500,
  "averageRating": 4.8,
  "totalRatings": 42,
  "vehicleInfo": {
    "model": "Honda CG 160",
    "plate": "LD-23-45-AB"
  },
  "isOnline": true
}
```

#### GET `/stats/system`
Obter estatísticas do sistema (apenas admin)

**Resposta:**
```json
{
  "totalUsers": 150,
  "totalDrivers": 45,
  "totalPassengers": 100,
  "totalRides": 523,
  "completedRides": 489,
  "pendingRides": 12,
  "totalTransactions": 489,
  "onlineDrivers": 23,
  "totalRevenue": 734500
}
```

---

## 🔐 Autenticação

Todos os endpoints que requerem autenticação precisam do header:

```
Authorization: Bearer <seu-token-jwt>
```

### Exemplo com Axios (Frontend)

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Uso
const response = await api.get('/passengers/profile');
```

---

## 🔌 WebSocket

O backend suporta WebSocket via Socket.IO para notificações em tempo real.

### Eventos do Cliente

#### `join`
Entrar em uma sala (room) para receber notificações

```javascript
socket.emit('join', userId);
```

#### `updateLocation`
Atualizar localização do motorista em tempo real

```javascript
socket.emit('updateLocation', {
  driverId: 'uuid',
  lat: -8.8383,
  lng: 13.2344
});
```

### Eventos do Servidor

#### `newRideAvailable`
Nova viagem disponível para motoristas

```javascript
socket.on('newRideAvailable', (ride) => {
  console.log('Nova viagem:', ride);
});
```

#### `rideAccepted`
Viagem foi aceita por um motorista

```javascript
socket.on('rideAccepted', (ride) => {
  console.log('Viagem aceita:', ride);
});
```

#### `rideStarted`
Viagem foi iniciada

```javascript
socket.on('rideStarted', (ride) => {
  console.log('Viagem iniciada:', ride);
});
```

#### `rideCompleted`
Viagem foi completada

```javascript
socket.on('rideCompleted', (ride) => {
  console.log('Viagem completada:', ride);
});
```

#### `rideCancelled`
Viagem foi cancelada

```javascript
socket.on('rideCancelled', (ride) => {
  console.log('Viagem cancelada:', ride);
});
```

#### `driverLocation:{driverId}`
Localização do motorista atualizada

```javascript
socket.on(`driverLocation:${driverId}`, (location) => {
  console.log('Localização do motorista:', location);
});
```

### Exemplo de Integração no Frontend

```typescript
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

// Conectar e entrar na sala do usuário
socket.on('connect', () => {
  console.log('Conectado ao servidor');
  socket.emit('join', userId);
});

// Ouvir eventos
socket.on('newRideAvailable', (ride) => {
  // Mostrar notificação de nova viagem
  showNotification('Nova viagem disponível!', ride);
});

socket.on('rideAccepted', (ride) => {
  // Atualizar UI quando viagem for aceita
  updateRideStatus(ride);
});
```

---

## 📝 Exemplos de Fluxo Completo

### Fluxo 1: Passageiro Solicita Viagem

```typescript
// 1. Login
const { token, user } = await api.post('/auth/login', {
  email: 'joao.silva@example.com',
  password: 'senha123'
});

// 2. Calcular preço
const { estimatedPrice } = await api.post('/rides/calculate-price', {
  distanceKm: 10.5,
  durationMin: 25,
  type: 'PERSON'
});

// 3. Criar viagem
const ride = await api.post('/rides', {
  type: 'PERSON',
  originLat: -8.8383,
  originLng: 13.2344,
  originAddress: 'Talatona',
  destLat: -8.8150,
  destLng: 13.2302,
  destAddress: 'Marginal',
  estimatedPrice
});

// 4. Aguardar aceitação via WebSocket
socket.on('rideAccepted', (acceptedRide) => {
  console.log('Motorista aceitou!', acceptedRide);
});
```

### Fluxo 2: Motorista Aceita e Completa Viagem

```typescript
// 1. Login como motorista
const { token, user } = await api.post('/auth/login', {
  email: 'pedro.driver@example.com',
  password: 'senha123'
});

// 2. Ativar status online
await api.put('/drivers/status', { isOnline: true });

// 3. Buscar viagens pendentes
const pendingRides = await api.get('/rides/pending');

// 4. Aceitar viagem
const acceptedRide = await api.post(`/rides/${rideId}/accept`);

// 5. Iniciar viagem
await api.post(`/rides/${rideId}/start`);

// 6. Completar viagem
await api.post(`/rides/${rideId}/complete`, {
  finalPrice: 1500,
  distanceKm: 10.5,
  durationMin: 25,
  paymentMethod: 'CASH'
});
```

### Fluxo 3: Avaliar Viagem

```typescript
// Após completar a viagem, criar avaliação
await api.post('/ratings', {
  rideId: 'uuid-da-viagem',
  rating: 5,
  comment: 'Excelente motorista!'
});

// Verificar média de avaliações do motorista
const { average, totalRatings } = await api.get(`/ratings/user/${driverId}/average`);
```

---

## 🛠️ Scripts Úteis

```bash
# Resetar banco e popular novamente
npm run db:reset

# Apenas popular banco (sem resetar)
npm run prisma:seed

# Abrir Prisma Studio (interface visual do banco)
npm run prisma:studio

# Ver documentação da API
# Acesse: http://localhost:3000/api-docs
```

---

## 📊 Estrutura do Banco de Dados

### Modelos Principais

- **User**: Usuários (passageiros, motoristas, admin)
- **Ride**: Viagens (pessoas e carga)
- **Transaction**: Transações financeiras
- **Rating**: Avaliações

### Enums

- **Role**: PASSENGER | DRIVER | ADMIN
- **RideStatus**: PENDING | ACCEPTED | IN_PROGRESS | COMPLETED | CANCELLED
- **RideType**: PERSON | CARGO
- **PaymentMethod**: CASH | MULTICAIXA_EXPRESS
- **TransactionType**: RIDE_PAYMENT | REFUND

---

## 🔄 Integração com o Frontend

Para integrar com o Kenda-app (frontend), configure a variável de ambiente no arquivo `.env`:

```env
# Frontend (Kenda-app/src/config/env.ts)
API_URL=http://localhost:3000
API_TIMEOUT=30000
```

O frontend já está configurado para usar a mesma estrutura de tipos e endpoints!

---

## ⚠️ Notas Importantes

1. **Não implementamos carteira/wallet** conforme solicitado
2. Os dados mockados são apenas para desenvolvimento
3. Em produção, altere o `JWT_SECRET` e use credenciais seguras
4. Configure CORS apropriadamente para produção
5. Use HTTPS em produção
6. Considere implementar rate limiting para os endpoints

---

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- Documentação Swagger: `http://localhost:3000/api-docs`
- README principal: `README.md`
- Arquivo de configuração Prisma: `prisma/schema.prisma`
