var contador = 0;
var objetos = [];

function gbi(id) {
    return document.getElementById(id);
}

function addDiv() {
    contador += 1;
    
    let html ="";
    let _index = contador.toString();

    html += "<div id='divObj_" + _index + "'>";
    html += "<div>";
    html += "<label style='margin-right:10px;'>" + _index + "</label>";
    html += "<label for='frequencia_" + _index + "' style='margin-right:5px;'>Frequência</label>";
    html += "<input type='number' id='frequencia_" + _index + "' style='margin-right:5px;' />";
    html += "<label for='valor_" + _index + "' style='margin-right:5px;'>Valor</label>";
    html += "<input type='number' id='valor_" + _index + "' style='margin-right:5px;' />";
    html += "<button id='btnExcluir_' title='Excluir cadastro' onclick='deleteDiv(" + _index + ")'>X</button>";
    html += "</div>";
    html += "<br>";
    html += "</div>";

    gbi("divObjetos").insertAdjacentHTML( 'beforeend', html );   
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

        let _obj = {frequencia: _frq, valor: _val};
        
        objetos.push(_obj);
    };

    showCalcs();
} // Salva os valores informados em tela;

function validarObj() {
    return (objetos.length > 0);
} // Valida a listagem de objetos para que os cálculos possam ser feitos corretamente;

function showCalcs() {
    let html = "";

    let _media = media();
    let _percentil = percentil();
    let _mediana = mediana();
    let _moda = moda();

    if (_media && _percentil && _mediana && _moda) {
        html += "<p>Média: " + _media + "</p>";
        html += "<p>Percentils: " + _percentil + "</p>";
        html += "<p>Mediana: " + _mediana + "</p>";
        html += "<p>Moda: " + _moda + "</p>";
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

    return _soma.toFixed(6).replace(".", ",");
} // Calcula a média da listagem de objetos;
function mediana() {
    if (!validarObj()) {
        alert("Não há cadastros para efetuar o cálculo.");
        return;
    }
    
    let _somaFrq = 0;
    
    objetos.forEach((item) => { _somaFrq += Number(item.frequencia); });

    if ((_somaFrq % 2) == 0) // par
        return "A quantidade de elementos no conjunto resulta em um número par.";
    else { // ímpar
        _somaFrq = Math.floor(_somaFrq / 2);

        for (let index = 0; index < objetos.length; index++) {
            const item = objetos[index];

            _somaFrq -= Number(item.frequencia);

            if (_somaFrq <= 0) {
                _somaFrq = item.valor;
                break;
            }           
        }

        return _somaFrq;
    }
} // Calcula a mediana da listagem de objetos;
function percentil() {
    let _lista = [];

    objetos.forEach((item) => {
        for (let index = 0; index < item.frequencia; index++) {
            _lista.push(item.valor);            
        }
    });

    let _soma = 0;

    _lista.forEach((item) => { _soma += Number(item)});

    let perc0 = _lista[0];
    let perc100 = _lista[_lista.length-1];
    let perc50 = "";

    _soma = Math.floor(_soma / 2);

    for (let index = 0; index < _lista.length; index++) {
        const element = Number(_lista[index]);
        
        _soma -= element;

        if (_soma <= 0) {
            perc50 = _lista[index];
            break;
        }
    }

    return "0%: " + perc0.toString() + " - 50%: " + perc50.toString() + " - 100%: " + perc100.toString();
} // Calcula o percentil em 0, 50 e 100;
function moda() {
    if (!validarObj()) {
        alert("Não há cadastros para efetuar o cálculo.");
        return;
    }

    let _maiorFrq = 0;

    objetos.forEach((item) => {
        if (_maiorFrq < Number(item.frequencia))
            _maiorFrq = Number(item.frequencia);
    });

    return _maiorFrq.toString();
} // Calcula a moda (valor com maior frequência em que ocorre) da listagem de objetos2
;