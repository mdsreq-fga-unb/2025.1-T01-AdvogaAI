import { Controller, Get } from '@nestjs/common';
import { NotificacaoService } from './notification.service';

@Controller('notificacao')
export class NotificacaoController {
  constructor(private readonly notificacaoService: NotificacaoService) {}

  @Get('trigger-manual')
  async triggerCronJob() {
    await this.notificacaoService.triggerCronJobManual();
    return 'Cron job manual disparado!';
  }

  @Get('trigger-manual-email')
  async triggerCronJobEmail() {
    await this.notificacaoService.triggerCronJobNotificationManual();
    return 'Cron job manual disparado!';
  }
}
