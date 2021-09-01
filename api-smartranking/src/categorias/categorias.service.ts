import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {
  constructor(@InjectModel('Categoria') private readonly categoariaModel : Model<Categoria>) {
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
    return await this.categoariaModel.find().exec();
  }

  async consultarCategoriaPeloId(categoria : string) : Promise<Categoria> {
    const categoriaEcontrada = await this.categoariaModel.findOne({categoria}).exec();

    if (!categoriaEcontrada) {
      throw new NotFoundException(`Categoria não econtrada`);
    }

    return categoriaEcontrada;
  }
}