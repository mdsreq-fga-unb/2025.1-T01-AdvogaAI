import { Injectable, Logger } from '@nestjs/common';
import { ModeloDocumento } from '@prisma/client';
import { DocumentModelsRepository } from '../repositories/document-models.repository';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class DocumentModelsService {
  private readonly logger = new Logger(DocumentModelsService.name);

  constructor(
    private readonly DocumentModelsRepository: DocumentModelsRepository,
  ) {}

  async delete(
    id: string,
    userId: string,
  ): Promise<{ deletedDocument: ModeloDocumento }> {
    try {
      this.logger.log(
        `Deletando modelo de documento com id:${id} e user ${userId}`,
      );
      const deletedDocument = await this.DocumentModelsRepository.delete(
        id,
        userId,
      );
      this.logger.log(`Modelo de documento deletada com sucesso`);
      return { deletedDocument };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Não foi possível encontrar o modelo de documento de id: ${id} e user ${userId}`,
      );
      throw new InternalServerErrorException(
        'Não foi possível deletar o cliente pessoa jurídica. Por favor, tente novamente mais tarde.',
      );
    }
  }
}
