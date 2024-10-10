const form = document.querySelector('form');

const divInputs = document.getElementById('div-inputs');
const button = document.querySelector('button');
const pMensagem = document.getElementById('p-mensagem');
let numDiv = 0;

const divLetras = document.getElementById('div-letras');
const alfabeto = [
    'a', 'b', 'c', 'd', 'e', 'f', 
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
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

        p.addEventListener('click', function() {
            const input = document.activeElement;
            input.value = p.textContent
        })
    }
    )
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
            window.requestAnimationFrame(() => input.classList.add('correto')); // Forçar repaint
            copiaResposta[index] = null; // Marca a letra correta
            
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

    // Segunda passagem para verificar letras quase corretas
    respostasUser.forEach((input, index) => {
        const value = (input.value).toLocaleLowerCase()
        const letra = document.getElementById(value);

        if (value !== caracteresResposta[index]) { // Verifica apenas se não é a letra corretaSSS
            if (copiaResposta.includes(value)) {
                input.classList.add('quase-correto')

                if (!letra.classList.contains('letra-correta')) {
                    letra.classList.add('letra-quase')
                }
                if (letra.classList.contains('letra-incorreta')) {
                    letra.classList.replace('letra-incorreta','letra-quase');
                }

                const indexRepetido = copiaResposta.indexOf(value);
                if (indexRepetido >= 0) {
                    copiaResposta[indexRepetido] = null; // Marca a letra quase correta
                }
            } else {
                input.style.backgroundColor = 'var(--cor-ter)'; // Marca a letra incorreta
                
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
        pMensagem.style.display = 'block';
        return;
    } else if (numDiv === divInputs.children.length - 1) {
        pMensagem.innerHTML = `Resposta: "${palavra}"`;
        pMensagem.style.display = 'block';
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
        for (i = 0; i < caracteresResposta.length; i++) {
            if (div.children[i].value === '') {
                div.children[i].focus();
                break;
            }
        }
    }

    if (input.value.length === 1 && index < caracteresResposta.length - 1 && input.value !== '') {
        div.children[index + 1].focus();
    } 
};

function manipularKeys(item, input, index, div) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(item.key)) {
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
};