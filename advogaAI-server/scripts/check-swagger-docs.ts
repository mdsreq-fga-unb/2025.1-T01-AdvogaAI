import { AppModule } from '../src/app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function checkDocs() {
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('Verificação de Swagger')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const missingDocs: string[] = [];

  for (const path in document.paths) {
    const pathItem = document.paths[path];

    // percorre cada método HTTP possível no PathItem
    (
      ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'] as const
    ).forEach((method) => {
      const operation = pathItem[method];
      if (operation) {
        // OperationObject tem summary opcional
        const op = operation;
        if (!op.summary) {
          missingDocs.push(`${method.toUpperCase()} ${path}`);
        }
      }
    });
  }
  if (missingDocs.length > 0) {
    console.error('The flowwing routes are without @ApiOperation():');
    missingDocs.forEach((route) => console.error(`- ${route}`));
    process.exit(1);
  } else {
    console.log('All the routes are well documented with @ApiOperation');
  }

  await app.close();
}

void checkDocs();
