import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import * as cors from 'cors';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME, // Change to your PostgreSQL username
      password: process.env.DB_PASSWORD, // Change to your PostgreSQL password
      database: process.env.DB_DATABASE, // Ensure that the 'todo_db' exists
      entities: [User],
      schema:process.env.DB_SCHEMA,
      synchronize: true, // Automatically sync entities to database, don't use in production
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cors({
        origin: process.env.FRONTEND_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      }),
    ).forRoutes('*');
  }
}
