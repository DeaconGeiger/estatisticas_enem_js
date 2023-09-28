export default class TelaFaixaEtaria {
  #main;

  constructor() {
    this.#main = document.getElementById("tela");
    this.#main.innerHTML = '';

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
    selecaoModelo.appendChild(this.#criarMenu("Selecione o modelo do enem", ["Modelo Antigo", "Modelo Novo"]));

    barraAnalise.setAttribute("id", "barra-analise");
    barraAnalise.appendChild(this.#criarMenu("Selecione a faixa etária", ["Menor de 17 anos", "Entre 17 e 20 anos", "Entre 21 e 25 anos", "Entre 26 e 30 anos", "Entre 31 e 35 anos", "Entre 36 e 40 anos", "Entre 41 e 45 anos", "Entre 46 e 50 anos", "Entre 51 e 55 anos", "Entre 56 e 60 anos", "Maior de 60 anos"]))

    textoPeriodo.innerText = "Período: ";
    
    barraAnalise.appendChild(textoPeriodo);

    barraAnalise.appendChild(this.#criarMenu("Inicial", listaPeriodo(1998, 2008)));

    barraAnalise.appendChild(this.#criarMenu("Final", listaPeriodo(2009, 2022)));

    barraAnalise.appendChild(this.#criarBotao("botao-plotar", "Plotar gráfico"));
    barraAnalise.appendChild(this.#criarBotao("botao-limpar", "Limpar gráfico"));

    containerPrincipal.appendChild(selecaoModelo);
    containerPrincipal.appendChild(barraAnalise);

    this.#main.appendChild(cabecalho);
    this.#main.appendChild(containerPrincipal);

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
    menu.classList.add("botao-menu");
    const botaoMenu = document.createElement("button");
    botaoMenu.classList.add("texto-menu");
    botaoMenu.innerText = textoMenu;
    const conteudoMenu = document.createElement("ul");

    nomeItens.forEach(nomeItem => {
      const itemMenu = document.createElement("li")
      itemMenu.classList.add("item-menu");
      itemMenu.innerText = nomeItem;

      conteudoMenu.appendChild(itemMenu);
    });

    menu.appendChild(botaoMenu);
    menu.appendChild(conteudoMenu);

    return menu;
  }
}