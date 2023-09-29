import TelaInicial from "../views/TelaInicial.js";

export default class ControllerBase {
  #cena;

  constructor() {
    if (this.constructor == ControllerBase) {
      throw new Error("Esta é uma classe abstrata e não pode ser instanciada!")
    }
  }

  definirCena(elementosCena) {
    this.#cena = document.getElementById("tela");
    this.#cena.innerHTML = '';
    elementosCena.map(elemento => this.#cena.appendChild(elemento));
  }

  voltarAoInicioBase(event) {
    this.#cena = new TelaInicial();
  }

  configurarMenu(menu) {
    const botaoMenu = menu.firstChild;
    const conteudoMenu = menu.lastChild;
    botaoMenu.addEventListener("click", () => {
      conteudoMenu.classList.toggle("menu-ativo");
    });

    const itensMenu = Array.from(conteudoMenu.children);
    itensMenu.map(item => {
      item.addEventListener("click", () => {
        botaoMenu.innerText = item.innerText;
        conteudoMenu.classList.remove("menu-ativo");
      })
    })
  }

  configurarFechamentoMenus() {
    window.addEventListener("click", evento => {
      if (!evento.target.matches(".botao-menu")) {
        const botoes = Array.from(document.getElementsByClassName("conteudo-menu"));

        botoes.map(botao => {
          botao.classList.remove("menu-ativo");
        })
      }
    })
  }
}