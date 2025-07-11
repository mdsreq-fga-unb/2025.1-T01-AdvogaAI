import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PessoaFisica, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePessoaFisicaDto } from '../dto/create-pessoa-fisica.dto';

export interface PaginatedResult<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

@Injectable()
export class PessoaFisicaRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new PessoaFisica record, including its associated address,
   * and links it to a specific User (attorney).
   * @param data The DTO containing PessoaFisica and Address details.
   * @param userId The ID of the User (attorney) who owns this client.
   */
  async create(
    data: CreatePessoaFisicaDto,
    userId: string,
  ): Promise<PessoaFisica> {
    try {
      const { endereco, ...pessoaFisicaData } = data;

      const pessoaFisica = await this.prisma.pessoaFisica.create({
        data: {
          ...pessoaFisicaData,
          user: {
            connect: { id: userId },
          },
          endereco: {
            create: endereco,
          },
        },
        include: {
          endereco: true,
        },
      });

      return pessoaFisica as PessoaFisica;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const failedField = (error.meta?.target as string[])?.[0];

        let friendlyMessage = 'Já existe um registro com os dados informados.';
        if (failedField) {
          friendlyMessage = `O ${failedField.toUpperCase()} informado já está em uso.`;
        }

        throw new ConflictException(friendlyMessage);
      }

      throw error;
    }
  }

  async findById(id: string): Promise<PessoaFisica | null> {
    return this.prisma.pessoaFisica.findUnique({
      where: { id },
      include: {
        endereco: true,
        user: true,
        empresasRepresentadas: true,
      },
    });
  }

  async findAllByUserId(
    userId: string,
    options: { limit: number; offset: number; search?: string },
  ): Promise<PaginatedResult<PessoaFisica>> {
    const { limit, offset, search } = options;

    const whereClause: Prisma.PessoaFisicaWhereInput = {
      userId,
    };

    if (search) {
      whereClause.nomeCompleto = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const [totalItems, data] = await this.prisma.$transaction([
      this.prisma.pessoaFisica.count({
        where: whereClause,
      }),
      this.prisma.pessoaFisica.findMany({
        where: whereClause,
        include: { endereco: true },
        skip: offset,
        take: limit,
        orderBy: {
          nomeCompleto: 'asc',
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
  async findAll(
    page: number,
    pageSize: number,
    search?: string,
  ): Promise<{ data: PessoaFisica[]; total: number }> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where: Prisma.PessoaFisicaWhereInput = search
      ? {
          OR: [
            { nomeCompleto: { contains: search, mode: 'insensitive' } },
            { cpf: { contains: search } },
            { telefone: { contains: search } },
          ],
        }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.pessoaFisica.findMany({
        where,
        skip,
        take,
        include: {
          endereco: true,
          user: true,
          empresasRepresentadas: true,
        },
      }),
      this.prisma.pessoaFisica.count({ where }),
    ]);

    return { data, total };
  }

  async delete(id: string): Promise<PessoaFisica> {
    const pessoaFisicaToDelete = await this.prisma.pessoaFisica.findUnique({
      where: { id },
    });

    if (!pessoaFisicaToDelete) {
      throw new NotFoundException(
        `Pessoa Física com o ID ${id} não encontrado`,
      );
    }

    return this.prisma.pessoaFisica.delete({
      where: { id },
    });
  }
}
