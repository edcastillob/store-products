import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './constants';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  const config = new DocumentBuilder()
  .setTitle('Backend Elsolnec')
  .setDescription('Aplicación prueba técnica EDCastillob')
  .setVersion('1.0.0')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);  

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port);
  app.use(morgan('dev'));
  app.enableCors(CORS); 
  
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions:{
        enableImplicitConversion: true,
      }
    })
    )
  console.log(`⚡📱 Application running on port ${port} ...`);
}
bootstrap();
