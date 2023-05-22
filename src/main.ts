import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { version }  from '../package.json';
import { corsOrigin } from 'src/constants/config.constant';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: corsOrigin
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
  .setTitle('vocabulary-backend')
  .setDescription('vocabulary API description')
  .setVersion(version)
  .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
