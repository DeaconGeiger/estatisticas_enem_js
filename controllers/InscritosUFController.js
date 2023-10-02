const { DadosEnemAntigo } = require('../models/DadosEnemAntigo.js');
const { DadosEnemNovo } = require('../models/DadosEnemNovo.js');
const { ControllerBase } = require('./ControllerBase.js');
const prompt = require('prompt-sync')({ sigint: true });

class InscritosUFController extends ControllerBase {
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
    this.plotarGrafico();
  }

  plotarGrafico() {
    console.log("\nInscritos por UF");
    for (let ano = this.periodoInicial; ano <= this.periodoFinal; ano++) {
      let dado;
      if (ano <= 2008)
        dado = new DadosEnemAntigo(ano).obterNumeroInscritosPorGenero().get('dado');
      else
        dado = new DadosEnemNovo(ano).obterNumeroInscritosPorGenero().get('Masculino');

      console.log(`No ano de ${ano} -> UF: ${uf}`);
    }
  }
}

module.exports = { InscritosUFController };