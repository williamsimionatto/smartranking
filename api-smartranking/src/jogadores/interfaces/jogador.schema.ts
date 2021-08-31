import * as monogoose from 'mongoose';

export const JogadroSchema = new monogoose.Schema({
  email: {
    type: String,
    unique: true
  },
  telfoneCelular: {
    type: String,
  }, 
  nome: {
    type: String
  },
  posicaoRanking: {
    type: Number
  },
  urlPhoto: {
    type: String
  }
}, {timestamps: true, collection: 'jogadores'});

