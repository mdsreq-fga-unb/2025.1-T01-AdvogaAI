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
  async getPessoaFisicaByIdAndUserId(id: string, userId: string) {
    try {
      const PF = await this.prisma.pessoaFisica.findUnique({
        where: {
          userId: userId,
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
  async updatePessoaFisica(id: string, data: UpdatePessoaFisicaDto) {
    const { endereco, empresasRepresentadasIds, ...pessoaFisicaData } = data;

    return this.prisma.pessoaFisica.update({
      where: { id },
      data: {
        ...pessoaFisicaData,
        updatedAt: new Date(),

        ...(endereco && {
          endereco: {
            update: {
              where: { id: endereco.id },
              data: {
                cep: endereco.cep,
                logradouro: endereco.logradouro,
                numero: endereco.numero,
                complemento: endereco.complemento,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                estado: endereco.estado,
              },
            },
          },
        }),

        ...(empresasRepresentadasIds !== undefined && {
          empresasRepresentadas: {
            set: empresasRepresentadasIds.map((idEmpresa) => ({
              id: idEmpresa,
            })),
          },
        }),
      },
    });
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
