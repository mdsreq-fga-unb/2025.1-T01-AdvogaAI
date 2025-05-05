import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// @ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @ApiOperation({ summary: 'Get Hello World' })
  // @ApiResponse({ status: 200, description: 'Hello World!' })
  getHello(): string {
    return this.appService.getHello();
  }
}
