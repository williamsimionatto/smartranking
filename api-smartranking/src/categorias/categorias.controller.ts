import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriaService : CategoriasService) {

  }

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(@Body() criarCategoriaDTO : CriarCategoriaDTO) : Promise<Categoria> {
    return await this.categoriaService.criarCategoria(criarCategoriaDTO);
  }

  @Get()
  async consultarCategorias() : Promise<Array<Categoria>> {
    return await this.categoriaService.consultarTodasCategorias();
  }
  @Get('/:categoria')
  async consultarCategoriaPeloId(@Param('categoria') categoria : string) : Promise<Categoria> {
    return await this.categoriaService.consultarCategoriaPeloId(categoria);
  }
}