import { Injectable, Logger } from '@nestjs/common';
import { TagSistemaRepository } from '../repositories/system-tags.repository';

@Injectable()
export class TagSistemaService {
  private readonly logger = new Logger(TagSistemaService.name);

  constructor(private readonly tagSistemaRepository: TagSistemaRepository) {}

  /**
   * Retorna uma lista de todas as tags de sistema.
   */
  async findAll() {
    this.logger.log('Buscando todas as tags de sistema.');
    return this.tagSistemaRepository.findAll();
  }
}
