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

  voltarAoInicioBase(evento) {
    this.#cena = new TelaInicial();
  }

  iniciarAnaliseBase(evento) {
    const barraAnalise = document.getElementById("barra-analise");
    const menuPeriodoInicial = document.getElementById("periodo-inicial");
    const menuPeriodoFinal = document.getElementById("periodo-final");
    const conteudoMenuPeriodoInicial = menuPeriodoInicial.lastChild;
    const conteudoMenuPeriodoFinal = menuPeriodoFinal.lastChild;
    let anoPeriodoInicial;
    let anoPeriodoFinal;
    if (evento.target.innerText == "Modelo Novo") {
      anoPeriodoInicial = 1998;
      anoPeriodoFinal = 2008;
    } else {
      anoPeriodoInicial = 2009;
      anoPeriodoFinal = 2022;
    }

    for (let ano = anoPeriodoInicial; ano <= anoPeriodoFinal; ano++) {
      const itens = [document.createElement("a"), document.createElement("a")];

      itens.forEach(item => {
        item.classList.add("item-menu");
        item.innerText = `${ano}`;
      });

      conteudoMenuPeriodoInicial.appendChild(itens[0]);
      conteudoMenuPeriodoFinal.appendChild(itens[1]);
    }

    this.configurarMenu(menuPeriodoInicial);
    this.configurarMenu(menuPeriodoFinal);

    barraAnalise.style.visibility = "visible";
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
      alert("Erro!\n\n" + erro.message);
      return false;
    }

    return true;
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
    });
  }
}