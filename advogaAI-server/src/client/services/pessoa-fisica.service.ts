import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PessoaFisicaRepository } from '../repositories/pessoa-fisica.repository';
import { RegisterClientDto } from '../dto/register-client.dto';
import { PessoaFisica } from '@prisma/client';

// Define PaginatedResult generic type if not already defined elsewhere
export interface PaginatedResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

@Injectable()
export class PessoaFisicaService {
  private readonly logger = new Logger(PessoaFisicaService.name);

  constructor(
    private readonly pessoaFisicaRepository: PessoaFisicaRepository,
  ) {}

  /**
   * Creates a new physical person client.
   * It checks for CPF duplication before creation.
   * @param registerClientDto - DTO containing the user ID and client data.
   * @returns The created client with its relations.
   * @throws {ConflictException} If a client with the same CPF already exists.
   * @throws {InternalServerErrorException} For any other unexpected errors.
   */
  async create(
    registerClientDto: RegisterClientDto,
    userId: string,
  ): Promise<PessoaFisica> {
    const { pessoaFisica: pessoaFisicaDto } = registerClientDto;

    try {
      // 1. Check if a client with this CPF already exists
      const existingPessoa = await this.pessoaFisicaRepository.findByCpf(
        pessoaFisicaDto.cpf,
      );

      if (existingPessoa) {
        throw new ConflictException('Já existe um cliente com este CPF.');
      }

      // 2. If not, proceed to create the new client
      this.logger.log(`Creating a new Pessoa Fisica for user ${userId}`);
      const newPessoaFisica = await this.pessoaFisicaRepository.create(
        pessoaFisicaDto,
        userId,
      );

      return newPessoaFisica;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      this.logger.error(
        `Failed to create Pessoa Fisica. DTO: ${JSON.stringify(pessoaFisicaDto)}`,
      );
      throw new InternalServerErrorException(
        'Não foi possível criar o cliente. Por favor, tente novamente mais tarde.',
      );
    }
  }

  async delete(id: string): Promise<{ deletedClient: PessoaFisica }> {
    try {
      this.logger.log(`deletando o usuario de id: ${id}`);
      const deletedClient = await this.pessoaFisicaRepository.delete(id);
      this.logger.log(`pessoa fisica deletada com sucesso!`);
      return { deletedClient };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Erro ao deletar Pessoa Fisica com o ID: ${id}.`);
      throw new InternalServerErrorException(
        'Não foi possível deletar o cliente pessoa física. Por favor, tente novamente mais tarde.',
      );
    }
  }

  async findAll(
    page: number,
    pageSize: number,
    search?: string,
  ): Promise<PaginatedResult<PessoaFisica>> {
    try {
      this.logger.log(
        `Buscando clientes. Página: ${page}, Itens por Página: ${pageSize}, Busca: "${search}"`,
      );
      const { data, total } = await this.pessoaFisicaRepository.findAll(
        page,
        pageSize,
        search,
      );

      return {
        data,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch {
      this.logger.error(
        `Falha ao buscar clientes. Query: ${JSON.stringify({ page, pageSize, search })}`,
      );
      throw new InternalServerErrorException(
        'Não foi possível buscar os clientes. Tente novamente mais tarde.',
      );
    }
  }
}
