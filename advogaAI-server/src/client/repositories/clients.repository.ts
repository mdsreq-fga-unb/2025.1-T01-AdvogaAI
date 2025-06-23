import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdatePessoaFisicaDto } from '../dto/update-pessoa-fisica.dto';
import { UpdatePessoaJuridicaDto } from '../dto/update-pessoa-juridica.dto';

@Injectable()
export class ClientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserWithID(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          email: true,
          id: true,
        },
      });
      return user;
    } catch {
      return { message: 'Internal server error', statusCode: 500 };
    }
  }
  async getPessoaFisicaWithID(id: string) {
    try {
      const PF = await this.prisma.pessoaFisica.findUnique({
        where: {
          id: id,
        },
      });
      return PF;
    } catch {
      return { message: 'Internal server error', statusCode: 500 };
    }
  }

  async getPessoaJuridicaWithID(id: string) {
    try {
      const PF = await this.prisma.pessoaJuridica.findUnique({
        where: {
          id: id,
        },
      });
      return PF;
    } catch {
      return { message: 'Internal server error', statusCode: 500 };
    }
  }
  async updatePessoaFisica(data: UpdatePessoaFisicaDto) {
    try {
      await this.prisma.pessoaFisica.update({
        where: {
          id: data.idPessoaFisica,
        },
        data: {
          cpf: data.cpf,
          ctps: data.ctps,
          email: data.email,
          enderecoId: data.endereco,
          estadoCivil: data.estadoCivil,
          nacionalidade: data.nacionalidade,
          nomeCompleto: data.nomeCompleto,
          profissao: data.profissao,
          rg: data.rg,
          telefone: data.telefone,
          updatedAt: new Date(),
          empresasRepresentadas: {
            connect: data.empresasRepresentadasIds?.map((idEmpresa) => ({
              id: idEmpresa,
            })),
          },
        },
      });
    } catch {
      return { message: 'Internal server error', statusCode: 500 };
    }
  }

  async updatePessoaJuridica(data: UpdatePessoaJuridicaDto) {
    try {
      await this.prisma.pessoaJuridica.update({
        where: {
          id: data.IdPessoaJuridica,
        },
        data: {
          email: data.email,
          telefone: data.telefone,
          cnpj: data.cnpj,
          updatedAt: new Date(),
          enderecoId: data.endereco,
          nomeFantasia: data.nomeFantasia,
          razaoSocial: data.razaoSocial,
          representanteLegalId: data.representanteLegalId,
          tipoEmpresa: data.tipoEmpresa,
        },
      });
    } catch {
      return { message: 'Internal server error', statusCode: 500 };
    }
  }
}
