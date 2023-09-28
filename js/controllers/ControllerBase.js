import TelaInicial from "../views/TelaInicial.js";

export default class ControllerBase {
  #cena;

  constructor() {
    if (this.constructor == ControllerBase) {
      throw new Error("Esta é uma classe abstrata e não pode ser instanciada!")
    }
  }

  definirCena(elementosCena) {
    this.#cena = document.getElementById("tela")
    elementosCena.map(elemento => this.#cena.appendChild(elemento))
  }

  voltarAoInicioBase(event) {
    this.#cena = new TelaInicial();
  }
}