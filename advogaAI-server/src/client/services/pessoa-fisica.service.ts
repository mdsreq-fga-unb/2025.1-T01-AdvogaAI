import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PessoaFisicaRepository } from '../repositories/pessoa-fisica.repository';
import { RegisterClientDto } from '../dto/register-client.dto';
import { PessoaFisica } from '@prisma/client';

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
  async create(registerClientDto: RegisterClientDto): Promise<PessoaFisica> {
    const { userId, pessoaFisica: pessoaFisicaDto } = registerClientDto;

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
}
