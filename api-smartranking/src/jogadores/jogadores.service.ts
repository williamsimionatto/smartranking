import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import CriarJogadorDTO from './dtos/criar-jogador.dto';
import Jogador from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AtualizarJogadorDTO from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {
  constructor(@InjectModel('Jogador') private jogadorModel : Model<Jogador>) {}

  async criarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    const { email } = criarJogadorDTO;
    const jogadorEcontrado = await this.findJogador(email);

    if (jogadorEcontrado) {
      throw new BadRequestException(`Jogador já cadastrado`);
    }

    const jogador = new this.jogadorModel(criarJogadorDTO);
    return await jogador.save();
  }

  async atualizarJogador(_id : string, atualizarJogadorDto: AtualizarJogadorDTO): Promise<Jogador> {
    const jogadorEcontrado = await this.findJogador(_id);

    if (!jogadorEcontrado) {
      throw new BadRequestException(`Jogador não encontrado`);
    }

    return await this.jogadorModel.findOneAndUpdate(
      {_id},
      {$set: atualizarJogadorDto}).exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find({}).exec();
  }

  async consultarTodosJogadoresID(_id) : Promise<Jogador> {
    const jogadorEcontrado = await this.findJogador(_id);

    if (!jogadorEcontrado) {
      throw new NotFoundException(`Jogador não econtrado!`);
    }

    return jogadorEcontrado;
  }

  async deletarJogador(_id : string) : Promise<any> {
    const jogadorEcontrado = await this.findJogador(_id);
    if (!jogadorEcontrado) {
      throw new NotFoundException(`Jogador não econtrado!`);
    }

    return await this.jogadorModel.remove({_id}).exec();
  }

  private async findJogador(param : string) : Promise<Jogador> {
    return await this.jogadorModel.findOne({
      param
    }).exec();
  }
}