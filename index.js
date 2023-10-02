const prompt = require('prompt-sync')({sigint: true});
const { FaixaEtariaController } = require('./controllers/FaixaEtariaController.js');
const { GeneroController } = require('./controllers/GeneroController.js');
const { TotalInscritosController } = require('./controllers/TotalInscritosController.js');

const textoPrompt = 
  `
  Estatísticas Enem
  Informe a variável a ser analisada:
  
  1 - Total de inscritos
  2 - Faixa etária dos inscritos
  3 - Gênero dos inscritos
  4 - UF dos inscritos
  5 - Encerrar análise
  `;

var dado = 1;

while (dado != 5) {
  console.log(textoPrompt);
  var entrada = prompt();

  try {
    dado = parseInt(entrada);
    if (Number.isNaN(dado))
      throw new Error("É preciso informar um número!");

    switch (dado) {
      case 1:
        console.log('Total de inscritos');
        new TotalInscritosController();
        break;
      case 2:
        console.log('Faixa etária');
        new FaixaEtariaController();
        break;
      case 3:
        console.log('Gênero');
        new GeneroController();
        break;
      case 4:
        console.log('UF dos inscritos');
        break;
      case 5:
        console.log('Encerrando...');
        return;
      default:
        throw new Error("O número deve ser entre 1 e 5!");
    } 
  } catch (erro) {
    console.error(erro.message);
  }
}