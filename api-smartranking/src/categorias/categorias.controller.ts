import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDTO } from './dtos/atualizar-categoria.dto';
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

  @Put('/:categoria')
  @UsePipes(ValidationPipe)
  async atualizarCategoria(@Body() atualizarCategoriaDto: AtualizarCategoriaDTO, @Param('categoria') categoria: string): Promise<void> {
    await this.categoriaService.atualizarCategoria(categoria, atualizarCategoriaDto)
  }

  @Post('/:categoria/jogadores/:idJogador')
  async atribuirCategoriaJogador(@Param() params: string[]) : Promise<void> {
    return await this.categoriaService.atribuirCategoriaJogador(params)
  }
}