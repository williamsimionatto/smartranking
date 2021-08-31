import { Injectable, NotFoundException } from '@nestjs/common';
import CriarJogadorDTO from './dtos/criar-jogador.dto';
import Jogador from './interfaces/jogador.interface';
import { v4 as uuid } from 'uuid';
import { NotFoundError } from 'rxjs';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  async criarAtualizarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<void> {
    const { email } = criarJogadorDTO;
    const jogadorEcontrado = await this.jogadores.find(jogador => jogador.email === email);

    if (jogadorEcontrado) {
      return this.atualizarJogador(jogadorEcontrado, criarJogadorDTO);
    } else {
      this.criar(criarJogadorDTO);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  async consultarTodosJogadoresEmail(email) : Promise<Jogador> {
    const jogadorEcontrado = await this.jogadores.find(jogador => jogador.email === email);
    if (!jogadorEcontrado) {
      throw new NotFoundException(`Jogador não econtrado!`);
    }

    return jogadorEcontrado;
  }

  async deletarJogador(email : string) : Promise<void> {
    const jogadorEcontrado = await this.jogadores.find(jogador => jogador.email === email);
    this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEcontrado.email);
  }

  private criar(criarJogadorDTO: CriarJogadorDTO): void {
    const { nome, telefoneCelular, email } = criarJogadorDTO;

    const jogador: Jogador = {
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

  private atualizarJogador(jogadorEcontrado: Jogador, criarJogadorDTO: CriarJogadorDTO) : void {
    const { nome } = criarJogadorDTO;
    jogadorEcontrado.nome = nome;
  }
}
