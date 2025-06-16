import { Injectable } from '@nestjs/common';
import { PessoaJuridica } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePessoaJuridicaDto } from '../dto/create-pessoa-juridica.dto';

@Injectable()
export class PessoaJuridicaRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new PessoaJuridica record, including its associated address,
   * and links it to a legal representative (PessoaFisica) and a specific User (attorney).
   * @param data The DTO containing PessoaJuridica details.
   * @param representanteLegalId The ID of the PessoaFisica acting as the legal representative.
   * @param userId The ID of the User (attorney) who owns this client.
   */
  async create(
    data: CreatePessoaJuridicaDto,
    representanteLegalId: string,
    userId: string,
  ): Promise<PessoaJuridica> {
    const { endereco, ...pessoaJuridicaData } = data;

    return this.prisma.pessoaJuridica.create({
      data: {
        ...pessoaJuridicaData,
        representanteLegal: {
          connect: { id: representanteLegalId },
        },
        user: {
          connect: { id: userId },
        },
        endereco: {
          create: endereco,
        },
      },
      include: {
        endereco: true,
        representanteLegal: true,
        user: true,
      },
    });
  }

  async findByCnpj(cnpj: string): Promise<PessoaJuridica | null> {
    return this.prisma.pessoaJuridica.findUnique({
      where: { cnpj },
      include: {
        endereco: true,
        representanteLegal: true,
        user: true,
      },
    });
  }

  async findById(id: string): Promise<PessoaJuridica | null> {
    return this.prisma.pessoaJuridica.findUnique({
      where: { id },
      include: {
        endereco: true,
        representanteLegal: true,
        user: true,
      },
    });
  }

  // Add other methods like update, delete, get all for a specific user etc.
  async findAllByUserId(userId: string): Promise<PessoaJuridica[]> {
    return this.prisma.pessoaJuridica.findMany({
      where: { userId },
      include: { endereco: true, representanteLegal: true },
    });
  }
}
