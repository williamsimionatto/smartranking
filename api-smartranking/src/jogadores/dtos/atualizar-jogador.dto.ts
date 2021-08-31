import { IsNotEmpty } from 'class-validator';

export default class AtualizarJogadorDTO {
  @IsNotEmpty()
  readonly telefoneCelular : string;

  @IsNotEmpty()
  readonly nome : string;
}