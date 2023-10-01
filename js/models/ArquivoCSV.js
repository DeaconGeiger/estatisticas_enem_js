//código de teste (sujeito a mudanças)

const fs = require('fs'); //file system

class ArquivoCSV {
  constructor(caminhoArquivo) {
    this.caminhoArquivo=caminhoArquivo;
    this.nomeColunasArquivo=[];
  }

  carregarArquivo(nomeArquivo) {
    const arquivo=`${this.caminhoArquivo}${nomeArquivo}.csv`;
    try {
      const data=fs.readFileSync(arquivo, 'utf8');
      const linhas=data.split('\n');

      this.nomeColunasArquivo=linhas[0].split(';'); //primeira linha contém nomes das colunas
      this.quantidadeLinhasValidas=linhas.length-1; //número de linhas -1 (primeira)
    } catch (err) {
      console.error(`O arquivo não foi encontrado: ${arquivo}`);
      console.error('Informe o nome do arquivo corretamente!');
    }
  }


  obterQuantidadeLinhasValidas() {
    return this.quantidadeLinhasValidas;
  }


  obterColuna(nomeColuna) {
    const indiceColuna=this.nomeColunasArquivo.indexOf(nomeColuna);
    if (indiceColuna===-1) {
      throw new Error(`Coluna não encontrada: ${nomeColuna}`);
    }
    const arquivo=`${this.caminhoArquivo}${nomeArquivo}.csv`;

    try {
      const data=fs.readFileSync(arquivo, 'utf8');
      const linhas=data.split('\n');

      linhas.shift(); //remoção do cabeçalho (linha 1) 

      const coluna=[];
      for (const linha of linhas) {
        const elementosLinha=linha.split(';');
        const elementoColuna=elementosLinha[indiceColuna];
        coluna.push(elementoColuna);
      }

      return coluna;
    } catch (err) {
      console.error(`O arquivo não foi encontrado: ${arquivo}`);
      console.error('Carregue o arquivo correto novamente!');
    }
  }
}







