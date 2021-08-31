import { Document } from "mongoose";

export default interface Jogador extends Document {
  readonly telefoneCelular : string;
  readonly email : string;
  nome : string;
  ranking: string;
  posicaoRanking : number;
  urlPhoto: string;
}