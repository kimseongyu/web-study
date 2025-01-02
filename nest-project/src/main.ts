import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // 아무 decorate도 없는 property의 object는 거름
      whitelist: true,
      // 이상한 걸 보내면, request 자체를 막음
      forbidNonWhitelisted: true,
      // param의 type을 사용자가 원하는 type으로 변경
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
