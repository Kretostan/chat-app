import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import corsConfig from './config/cors.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [corsConfig]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
