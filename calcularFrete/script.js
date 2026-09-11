const fatorModal = 300;
const freteMinimo = 19;

let nome = null;
let cidadeOrigem = null;
let cidadeDestino = null;
let descricao = null;
let notaFiscal = null;
let distanciaKm = null;
let quantidadeVolumes = null;
let pesoReal = null;
let comprimento = null;
let altura = null;
let largura = null;
let taxas = null;
let percentuais = null;
let pesoCobrado = null;
let valorFrete = null;
let valorKmCobrado = null;
let volume = null;
let pesoCubado = null;
let fretePeso = null;
let valorPercentual = null;
let aplicouFreteMinimo = false;


// função principal
function calcularFrete() {

    // texto
    nome = document.getElementById("nome").value.trim();
    cidadeOrigem = document.getElementById("cidadeOrigem").value.trim();
    cidadeDestino = document.getElementById("cidadeDestino").value.trim();
    descricao = document.getElementById("descricao").value.trim();

    // conversão de texto para numero
    notaFiscal = Number(document.getElementById("notaFiscal").value);
    distanciaKm = Number(document.getElementById("distancia").value);
    quantidadeVolumes = Number(document.getElementById("quantidadeVolumes").value);
    pesoReal = Number(document.getElementById("pesoReal").value);
    comprimento = Number(document.getElementById("comprimento").value);
    altura = Number(document.getElementById("altura").value);
    largura = Number(document.getElementById("largura").value);
    taxas = Number(document.getElementById("taxas").value);
    percentuais = Number(document.getElementById("percentual").value);

    // validação
    if (!validarDados()) {
        return;
    }

    fatorModal = 300;
    pesoCobrado = null;
    valorFrete = null;
    valorKmCobrado = null;
    fretePeso = null;
    valorPercentual = null;
    aplicouFreteMinimo = false;

    // chamando as funções
    calculos();
    definirValor();
    atribuicao();
    calcularPercentual();
    verificarFreteMinimo();

    resultado();
}


// validação dos dados
function validarDados() {

    if (nome == "" || cidadeOrigem == "" || cidadeDestino == "" || descricao == "") {
        mostrarErro("Preencha o nome do cliente, origem, destino e descrição da mercadoria.");
        return false;
    }

    if (!Number.isFinite(notaFiscal) || notaFiscal <= 0) {
        mostrarErro("O valor da nota fiscal deve ser maior que zero.");
        return false;
    }

    if (!Number.isFinite(distanciaKm) || distanciaKm <= 0) {
        mostrarErro("A distância deve ser maior que zero.");
        return false;
    }

    if (!Number.isFinite(quantidadeVolumes) || quantidadeVolumes <= 0) {
        mostrarErro("A quantidade de volumes deve ser maior que zero.");
        return false;
    }

    if (!Number.isFinite(pesoReal) || pesoReal <= 0) {
        mostrarErro("O peso real deve ser maior que zero.");
        return false;
    }

    if (!Number.isFinite(comprimento) || comprimento <= 0 ||
        !Number.isFinite(largura) || largura <= 0 ||
        !Number.isFinite(altura) || altura <= 0) {

        mostrarErro("Comprimento, largura e altura devem ser maiores que zero.");
        return false;
    }

    if (!Number.isFinite(taxas) || taxas < 0) {
        mostrarErro("As taxas não podem ser negativas.");
        return false;
    }

    if (!Number.isFinite(percentuais) || percentuais < 0 || percentuais > 100) {
        mostrarErro("O percentual deve estar entre 0% e 100%.");
        return false;
    }

    return true;
}


// mensagem de erro
function mostrarErro(mensagem) {

    const resultado = document.getElementById("resultado");

    resultado.innerHTML = `
        <h2>Erro</h2>
        <p>${mensagem}</p>
    `;
}


// cálculo da cubagem
function calculos() {

    // Convertendo centímetros para metro
    const comprimentoM = comprimento / 100;
    const larguraM = largura / 100;
    const alturaM = altura / 100;

    // calculando volume
    const volumeUnitario = comprimentoM * larguraM * alturaM;

    // considerando a quantidade de volumes
    volume = volumeUnitario * quantidadeVolumes;

    // calculando peso cubado
    pesoCubado = volume * fatorModal;
}


// definindo o peso de cobrança
function definirValor() {

    if (pesoCubado >= pesoReal) {
        pesoCobrado = pesoCubado;
    }
    else {
        pesoCobrado = pesoReal;
    }
}


// calculando o frete
function atribuicao() {

    // atribuindo o valor por KM
    if (distanciaKm <= 50) {
        valorKmCobrado = 0.80;
    }
    else if (distanciaKm <= 100) {
        valorKmCobrado = 1.00;
    }
    else {
        valorKmCobrado = 1.20;
    }

    // calculando frete-peso
    fretePeso = pesoCobrado * valorKmCobrado;
}


// calculando o percentual
function calcularPercentual() {

    valorPercentual = fretePeso * (percentuais / 100);
}


// verificando o frete mínimo
function verificarFreteMinimo() {

    const valorAntesDoMinimo = fretePeso + valorPercentual + taxas;

    if (valorAntesDoMinimo < freteMinimo) {
        valorFrete = freteMinimo;
        aplicouFreteMinimo = true;
    }
    else {
        valorFrete = valorAntesDoMinimo;
        aplicouFreteMinimo = false;
    }
}


// formatando dinheiro
function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// resultado
function resultado() {

    const resultado = document.getElementById("resultado");

    let criterioPeso;

    if (pesoCubado >= pesoReal) {
        criterioPeso = "Peso cubado";
    }
    else {
        criterioPeso = "Peso real";
    }

    let freteMinimoTexto;

    if (aplicouFreteMinimo) {
        freteMinimoTexto = "Frete mínimo aplicado";
    }
    else {
        freteMinimoTexto = "Frete mínimo não aplicado";
    }

    resultado.innerHTML = `
    <h2>Resultado:</h2>
    
    <h3>Identificação:</h3>
    <p><strong>Cliente:</strong> ${nome}</p>
    <p><strong>Origem:</strong> ${cidadeOrigem}</p>
    <p><strong>Destino:</strong> ${cidadeDestino}</p>
    <p><strong>Descrição da Mercadoria:</strong> ${descricao}</p>
    <hr>

    <h3>Tamanho da Mercadoria:</h3>
    <p><strong>Quantidade de volumes:</strong> ${quantidadeVolumes}</p>
    <p><strong>Comprimento:</strong> ${comprimento.toFixed(2)} cm</p>
    <p><strong>Largura:</strong> ${largura.toFixed(2)} cm</p>
    <p><strong>Altura:</strong> ${altura.toFixed(2)} cm</p>
    <p><strong>Volume total de carga:</strong> ${volume.toFixed(3)} m³</p>
    <hr>

    <h3>Peso:</h3>
    <p><strong>Peso real:</strong> ${pesoReal.toFixed(2)} kg</p>
    <p><strong>Peso cubado:</strong> ${pesoCubado.toFixed(2)} kg</p>
    <p><strong>Peso de cobrança:</strong> ${pesoCobrado.toFixed(2)} kg</p>
    <p><strong>Critério utilizado:</strong> ${criterioPeso}</p>
    <hr>

    <h3>Dados do Frete:</h3>
    <p><strong>Distância:</strong> ${distanciaKm.toFixed(2)} km</p>
    <p><strong>Tarifa por KM:</strong> ${formatarMoeda(valorKmCobrado)}</p>
    <p><strong>Frete-peso:</strong> ${formatarMoeda(fretePeso)}</p>
    <p><strong>Taxas:</strong> ${formatarMoeda(taxas)}</p>
    <p><strong>Percentual:</strong> ${percentuais.toFixed(2)}%</p>
    <p><strong>Valor do percentual:</strong> ${formatarMoeda(valorPercentual)}</p>
    <p><strong>Frete mínimo:</strong> ${formatarMoeda(freteMinimo)}</p>
    <p><strong>Situação:</strong> ${freteMinimoTexto}</p>
    <hr>

    <h3>Valores:</h3>

    <p><strong>Nota fiscal:</strong> ${formatarMoeda(notaFiscal)}</p>

    <h3>Valor Final do Frete</h3>
    <p><strong>${formatarMoeda(valorFrete)}</strong></p>
    `;
}


// limpar formulário
function limparFormulario() {

    document.querySelector("form").reset();

    document.getElementById("resultado").innerHTML =
    `<p>Preencha todos os dados e clique em "Calcular Frete"</p>`;
}
