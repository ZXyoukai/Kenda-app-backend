# Exemplos de Requisições para a API Kenda

## 1. Autenticação

### Registrar Passageiro
```bash
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "email": "passageiro@example.com",
  "password": "senha123",
  "name": "João Silva",
  "phone": "+244 923 456 789",
  "role": "PASSENGER"
}
```

### Registrar Motorista
```bash
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "email": "motorista@example.com",
  "password": "senha123",
  "name": "Maria Santos",
  "phone": "+244 923 987 654",
  "role": "DRIVER"
}
```

### Login
```bash
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "passageiro@example.com",
  "password": "senha123"
}
```

## 2. Motoristas

### Atualizar Perfil do Motorista
```bash
PUT http://localhost:3000/drivers/profile
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "vehicleModel": "Toyota Corolla",
  "vehiclePlate": "LD-12-34-AB"
}
```

### Atualizar Status Online
```bash
PUT http://localhost:3000/drivers/status
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "isOnline": true
}
```

### Atualizar Localização
```bash
PUT http://localhost:3000/drivers/location
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "lat": -8.8383,
  "lng": 13.2344
}
```

### Listar Motoristas Online
```bash
GET http://localhost:3000/drivers/online
```

## 3. Viagens

### Calcular Preço
```bash
POST http://localhost:3000/rides/calculate-price
Content-Type: application/json

{
  "distanceKm": 10.5,
  "durationMin": 25,
  "type": "PERSON"
}
```

### Criar Viagem de Pessoa
```bash
POST http://localhost:3000/rides
Authorization: Bearer <TOKEN_PASSAGEIRO>
Content-Type: application/json

{
  "type": "PERSON",
  "originLat": -8.8383,
  "originLng": 13.2344,
  "originAddress": "Talatona, Luanda",
  "destLat": -8.8150,
  "destLng": 13.2302,
  "destAddress": "Marginal de Luanda",
  "estimatedPrice": 1500,
  "paymentMethod": "CASH"
}
```

### Criar Viagem de Carga
```bash
POST http://localhost:3000/rides
Authorization: Bearer <TOKEN_PASSAGEIRO>
Content-Type: application/json

{
  "type": "CARGO",
  "originLat": -8.8383,
  "originLng": 13.2344,
  "originAddress": "Armazém Zona Industrial",
  "destLat": -8.8150,
  "destLng": 13.2302,
  "destAddress": "Loja Centro da Cidade",
  "estimatedPrice": 3500,
  "paymentMethod": "MULTICAIXA_EXPRESS",
  "cargoDescription": "Caixas de produtos eletrônicos",
  "cargoWeight": 50,
  "cargoDimensions": "100x80x60 cm"
}
```

### Listar Viagens Pendentes
```bash
GET http://localhost:3000/rides/pending
Authorization: Bearer <TOKEN_MOTORISTA>
```

### Aceitar Viagem (Motorista)
```bash
POST http://localhost:3000/rides/{rideId}/accept
Authorization: Bearer <TOKEN_MOTORISTA>
```

### Iniciar Viagem
```bash
POST http://localhost:3000/rides/{rideId}/start
Authorization: Bearer <TOKEN_MOTORISTA>
```

### Completar Viagem
```bash
POST http://localhost:3000/rides/{rideId}/complete
Authorization: Bearer <TOKEN_MOTORISTA>
Content-Type: application/json

{
  "finalPrice": 1650,
  "distanceKm": 11.2,
  "durationMin": 28,
  "paymentMethod": "CASH"
}
```

### Cancelar Viagem
```bash
POST http://localhost:3000/rides/{rideId}/cancel
Authorization: Bearer <TOKEN>
```

### Listar Viagens (com filtros)
```bash
GET http://localhost:3000/rides?status=COMPLETED&passengerId={userId}
Authorization: Bearer <TOKEN>
```

## 4. Transações

### Listar Transações do Usuário
```bash
GET http://localhost:3000/transactions?userId={userId}
Authorization: Bearer <TOKEN>
```

### Obter Total de Transações
```bash
GET http://localhost:3000/transactions/user/{userId}/total?type=RIDE_PAYMENT
Authorization: Bearer <TOKEN>
```

### Obter Transação por Viagem
```bash
GET http://localhost:3000/transactions/ride/{rideId}
Authorization: Bearer <TOKEN>
```

## 5. Avaliações

### Criar Avaliação
```bash
POST http://localhost:3000/ratings
Authorization: Bearer <TOKEN_PASSAGEIRO>
Content-Type: application/json

{
  "rideId": "{rideId}",
  "raterId": "{passengerId}",
  "ratedUserId": "{driverId}",
  "stars": 5,
  "comment": "Motorista muito educado e dirigiu com cuidado!"
}
```

### Obter Média de Avaliações do Motorista
```bash
GET http://localhost:3000/ratings/user/{driverId}/average
Authorization: Bearer <TOKEN>
```

### Listar Avaliações do Usuário
```bash
GET http://localhost:3000/ratings/user/{userId}
Authorization: Bearer <TOKEN>
```

## 6. Passageiros

### Obter Perfil
```bash
GET http://localhost:3000/passengers/profile
Authorization: Bearer <TOKEN_PASSAGEIRO>
```

### Atualizar Perfil
```bash
PUT http://localhost:3000/passengers/profile
Authorization: Bearer <TOKEN_PASSAGEIRO>
Content-Type: application/json

{
  "name": "João Silva Santos",
  "phone": "+244 923 456 789"
}
```

## Notas:

1. Substitua `<TOKEN>` pelo JWT recebido no login
2. Substitua `{rideId}`, `{userId}`, etc. pelos IDs reais
3. Os métodos de pagamento disponíveis são: `CASH` e `MULTICAIXA_EXPRESS`
4. Status de viagem: `PENDING`, `ACCEPTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`
5. Tipos de viagem: `PERSON` (pessoa) e `CARGO` (carga)
