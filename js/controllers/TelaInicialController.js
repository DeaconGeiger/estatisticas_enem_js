import TelaFaixaEtaria from '../views/TelaFaixaEtaria.js'
import ControllerBase from './ControllerBase.js'

export default class TelaInicialController extends ControllerBase {

  #botaoFaixaEtaria
  #botaoGeneroInscritos
  #botaoInscritosUF
  #botaoInscritos
  #botaoMediaProvaObjetiva
  #botaoMediaRedacao

  constructor() {
    super();
    this.#botaoFaixaEtaria = document.getElementById("faixa-etaria");
    this.#botaoGeneroInscritos = document.getElementById("genero");
    this.#botaoInscritos = document.getElementById("total-inscritos");
    this.#botaoInscritosUF = document.getElementById("uf-inscritos");
    this.#botaoMediaProvaObjetiva = document.getElementById("media-objetivas");
    this.#botaoMediaRedacao = document.getElementById("media-redacoes");

    this.#botaoFaixaEtaria.addEventListener("click", this.analisarFaixaEtaria);
    this.#botaoGeneroInscritos.addEventListener("click", this.analisarGeneroInscritos);
    this.#botaoInscritosUF.addEventListener("click", this.analisarInscritosUF);
    this.#botaoInscritos.addEventListener("click", this.analisarTotalInscritos);
    this.#botaoMediaProvaObjetiva.addEventListener("click", this.analisarMediaProvaObjetiva);
    this.#botaoMediaRedacao.addEventListener("click", this.analisarMediaRedacao);
  }

  analisarFaixaEtaria(event) {
    const tela = new TelaFaixaEtaria();
  }

  analisarGeneroInscritos(event) {
    console.log("GÊNERO");
  }

  analisarInscritosUF(event) {
    console.log("UF INSCRITOS");
  }

  analisarMediaProvaObjetiva(event) {
    console.log("MEDIA OBJETIVAS");
  }

  analisarMediaRedacao(event) {
    console.log("MEDIA REDACAO");
  }

  analisarTotalInscritos(event) {
    console.log("TOTAL INSCRITOS");
  }
}