import ControllerBase from "./ControllerBase.js";

export default class FaixaEtariaController extends ControllerBase {

  #graficoFaixaEtaria;
  #painelGrafico;
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

    this.#painelGrafico = document.getElementById("grafico-faixa-etaria");

    this.#graficoFaixaEtaria = new Chart(this.#painelGrafico.getContext('2d'), {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: "Faixa etária dos inscritos por ano",
            font: {
              weight: 'bold',
              size: '16px'
            }
          }
        }
      }
    });

    this.#painelGrafico.style.visibility = 'hidden';
  }

  voltarAoInicio(evento) {
    this.voltarAoInicioBase(evento);
  }

  limparGrafico(evento) {
    this.#menuPeriodoInicial.firstChild.disabled = false;
    this.#menuPeriodoFinal.firstChild.disabled = false;
    this.#menuPeriodoInicial.lastChild.innerHTML = '';
    this.#menuPeriodoFinal.lastChild.innerHTML = '';

    this.iniciarAnaliseBase(evento);
    
    this.#graficoFaixaEtaria.data = { labels: [], datasets: [] };
    this.#graficoFaixaEtaria.update();
  }

  iniciarAnalise(evento) {
    this.limparGrafico(evento);

    this.#painelGrafico.style.visibility = 'visible';
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

    const data = this.#graficoFaixaEtaria.data;
    if (typeof data.datasets[data.datasets.length - 1] != 'undefined') {
      var [backgroundColor, borderColor] = corNovoDado();
    }

    const dadoAdicionado = { label: faixaEtaria, data: [], backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: 1 };

    let teste = 100;
    
    for (let ano = periodoInicial; ano <= periodoFinal; ano++) {
      if (!data.labels.includes(ano))
        data.labels.push(ano);
      dadoAdicionado.data.push(teste);
      teste *= 2;
    }

    data.datasets.push(dadoAdicionado);

    this.#graficoFaixaEtaria.destroy();
    this.#graficoFaixaEtaria = null;

    this.#graficoFaixaEtaria = new Chart(this.#painelGrafico.getContext('2d'), {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: "Faixa etária dos inscritos por ano",
            font: {
              weight: 'bold',
              size: '16px'
            }
          }
        }
      }
    });

    function corNovoDado() {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
    
      const corFundo = `rgba(${r}, ${g}, ${b}, 0.5)`;
      const corBorda = `rgb(${r}, ${g}, ${b})`;
    
      return [corFundo, corBorda];
    }
  }
}