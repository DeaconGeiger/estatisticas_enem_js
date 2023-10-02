const { DadosEnem } = require("./DadosEnem.js");
const { ArquivoCSV } = require("./ArquivoCSV.js");

class DadosEnemNovo extends DadosEnem {
    constructor(ano) {
        super();
        try {
            if (ano<=2008) {
                throw new Error("Ano inválido!");
            }
    
            this.arquivoCSV=new ArquivoCSV("microdados-enem/novo/");
            const nomeArquivo=`enem_${ano}`;
            this.arquivoCSV.carregarArquivo(nomeArquivo);
    
            this.ano=String(ano);
        }   catch (e) {
                console.error(e.message);
                console.error("O ENEM antigo vai do ano 2009 até o ano 2022");
        }
    }
  

    obterTotalInscritos() {
        return this.arquivoCSV.obterQuantidadeLinhasValidas();
    }
  

     obterRelacaoEstados() {
        const relacao=new Map();
        const colunaUF=this.arquivoCSV.obterColuna("SG_UF_ESC");
  
        for (const uf of colunaUF) {
            if (uf!=="") {
                if (!relacao.has(uf)) {
                    relacao.set(uf, 1);
                }   else {
                        const valorAntigo=relacao.get(uf);
                        relacao.set(uf, valorAntigo + 1);
                    }
            }
        }
  
        return this.ordenarAlfabeticamenteInt(relacao);
    }
  

    obterAreasConhecimento() {
        return [
            "Ciências da Natureza e suas Tecnologias",
            "Ciências Humanas e suas Tecnologias",
            "Linguagens, Códigos e suas Tecnologias",
            "Matemática e suas Tecnologias"
        ];
    }
  

     obterMediaProvaCN() {
        return this.obterMediaValores(this.arquivoCSV.obterColuna("NU_NOTA_CN"));
    }
  

     obterMediaProvaCH() {
        return this.obterMediaValores(this.arquivoCSV.obterColuna("NU_NOTA_CH"));
    }
  

     obterMediaProvaLC() {
        return this.obterMediaValores(this.arquivoCSV.obterColuna("NU_NOTA_LC"));
    }
  

     obterMediaProvaMT() {
        return this.obterMediaValores(this.arquivoCSV.obterColuna("NU_NOTA_MT"));
    }
}
  
module.exports = { DadosEnemNovo };