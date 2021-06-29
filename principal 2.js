var contador = 0;
var objetos = [];
var listaExtensa = [];

function gbi(id) {
    return document.getElementById(id);
}

function addDiv() {
    contador += 1;

    let html = "";
    let _index = contador.toString();

    html += "<div id='divObj_" + _index + "'>";
    html += "<div>";
    html += "<label style='margin-right:10px;'>" + _index + "</label>";
    html += "<label for='frequencia_" + _index + "' style='margin-right:5px;'>Frequência</label>";
    html += "<input type='number' id='frequencia_" + _index + "' style='margin-right:5px;' value='" + getRandomIntInclusive(1, 10) + "' />";
    html += "<label for='valor_" + _index + "' style='margin-right:5px;'>Valor</label>";
    html += "<input type='number' id='valor_" + _index + "' style='margin-right:5px;' value='" + getRandomIntInclusive(1, 10) + "' />";
    html += "<button id='btnExcluir_' title='Excluir cadastro' onclick='deleteDiv(" + _index + ")'>X</button>";
    html += "</div>";
    html += "<br>";
    html += "</div>";

    gbi("divObjetos").insertAdjacentHTML('beforeend', html);
} // Adiciona um elemento dinamicamente na tela;

function deleteDiv(index) {
    if (confirm("Excluir cadastro?")) {
        let elem = document.querySelector("#divObj_" + index);
        elem.parentNode.removeChild(elem);

        contador -= 1;
    }
} // Deleta um elemento da tela pelo índice;

function saveObjs() {
    if (!contador) {
        alert("Não há cadastros para fazer os cálculos.");
        return;
    }

    objetos = [];

    for (index = 0; index < contador; index++) {
        if (gbi("divObj_" + (index + 1).toString())) {

            let _frq = gbi("divObj_" + (index + 1).toString()).firstChild.children[2].value;
            let _val = gbi("divObj_" + (index + 1).toString()).firstChild.children[4].value;

            if (!_frq) {
                alert("A frequência do índice " + (index + 1).toString() + " não foi informada.")
                return;
            }

            if (!_val) {
                alert("O valor do índice " + (index + 1).toString() + " não foi informado.")
                return;
            }

            let _obj = { frequencia: _frq, valor: _val };

            objetos.push(_obj);
        }
    };

    showCalcs();
} // Salva os valores informados em tela;

function validarObj() {
    return (objetos.length > 0);
} // Valida a listagem de objetos para que os cálculos possam ser feitos corretamente;

function showCalcs() {
    let html = "";

    let _media = media().toFixed(6).replace(".", ",");
    let _percentil = percentil();
    let _mediana = mediana();
    let _moda = moda();
    let _intervalo = intervalo(perc0(), perc100()).toString().replace(".", ",");
    let _variancia = variancia().toFixed(6).replace(".", ",");
    let _desvio = desvioPadrao().toFixed(6).replace(".", ",");

    if (_media && _percentil && _mediana && _moda) {
        html += "<p>Média: " + _media + "</p>";
        html += "<p>Percentils: " + _percentil + "</p>";
        html += "<p>Mediana: " + _mediana.toString() + "</p>";
        html += "<p>Moda: " + _moda.toString() + "</p>";
        html += "<p>Intervalo: " + _intervalo + "</p>";
        html += "<p>Variância: " + _variancia + "</p>";
        html += "<p>Desvio do padrão: " + _desvio + "</p>";
    }

    gbi("divRetornos").innerHTML = html;
}

function media() {
    if (!validarObj()) {
        alert("Não há cadastros para efetuar o cálculo.");
        return;
    }

    let _soma = 0;
    let _elms = 0;
    objetos.forEach((item) => {
        _soma += (item.frequencia * item.valor);
        _elms += Number(item.frequencia);
    });

    _soma = _soma / _elms;

    return _soma;
} // Calcula a média da listagem de objetos;

function listarEmExtenso(lista) {
    let _lista = [];

    lista.forEach((item) => {
        for (let index = 0; index < item.frequencia; index++) {
            const element = Number(item.valor);
            _lista.push(element);
        }
    });

    return _lista;
} // retorna a lista por extenso;

function mediana() {
    listaExtensa = [];

    if (!validarObj()) {
        alert("Não há cadastros para efetuar o cálculo.");
        return;
    }

    listaExtensa = listarEmExtenso(objetos);

    if ((listaExtensa.length % 2) == 0) { // par
        let _elem1 = Number(listaExtensa[Math.floor(listaExtensa.length / 2) - 1]);
        let _elem2 = Number(listaExtensa[Math.floor(listaExtensa.length / 2)]);
        return (_elem1 + _elem2) / 2;
    } else { // ímpar
        let _elem = Number(listaExtensa[Math.floor(listaExtensa.length / 2)]);
        return _elem;
    }
} // Calcula a mediana da listagem de objetos;

//#region Percentil
function percentil() {
    listaExtensa = [];

    if (!validarObj()) {
        alert("Não há cadastros para efetuar o cálculo.");
        return;
    }

    listaExtensa = listarEmExtenso(objetos);

    let _perc0 = perc0();
    let _perc50 = perc50();
    let _perc100 = perc100();

    return "0%: " + _perc0.toString() + " - 50%: " + _perc50.toString() + " - 100%: " + _perc100.toString();
} // Calcula o percentil em 0, 50 e 100;
function perc0() {
    let min = listaExtensa.sort((a, b) => a - b)[0];
    return min;
}

function perc50() {
    let retorno = 0;
    let _soma = 0;

    listaExtensa.forEach((item) => { _soma += Number(item) });

    _soma = Math.floor(_soma / 2);

    for (let index = 0; index < listaExtensa.length; index++) {
        const element = Number(listaExtensa[index]);

        _soma -= element;

        if (_soma <= 0) {
            retorno = listaExtensa[index];
            break;
        }
    }

    return retorno;
}

function perc100() {
    let max = listaExtensa.sort((a, b) => b - a)[0];
    return max;
}
//#endregion

function moda() {
    if (!validarObj()) {
        alert("Não há cadastros para efetuar o cálculo.");
        return;
    }

    let _lista = listarEmExtenso(objetos);
    let _somaFreq = [];

    _lista.forEach((item) => {
        if (_somaFreq.some(x => x.valor == item)) { // Edição
            _somaFreq.find(x => x.valor == item).frequencia++;
        } else { // Cadastro
            let _obj = { frequencia: 1, valor: item };
            _somaFreq.push(_obj);
        }
    });

    let _maiorFrq = 0;

    _somaFreq.forEach((item) => {
        if (_maiorFrq < item.frequencia)
            _maiorFrq = Number(item.valor);
    });

    return _maiorFrq;
} // Calcula a moda (valor com maior frequência em que ocorre) da listagem de objetos2
