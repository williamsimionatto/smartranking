import * as monogoose from 'mongoose';

export const JogadroSchema = new monogoose.Schema({
  telfoneCelular: {
    type: String,
    unique: true
  }, 
  email: {
    type: String,
    unique: true
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

