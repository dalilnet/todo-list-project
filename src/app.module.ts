import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './auth/JwtStrategy';
import { ToDosModule } from './todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://todolistUser:04J4aD1EIzMmQzYz@cluster0.2rpkjjp.mongodb.net/test',
    ),
    ToDosModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    ConfigModule.forRoot(),
  ], // importer mongodb module dans le root
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
