import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './constants';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port);

  app.use(morgan('dev'));
  app.setGlobalPrefix('api');
  app.enableCors(CORS);

  console.log(`⚡📱 Application running on port ${port} ...`);
}
bootstrap();
