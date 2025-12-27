# Instruções de Setup

## Importante: Permissões do PowerShell

Se você estiver recebendo erros de execução de scripts, execute o seguinte comando no PowerShell como Administrador:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Passos para iniciar o projeto:

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e configure suas variáveis:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/kenda_db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3000
```

### 3. Gerar Prisma Client
```bash
npx prisma generate
```

### 4. Executar migrações do banco de dados
```bash
npx prisma migrate dev --name update_payment_methods
```

### 5. Iniciar servidor em modo desenvolvimento
```bash
npm run dev
```

## Endpoints principais:

- API Base: http://localhost:3000
- Health Check: http://localhost:3000/health
- Prisma Studio: `npx prisma studio`

## Estrutura de pastas criada:

```
src/
├── controllers/           # Camada de apresentação
│   ├── authController.ts
│   ├── passengerController.ts
│   ├── driverController.ts
│   ├── rideControllerV2.ts
│   ├── transactionController.ts
│   └── ratingController.ts
├── services/             # Lógica de negócio
│   ├── authService.ts
│   ├── passengerService.ts
│   ├── driverService.ts
│   ├── rideServiceV2.ts
│   ├── transactionService.ts
│   └── ratingService.ts
├── repositories/         # Acesso a dados
│   ├── UserRepository.ts
│   ├── RideRepository.ts
│   ├── TransactionRepository.ts
│   └── RatingRepository.ts
├── dtos/                # Data Transfer Objects
│   ├── auth.dto.ts
│   ├── user.dto.ts
│   ├── ride.dto.ts
│   ├── transaction.dto.ts
│   └── rating.dto.ts
├── routes/              # Definição de rotas
│   ├── authRoutes.ts
│   ├── passengerRoutes.ts
│   ├── driverRoutes.ts
│   ├── rideRoutesV2.ts
│   ├── transactionRoutes.ts
│   └── ratingRoutes.ts
├── middlewares/         # Middlewares
│   └── authMiddleware.ts
├── app.ts              # Configuração Express
├── server.ts           # Entry point
├── prisma.ts           # Prisma Client
└── socket.ts           # Socket.IO
```

## Métodos de Pagamento:
- CASH (Numerário)
- MULTICAIXA_EXPRESS

## Mudanças principais no schema:
- Removido campo `balance` do modelo User
- Adicionado enum `PaymentMethod` com CASH e MULTICAIXA_EXPRESS
- Adicionado enum `TransactionType` para RIDE_PAYMENT e REFUND
- Campo `paymentMethod` obrigatório nas transações
