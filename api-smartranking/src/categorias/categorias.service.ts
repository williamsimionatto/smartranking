import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDTO } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {
  constructor(@InjectModel('Categoria') private readonly categoariaModel : Model<Categoria>, private readonly jogadorService: JogadoresService) {
  }

  async criarCategoria(criarCategoriaDTO : CriarCategoriaDTO) : Promise<Categoria> {
    const { categoria } = criarCategoriaDTO;
    const categoriaEcontrada = await this.categoariaModel.findOne({categoria}).exec();

    if (categoriaEcontrada) {
      throw new BadRequestException(`Categoria já cadastrada`);
    }

    const categoriaCriada = new this.categoariaModel(criarCategoriaDTO);
    return await categoriaCriada.save();
  }

  async consultarTodasCategorias() : Promise<Array<Categoria>> {
    return await this.categoariaModel.find().populate('jogadores').exec();
  }

  async consultarCategoriaPeloId(categoria : string) : Promise<Categoria> {
    const categoriaEcontrada = await this.categoariaModel.findOne({categoria}).exec();

    if (!categoriaEcontrada) {
      throw new NotFoundException(`Categoria não econtrada`);
    }

    return categoriaEcontrada;
  }

  async atualizarCategoria(categoria: string, atualizarCategoriaDTO: AtualizarCategoriaDTO): Promise<void> {
    const categoriaEcontrada = await this.categoariaModel.findOne({categoria}).exec();

    if (!categoriaEcontrada) {
      throw new NotFoundException(`Categoria não econtrada`);
    }

    await this.categoariaModel.findOneAndUpdate({categoria}, {atualizarCategoriaDTO}).exec()
  }

  async atribuirCategoriaJogador(params: string[]): Promise<void> {
    const categoria = params['categoria']
    const idJogador = params['idJogador']

    const categoriaEcontrada = await this.categoariaModel.findOne({categoria}).exec();
    const jogadorCadastradoCategoria = await this.categoariaModel.find({categoria}).where('jogadores').in(idJogador).exec()

    if (!categoriaEcontrada) {
      throw new NotFoundException(`Categoria não econtrada`);
    }

    if (jogadorCadastradoCategoria.length > 0) {
      throw new BadRequestException(`Jogador já cadastrado nesta categoria`);
    }

    await this.jogadorService.consultarTodosJogadoresID(idJogador)

    categoriaEcontrada.jogadores.push(idJogador)
    await this.categoariaModel.findOneAndUpdate({categoria}, {$set: categoriaEcontrada}).exec()
  }
}
