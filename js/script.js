let index = 0;
let tags = '';
let character = [
    '../img/bobrossparrot.gif',
    '../img/explodyparrot.gif',
    '../img/fiestaparrot.gif',
    '../img/metalparrot.gif',
    '../img/revertitparrot.gif',
    '../img/tripletsparrot.gif',
    '../img/unicornparrot.gif'
];
let firstCard = null;
let secondCard = null;
let clicks = 0;
let matches = 0;

function getDate() {
    let qntCards = parseInt(prompt("Quantas cartas deseja jogar?"));
    while (isNaN(qntCards) || qntCards % 2 !== 0 || qntCards < 4 || qntCards > 14) {
        qntCards = parseInt(prompt("Por favor, digite um número par entre 4 e 14:"));
    }
    return qntCards;
}

const qntCards = getDate();
const duplicateCharacter = [...character.slice(0, qntCards / 2), ...character.slice(0, qntCards / 2)];

function embaralhar() {
    return Math.random() - 0.5;
}

duplicateCharacter.sort(embaralhar);

function createCard() {
    tags = `
        <div class="card" onclick="clickCard(this)">
            <div class="front-face face">
                <img src="img/back.png">
            </div>
            <div class="back-face face">
                <img src="img/${duplicateCharacter[index]}">
            </div>
        </div>
    `;
    return tags;
}

function clickCard(element) {
    if (firstCard && secondCard) return;
    element.classList.add('click');
    clicks++;

    if (!firstCard) {
        firstCard = element;
    } else if (firstCard && !secondCard) {
        secondCard = element;
        setTimeout(checkMatch, 0.5); // Adiciona um atraso de 1 segundo
    }
}

function checkMatch() {
    const firstImg = firstCard.querySelector('.back-face img').src;
    const secondImg = secondCard.querySelector('.back-face img').src;

    if (firstImg === secondImg) {
        matches++;
        resetCards();
        if (matches === qntCards / 2) {
            setTimeout(() => {
                alert(`Parabéns! Você ganhou com ${clicks} cliques.`);
            }, 500); // Adiciona um pequeno atraso antes de exibir a mensagem de vitória
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('click');
            secondCard.classList.remove('click');
            resetCards();
        }, 1000); // Adiciona um atraso de 1 segundo antes de virar as cartas de volta
    }
}

function resetCards() {
    [firstCard, secondCard] = [null, null];
}

function loadGame() {
    const play = document.querySelector('.play');

    while (index < duplicateCharacter.length) {
        createCard();
        play.innerHTML += tags;
        index++;
    }
}

loadGame();
