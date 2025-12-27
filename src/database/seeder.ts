import { PrismaClient } from '@prisma/client';

/**
 * Database seeding functions
 */
export class DatabaseSeeder {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Seed admin user
   */
  async seedAdmin() {
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await this.prisma.user.upsert({
      where: { email: 'admin@kenda.com' },
      update: {},
      create: {
        email: 'admin@kenda.com',
        password: hashedPassword,
        name: 'Administrador',
        role: 'ADMIN',
        phone: '+244 900 000 000',
      },
    });

    console.log('✅ Admin user seeded');
  }

  /**
   * Seed sample drivers
   */
  async seedDrivers() {
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('driver123', 10);

    const drivers = [
      {
        email: 'driver1@kenda.com',
        name: 'António Fernandes',
        phone: '+244 923 111 111',
        vehicleModel: 'Toyota Corolla',
        vehiclePlate: 'LD-12-34-AB',
      },
      {
        email: 'driver2@kenda.com',
        name: 'Maria Santos',
        phone: '+244 923 222 222',
        vehicleModel: 'Honda Civic',
        vehiclePlate: 'LD-56-78-CD',
      },
    ];

    for (const driver of drivers) {
      await this.prisma.user.upsert({
        where: { email: driver.email },
        update: {},
        create: {
          ...driver,
          password: hashedPassword,
          role: 'DRIVER',
        },
      });
    }

    console.log('✅ Sample drivers seeded');
  }

  /**
   * Run all seeders
   */
  async run() {
    try {
      await this.seedAdmin();
      await this.seedDrivers();
      console.log('✅ Database seeding completed');
    } catch (error) {
      console.error('❌ Database seeding failed:', error);
      throw error;
    }
  }
}
