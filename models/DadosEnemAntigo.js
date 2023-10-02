const { ArquivoCSV } = require("./ArquivoCSV.js");
const { DadosEnem } = require("./DadosEnem.js");

class DadosEnemAntigo extends DadosEnem {
    constructor(ano) {
        super();
        try {
            if (ano>=2009) {
                throw new Error("Ano inválido!");   //banco de dados de 1999-2008 (antigo)
            }
    
            this.arquivoCSV=new ArquivoCSV("microdados-enem/antigo/");
            const nomeArquivo = `enem_${ano}`;
            this.arquivoCSV.carregarArquivo(nomeArquivo);
    
            this.ano=String(ano);
        }   catch (e) {
                console.error(e.message);
                console.error("O ENEM antigo vai do ano 1998 até o ano 2008");
            }
    }
  

     obterTotalInscritos() {
        const linhasTabela = this.arquivoCSV.obterColuna("NU_INSCRICAO");
        return parseInt(linhasTabela[linhasTabela.length - 2]);
    }
  
     obterRelacaoEstados() {
        const relacao=new Map();
        const colunaUF=this.arquivoCSV.obterColuna("SG_UF_RESIDENCIA");
    
        for (const uf of colunaUF) {
            if (uf!=="") {
                if (!relacao.has(uf)) {
                    relacao.set(uf, 1);
                }   else {
                        const valorAntigo = relacao.get(uf);
                        relacao.set(uf, valorAntigo + 1);
                    }
            }
        }
    
        return this.ordenarAlfabeticamenteInt(relacao);
        }
    
     obterMediaNotasProvaObjetiva() {
        const notasString=this.arquivoCSV.obterColuna("NU_NOTA_OBJETIVA");
        return this.obterMediaValores(notasString);
    }
}

module.exports = { DadosEnemAntigo };