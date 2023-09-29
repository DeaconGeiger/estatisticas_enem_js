import ControllerBase from "./ControllerBase.js";

export default class FaixaEtariaController extends ControllerBase {

  #graficoFaixaEtaria;
  #botaoVoltarAoInicio;
  #barraAnalise;
  #menuFaixaEtaria;
  #menuModeloEnem;
  #menuPeriodoFinal;
  #menuPeriodoInicial;
  #botaoPlotar;
  #botaoLimpar;

  constructor(elementosCena) {
    super();
    this.definirCena(elementosCena);

    this.#botaoVoltarAoInicio = document.getElementById("voltar-inicio");
    this.#botaoVoltarAoInicio.addEventListener("click", evento => this.voltarAoInicio(evento));

    this.#barraAnalise = document.getElementById("barra-analise");
    this.#barraAnalise.style.visibility = "hidden";

    this.#menuModeloEnem = document.getElementById("modelo-enem");
    this.#menuPeriodoInicial = document.getElementById("periodo-inicial");
    this.#menuPeriodoFinal = document.getElementById("periodo-final");
    this.#menuFaixaEtaria = document.getElementById("faixa-etaria");

    this.#botaoPlotar = document.getElementById("botao-plotar");
    this.#botaoPlotar.addEventListener("click", evento => this.plotarGrafico(evento));

    this.#botaoLimpar = document.getElementById("botao-limpar");
    this.#botaoLimpar.addEventListener("click", evento => this.limparGrafico(evento));
    
    this.configurarMenu(this.#menuModeloEnem);
    this.configurarMenu(this.#menuFaixaEtaria);
    
    const itensModeloEnem = Array.from(this.#menuModeloEnem.lastChild.children);
    itensModeloEnem.forEach(item => {
      item.addEventListener("click", evento => this.iniciarAnalise(evento));
    });
  
    this.configurarFechamentoMenus();
  }

  voltarAoInicio(evento) {
    this.voltarAoInicioBase(evento);
  }

  limparGrafico(evento) {
    this.#menuPeriodoInicial.firstChild.disabled = false;
    this.#menuPeriodoFinal.firstChild.disabled = false;
  }

  iniciarAnalise(evento) {
    //limparGrafico(evento);
    this.iniciarAnaliseBase(evento);
  }

  plotarGrafico(evento) {
    let periodoInicial;
    let periodoFinal;
    let faixaEtaria;

    try {
      periodoInicial = Number.parseInt(this.#menuPeriodoInicial.innerText);
      periodoFinal = Number.parseInt(this.#menuPeriodoFinal.innerText);
      if (Number.isNaN(periodoInicial) || Number.isNaN(periodoFinal))
        throw new TypeError("É preciso informar o período!");
      faixaEtaria = this.#menuFaixaEtaria.innerText;
      if (faixaEtaria == "Selecione a faixa etária") {
        throw new TypeError("É preciso selecionar a faixa etária!");
      }
    } catch (erro) {
      alert("Erro!\n\n" + erro.message);
      return;
    }
    
    if (!this.periodoValido(periodoInicial, periodoFinal))
      return;

    this.#menuPeriodoInicial.firstChild.disabled = true;
    this.#menuPeriodoFinal.firstChild.disabled = true;

    console.log("Período válido!");
  }
}

    /*if (!periodoValido(periodoInicial, periodoFinal))
      return;

    XYChart.Series<String, Number> series = new XYChart.Series<>();
    series.setName(faixaEtaria);

    menuPeriodoInicial.setDisable(true);
    menuPeriodoFinal.setDisable(true);
    menuFaixaEtaria.getItems().forEach(item -> {
      if (item.getText().equals(faixaEtaria))
        item.setDisable(true);
    });

    for (int ano = periodoInicial; ano <= periodoFinal; ano++) {
      int dado = 0;
      if (ano <= 2008)
        dado = new DadosEnemAntigo(ano).obterRelacaoIdade().get(faixaEtaria);
      else
        dado = new DadosEnemNovo(ano).obterRelacaoIdade().get(faixaEtaria);

      series.getData().add(new XYChart.Data<>("" + ano, dado));
    }

    graficoFaixaEtaria.getData().add(series);
  } */