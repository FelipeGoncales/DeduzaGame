const form = document.querySelector('form');

const divInputs = document.getElementById('div-inputs');
const button = document.querySelector('button');
const pMensagem = document.getElementById('p-mensagem');
let numDiv = 0;

const divLetras = document.getElementById('div-letras');
const alfabeto = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 
    'z', 'x', 'c', 'v', 'b', 'n', 'm'
];

const trocarButton = document.getElementById('trocar-button');
trocarButton.addEventListener('click', function() {
    location.reload()
})
let listaPalavras = [
    "amigo", "salvo", "piano", "pasta", "carta",
    "peito", "salto", "carro", "menta", "banco",
    "poste", "sorte", "tigre", "peixe", "cesta",
    "festa", "bicho", "dólar", "grato", "tinta",
    "cinto", "brisa", "fruta", "torre", "troco",
    "linda", "junto", "dente", "salão", "verde",
    "trigo", "sabor", "pouco", "corte", "amplo",
    "jovem", "tempo", "vazio", "banda", "cacau",
    "cabra", "certa", "falar", "ninho", "mundo",
    "pente", "vinho", "norte", "clima", "fluir",
    "canal", "comer", "fazer", "sinal", "doido",
    "manga", "pinho", "leite", "firme", "pegar",
    "bolsa", "pacto", "calor", "jogar", "dizer",
    "morar", "novas", "lente", "trono", "parar",
    "grilo", "navio", "ficha", "vapor", "gente",
    "barco", "pensa", "limpo", "raiva", "calça",
    "ácido", "votar", "poema", "rumor", "rimar",
    "deixa", "notas", "macho", "pauta", "lavar",
    "cifra", "troca", "fosso", "carne", "morte",
    "seção", "fundo", "canto", "termo",
    "pedra", "largo", "linha", "solta", "beber",
    "corpo", "fraco", "nuvem", "secar", "velho",
    "haste", "dique", "porta", "tomar", "papel",
    "junta", "lutar", "manto", "chave", "forma",
    "roupa", "ferro", "marco", "couro", "lenda",
    "vento", "treze", "banho", "tenso", "justo",
    "metro", "medir", "vista", "local", "plano",
    "caixa", "conto", "venda", "casal", "santo",
    "mover", "terra", "levar", "frota", "matar",
    "galho", "feira", "tocar", "nunca", "grana",
    "corvo", "moral", "fumar", "perna", "civil",
    "botar", "folha", "claro", "conta", "laudo",
    "ruiva", "tênis", "pular", "calmo", "rubro",
    "burro", "magro", "virar", "laico", "torno",
    "farol", "girar", "bolso", "traje", "pilar",
    "pedal", "cisne", "lento", "faixa", "sarro",
    "lapso", "luzes", "causa", "fecho", "foice",
    "casco", "verbo", "pátio", "lousa", "misto",
    "etnia", "baixo", "vagal", "rente", "molho",
    "vigor", "tenda", "praia", "metal", "árido",
    "feroz", "tarde", "pleno", "lírio", "pluma",
    "peste", "ritmo", "perto", "morno", "multa",
    "salva", "morta", "limbo", "barro", "arcar",
    "turno", "golpe", "chuva", "rural", "mural",
    "malha", "clero", "vôlei", "litro", "dunas",
    "farto", "nadar", "mouro", "noite", "burla",
    "relva", "regar", "puxar", "notar", "tosco",
    "queda", "folga", "lebre", "punho", "jogos",
    "roubo", "macio", "dobro", "campo", "batom",
    "dança", "marca", "vapor", "saldo", "raiar",
    "feliz", "seiva", "nariz", "motor", "fatia",
    "cheio", "trava", "lança", "dobra", "viver",
    "trevo", "posta", "lunar", "selar", "rapaz",
    "lápis", "morto", "louco", "chato", "fenda",
    "vasto", "aluno", "pesca", "salto", "servo",
    "tecla", "outra", "saque", "mosca", "falar",
    "nobre", "sacro", "barra", "gordo", "fardo",
    "beijo", "coral", "lugar", "olhar", "sonho",
    "bravo", "honra", "sutil", "dores", "certo",
    "poder", "sonar", "calar", "fugir", "saber",
    "andar", "errar", "grito", "olhos", "massa",
    "prazo", "fauna", "flora", "samba", "vagar",
    "ideal", "sério", "vital", "fácil", "gosto",
    "amado", "pardo", "reino", "digno", "vulgo",
    "manso", "selva", "bruma", "trama", "épico",
    "ciclo", "ponto", "lazer", "valer", "valor",
    "torso", "etapa", "farta", "denso", "cansa",
    "senso", "pique", "exato", "ardor", "açude",
    "bazar", "beato", "ceder", "cetro", "gênio",
    "hábil", "ideia", "impor", "magia", "quero",
    "rádio", "saúde", "tapar", "único", "visar",
    "xampu", "zumbi", "amena", "anexo", "bater",
    "breve", "cozer", "curar", "deter", "expor",
    "ficar", "gozar", "haver", "laçar", "manos",
    "mimar", "ninar", "obter", "parvo", "quase",
    "rezar", "salmo", "tange", "umami", "zelar",
    "sexta", "abril", "maior", "menor", "ponta",
    "toque", "vídeo", "custo", "dúbio", "genro",
    "irmão", "régua", "extra"
  ];


let palavra = '';
let caracteresResposta = [];

document.addEventListener('DOMContentLoaded', function() {
    palavra = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    caracteresResposta = palavra.split('');

    const div = document.createElement('div');
    div.classList.add('div-pai-inputs')

    caracteresResposta.forEach((_, index) => {
        const input = document.createElement('input');
        input.maxLength = 1;

        input.addEventListener('input', function() {
            enterProximoInput(input, index, div);
        });

        input.addEventListener('keydown', function(event) {
            manipularKeys(event, input, index, div);
        });

        div.appendChild(input);
    });
    divInputs.appendChild(div);

    for (i = 0; i < 5; i++) {
        const div = document.createElement('div');

        caracteresResposta.forEach((_, index)  => {
            const input = document.createElement('input');
            input.disabled = true;
            input.maxLength = 1;

            input.addEventListener('input', function() {
                enterProximoInput(input, index, div);
            });

            input.addEventListener('keydown', function(event) {
                manipularKeys(event, input, index, div);
            });

            div.appendChild(input);
        });

        divInputs.appendChild(div);
    };

    alfabeto.forEach((letra) => {
        let p = document.createElement('p');
        p.textContent = letra;
        p.id = letra;
        divLetras.appendChild(p);
    });
});

form.addEventListener('submit', function(e) {
    e.preventDefault()

    let word = '';
    let preenchidos = true;

    const divsDivInput = Array.from(divInputs.children);
    const respostasUser = Array.from(divsDivInput[numDiv].children);

    for (let input of respostasUser) {
        if (!input.value.replace(' ', '')) {
            preenchidos = false;
            input.parentNode.classList.add('shake');
            setTimeout(() => {
                input.parentNode.classList.remove('shake');
            }, 500);
            break;
        };
    };
    
    if (preenchidos === false) {
        return;
    };

    divsDivInput.forEach((item) => {
        const div = Array.from(item.children);

        if (divsDivInput[numDiv] != div) {
            for (let input of div) {
                input.disabled = true;
            };
        };
    });

    const copiaResposta = [...caracteresResposta];
    var correto = false;
    var indexCaracterAcento = null;
    
    var listaA = ['à', 'á', 'â', 'ã']
    var listaO = ['ó', 'ô', 'ò'];
    var listaC = ['ç']
    var listaE = ['é', 'ê'];
    var listaI = ['í', 'ì'];
    var listaU = ['ú', 'ù'];

    respostasUser.forEach((input, index) => {
        correto = false;
        const value = (input.value).toLocaleLowerCase()

        function verificarCaracterEspecial(caracter, lista) {
            if (value === caracter && lista.includes(copiaResposta[index])) {
                correto = true;
                input.value = copiaResposta[index];
                copiaResposta[index] = caracter;
                indexCaracterAcento = index; 
            }; 
        }

        verificarCaracterEspecial('a', listaA);
        verificarCaracterEspecial('o', listaO);
        verificarCaracterEspecial('c', listaC);
        verificarCaracterEspecial('e', listaE);
        verificarCaracterEspecial('i', listaI);
        verificarCaracterEspecial('u', listaU);

        if (value === caracteresResposta[index] || correto === true) {
            input.classList.add('correto');
            copiaResposta[index] = null;
                        
            const letra = document.getElementById(value);
            if (letra.classList.contains('letra-quase')) {
                letra.classList.replace('letra-quase','letra-correta');
            };
            if (letra.classList.contains('letra-incorreta')) {
                letra.classList.replace('letra-incorreta', 'letra-correta');
            };
            letra.classList.add('letra-correta');
        };       
    });

    let copiaLista = [...caracteresResposta]

    respostasUser.forEach((input, index) => {
        const value = (input.value).toLowerCase();
        const letra = document.getElementById(value);

        if (value !== copiaLista[index]) {
            if (listaA.includes(caracteresResposta[index])) {
                copiaLista[index] = copiaLista[index].replace(/[ãàá]/g, 'a')
            }
            if (listaE.includes(caracteresResposta[index])) {
                copiaLista[index] = copiaLista[index].replace(/[éèê]/g, 'e')
            }
            if (listaC.includes(caracteresResposta[index])) {
                copiaLista[index] = copiaLista[index].replace(/[ç]/g, 'c')
            }
            if (listaO.includes(caracteresResposta[index])) {
                copiaLista[index] = copiaLista[index].replace(/[ôóò]/g, 'o')
            }
            if (listaI.includes(caracteresResposta[index])) {
                copiaLista[index] = copiaLista[index].replace(/[íì]/g, 'i')
            }
            if (listaU.includes(caracteresResposta[index])) {
                copiaLista[index] = copiaLista[index].replace(/[ùú]/g, 'u')
            }

            if (copiaLista.includes(value)) {
                input.classList.add('quase-correto');

                if (!letra.classList.contains('letra-correta')) {
                    letra.classList.add('letra-quase');
                };
                if (letra.classList.contains('letra-incorreta')) {
                    letra.classList.replace('letra-incorreta','letra-quase');
                };

                const indexRepetido = copiaLista.indexOf(value);
                if (indexRepetido >= 0) {
                    copiaLista[indexRepetido] = null;
                };
            } else {
                input.classList.add('incorreto');
                
                if (!letra.classList.contains('letra-correta') && !letra.classList.contains('letra-quase')) {
                    letra.classList.add('letra-incorreta');
                };
            };
        };

        input.disabled = true;

        if (correto && index === indexCaracterAcento) {
            word += caracteresResposta[index];
        } else {
            word += value;
        }
    });

    if (word === palavra) {
        pMensagem.textContent = 'Você acertou!';
        pMensagem.style.display = 'flex';
        return;
    } else if (numDiv === divInputs.children.length - 1) {
        pMensagem.innerHTML = `Resposta: "${palavra}"`;
        pMensagem.style.display = 'flex';
        return;
    } else if (numDiv < divInputs.children.length - 1) {
        numDiv++;

        const div = Array.from(divsDivInput[numDiv].children);

        div.forEach((input) => {
            input.disabled = false;
        });
        
        divsDivInput[numDiv].children[0].focus();
    };
});


// Funções adicionadas aos inputs

function enterProximoInput(input, index, div) {
    if (input.value !== '') {
        if (index < div.children.length-1) { 
            if (div.children[index + 1].value !== '') {
                let count = 0;
                for (i = index; i < div.children.length; i++) {
                    if (div.children[i].value !== '') {
                        count++;
                    };
                };
                div.children[count].focus();
            } else {
                div.children[index + 1].focus();
            };
        } else if (index === div.children.length - 1) {
            for (let i = 0; i < div.children.length; i++) {
                if (div.children[i].value === '') {
                    div.children[i].focus();
                    break;
                };
            };   
        };
    };
};

function manipularKeys(item, input, index, div) {
    if (!alfabeto.includes(item.key) && !['Enter', 'Backspace'].includes(item.key)) {
        item.preventDefault();
    };
    if (item.key === 'ArrowLeft' && index > 0) {
        div.children[index - 1].focus();
    };
    if (item.key === 'ArrowRight' && index < div.children.length - 1) {
        div.children[index + 1].focus();
    };
    if (item.key === 'Backspace') {
        if (input.value === '' && index > 0) {
            div.children[index - 1].focus()
        } else {
            input.value = '';
        };
    };
    if (item.key === ' ' && index < div.children.length) {
        div.children[index + 1].focus()
    };
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace') {
        if (document.activeElement.tagName != 'INPUT') {
            const divAtual = divInputs.children[numDiv];
            const ultimoInput = divAtual.children[divAtual.children.length-1];
            ultimoInput.focus();
        };
    };

    if (document.activeElement.tagName !== 'INPUT') {
        const divAtual = divInputs.children[numDiv];
        const ultimoInput = divAtual.children[0];
        ultimoInput.focus();
    };
});
