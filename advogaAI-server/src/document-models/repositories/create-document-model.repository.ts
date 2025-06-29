import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ModeloDocumento, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateModeloDocumentoDto } from '../dto/create-document-model.dto';

type UpdateDocumentModelData = Partial<{
  nome: string;
  descricao: string;
  tipoDocumento: string;
  url: string;
}>;

@Injectable()
export class CreateDocumentModelRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cria um novo registro de modelo de documento no banco de dados.
   * @param data - Os dados para a criação do novo modelo.
   * @returns A entidade completa do modelo de documento recém-criada.
   * @throws ConflictException se um modelo com o mesmo nome já existir para o usuário.
   */
  async create(data: CreateModeloDocumentoDto): Promise<ModeloDocumento> {
    const { tagsSistemaIds, ...modeloData } = data;

    try {
      const newDocumentModel = await this.prisma.modeloDocumento.create({
        data: {
          ...modeloData,
          url: modeloData.url || '', // Garante que a URL não seja nula

          tagsDoSistema: {
            create: tagsSistemaIds?.map((tagId) => ({
              tagSistema: {
                connect: { id: tagId },
              },
            })),
          },
        },
        include: {
          tagsDoSistema: {
            include: {
              tagSistema: true,
            },
          },
        },
      });
      return newDocumentModel;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' // Violação de constraint 'unique'
      ) {
        // Assume que a constraint é no campo 'nome'
        throw new ConflictException(
          `Um modelo com o nome '${data.nome}' já existe.`,
        );
      }
      // Re-lança outros erros inesperados
      throw error;
    }
  }

  async update(
    id: string,
    data: UpdateDocumentModelData,
  ): Promise<ModeloDocumento> {
    try {
      const updatedDocumentModel = await this.prisma.modeloDocumento.update({
        where: { id },
        data: data, // Passa o objeto de dados diretamente, que só contém os campos permitidos.
        include: {
          tagsDoSistema: {
            include: {
              tagSistema: true,
            },
          },
        },
      });
      return updatedDocumentModel;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025' // 'Record to update not found.'
      ) {
        throw new NotFoundException(
          `Modelo de documento com o ID '${id}' não foi encontrado.`,
        );
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Um modelo com o nome '${data.nome}' já existe.`,
        );
      }
      throw error;
    }
  }
}
