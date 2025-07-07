import {
  ConflictException,
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

import { DocumentoGerado, ModeloDocumento, Prisma } from '@prisma/client';
import { CreateModeloDocumentoDto } from '../dto/create-document-model.dto';

type UpdateDocumentModelData = Partial<{
  nome: string;
  descricao: string;
  tipoDocumento: string;
  url: string;
}>;
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

  async deleteGeneratedDocument(
    id: string,
    userId: string,
  ): Promise<DocumentoGerado> {
    const documentModelToDelete = await this.prisma.documentoGerado.findFirst({
      where: { id, userId },
    });

    if (!documentModelToDelete) {
      throw new NotFoundException(
        `Documento com o ID ${id} e user ${userId} não encontrado`,
      );
    }

    return this.prisma.documentoGerado.delete({
      where: { id, userId },
    });
  }
  /**
   * Cria um novo registro de modelo de documento no banco de dados.
   * @param data - Os dados para a criação do novo modelo.
   * @returns A entidade completa do modelo de documento recém-criada.
   * @throws ConflictException se um modelo com o mesmo nome já existir para o usuário.
   */
  async create(
    data: CreateModeloDocumentoDto,
    userId: string,
  ): Promise<ModeloDocumento> {
    const { tagsSistemaIds, ...modeloData } = data;

    try {
      const newDocumentModel = await this.prisma.modeloDocumento.create({
        data: {
          ...modeloData,
          url: modeloData.url || '',
          user: {
            connect: { id: userId },
          },

          tagsDoSistema: {
            create: tagsSistemaIds?.map((tagId) => ({
              tagSistema: {
                connect: { id: tagId },
              },
            })),
          },
        },
        include: {
          user: {
            omit: {
              password: true,
            },
          },
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
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Aconteceu um conflito ao criar o modelo de documento. Por favor verifique as informações e envie novamente.`,
        );
      }
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
          user: {
            omit: {
              password: true,
            },
          },
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

  /**
   * Encontra e pagina todos os modelos de documento de um usuário, com busca opcional.
   * @param userId - O ID do usuário proprietário dos modelos.
   * @param options - Opções de paginação (limit, offset) e busca (search).
   * @returns Um objeto com os dados paginados e informações de paginação.
   */
  async findAllByUserId(
    userId: string,
    options: { limit: number; offset: number; search?: string },
  ): Promise<PaginatedResult<ModeloDocumento>> {
    const { limit, offset, search } = options;

    const whereClause: Prisma.ModeloDocumentoWhereInput = {
      userId,
    };

    if (search) {
      whereClause.OR = [
        {
          nome: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          tipo_documento: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [totalItems, data] = await this.prisma.$transaction([
      this.prisma.modeloDocumento.count({
        where: whereClause,
      }),
      this.prisma.modeloDocumento.findMany({
        where: whereClause,
        include: {
          tagsDoSistema: {
            include: {
              tagSistema: true,
            },
          },
          user: {
            omit: {
              password: true,
            },
          },
        },
        skip: offset,
        take: limit,
        orderBy: {
          nome: 'asc',
        },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    return {
      data,
      totalItems,
      totalPages,
      currentPage,
      itemsPerPage: limit,
    };
  }

  async findAllGeneratedByUserId(
    userId: string,
    options: { limit: number; offset: number; search?: string },
  ): Promise<PaginatedResult<DocumentoGerado>> {
    const { limit, offset, search } = options;

    const whereClause: Prisma.DocumentoGeradoWhereInput = {
      userId,
    };

    if (search) {
      whereClause.OR = [
        {
          nome: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          tipo_documento: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [totalItems, data] = await this.prisma.$transaction([
      this.prisma.documentoGerado.count({
        where: whereClause,
      }),
      this.prisma.documentoGerado.findMany({
        where: whereClause,
        include: {
          user: {
            omit: {
              password: true,
            },
          },
        },
        skip: offset,
        take: limit,
        orderBy: {
          nome: 'asc',
        },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    return {
      data,
      totalItems,
      totalPages,
      currentPage,
      itemsPerPage: limit,
    };
  }

  async findModeloComTags(modeloId: string, userId: string) {
    return this.prisma.modeloDocumento.findFirst({
      where: {
        id: modeloId,
        userId: userId,
      },
      include: {
        tagsDoSistema: {
          include: {
            tagSistema: true,
          },
        },
      },
    });
  }
}
