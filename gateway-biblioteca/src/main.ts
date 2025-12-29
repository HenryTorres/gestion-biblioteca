import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envVars } from './config/envs.validator';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception/rpc-custom-exception.filter';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  //Habilitamos las validaciones globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envVars.PORT, envVars.HOST);

  const logger = new Logger('API-Gateway')
  logger.log(`Gateway ejecutandose en http://${envVars.HOST}:${envVars.PORT}`)

}
bootstrap();
