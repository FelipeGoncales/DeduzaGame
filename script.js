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
    'amigo', 'salvo', 'piano', 'pasta', 'carta',
    'peito', 'salto', 'carro', 'menta', 'banco',
    'poste', 'sorte', 'tigre', 'peixe', 'cesta',
    'festa', 'bicho', 'dólar', 'grato', 'tinta',
    'cinto', 'brisa', 'fruta', 'torre', 'troco',
    'linda', 'junto', 'dente', 'salão', 'verde',
    'trigo', 'sabor', 'pouco', 'corte', 'amplo',
    'jovem', 'tempo', 'vazio', 'banda', 'cacau',
    'cabra', 'certa', 'falar', 'ninho', 'mundo',
    'pente', 'vinho', 'norte', 'clima', 'fluir',
    'canal', 'comer', 'fazer', 'sinal', 'doido',
    'manga', 'pinho', 'leite', 'firme', 'pegar',
    'bolsa', 'pacto', 'calor', 'jogar', 'dizer',
    'morar', 'novas', 'lente', 'trono', 'parar',
    'grilo', 'navio', 'ficha', 'vapor', 'gente',
    'barco', 'pensa', 'limpo', 'raiva', 'calça',
    'ácido', 'votar', 'poema', 'rumor', 'rimar',
    'deixa', 'notas', 'macho', 'pauta', 'lavar',
    'cifra', 'troca', 'fosso', 'carne', 'morte', 
    'seção', 'bicho', 'fundo', 'canto', 'termo'
];

let palavra = '';
let caracteresResposta = [];

document.addEventListener('DOMContentLoaded', function() {
    palavra = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    caracteresResposta = palavra.split('');

    const div = document.createElement('div');

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

        p.addEventListener('mousedown', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const divAtual = divInputs.children[numDiv];
            let input = '';

            if (document.activeElement.tagName !== 'INPUT') {
                input = divAtual.children[0];
            } else if (document.activeElement.tagName === 'INPUT') {
                input = document.activeElement;
            }
            
            input.focus();
            input.value = p.textContent;

            const divLista = Array.from(div.children);
            const index = divLista.indexOf(input);

            enterProximoInput(input, index, divAtual);
        });
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
            break;
        }
    }
    
    if (preenchidos === false) {
        return;
    }

    divsDivInput.forEach((item) => {
        const div = Array.from(item.children);

        if (divsDivInput[numDiv] != div) {
            for (let input of div) {
                input.disabled = true;
            }
        }
    })

    const copiaResposta = [...caracteresResposta];

    respostasUser.forEach((input, index) => {
        const value = (input.value).toLocaleLowerCase()

        if (value === copiaResposta[index]) {
            input.classList.add('correto');
            copiaResposta[index] = null;
                        
            const letra = document.getElementById(value);
            if (letra.classList.contains('letra-quase')) {
                letra.classList.replace('letra-quase','letra-correta');
            }
            if (letra.classList.contains('letra-incorreta')) {
                letra.classList.replace('letra-incorreta', 'letra-correta');
            }
            letra.classList.add('letra-correta');
        }        
    });

    respostasUser.forEach((input, index) => {
        const value = (input.value).toLocaleLowerCase();
        const letra = document.getElementById(value);

        if (value !== caracteresResposta[index]) {
            if (copiaResposta.includes(value)) {
                input.classList.add('quase-correto');

                if (!letra.classList.contains('letra-correta')) {
                    letra.classList.add('letra-quase');
                }
                if (letra.classList.contains('letra-incorreta')) {
                    letra.classList.replace('letra-incorreta','letra-quase');
                }

                const indexRepetido = copiaResposta.indexOf(value);
                if (indexRepetido >= 0) {
                    copiaResposta[indexRepetido] = null;
                }
            } else {
                input.classList.add('incorreto');
                
                if (!letra.classList.contains('letra-correta') && !letra.classList.contains('letra-quase')) {
                    letra.classList.add('letra-incorreta');
                }
            }
        }

        input.disabled = true;

        word += value;
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

        const div = Array.from(divsDivInput[numDiv].children)

        div.forEach((input) => {
            input.disabled = false;
        })
        
        divsDivInput[numDiv].children[0].focus();
    }
})


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
    }
    if (item.key === 'ArrowLeft' && index > 0) {
        div.children[index - 1].focus();
    } 
    if (item.key === 'ArrowRight' && index < div.children.length - 1) {
        div.children[index + 1].focus();
    }
    if (item.key === 'Backspace') {
        if (input.value === '' && index > 0) {
            div.children[index - 1].focus()
        } else {
            input.value = '';
        }
    }
    if (item.key === ' ' && index < div.children.length) {
        div.children[index + 1].focus()
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace') {
        if (document.activeElement.tagName != 'INPUT') {
            const divAtual = divInputs.children[numDiv];
            const ultimoInput = divAtual.children[divAtual.children.length-1];
            ultimoInput.focus();
        }
    }

    if (document.activeElement.tagName !== 'INPUT') {
        const divAtual = divInputs.children[numDiv];
        const ultimoInput = divAtual.children[0];
        ultimoInput.focus();
    }
})

const deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', function() {
    const divAtual = divInputs.children[numDiv];
    let input = document.activeElement;

    if (document.activeElement.tagName !== 'INPUT') {
        input = divAtual.children[0];
    }

    const backspaceEvent = new KeyboardEvent('keydown', {key: 'Backspace'});

    const index = Array.from(divAtual.children).indexOf(input);

    manipularKeys(backspaceEvent, input, index, divAtual);
});
