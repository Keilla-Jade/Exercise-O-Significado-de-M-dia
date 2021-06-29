function getRandomArbitrary(min, max) { //Número inteiro entre dois valores
    return Math.random() * (max - min) + min; //Retorna número aleatórios
}

function getRandomIntInclusive(min, max) { //Incluir intervalo de mínimo e máximo
    let _min = Math.ceil(min);
    let _max = Math.floor(max);

    // Com o console.log agora essa mensagem vai aparecer na aba Console do navegador
    // A do F12
    console.log("O mínimo é: " + _min + " e o máximo é: " + _max);

    return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}

// Intervalo
function intervalo(min, max) {
    let _min = Math.ceil(min);
    let _max = Math.floor(max);

    return _max - _min;
}

//Encontrar variância 
function variancia() {
    let _media = media(); // passo 1
    let _lista = listarEmExtenso(objetos);
    let _soma = 0;

    _lista.forEach((item) => {
        item = Math.pow(item - _media, 2); // passo 2 e 3
        _soma += item; // passo 4
    });

    return _soma / _lista.length; // passo 5
} // Referência: https://escolaeducacao.com.br/variancia/

function desvioPadrao() {
    return Math.sqrt(variancia());
} // Referência: https://escolaeducacao.com.br/variancia/

// #region Somas
function somarFreq() {
    if (objetos && objetos.length > 0)
        return objetos.reduce((a, b) => a + b.frequencia, 0);
    else
        return null;
} // Retorna o somatório das frequências do objeto;
function somarValor() {
    if (objetos && objetos.length > 0)
        return objetos.reduce((a, b) => a + b.valor, 0);
    else
        return null;
} // Retorna o somatório das frequências do objeto;
function somarMult() {
    if (objetos && objetos.length > 0)
        return objetos.reduce((a, b) => a + (b.frequencia * b.valor), 0);
    else
        return null;
} // Essa função retorna o somatório da multiplicação da frequência com o valor;
//#endregion