import { Body, Controller, Post } from '@nestjs/common';
import CriarJogadorDTO from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresSevice : JogadoresService)  {}

  @Post()
  async criarAtualizarJogador(
    @Body() criarJogadorDTO : CriarJogadorDTO
  ) {
    await this.jogadoresSevice.criarAtualizarJogador(criarJogadorDTO);
  }
}
