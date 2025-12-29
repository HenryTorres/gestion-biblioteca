import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envVars } from './config/envs.validator';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [envVars.NATS_SERVER]
      }
    }
  );

  //Habilitamos las validaciones globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));


  await app.listen();

  const logger = new Logger('MS-Users')
  logger.log(`Microservicio ejecutándose en NATS SERVER`);
}

bootstrap();
