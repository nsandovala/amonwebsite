import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// PrismaClient singleton pattern to prevent multiple instances in development
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Create PostgreSQL adapter with connection pooling
const createPrismaClient = () => {
    const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL!,
    });

    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
