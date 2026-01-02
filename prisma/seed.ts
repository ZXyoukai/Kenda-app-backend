import { PrismaClient, Role, RideStatus, RideType, PaymentMethod, TransactionType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes
  console.log('🧹 Limpando dados existentes...');
  await prisma.rating.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.ride.deleteMany();
  await prisma.user.deleteMany();

  // Senha padrão para todos os usuários
  const defaultPassword = await bcrypt.hash('senha123', 10);

  // ===== CRIAR PASSAGEIROS =====
  console.log('👤 Criando passageiros...');
  const passengers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'joao.silva@example.com',
        password: defaultPassword,
        name: 'João Silva',
        phone: '+244 923 456 789',
        role: Role.PASSENGER,
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
    }),
    prisma.user.create({
      data: {
        email: 'maria.santos@example.com',
        password: defaultPassword,
        name: 'Maria Santos',
        phone: '+244 923 567 890',
        role: Role.PASSENGER,
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
      },
    }),
    prisma.user.create({
      data: {
        email: 'carlos.mendes@example.com',
        password: defaultPassword,
        name: 'Carlos Mendes',
        phone: '+244 923 678 901',
        role: Role.PASSENGER,
        avatarUrl: 'https://i.pravatar.cc/150?img=33',
      },
    }),
    prisma.user.create({
      data: {
        email: 'ana.costa@example.com',
        password: defaultPassword,
        name: 'Ana Costa',
        phone: '+244 923 789 012',
        role: Role.PASSENGER,
        avatarUrl: 'https://i.pravatar.cc/150?img=9',
      },
    }),
  ]);

  console.log(`✅ ${passengers.length} passageiros criados`);

  // ===== CRIAR MOTORISTAS =====
  console.log('🚗 Criando motoristas...');
  const drivers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'pedro.driver@example.com',
        password: defaultPassword,
        name: 'Pedro Motorista',
        phone: '+244 924 111 222',
        role: Role.DRIVER,
        avatarUrl: 'https://i.pravatar.cc/150?img=15',
        isOnline: true,
        currentLat: -8.8383,
        currentLng: 13.2344,
        vehicleModel: 'Honda CG 160',
        vehiclePlate: 'LD-23-45-AB',
      },
    }),
    prisma.user.create({
      data: {
        email: 'lucia.driver@example.com',
        password: defaultPassword,
        name: 'Lúcia Motorista',
        phone: '+244 924 222 333',
        role: Role.DRIVER,
        avatarUrl: 'https://i.pravatar.cc/150?img=10',
        isOnline: true,
        currentLat: -8.8150,
        currentLng: 13.2302,
        vehicleModel: 'Yamaha Factor 150',
        vehiclePlate: 'LD-67-89-CD',
      },
    }),
    prisma.user.create({
      data: {
        email: 'antonio.driver@example.com',
        password: defaultPassword,
        name: 'António Motorista',
        phone: '+244 924 333 444',
        role: Role.DRIVER,
        avatarUrl: 'https://i.pravatar.cc/150?img=13',
        isOnline: false,
        currentLat: -8.8200,
        currentLng: 13.2400,
        vehicleModel: 'Suzuki Intruder 150',
        vehiclePlate: 'LD-12-34-EF',
      },
    }),
    prisma.user.create({
      data: {
        email: 'fernanda.driver@example.com',
        password: defaultPassword,
        name: 'Fernanda Motorista',
        phone: '+244 924 444 555',
        role: Role.DRIVER,
        avatarUrl: 'https://i.pravatar.cc/150?img=20',
        isOnline: true,
        currentLat: -8.8100,
        currentLng: 13.2250,
        vehicleModel: 'Honda Biz 125',
        vehiclePlate: 'LD-45-67-GH',
      },
    }),
    prisma.user.create({
      data: {
        email: 'manuel.driver@example.com',
        password: defaultPassword,
        name: 'Manuel Motorista',
        phone: '+244 924 555 666',
        role: Role.DRIVER,
        avatarUrl: 'https://i.pravatar.cc/150?img=51',
        isOnline: true,
        currentLat: -8.8300,
        currentLng: 13.2500,
        vehicleModel: 'Yamaha XTZ 125',
        vehiclePlate: 'LD-78-90-IJ',
      },
    }),
  ]);

  console.log(`✅ ${drivers.length} motoristas criados`);

  // ===== CRIAR ADMIN =====
  console.log('👨‍💼 Criando admin...');
  const admin = await prisma.user.create({
    data: {
      email: 'admin@kenda.ao',
      password: defaultPassword,
      name: 'Admin Kenda',
      phone: '+244 900 000 000',
      role: Role.ADMIN,
      avatarUrl: 'https://i.pravatar.cc/150?img=68',
    },
  });

  console.log('✅ Admin criado');

  // ===== CRIAR VIAGENS COMPLETADAS =====
  console.log('🚕 Criando viagens completadas...');
  const completedRides = await Promise.all([
    // Viagem de pessoa 1
    prisma.ride.create({
      data: {
        passengerId: passengers[0].id,
        driverId: drivers[0].id,
        status: RideStatus.COMPLETED,
        type: RideType.PERSON,
        originLat: -8.8383,
        originLng: 13.2344,
        originAddress: 'Talatona, Luanda Sul',
        destLat: -8.8150,
        destLng: 13.2302,
        destAddress: 'Marginal de Luanda',
        distanceKm: 5.2,
        durationMin: 15,
        estimatedPrice: 1500,
        finalPrice: 1500,
        startedAt: new Date('2025-01-01T08:00:00'),
        completedAt: new Date('2025-01-01T08:15:00'),
      },
    }),
    // Viagem de carga 1
    prisma.ride.create({
      data: {
        passengerId: passengers[1].id,
        driverId: drivers[1].id,
        status: RideStatus.COMPLETED,
        type: RideType.CARGO,
        originLat: -8.8383,
        originLng: 13.2344,
        originAddress: 'Rua 1º de Maio, Maianga',
        destLat: -8.8150,
        destLng: 13.2302,
        destAddress: 'Avenida 4 de Fevereiro, Ingombota',
        distanceKm: 5.2,
        durationMin: 15,
        estimatedPrice: 2000,
        finalPrice: 2000,
        cargoDescription: 'Caixas de eletrônicos',
        cargoWeight: 50,
        cargoDimensions: '1.5m x 1m x 0.8m',
        startedAt: new Date('2025-01-01T09:00:00'),
        completedAt: new Date('2025-01-01T09:15:00'),
      },
    }),
    // Viagem de pessoa 2
    prisma.ride.create({
      data: {
        passengerId: passengers[2].id,
        driverId: drivers[3].id,
        status: RideStatus.COMPLETED,
        type: RideType.PERSON,
        originLat: -8.8200,
        originLng: 13.2400,
        originAddress: 'Largo da Mutamba',
        destLat: -8.8100,
        destLng: 13.2250,
        destAddress: 'Talatona, Luanda Sul',
        distanceKm: 12.8,
        durationMin: 25,
        estimatedPrice: 2500,
        finalPrice: 2500,
        startedAt: new Date('2025-01-01T10:00:00'),
        completedAt: new Date('2025-01-01T10:25:00'),
      },
    }),
    // Viagem de carga 2
    prisma.ride.create({
      data: {
        passengerId: passengers[3].id,
        driverId: drivers[4].id,
        status: RideStatus.COMPLETED,
        type: RideType.CARGO,
        originLat: -8.8300,
        originLng: 13.2500,
        originAddress: 'Mercado São Paulo, Alvalade',
        destLat: -8.8100,
        destLng: 13.2250,
        destAddress: 'Bairro Azul, Benfica',
        distanceKm: 3.5,
        durationMin: 10,
        estimatedPrice: 1800,
        finalPrice: 1800,
        cargoDescription: 'Móveis de escritório',
        cargoWeight: 80,
        cargoDimensions: '2m x 1.5m x 1m',
        startedAt: new Date('2025-01-01T11:00:00'),
        completedAt: new Date('2025-01-01T11:10:00'),
      },
    }),
  ]);

  console.log(`✅ ${completedRides.length} viagens completadas criadas`);

  // ===== CRIAR VIAGENS PENDENTES =====
  console.log('⏳ Criando viagens pendentes...');
  const pendingRides = await Promise.all([
    // Viagem pendente de pessoa
    prisma.ride.create({
      data: {
        passengerId: passengers[0].id,
        status: RideStatus.PENDING,
        type: RideType.PERSON,
        originLat: -8.8383,
        originLng: 13.2344,
        originAddress: 'Rua da Missão, Ingombota',
        destLat: -8.8150,
        destLng: 13.2302,
        destAddress: 'Shopping Belas, Talatona',
        distanceKm: 8.5,
        durationMin: 20,
        estimatedPrice: 2000,
      },
    }),
    // Viagem pendente de carga
    prisma.ride.create({
      data: {
        passengerId: passengers[1].id,
        status: RideStatus.PENDING,
        type: RideType.CARGO,
        originLat: -8.8200,
        originLng: 13.2400,
        originAddress: 'Armazém Zona Industrial',
        destLat: -8.8100,
        destLng: 13.2250,
        destAddress: 'Loja Centro Comercial',
        distanceKm: 6.2,
        durationMin: 18,
        estimatedPrice: 2200,
        cargoDescription: 'Produtos alimentícios',
        cargoWeight: 30,
        cargoDimensions: '1m x 0.8m x 0.6m',
      },
    }),
  ]);

  console.log(`✅ ${pendingRides.length} viagens pendentes criadas`);

  // ===== CRIAR VIAGEM EM ANDAMENTO =====
  console.log('🏃 Criando viagem em andamento...');
  const inProgressRide = await prisma.ride.create({
    data: {
      passengerId: passengers[2].id,
      driverId: drivers[0].id,
      status: RideStatus.IN_PROGRESS,
      type: RideType.PERSON,
      originLat: -8.8300,
      originLng: 13.2500,
      originAddress: 'Aeroporto Internacional de Luanda',
      destLat: -8.8100,
      destLng: 13.2250,
      destAddress: 'Hotel Presidente',
      distanceKm: 4.8,
      durationMin: 12,
      estimatedPrice: 1800,
      startedAt: new Date(),
    },
  });

  console.log('✅ Viagem em andamento criada');

  // ===== CRIAR TRANSAÇÕES =====
  console.log('💰 Criando transações...');
  const transactions = await Promise.all([
    // Transação da primeira viagem
    prisma.transaction.create({
      data: {
        userId: passengers[0].id,
        rideId: completedRides[0].id,
        amount: 1500,
        type: TransactionType.RIDE_PAYMENT,
        paymentMethod: PaymentMethod.CASH,
        description: 'Pagamento de viagem - Talatona para Marginal',
      },
    }),
    // Transação da segunda viagem
    prisma.transaction.create({
      data: {
        userId: passengers[1].id,
        rideId: completedRides[1].id,
        amount: 2000,
        type: TransactionType.RIDE_PAYMENT,
        paymentMethod: PaymentMethod.MULTICAIXA_EXPRESS,
        description: 'Pagamento de transporte de carga',
      },
    }),
    // Transação da terceira viagem
    prisma.transaction.create({
      data: {
        userId: passengers[2].id,
        rideId: completedRides[2].id,
        amount: 2500,
        type: TransactionType.RIDE_PAYMENT,
        paymentMethod: PaymentMethod.CASH,
        description: 'Pagamento de viagem - Mutamba para Talatona',
      },
    }),
    // Transação da quarta viagem
    prisma.transaction.create({
      data: {
        userId: passengers[3].id,
        rideId: completedRides[3].id,
        amount: 1800,
        type: TransactionType.RIDE_PAYMENT,
        paymentMethod: PaymentMethod.CASH,
        description: 'Pagamento de transporte de móveis',
      },
    }),
  ]);

  console.log(`✅ ${transactions.length} transações criadas`);

  // ===== CRIAR AVALIAÇÕES =====
  console.log('⭐ Criando avaliações...');
  const ratings = await Promise.all([
    // Passageiro avalia motorista da primeira viagem
    prisma.rating.create({
      data: {
        rideId: completedRides[0].id,
        raterId: passengers[0].id,
        ratedUserId: drivers[0].id,
        stars: 5,
        comment: 'Excelente motorista! Muito educado e dirigiu com segurança.',
      },
    }),
    // Motorista avalia passageiro da primeira viagem
    prisma.rating.create({
      data: {
        rideId: completedRides[0].id,
        raterId: drivers[0].id,
        ratedUserId: passengers[0].id,
        stars: 5,
        comment: 'Passageiro pontual e educado.',
      },
    }),
    // Passageiro avalia motorista da segunda viagem
    prisma.rating.create({
      data: {
        rideId: completedRides[1].id,
        raterId: passengers[1].id,
        ratedUserId: drivers[1].id,
        stars: 4,
        comment: 'Bom serviço, mas poderia ser mais rápido.',
      },
    }),
    // Passageiro avalia motorista da terceira viagem
    prisma.rating.create({
      data: {
        rideId: completedRides[2].id,
        raterId: passengers[2].id,
        ratedUserId: drivers[3].id,
        stars: 5,
        comment: 'Perfeito! Recomendo.',
      },
    }),
    // Passageiro avalia motorista da quarta viagem
    prisma.rating.create({
      data: {
        rideId: completedRides[3].id,
        raterId: passengers[3].id,
        ratedUserId: drivers[4].id,
        stars: 4,
        comment: 'Muito cuidadoso com a carga. Bom trabalho!',
      },
    }),
  ]);

  console.log(`✅ ${ratings.length} avaliações criadas`);

  // ===== RESUMO =====
  console.log('\n📊 RESUMO DO SEED:');
  console.log(`   👤 Passageiros: ${passengers.length}`);
  console.log(`   🚗 Motoristas: ${drivers.length}`);
  console.log(`   👨‍💼 Admin: 1`);
  console.log(`   🚕 Viagens completadas: ${completedRides.length}`);
  console.log(`   ⏳ Viagens pendentes: ${pendingRides.length}`);
  console.log(`   🏃 Viagem em andamento: 1`);
  console.log(`   💰 Transações: ${transactions.length}`);
  console.log(`   ⭐ Avaliações: ${ratings.length}`);
  console.log('\n✅ Seed concluído com sucesso!');
  console.log('\n🔑 Credenciais de acesso:');
  console.log('   Email: qualquer um dos emails acima');
  console.log('   Senha: senha123');
  console.log('\n   Admin:');
  console.log('   Email: admin@kenda.ao');
  console.log('   Senha: senha123');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
