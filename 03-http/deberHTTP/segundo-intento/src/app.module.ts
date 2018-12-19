import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CancionService} from "./cancion.service";

@Module({
  imports: [],
  controllers: [
      AppController,
  CancionService],
  providers: [AppService],
    //
})
export class AppModule {}
