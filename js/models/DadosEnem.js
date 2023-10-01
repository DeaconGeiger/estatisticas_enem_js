class DadosEnem {
    constructor(ano,arquivoCSV) {
        this.ano=ano;
        this.arquivoCSV=arquivoCSV;
    }
  
    obterRelacaoEstados() {
        throw new Error('Método abstrato "obterRelacaoEstados" deve ser implementado nas subclasses.');
    }
  

    obterTotalInscritos() {
        throw new Error('Método abstrato "obterTotalInscritos" deve ser implementado nas subclasses.');
    }
  

    obterRelacaoIdade() {
        const colunaIdade=this.arquivoCSV.obterColuna("TP_FAIXA_ETARIA");
        const relacaoIdade=new Map();
    
        relacaoIdade.set("Menor de 17 anos", 0);
        relacaoIdade.set("Entre 17 e 20 anos", 0);
        relacaoIdade.set("Entre 21 e 25 anos", 0);
        relacaoIdade.set("Entre 26 e 30 anos", 0);
        relacaoIdade.set("Entre 31 e 35 anos", 0);
        relacaoIdade.set("Entre 36 e 40 anos", 0);
        relacaoIdade.set("Entre 41 e 45 anos", 0);
        relacaoIdade.set("Entre 46 e 50 anos", 0);
        relacaoIdade.set("Entre 51 e 55 anos", 0);
        relacaoIdade.set("Entre 56 e 60 anos", 0);
        relacaoIdade.set("Maior de 60 anos", 0);
    
        let contagemNaoInformados=0;
    
        for (const codigo of colunaIdade) {
            const codigoNum=parseInt(codigo);
    
            if (codigoNum===1)  //=== valor e tipo iguais
                this.incrementarEm(relacaoIdade, "Menor de 17 anos");
            else if (codigoNum<=5)
                this.incrementarEm(relacaoIdade, "Entre 17 e 20 anos");
            else if (codigoNum<=10)
                this.incrementarEm(relacaoIdade, "Entre 21 e 25 anos");
            else if (codigoNum===11)
                this.incrementarEm(relacaoIdade, "Entre 26 e 30 anos");
            else if (codigoNum===12)
                this.incrementarEm(relacaoIdade, "Entre 31 e 35 anos");
            else if (codigoNum===13)
                this.incrementarEm(relacaoIdade, "Entre 36 e 40 anos");
            else if (codigoNum===14)
                this.incrementarEm(relacaoIdade, "Entre 41 e 45 anos");
            else if (codigoNum===15)
                this.incrementarEm(relacaoIdade, "Entre 46 e 50 anos");
            else if (codigoNum===16)
                this.incrementarEm(relacaoIdade, "Entre 51 e 55 anos");
            else if (codigoNum===17)
                this.incrementarEm(relacaoIdade, "Entre 56 e 60 anos");
            else if (codigoNum<=20)
                this.incrementarEm(relacaoIdade, "Maior de 60 anos");
            else
                contagemNaoInformados++;
        }
        relacaoIdade.set("Dados não informados", contagemNaoInformados);
  
        return relacaoIdade;
    }
  

    obterRelacaoIdadePercentual() {
        const relacaoIdade=this.obterRelacaoIdade();
        const relacaoIdadePercentual=new Map();
    
        const total=this.obterTotalInscritos();
    
        relacaoIdade.forEach((valor, chave) => {
            const valorPercentual=(valor / total)*100;
            relacaoIdadePercentual.set(chave, valorPercentual);
        });
    
        return relacaoIdadePercentual;
    }
    

    incrementarEm(mapa, chave) {
        const valorAntigo=mapa.get(chave);
        mapa.set(chave, valorAntigo + 1);
    }

    
    obterNumeroInscritosPorGenero() {
        const colunaInscritosPorGenero=this.arquivoCSV.obterColuna("TP_SEXO");
        const inscritosPorGenero=new Map();
    
        let contagemMasculino=0;
        let contagemFeminino=0;
        let contagemNaoInformados=0;
    
        for (const elemento of colunaInscritosPorGenero) {
            if (elemento==="M") {
                contagemMasculino++;
            }   else if (elemento==="F") {
                    contagemFeminino++;
            }   else {
                    contagemNaoInformados++;
            }
        }
        inscritosPorGenero.set("Masculino", contagemMasculino);
        inscritosPorGenero.set("Feminino", contagemFeminino);
        inscritosPorGenero.set("Dados não informados", contagemNaoInformados);

        return inscritosPorGenero;
    }
    

    obterPercentualInscritosPorGenero() {
        const numerosInscritosPorGenero=this.obterNumeroInscritosPorGenero();
        const percentualInscritosPorGenero=new Map();
    
        const total = this.obterTotalInscritos();
    
        numerosInscritosPorGenero.forEach((valor, chave) => {
            const valorPercentual=(valor/total)*100;
            percentualInscritosPorGenero.set(chave, valorPercentual);
        });
    
        return percentualInscritosPorGenero;
    }
    

    obterRelacaoEstadosPercentual() {
        const relacaoPercentual=new Map();
        const relacaoNumerica=this.obterRelacaoEstados();
        const totalInscritos=this.obterTotalInscritos();
    
        for (const [uf, percentual] of relacaoNumerica.entries()) {
            const percentualCalculado=(percentual/totalInscritos)*100;
            relacaoPercentual.set(uf, percentualCalculado);
        }
    
        return this.ordenarAlfabeticamenteDouble(relacaoPercentual);
    }
    

    ordenarAlfabeticamenteInt(mapa) {
        const mapaOrdenado=new Map([...mapa.entries()].sort());
        return mapaOrdenado;
    }
    

    ordenarAlfabeticamenteDouble(mapa) {
        const mapaOrdenado=new Map([...mapa.entries()].sort());
        return mapaOrdenado;
    }
    

      obterMediaNotasRedacao() {
        const notasString=this.arquivoCSV.obterColuna("NU_NOTA_REDACAO");
        return this.obterMediaValores(notasString);
    }
    

      obterMediaValores(valores) {
        const valoresNumericos=valores.map((valorString) => {
            if (valorString==="") {
                return 0;
            }

            return parseFloat(valorString);
        });
        const valorTotal=valoresNumericos.reduce((acumulador, valor) => {

          return acumulador+valor;
        }, 0);
        const quantidade=valoresNumericos.length;
        const media=valorTotal/quantidade;
    
        return media;
    }
    

    obterAno() {
        return this.ano;
    }
}    





  