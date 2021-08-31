import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import AtualizarJogadorDTO from './dtos/atualizar-jogador.dto';
import CriarJogadorDTO from './dtos/criar-jogador.dto';
import Jogador from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresSevice : JogadoresService)  {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDTO : CriarJogadorDTO) {
    await this.jogadoresSevice.criarJogador(criarJogadorDTO);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(@Body() atualziarJogadorDTO : AtualizarJogadorDTO, @Param('_id', JogadoresValidacaoParametrosPipe) _id : string) : Promise<void> {
    await this.jogadoresSevice.atualizarJogador(_id, atualziarJogadorDTO);
  }

  @Get()
  async consultarJogadores() : Promise<Jogador[]> {
    return await this.jogadoresSevice.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPeloId(@Param('_id', JogadoresValidacaoParametrosPipe) _id : string) : Promise<Jogador[] | Jogador> {
    return await this.jogadoresSevice.consultarTodosJogadoresID(_id);
  }

  @Delete('/:_id')
  async deletarJogador(@Query('_id', JogadoresValidacaoParametrosPipe) _id : string) : Promise<void> {
    this.jogadoresSevice.deletarJogador(_id);
  }
}
