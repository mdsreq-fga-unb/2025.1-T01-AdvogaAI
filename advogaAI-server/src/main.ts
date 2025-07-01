import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  let app: INestApplication;
  if (process.env.MODE === 'cloud') {
    const httpsOptions = {
      key: readFileSync(
        '/etc/letsencrypt/live/server.vitorhoffmann.dev/privkey.pem',
      ),
      cert: readFileSync(
        '/etc/letsencrypt/live/server.vitorhoffmann.dev/fullchain.pem',
      ),
    };
    app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
  } else {
    app = await NestFactory.create(AppModule);
  }
  app.use(cookieParser());
  app.enableCors({
    origin: `${process.env.FRONTEND_URL}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('AdvogaAI API')
    .setDescription('The AdvogaAI API description')
    .setVersion('1.0')
    .addTag('advogaAI')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 5555);
}
void bootstrap();
