import { Injectable, NotFoundException } from '@nestjs/common';
import CriarJogadorDTO from './dtos/criar-jogador.dto';
import Jogador from './interfaces/jogador.interface';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  constructor(@InjectModel('Jogador') private jogadorModel : Model<Jogador>) {}

  async criarAtualizarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    const { email } = criarJogadorDTO;
    const jogadorEcontrado = await this.findJogador(email);

    if (jogadorEcontrado) {
      return await this.atualizarJogador(criarJogadorDTO);
    } else {
      return await this.criar(criarJogadorDTO);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find({}).exec();
  }

  async consultarTodosJogadoresEmail(email) : Promise<Jogador> {
    const jogadorEcontrado = await this.findJogador(email);

    if (!jogadorEcontrado) {
      throw new NotFoundException(`Jogador não econtrado!`);
    }

    return jogadorEcontrado;
  }

  async deletarJogador(email : string) : Promise<any> {
    return await this.jogadorModel.remove({email}).exec();
  }

  private async findJogador(param : string) {
    return await this.jogadorModel.findOne({
      param
    }).exec();
  }

  private async criar(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    const jogador = new this.jogadorModel(criarJogadorDTO);
    return await jogador.save();
  }

  private async atualizarJogador(criarJogadorDTO: CriarJogadorDTO) : Promise<Jogador> {
    return await this.jogadorModel.findOneAndUpdate(
      {email: criarJogadorDTO.email},
      {$set: criarJogadorDTO}).exec();
  }
}
