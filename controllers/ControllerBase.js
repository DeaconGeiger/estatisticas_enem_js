const prompt = require('prompt-sync')({ sigint: true });

class ControllerBase {

  constructor() {
    if (this.constructor == ControllerBase) {
      throw new Error("Esta é uma classe abstrata e não pode ser instanciada!")
    }
  }

  iniciarAnaliseBase(modeloEnem) {
    let anoPeriodoInicial;
    let anoPeriodoFinal;
    if (modeloEnem == "Modelo Antigo") {
      anoPeriodoInicial = 1998;
      anoPeriodoFinal = 2008;
    } else {
      anoPeriodoInicial = 2009;
      anoPeriodoFinal = 2022;
    }

    const textoPrompt =
  `
  Informe o período:
  Para o modelo selecionado, o período deve ser entre ${anoPeriodoInicial} e ${anoPeriodoFinal}
  `
    let periodoInicial = anoPeriodoInicial;
    let periodoFinal = anoPeriodoFinal;
    let periodoAdequado = true;
    
    do {
      console.log(textoPrompt);
      periodoInicial = prompt('Inicial: ');
      periodoFinal = prompt('Final: ');
      
      periodoAdequado = this.periodoValido(periodoInicial, periodoFinal);

      if (periodoInicial < anoPeriodoInicial || periodoFinal > anoPeriodoFinal)
        periodoAdequado = false;

    } while(!periodoAdequado)

    return [periodoInicial, periodoFinal];
  }

  periodoValido(periodoInicial, periodoFinal) {
    try {
      const diferencaPeriodo = periodoFinal - periodoInicial;
      if (diferencaPeriodo < 0)
        throw new TypeError("O período final não pode ser menor que o período inicial!");
      else if (diferencaPeriodo == 0) {
        throw new TypeError("A diferença entre os períodos deve ser de pelo menos 1 ano!");
      }
    } catch (erro) {
      console.error("Erro!\n\n" + erro.message);
      return false;
    }

    return true;
  }
}

module.exports = { ControllerBase };