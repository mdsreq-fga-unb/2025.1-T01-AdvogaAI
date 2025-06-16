import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor() {}
}
