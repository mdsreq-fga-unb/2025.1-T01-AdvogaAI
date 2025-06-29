import {
  //ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

export interface PaginatedResult<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

import { ModeloDocumento } from '@prisma/client';

@Injectable()
export class DocumentModelsRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new PessoaFisica record, including its associated address,
   * and links it to a specific User (attorney).
   * @param data The DTO containing PessoaFisica and Address details.
   * @param userId The ID of the User (attorney) who owns this client.
   */

  async delete(id: string, userId: string): Promise<ModeloDocumento> {
    const documentModelToDelete = await this.prisma.modeloDocumento.findFirst({
      where: { id, userId },
    });

    if (!documentModelToDelete) {
      throw new NotFoundException(
        `Documento com o ID ${id} e user ${userId} não encontrado`,
      );
    }

    return this.prisma.modeloDocumento.delete({
      where: { id, userId },
    });
  }
}
