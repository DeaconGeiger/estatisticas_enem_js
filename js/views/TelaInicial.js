import TelaInicialController from "../controllers/TelaInicialController.js";

export default class TelaInicial {
  #main;

  constructor() {
    this.#main = document.getElementById("tela");
    this.#main.innerHTML = '';

    const botaoFaixaEtaria = this.#criarBotao("faixa-etaria", "FAIXA ETÁRIA");
    const botaoGeneroInscritos = this.#criarBotao("genero", "GÊNERO DOS INSCRITOS");
    const botaoInscritos = this.#criarBotao("total-inscritos", "TOTAL DE INSCRITOS");
    const botaoInscritosUF = this.#criarBotao("uf-inscritos", "INSCRITOS POR UF");
    const botaoMediaProvaObjetiva = this.#criarBotao("media-objetivas", "MÉDIA DAS REDAÇÕES");
    const botaoMediaRedacao = this.#criarBotao("media-redacoes", "MÉDIA DAS REDAÇÕES");

    const cabecalho = document.createElement("header");
    cabecalho.setAttribute("id", "cabecalho");
    cabecalho.innerHTML =
      `<h1>
        <u>Estatísticas do Enem</u>
      </h1>`;
    
    const containerPrincipal = document.createElement("div");
    const navegacao = document.createElement("nav");
    navegacao.setAttribute("id", "botoes-iniciais");
    navegacao.appendChild(botaoInscritos);
    navegacao.appendChild(botaoMediaProvaObjetiva);
    navegacao.appendChild(botaoFaixaEtaria);
    navegacao.appendChild(botaoMediaRedacao);
    navegacao.appendChild(botaoGeneroInscritos);
    navegacao.appendChild(botaoInscritosUF);

    containerPrincipal.setAttribute("id", "container-principal");
    containerPrincipal.innerHTML = `<p>Selecione a variável a ser analisada:</p>`;
    containerPrincipal.appendChild(navegacao);

    this.#main.appendChild(cabecalho);
    this.#main.appendChild(containerPrincipal);

    const controller = new TelaInicialController();
  }

  #criarBotao(id, texto) {
    const botao = document.createElement("button");
    botao.setAttribute("id", id);
    botao.innerText = texto;
    return botao;
  }

}