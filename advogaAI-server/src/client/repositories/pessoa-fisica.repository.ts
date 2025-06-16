import { Injectable } from '@nestjs/common';
import { PessoaFisica, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePessoaFisicaDto } from '../dto/create-pessoa-fisica.dto';

@Injectable()
export class PessoaFisicaRepository {
  constructor(private prisma: PrismaService) {}

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
        user: true,
      },
    });

    return pessoaFisica;
  }

  async findByCpf(cpf: string): Promise<PessoaFisica | null> {
    return await this.prisma.pessoaFisica.findUnique({
      where: { cpf },
      include: {
        endereco: true,
        user: true,
        empresasRepresentadas: true,
      },
    });
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

  async findAllByUserId(userId: string): Promise<PessoaFisica[]> {
    return this.prisma.pessoaFisica.findMany({
      where: { userId },
      include: { endereco: true },
    });
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
}
