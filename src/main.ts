import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseAddReturnedDateToHeaderInterceptor } from './todos/interceptor/response-add-returned-at-to-header.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.useGlobalInterceptors(new ResponseAddReturnedDateToHeaderInterceptor());
  await app.listen(3000);
}
bootstrap();
