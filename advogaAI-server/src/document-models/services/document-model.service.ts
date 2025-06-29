import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateModeloDocumentoDto } from '../dto/create-document-model.dto';
import { StorageService } from 'src/storage/storage.service';
import { CreateDocumentModelRepository } from '../repositories/create-document-model.repository';
import { ModeloDocumento } from '@prisma/client';
import { UpdateModeloDocumentoDto } from '../dto/update-document-model.dto';
// import { ModeloDocumento } from '@prisma/client';

@Injectable()
export class DocumentModelsService {
  private readonly logger = new Logger(DocumentModelsService.name);

  constructor(
    private readonly storageService: StorageService,
    private readonly createDocumentModelsRepository: CreateDocumentModelRepository,
  ) {}

  //   async delete(
  //     id: string,
  //     userId: string,
  //   ): Promise<{ deletedDocument: ModeloDocumento }> {
  //     try {
  //       this.logger.log(`Deletando modelo de documento com id:${id}`);
  //       const deletedDocument = await this.pessoaJuridicaRepository.delete(id);
  //       this.logger.log(`Pessoa juridica deletada com sucesso`);
  //       return { deletedDocument };
  //     } catch (error) {
  //       if (error instanceof NotFoundException) {
  //         throw error;
  //       }
  //       this.logger.error(
  //         `Não foi possível encontrar a pessoa juridica de id: ${id}`,
  //       );
  //       throw new InternalServerErrorException(
  //         'Não foi possível deletar o cliente pessoa jurídica. Por favor, tente novamente mais tarde.',
  //       );
  //     }
  //   }

  async create(
    createDocumentModelDto: CreateModeloDocumentoDto,
    file: Express.Multer.File,
    userId: string,
  ): Promise<ModeloDocumento> {
    this.logger.log(`Criando modelo de documento para o usuário: ${userId}`);
    this.logger.log(
      `Dados do modelo de documento: ${JSON.stringify(createDocumentModelDto)}`,
    );
    this.logger.log(`Detalhes do arquivo enviado: ${JSON.stringify(file)}`);
    const timestamp = Date.now();
    const objectName = `users/${userId}/document-models/${timestamp}`;

    let initialModelData = {
      ...createDocumentModelDto,
      //userId: userId,
      url: '',
    };
    try {
      this.logger.log(`Iniciando upload para o MinIO`);
      const fileUrl = await this.storageService.upload(file, objectName);

      initialModelData = {
        ...createDocumentModelDto,
        //userId: userId,
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

    const newDocumentModel =
      await this.createDocumentModelsRepository.create(initialModelData);
    this.logger.log(
      `Registro criado no banco com o ID: ${newDocumentModel.id}`,
    );
    return newDocumentModel;
  }

  async update(id: string, updateDto: UpdateModeloDocumentoDto) {
    this.logger.log(`Tentando atualizar o modelo de documento com ID: ${id}`);

    const updatedDocument = await this.createDocumentModelsRepository.update(
      id,
      updateDto,
    );

    this.logger.log(
      `Modelo de documento com ID: ${id} atualizado com sucesso.`,
    );
    return updatedDocument;
  }
}
