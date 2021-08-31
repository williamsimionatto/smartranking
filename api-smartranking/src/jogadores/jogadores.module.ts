import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadroSchema } from './interfaces/jogador.schema';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'Jogador', 
      schema: JogadroSchema
    }
  ])],
  controllers: [JogadoresController],
  providers: [JogadoresService]
})
export class JogadoresModule {}
