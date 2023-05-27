const form = document.getElementById('form-atividade');

const img_aprovado =
  '<img src="./images/aprovado.png" alt = "emoji celebrando" />';

const img_reprovado =
  '<img src="./images/reprovado.png" alt = "emoji decepcionado" />';

let linhas = ''; /* Formulário inicia com uma linha em branco */

const atividades = [];
const notas = [];

const spanAprovado = '<span class= "resultado aprovado">Aprovado </span>';
const spanReprovado = '<span class= "resultado reprovado">Reprovado </span>';

const notaMinima = parseFloat(prompt('Digite a nota mínima: '));

form.addEventListener('submit', function (e) {
  e.preventDefault();
  /* a função function (e) é p/ que ao submeter o form, a página não atualize sozinha */

  adicionaLinha();
  atualizaTabela();
  atualizaMediaFinal();
});

function adicionaLinha() {
  /* função que add uma linha nova na variavel global linhas */
  const input_nome_atividade = document.getElementById('nome-atividade');
  const input_nota_atividade = document.getElementById('nota-atividade');

  if (atividades.includes(input_nome_atividade.value)) {
    alert(`A atividade: ${input_nome_atividade.value} já foi inserida`);
  } else {
    atividades.push(input_nome_atividade.value);
    notas.push(parseFloat(input_nota_atividade.value));

    let linha = `<tr>`;
    linha += `<td>${input_nome_atividade.value}</td>`;
    linha += `<td>${input_nota_atividade.value}</td>`;
    linha += `<td>${
      input_nota_atividade.value >= notaMinima ? img_aprovado : img_reprovado
    }</td>`;
    /* Acima tem-se um If e Else resumido, onde o ? representa o if e : o else */
    linha += `</tr>`;

    /* O bloco acima é como uma cópia do HTML, é o preenchimento das colunas através do JS
    tanto é que as <tr> do HTML foram excluídas */

    linhas += linha;
    /* Aqui pega a linha inicial que estava em branco e grava os dados digitados nela */
  }

  input_nome_atividade.value = '';
  input_nota_atividade.value = '';
  /* Acima limpa o campo após add o conteúdo */
}

function atualizaTabela() {
  /* Função que atualiza a tabela com os dados da função adiciona Linha */

  const corpo_tabela = document.querySelector('tbody');
  /* Para inserir um conteúdo dentro de uma tag utilizamos InnerHTML */

  corpo_tabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
  const media_final = calculaMediaFinal();

  document.getElementById('media-final-valor').innerHTML = media_final;
  document.getElementById('media-final-resultado').innerHTML =
    media_final >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
  let soma_das_notas = 0;

  for (let i = 0; i < notas.length; i++) {
    soma_das_notas += notas[i];
  }

  return soma_das_notas / notas.length;
}
