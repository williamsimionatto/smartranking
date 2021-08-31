import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { runInThisContext } from 'vm';
import CriarJogadorDTO from './dtos/criar-jogador.dto';
import Jogador from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresSevice : JogadoresService)  {}

  @Post()
  async criarAtualizarJogador(
    @Body() criarJogadorDTO : CriarJogadorDTO
  ) {
    await this.jogadoresSevice.criarAtualizarJogador(criarJogadorDTO);
  }

  @Get()
  async consultarJogadores(@Query('email') email : string) : Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.jogadoresSevice.consultarTodosJogadoresEmail(email);
    }

    return await this.jogadoresSevice.consultarTodosJogadores();
  }

  @Delete()
  async deletarJogador(@Query() email : string) : Promise<void> {
    this.jogadoresSevice.deletarJogador(email);
  }
}
