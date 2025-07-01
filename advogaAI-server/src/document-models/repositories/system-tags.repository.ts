import { Injectable } from '@nestjs/common';
import { TagSistema } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TagSistemaRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca todas as tags de sistema cadastradas no banco de dados.
   * @returns Uma lista de todas as tags de sistema.
   */
  async findAll(): Promise<TagSistema[]> {
    return this.prisma.tagSistema.findMany({
      orderBy: {
        descricao: 'asc',
      },
    });
  }
}
