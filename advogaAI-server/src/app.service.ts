import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World from prod!!';
    return 'Hello World from dev!!';
  }
}
