import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { JwtWrapperService } from './jwt.service';
import { JwtModule } from './jwt.module';

describe('JWT RS256 setup', () => {
  let jwtService: JwtWrapperService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), JwtModule],
    }).compile();

    jwtService = module.get<JwtWrapperService>(JwtWrapperService);
  });

  it('should sign and verify a payload correctly', () => {
    const payload = { sub: 'user123', foo: 'bar' };
    const token = jwtService.sign(payload);
    expect(typeof token).toBe('string');
    const decoded = jwtService.verify(token);
    expect(decoded).toMatchObject(payload);
  });
});
