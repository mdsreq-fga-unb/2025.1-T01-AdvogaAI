import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ProcessosService } from './process.service';
import { JwtAuthGuard } from 'src/shared/jwt/jwt-auth.guard';
import { UserId } from 'src/shared/decorators/user-id.decorator';
import { ProcessoRepository } from './process.repository';

@Controller('processos')
export class ProcessosController {
  constructor(
    private readonly processosService: ProcessosService,
    private readonly processoRepository: ProcessoRepository,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProcessos(
    @UserId() userId: string, // Obtém o ID do usuário autenticado
    @Query('page') page = 1, // Página para paginação
    @Query('pageSize') pageSize = 10, // Tamanho da página para paginação
  ) {
    return this.processosService.getProcessosPaginated(
      userId,
      Number(page),
      Number(pageSize),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('prioritized')
  async getProcessosPrioritizados(@UserId() userId: string) {
    const processos =
      await this.processoRepository.getPrioritizedProcessos(userId);
    return processos;
  }
}
