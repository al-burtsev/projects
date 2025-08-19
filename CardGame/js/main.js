const defaultFieldSize = 4;
let items = [];
let matchCounter = 0;
let card = null;
let otherCard = null;

const getGameFieldSize = (elem) => {
  const elemVal = (parseInt(elem.value, 10));
  if (elemVal === 0) {
    return defaultFieldSize
  }
  if (elemVal % 2 === 0 && elemVal <= 10) {
    return elemVal;
  }
  return defaultFieldSize
}

const initialGame = (container) => {
  const gameWrapper = document.createElement('div');
  const gameTitle = document.createElement('h1');
  const gameDescr = document.createElement('p');
  const lvlDescr = document.createElement('p');
  const lvls = document.createElement('ul');
  const lvl1 = document.createElement('li');
  const lvl2 = document.createElement('li');
  const lvl3 = document.createElement('li');
  const lvl4 = document.createElement('li');
  const lvl5 = document.createElement('li');
  const gameWrapperLeft = document.createElement('div');
  const gameWrapperRight = document.createElement('form');
  const startDescr = document.createElement('label');
  const initGameField = document.createElement('input');
  const startBtn = document.createElement('button');

  gameTitle.textContent = 'Welcome to "The\u00A0Memory" game!'
  gameDescr.textContent = 'You should find pairs of cards on the plaing field. Try yourself!';
  lvlDescr.textContent = 'Choose 1 of 5 levels:';
  lvl1.textContent = 'Easiest — field size 2x2';
  lvl2.textContent = 'Easy — field size 4x4';
  lvl3.textContent = 'Medium — field size 6x6';
  lvl4.textContent = 'Hard — field size 8x8';
  lvl5.textContent = 'Expert — field size 10x10';
  startDescr.textContent = 'Enter the size of the playing field:'

  gameWrapper.classList.add('wrapper', 'flex');
  gameWrapperLeft.classList.add('wrapper-left');
  gameWrapperRight.classList.add('wrapper-right', 'flex-column');

  initGameField.id = 'gameFieldSize';
  initGameField.placeholder = '2, 4, 6, 8 or 10';

  startBtn.textContent = "Start";
  startBtn.id = 'start';
  startBtn.type = 'submit';
  startBtn.classList.add('btn', 'btn-start');

  lvls.append(lvl1, lvl2, lvl3, lvl4, lvl5);
  gameWrapperLeft.append(gameTitle, gameDescr, lvlDescr, lvls);
  gameWrapperRight.append(startDescr, initGameField, startBtn);
  gameWrapper.append(gameWrapperLeft, gameWrapperRight);
  container.append(gameWrapper);
};

const arrGen = (gameField = 4) => {
  for (let i = 1; i <= (gameField ** 2) / 2; i++) {
    items.push(i, i);
  }
};

const arrShuffle = (arr) => {
  let i = arr.length;
  while (--i > 0) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
  }

  return arr;
}

const initialField = (container) => {
  const field = document.createElement('ul');

  field.classList.add('list');

  for (let i = 0; i < items.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = items[i];
    listItem.classList.add('list-item');
    field.append(listItem);
  }

  container.append(field);
}

const resetGame = (elems) => {
  const { container, resetBtn, winDisplay, wrapperEl, startBtnEl } = elems;
  const cardsWrapEl = document.querySelector('.list');
  const startForm = container.querySelector('form');

  resetBtn.addEventListener('click', () => {
    winDisplay.remove();
    cardsWrapEl.remove();
    resetBtn.remove();
    items = [];
    matchCounter = 0;
    startForm.reset();
    startBtnEl.classList.toggle('hidden');
    wrapperEl.classList.toggle('hidden');
  });
}

const createResetBtn = (elems) => {
  const { container, wrapperEl, startBtnEl } = elems;
  const resetBtn = document.createElement('button');
  const winDisplay = document.createElement('div');
  const winText = document.createElement('p');

  resetBtn.id = 'resetBtn';
  resetBtn.textContent = 'Play again?';
  resetBtn.classList.add('btn', 'btn-start', 'bottom');
  winDisplay.classList.add('win-block');
  winDisplay.classList.add('win-text');
  winText.textContent = 'You win!';

  winDisplay.append(winText);
  container.append(winDisplay);

  setTimeout(() => {
    container.append(resetBtn);
    resetGame({ container, resetBtn, winDisplay, wrapperEl, startBtnEl })
  }, 1000)
}

const toggleCard = (currentCard) => {
  if (!currentCard.classList.contains('open')) {
    currentCard.classList.add('open');
  }
}

const setCards = (currentCard) => {
  if (card === null) {
    card = currentCard;
  }
  if (otherCard === null && card !== currentCard) {
    otherCard = currentCard;
  }
}

const resetCards = () => {
  if (card && otherCard) {
    card.classList.remove('open');
    otherCard.classList.remove('open');
    card = null;
    otherCard = null;
  }
  card = null;
  otherCard = null;
}

const handleMatch = () => {
  if (!card.classList.contains('success') && !otherCard.classList.contains('success')) {
    card.classList.add('success');
    otherCard.classList.add('success');
    matchCounter += 1;
  }
  card = null;
  otherCard = null;
}

const checkGameEnd = (currentFieldSize) => (matchCounter === (currentFieldSize ** 2) / 2);

const stopGame = (params) => {
  createResetBtn(params);
}

const newGame = (container) => {
  const fieldSizeEl = container.querySelector('#gameFieldSize');
  const startBtnEl = container.querySelector('#start');
  const wrapperEl = container.querySelector('.wrapper');
  const currentFieldSize = getGameFieldSize(fieldSizeEl);

  arrGen(currentFieldSize);
  arrShuffle(items);

  initialField(container);

  startBtnEl.classList.toggle('hidden');
  wrapperEl.classList.toggle('hidden');

  const listItems = container.querySelectorAll('.list-item');
  listItems.forEach((listItem) => {
    listItem.addEventListener('click', (e) => {
      if (e.currentTarget.classList.contains('success')) {
        return;
      }

      toggleCard(e.currentTarget);
      setCards(e.currentTarget);

      if (card && otherCard) {
        if (card.textContent === otherCard.textContent) {
          handleMatch();

          if (checkGameEnd(currentFieldSize)) {
            stopGame({ container, wrapperEl, startBtnEl, fieldSizeEl });
          }
        }
        
        setTimeout(() => {
          resetCards();
        }, 300);
      }
    });
  });
};


document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  initialGame(container);

  const startForm = container.querySelector('form');
  startForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newGame(container);
  });
});
