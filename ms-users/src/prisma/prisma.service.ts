import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        // habilita logging de Prisma para depuración: query, info, warn, error
        super({ log: ['query', 'info', 'warn', 'error'] } as any);
    }

    async onModuleInit() {
        await this.$connect();
        console.log('Conectado a la base de datos');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('Desconectado de la base de datos');
    }

}
