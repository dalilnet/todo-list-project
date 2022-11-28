import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToDosModule } from './todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://todolistUser:04J4aD1EIzMmQzYz@cluster0.2rpkjjp.mongodb.net/test',
    ),
    ToDosModule,
  ], // importer mongodb module dans le root
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
