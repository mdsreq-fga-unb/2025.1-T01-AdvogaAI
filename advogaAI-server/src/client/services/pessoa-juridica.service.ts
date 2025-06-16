import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PessoaJuridicaRepository } from '../repositories/pessoa-juridica.repository';
import { PessoaFisicaRepository } from '../repositories/pessoa-fisica.repository';
import { RegisterJuridicalClientDto } from '../dto/register-juridical-client.dto';
import { PessoaFisica, PessoaJuridica } from '@prisma/client';

@Injectable()
export class PessoaJuridicaService {
  private readonly logger = new Logger(PessoaJuridicaService.name);

  constructor(
    private readonly pessoaJuridicaRepository: PessoaJuridicaRepository,
    private readonly pessoaFisicaRepository: PessoaFisicaRepository,
  ) {}

  /**
   * Creates a new juridical person client. If the legal representative already exists,
   * it associates them; otherwise, it creates a new representative.
   * @param registerDto - DTO containing user, company, and representative data.
   * @returns The created juridical person with its relations.
   * @throws {ConflictException} If the company (CNPJ) already exists.
   * @throws {InternalServerErrorException} For any other unexpected errors.
   */
  async create(
    registerDto: RegisterJuridicalClientDto,
  ): Promise<PessoaJuridica> {
    const {
      userId,
      pessoaJuridica: pjDto,
      representanteLegal: pfDto,
    } = registerDto;

    try {
      // 1. Check if a company with this CNPJ already exists
      const existingCompany = await this.pessoaJuridicaRepository.findByCnpj(
        pjDto.cnpj,
      );
      if (existingCompany) {
        throw new ConflictException('Já existe uma empresa com este CNPJ.');
      }

      // 2. Check if the legal representative already exists to reuse it.
      let representative: PessoaFisica;
      const existingRepresentative =
        await this.pessoaFisicaRepository.findByCpf(pfDto.cpf);

      if (existingRepresentative) {
        this.logger.log(
          `Representative with CPF ${pfDto.cpf} already exists. Reusing ID: ${existingRepresentative.id}`,
        );
        representative = existingRepresentative;
      } else {
        // If the representative does not exist, create a new one.
        this.logger.log(
          `Creating a new representative for user ${userId} with CPF ${pfDto.cpf}`,
        );
        representative = await this.pessoaFisicaRepository.create(
          pfDto,
          userId,
        );
      }

      // 3. Create the juridical person and connect the determined representative.
      this.logger.log(`Creating a new Pessoa Juridica for user ${userId}`);
      const newPessoaJuridica = await this.pessoaJuridicaRepository.create(
        pjDto,
        representative.id,
        userId,
      );

      return newPessoaJuridica;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      this.logger.error(
        `Failed to create Pessoa Juridica. DTO: ${JSON.stringify(registerDto)}`,
      );
      throw new InternalServerErrorException(
        'Não foi possível criar o cliente pessoa jurídica. Por favor, tente novamente mais tarde.',
      );
    }
  }
}
