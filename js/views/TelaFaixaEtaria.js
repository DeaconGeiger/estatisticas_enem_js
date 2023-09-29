import FaixaEtariaController from "../controllers/FaixaEtariaController.js";

export default class TelaFaixaEtaria {

  constructor() {
    const elementosCena = [];

    const cabecalho = document.createElement("header");
    const botaoInicio = this.#criarBotao("voltar-inicio", "Voltar ao início");
    const titulo = document.createElement("h1");
    const containerPrincipal = document.createElement("div");
    const selecaoModelo = document.createElement("nav");
    const barraAnalise = document.createElement("nav");
    const textoPeriodo = document.createElement("p");

    titulo.innerText = 'FAIXA ETÁRIA POR ANO';
    
    cabecalho.appendChild(botaoInicio);
    cabecalho.appendChild(titulo);

    containerPrincipal.setAttribute("id", "container-principal");
    selecaoModelo.setAttribute("id", "selecao-modelo");

    const menuModeloEnem = this.#criarMenu("Selecione o modelo do enem", ["Modelo Antigo", "Modelo Novo"]);
    menuModeloEnem.setAttribute("id", "modelo-enem");
    selecaoModelo.appendChild(menuModeloEnem);

    barraAnalise.setAttribute("id", "barra-analise");

    const menuFaixaEtaria = this.#criarMenu("Selecione a faixa etária", ["Menor de 17 anos", "Entre 17 e 20 anos", "Entre 21 e 25 anos", "Entre 26 e 30 anos", "Entre 31 e 35 anos", "Entre 36 e 40 anos", "Entre 41 e 45 anos", "Entre 46 e 50 anos", "Entre 51 e 55 anos", "Entre 56 e 60 anos", "Maior de 60 anos"]);
    menuFaixaEtaria.setAttribute("id", "faixa-etaria");
    barraAnalise.appendChild(menuFaixaEtaria);

    textoPeriodo.innerText = "Período: ";
    
    barraAnalise.appendChild(textoPeriodo);

    const menuPeriodoInicial = this.#criarMenu("Inicial", listaPeriodo(1998, 2008));
    menuPeriodoInicial.setAttribute("id", "periodo-inicial");
    barraAnalise.appendChild(menuPeriodoInicial);

    const menuPeriodoFinal = this.#criarMenu("Final", listaPeriodo(2009, 2022))
    menuPeriodoFinal.setAttribute("id", "periodo-final");
    barraAnalise.appendChild(menuPeriodoFinal);

    barraAnalise.appendChild(this.#criarBotao("botao-plotar", "Plotar gráfico"));
    barraAnalise.appendChild(this.#criarBotao("botao-limpar", "Limpar gráfico"));

    containerPrincipal.appendChild(selecaoModelo);
    containerPrincipal.appendChild(barraAnalise);

    elementosCena.push(cabecalho);
    elementosCena.push(containerPrincipal);

    const controller = new FaixaEtariaController(elementosCena);

    function listaPeriodo(anoInicial, anoFinal) {
      let anos = [];
      for (let ano = anoInicial; ano <= anoFinal; ano++) {
        anos.push(`${ano}`);
      }

      return anos;
    }
  }

  #criarBotao(id, texto) {
    const botao = document.createElement("button");
    botao.setAttribute("id", id);
    botao.innerText = texto;
    return botao;
  }

  #criarMenu(textoMenu, nomeItens) {
    const menu = document.createElement("div");
    menu.classList.add("menu");
    const botaoMenu = document.createElement("button");
    botaoMenu.classList.add("botao-menu");
    botaoMenu.innerText = textoMenu;
    const conteudoMenu = document.createElement("div");
    conteudoMenu.classList.add("conteudo-menu");

    nomeItens.forEach(nomeItem => {
      const itemMenu = document.createElement("a");
      itemMenu.classList.add("item-menu");
      itemMenu.innerText = nomeItem;

      conteudoMenu.appendChild(itemMenu);
    });

    menu.appendChild(botaoMenu);
    menu.appendChild(conteudoMenu);

    return menu;
  }
}