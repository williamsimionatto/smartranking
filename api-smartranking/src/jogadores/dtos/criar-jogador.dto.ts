import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CriarJogadorDTO {
  @IsNotEmpty()
  readonly telefoneCelular : string;
  @IsEmail()
  readonly email : string;
  @IsNotEmpty()
  readonly nome : string;
}