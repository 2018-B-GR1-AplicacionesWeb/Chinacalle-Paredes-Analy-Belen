import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// @ts-ignore
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.set('view engine', 'ejs');

  await app.listen(3000);
}

bootstrap();
