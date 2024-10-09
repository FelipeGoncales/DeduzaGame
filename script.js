const divInputs = document.getElementById('div-inputs');
const button = document.querySelector('button');
const form = document.querySelector('form');
const pMensagem = document.getElementById('p-mensagem');
let numDiv = 0;

let listaPalavras = [
    'amigo'
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
});


form.addEventListener('submit', function(e) {
    e.preventDefault()

    let word = '';
    let preenchidos = true;

    const divsDivInput = Array.from(divInputs.children);
    const respostasUser = Array.from(divsDivInput[numDiv].children);

    for (let input of respostasUser) {
        if (!input.value) {
            preenchidos = false;
            break;
        }
    }
    
    if (!preenchidos) {
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

    respostasUser.forEach((input, index) => {
        if (input.value === caracteresResposta[index]) {
            input.style.backgroundColor = 'var(--cor-right)';
        } else if (caracteresResposta.includes(input.value) && input.value !== caracteresResposta[index]) {
            input.style.backgroundColor = 'var(--cor-quase)';
        } else {
            input.style.backgroundColor = 'var(--cor-ter)';
        }
        
        input.style.border = 'none';
        input.style.opacity = '1';
        input.style.color = 'white';
        input.disabled = true;

        word += input.value;
    });

    if (word === palavra) {
        pMensagem.textContent = 'Você acertou!'
        return;
    } else if (numDiv === divInputs.children.length - 1) {
        pMensagem.innerHTML = `Você perdeu!<br>Resposta: "${palavra}"`
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