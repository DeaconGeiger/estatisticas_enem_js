const { DadosEnemAntigo } = require('../models/DadosEnemAntigo.js');
const { DadosEnemNovo } = require('../models/DadosEnemNovo.js');
const { ControllerBase } = require('./ControllerBase.js');
const prompt = require('prompt-sync')({ sigint: true });

class FaixaEtariaController extends ControllerBase {
  constructor() {
    super();
    const textoPrompt =
      `
  Selecione o modelo enem:
  
  1 - Modelo Antigo
  2 - Modelo Novo
  3 - Voltar
  `;

    var dado = 1;

    while (dado != 3) {
      console.log(textoPrompt);
      var entrada = prompt();

      try {
        dado = parseInt(entrada);
        if (Number.isNaN(dado))
          throw new Error("É preciso informar um número!");

        switch (dado) {
          case 1:
            this.modeloEnem = 'Modelo Antigo';
            this.iniciarAnalise();
            break;
          case 2:
            this.modeloEnem = 'Modelo Novo';
            this.iniciarAnalise();
            break;
          case 3:
            return;
          default:
            throw new Error('É preciso informar um número entre 1 e 3!');
        }
      } catch (erro) {
        console.error(erro.message);
      }
    }
  }

  iniciarAnalise() {
    [this.periodoInicial, this.periodoFinal] = this.iniciarAnaliseBase(this.modeloEnem);
    const textoPrompt =
  `
  Selecione a faixa etária:

  1 - Menor de 17 anos
  2 - Entre 17 e 20 anos
  3 - Entre 21 e 25 anos
  4 - Entre 26 e 30 anos
  5 - Entre 31 e 35 anos
  6 - Entre 36 e 40 anos
  7 - Entre 41 e 45 anos
  8 - Entre 46 e 50 anos
  9 - Entre 51 e 55 anos
  10 - Entre 56 e 60 anos
  11 - Maior de 60 anos
  12 - Voltar
  `
    const mapFaixaEtaria = {
      1: 'Menor de 17 anos',
      2: 'Entre 17 e 20 anos',
      3: 'Entre 21 e 25 anos',
      4: 'Entre 26 e 30 anos',
      5: 'Entre 31 e 35 anos',
      6: 'Entre 36 e 40 anos',
      7: 'Entre 41 e 45 anos',
      8: 'Entre 46 e 50 anos',
      9: 'Entre 51 e 55 anos',
      10: 'Entre 56 e 60 anos',
      11: 'Maior de 60 anos'
    }
    var dado = 1;

    while (dado != 12) {
      console.log(textoPrompt);
      var entrada = prompt();

      try {
        dado = parseInt(entrada);
        if (Number.isNaN(dado))
          throw new Error("É preciso informar um número!");

        if (dado <= 0 || dado > 12) {
          throw new Error("O número deve ser entre 1 e 12!");
        } 

        if (dado == 12)
          return;

        this.faixaEtaria = mapFaixaEtaria[dado];
        this.plotarGrafico();
      } catch (erro) {
        console.error(erro.message);
      }
    }
  }

  plotarGrafico() {
    console.log("\n" + this.faixaEtaria);
    for (let ano = this.periodoInicial; ano <= this.periodoFinal; ano++) {
      let dado;
      if (ano <= 2008)
        dado = new DadosEnemAntigo(ano).obterRelacaoIdade().get(this.faixaEtaria);
      else
        dado = new DadosEnemNovo(ano).obterRelacaoIdade().get(this.faixaEtaria);

      console.log(`No ano de ${ano} -> ${dado}`);
    }
  }
}

module.exports = { FaixaEtariaController };