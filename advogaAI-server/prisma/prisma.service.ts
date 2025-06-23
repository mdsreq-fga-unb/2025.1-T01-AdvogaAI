import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect(); // Connect the database when module is inicialized
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Disconnect the database when module is destroyed
  }
}
