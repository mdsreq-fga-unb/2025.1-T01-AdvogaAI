import { Injectable, Logger } from '@nestjs/common';
// import { ModeloDocumento } from '@prisma/client';

@Injectable()
export class DocumentModelsService {
  private readonly logger = new Logger(DocumentModelsService.name);

  constructor() {}

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
}
