import { Injectable, Logger } from '@nestjs/common';
import CriarJogadorDTO from './dtos/criar-jogador.dto';
import Jogador from './interfaces/jogador.interface';
import {v4 as uuid} from 'uuid';
import { throws } from 'assert';

@Injectable()
export class JogadoresService {
  private jogadores : Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDTO : CriarJogadorDTO) : Promise<void> {
    this.logger.log(`criarJogadorDTO: ${criarJogadorDTO}`);
    this.criar(criarJogadorDTO);
  }

  private criar(criarJogadorDTO : CriarJogadorDTO) : void {
    const { nome, telefoneCelular, email } = criarJogadorDTO;

    const jogador : Jogador = {
      _id: uuid(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlPhoto: 'www.google.com.br'
    }

    this.jogadores.push(jogador);
  }
}
