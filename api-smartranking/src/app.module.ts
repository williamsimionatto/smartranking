import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(`mongodb://localhost:27017/smartraking`, {
      
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
