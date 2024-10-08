const divInputs = document.getElementById('div-inputs');
const button = document.querySelector('button')
const form = button.parentNode

let listaPalavras = ['felipe', 'lindo', 'eloah', 'perfeita'];

let caracteresResposta = [];

document.addEventListener('DOMContentLoaded', function() {
    let palavra = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    caracteresResposta = palavra.split('');

    caracteresResposta.forEach((_, index) => {
        const input = document.createElement('input');
        input.maxLength = 1;

        input.addEventListener('input', function() {
            if (input.value.length === 1 && index < caracteresResposta.length - 1 && input.value !== '') {
                divInputs.children[index + 1].focus();
            } 
        });

        input.addEventListener('keydown', function(item) {
            if (item.key === 'ArrowLeft' || item.key === 'ArrowRight' || item.key === 'ArrowDown' || item.key === 'ArrowUp') {
                item.preventDefault();
            }

            if (item.key === 'ArrowLeft' && index > 0) {
                divInputs.children[index - 1].focus();
            } 
            if (item.key === 'ArrowRight' && index < divInputs.children.length - 1) {
                divInputs.children[index + 1].focus();
            }

            if (item.key === 'Backspace' && input.value === '' && index > 0) {
                divInputs.children[index - 1].focus();
            }

            if (input.value !== '') {
                for (i = 0; i < caracteresResposta.length; i++) {
                    if (divInputs.children[i].value === '') {
                        divInputs.children[i].focus();
                        break;
                    }
                }
            }
        });

        divInputs.appendChild(input);
    });
});


form.addEventListener('submit', function(e) {
    e.preventDefault()

    let word = '';

    const respostasUser = Array.from(divInputs.children)

    respostasUser.forEach((input, index) => {
        if (input.value === caracteresResposta[index]) {
            input.style.backgroundColor = 'green';
            input.disabled = true;
        }
        word += input.value;
    })

    console.log(caracteresResposta)

    alert(caracteresResposta)
})
