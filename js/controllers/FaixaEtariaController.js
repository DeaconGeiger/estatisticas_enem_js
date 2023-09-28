import ControllerBase from "./ControllerBase";

export default class FaixaEtariaController extends ControllerBase {

  #graficoFaixaEtaria;
  #menuFaixaEtaria;
  #menuItemEnemAntigo;
  #menuItemEnemNovo;
  #menuModeloEnem;
  #menuPeriodoFinal;
  #menuPeriodoInicial;

  constructor() {
    super()
  }

  voltarAoInicio(event) {
    voltarAoInicioBase(event);
  }

  limparGrafico(event) {
    graficoFaixaEtaria.getData().clear();
    menuPeriodoInicial.setDisable(false);
    menuPeriodoFinal.setDisable(false);
    menuFaixaEtaria.getItems().forEach(item -> item.setDisable(false));
  }

  iniciarAnalise(event) {
    limparGrafico(event);
    iniciarAnaliseBase(event);
  }

  plotarGrafico(event) {
    var periodoInicial = null;
    var periodoFinal = null;
    var faixaEtaria;
    
    try {
      periodoInicial = Number.parseInt(menuPeriodoInicial.getText());
      periodoFinal = Number.parseInt(menuPeriodoFinal.getText());
      faixaEtaria = menuFaixaEtaria.getText();
      if (itemEstaDesabilitado(faixaEtaria, menuFaixaEtaria))
        throw new IOException("A faixa etária já foi selecionada!");
      else if (faixaEtaria.equals("Selecione a faixa etária"))
        throw new IOException("É preciso selecionar a faixa etária!");
    } catch (error) {
      Alert alerta = new Alert(Alert.AlertType.ERROR);
      alerta.setTitle("Erro!");
      alerta.setContentText(e.getMessage());
      alerta.showAndWait();
      return;
    } catch (NumberFormatException e) {
      Alert alerta = new Alert(Alert.AlertType.ERROR);
      alerta.setTitle("Erro!");
      alerta.setContentText("É necessário informar o período a ser analisado!");
      alerta.showAndWait();
      return;
    }

    if (!periodoValido(periodoInicial, periodoFinal))
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
  }
}