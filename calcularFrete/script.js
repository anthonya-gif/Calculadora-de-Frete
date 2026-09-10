let fatorModal = 300;
let nome = null;
let cidadeOrigem = null;
let cidadeDestino = null;
let descricao = null;
let notaFiscal = null;
let distanciaKm = null;
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


function calcularFrete() {

    // texto
    nome = document.getElementById("nome");
    cidadeOrigem = document.getElementById("cidadeOrigem");
    cidadeDestino = document.getElementById("cidadeDestino");
    descricao = document.getElementById("descricao");

    // conversão de texto para numero
    notaFiscal = Number(document.getElementById("notaFiscal").value);
    distanciaKm = Number(document.getElementById("distancia").value);
    pesoReal = Number(document.getElementById("pesoReal").value);
    comprimento = Number(document.getElementById("comprimento").value);
    altura = Number(document.getElementById("altura").value);
    largura = Number(document.getElementById("largura").value);
    taxas = Number(document.getElementById("taxas").value);
    percentuais = Number(document.getElementById("percentual").value);

    fatorModal = 300;
    pesoCobrado = null;
    valorFrete = null;
    valorKmCobrado = null;

    // chamando as funções
    calculos();
    definirValor();
    atribuicao();

    resultado();
}


function calculos() {

    // Convertendo centímetros para metro 
    const comprimentoM = comprimento / 100;
    const larguraM = largura / 100;
    const alturaM = altura / 100;

    // calculando volume e peso cubado
    volume = comprimentoM * larguraM * alturaM;
    pesoCubado = volume * fatorModal;
}


function definirValor() {

    if (pesoCubado >= pesoReal) {
        pesoCobrado = pesoCubado;
    }
    else {
        pesoCobrado = pesoReal;
    }
}


function atribuicao() {

    // atribuindo o valor por KM
    if (distanciaKm == 0) {
        valorKmCobrado = 0;
    }
    else if (distanciaKm <= 50) {
        valorKmCobrado = 0.80;
    }
    else if (distanciaKm <= 100) {
        valorKmCobrado = 1.00;
    }
    else {
        valorKmCobrado = 1.20;
    }

    // calculando frete
    valorFrete = (pesoCobrado * valorKmCobrado) + taxas;

    // adicionando o percentual ao valor do frete
    valorFrete = valorFrete + (valorFrete * (percentuais / 100));
}


function resultado() {

    const resultado = document.getElementById("resultado");

    resultado.innerHTML = `
    <h2>Resultado:</h2>
    
    <h3>Identificação:</h3>
    <p><strong>Cliente:</strong> ${nome.value}</p>
    <p><strong>Origem:</strong> ${cidadeOrigem.value}</p>
    <p><strong>Destino:</strong> ${cidadeDestino.value}</p>
    <p><strong>Descrição da Mercadoria:</strong> ${descricao.value}</p>
    <hr>

    <h3>Tamanho da Mercadoria:</h3>
    <p><strong>Comprimento:</strong> ${comprimento.toFixed(2)} cm</p>
    <p><strong>Largura:</strong> ${largura.toFixed(2)} cm</p>
    <p><strong>Altura:</strong> ${altura.toFixed(2)} cm</p>
    <p><strong>Volume:</strong> ${volume.toFixed(2)}</p>
    <hr>

    <h3>Peso:</h3>
    <p><strong>Peso real:</strong> ${pesoReal.toFixed(2)} kg</p>
    <p><strong>Peso cubado:</strong> ${pesoCubado.toFixed(2)} kg</p>
    <p><strong>Peso de cobrança:</strong> ${pesoCobrado.toFixed(2)} kg</p>
    <hr>

    <h3>Dados do Frete:</h3>
    <p><strong>Distância:</strong> ${distanciaKm.toFixed(2)} km</p>
    <p><strong>Tarifa por KM:</strong> R$ ${valorKmCobrado.toFixed(2)}</p>
    <p><strong>Taxas:</strong> R$ ${taxas.toFixed(2)}</p>
    <p><strong>Percentual:</strong> ${percentuais.toFixed(2)}%</p>
    <hr>

    <h3>Valores</h3>

    <p><strong>Nota fiscal:</strong> R$ ${notaFiscal.toFixed(2)}</p>

    <h3>Valor Final do Frete</h3>
    <p><strong>R$ ${valorFrete.toFixed(2)}</strong></p>
    `;
}


function limparFormulario() {
    document.getElementById("resultado").innerHTML =
    `<p>Preencha todos os dados e clique em "Calcular Frete"</p>`;
}