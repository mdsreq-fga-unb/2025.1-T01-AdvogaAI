import { Injectable, Logger } from '@nestjs/common';
import { ModeloDocumento } from '@prisma/client';
import { DocumentModelsRepository } from '../repositories/document-models.repository';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { StorageService } from 'src/storage/storage.service';
import { CreateModeloDocumentoDto } from '../dto/create-document-model.dto';
import { UpdateModeloDocumentoDto } from '../dto/update-document-model.dto';

@Injectable()
export class DocumentModelsService {
  private readonly logger = new Logger(DocumentModelsService.name);

  constructor(
    private readonly documentModelsRepository: DocumentModelsRepository,
    private readonly storageService: StorageService,
  ) {}

  async delete(
    id: string,
    userId: string,
  ): Promise<{ deletedDocument: ModeloDocumento }> {
    try {
      this.logger.log(
        `Deletando modelo de documento com id:${id} e user ${userId}`,
      );
      const deletedDocument = await this.documentModelsRepository.delete(
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
  async create(
    createDocumentModelDto: CreateModeloDocumentoDto,
    file: Express.Multer.File,
    userId: string,
  ): Promise<ModeloDocumento> {
    this.logger.log(`Criando modelo de documento para o usuário: ${userId}`);
    this.logger.log(
      `Dados do modelo de documento: ${JSON.stringify(createDocumentModelDto)}`,
    );
    const timestamp = Date.now();
    const objectName = `users/${userId}/document-models/${timestamp}`;

    let initialModelData = {
      ...createDocumentModelDto,
      url: '',
    };
    try {
      this.logger.log(`Iniciando upload para o MinIO`);
      const fileUrl = await this.storageService.upload(file, objectName);

      initialModelData = {
        ...createDocumentModelDto,
        url: fileUrl,
      };
      this.logger.log(`Upload concluído. Atualizando o registro no banco.`);
    } catch (error) {
      this.logger.error(
        `Falha no upload do documento, tente novamente mais tarde.}`,
        error,
      );
      throw new InternalServerErrorException(
        'Falha ao fazer o upload do arquivo. A operação foi cancelada.',
      );
    }

    const newDocumentModel = await this.documentModelsRepository.create(
      initialModelData,
      userId,
    );
    this.logger.log(
      `Registro criado no banco com o ID: ${newDocumentModel.id}`,
    );
    return newDocumentModel;
  }

  async update(id: string, updateDto: UpdateModeloDocumentoDto) {
    this.logger.log(`Tentando atualizar o modelo de documento com ID: ${id}`);

    const updatedDocument = await this.documentModelsRepository.update(
      id,
      updateDto,
    );

    this.logger.log(
      `Modelo de documento com ID: ${id} atualizado com sucesso.`,
    );
    return updatedDocument;
  }
}
