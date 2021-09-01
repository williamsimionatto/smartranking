import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(`mongodb://localhost:27017/smartraking`, {
      
    }),
    CategoriasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
