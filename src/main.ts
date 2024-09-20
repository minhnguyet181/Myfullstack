import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  let port = process.env.BACKEND_PORT
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true, 
    errorHttpStatusCode: 422, 
    exceptionFactory: (validationErrors) => {
      
      return validationErrors.map((error) => ({
        property: error.property,
        errors: Object.values(error.constraints),
      }));
    },
  }))
  app.enableCors({
    origin: process.env.FRONTEND_URL, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, })
  await app.listen(port);
}
bootstrap();
