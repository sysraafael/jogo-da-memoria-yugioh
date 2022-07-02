// Função para mutar a música tema.
function mute() {
  music.muted = true;
  BTN_MUTE.style.display = 'block';
  BTN_UP.style.display = 'none';
}
// Função para remover o mute da música.
function up() {
  music.muted = false;
  BTN_MUTE.style.display = 'none';
  BTN_UP.style.display = 'block';
}

/* Música Tema */
let music = document.getElementById("musicTheme");

// Tocar a música ao interagir com o corpo do site.
document.body.addEventListener("mousemove", function () {
  music.play();
});

const player = localStorage.getItem("player");
console.log(player);

const nickname = document.querySelector('.nickname');

nickname.innerHTML = player;

const grid = document.querySelector('.grid');

const characters = [
  'slifer',
  'axeraider',
  'dragaora',
  'kuriboh',
  'magonegro',
  'maganegra',
  'poli',
  'whitedragon',
  'obelisk',
  'retorn',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    alert('Parabéns, você conseguiu!');
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }  
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [ ...characters, ...characters ];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

loadGame();
