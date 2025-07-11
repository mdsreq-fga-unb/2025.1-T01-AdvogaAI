/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { ProcessoRepository } from './process.repository';

@Injectable()
export class ProcessosService {
  constructor(private readonly processoRepository: ProcessoRepository) {}

  async getProcessosPaginated(userId: string, page: number, pageSize: number) {
    const totalProcessos = await this.processoRepository.countProcessos(userId);
    const processos = await this.processoRepository.getProcessosPaginated(
      userId,
      page,
      pageSize,
    );
    return {
      total: totalProcessos,
      processos,
      page,
      pageSize,
    };
  }
}
