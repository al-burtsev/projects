let fieldDefaultVal;
let items = [];
let matchCounter = 0;

const inputValidate = (value) => {

    if ((parseInt(value) % 2 === 0) && (parseInt(value) <= 10)) {
        fieldDefaultVal = parseInt(value);
    } else {
        fieldDefaultVal = 4;
    }

    return fieldDefaultVal
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

    gameTitle.textContent = 'Welcome to "The Memory" game!'
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

    initGameField.id = 'gameField';
    initGameField.placeholder = '2, 4, 6, 8 or 10';

    startBtn.textContent = "Start";
    startBtn.id = 'start';
    startBtn.type = 'submit';
    startBtn.classList.add('btn', 'btn-start');

    lvls.append(lvl1,lvl2, lvl3, lvl4, lvl5);
    gameWrapperLeft.append(gameTitle, gameDescr, lvlDescr, lvls);
    gameWrapperRight.append(startDescr, initGameField, startBtn);
    gameWrapper.append(gameWrapperLeft, gameWrapperRight);
    container.append(gameWrapper);
};

const arrGen = (gameField = 4) => {

    for (i = 1; i <= (gameField ** 2) / 2; i++) {
        items.push(i, i);
    }
};

const arrShuffle = (arr) => {
    let i = arr.length;
    while (--i > 0) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
    }
    return arr;
}

const initialField = () => {

    const field = document.createElement('ul');

    field.classList.add('list');

    for (i = 0; i < items.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = items[i];
        listItem.classList.add('list-item');
        field.append(listItem);
    }

    document.querySelector('.container').append(field);
}

const createResetBtn = () => {
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
    document.querySelector('.container').append(winDisplay);
    setTimeout(() => {
        document.querySelector('.container').append(resetBtn);
        resetGame()
    }, 1500)
}

const newGame = () => {
    
    arrGen(inputValidate(document.getElementById('gameField').value));
    arrShuffle(items);
    initialField();

    document.getElementById('start').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'none';

    console.log(document.getElementById('gameField').value);

    console.log(gameField.value)

    let listItems = document.querySelectorAll('.list-item'),
        card = null,
        otherCard = null;

    listItems.forEach((listItem) => {

        listItem.addEventListener('click', (e) => {

            if (card !== null && otherCard !== null) {
                if (card.textContent !== otherCard.textContent) {
                    card.classList.remove('open');
                    otherCard.classList.remove('open');
                    card = null;
                    otherCard = null;
                }
            }

            if (!listItem.classList.contains('open')) {
                e.currentTarget.classList.add('open');
            }


            if (card === null) {
                card = e.currentTarget;
            } else {
                if (otherCard === null && card !== e.currentTarget) {
                    otherCard = e.currentTarget;
                }
            }

            if (card !== null && otherCard !== null) {
                if (card.textContent === otherCard.textContent && (!card.classList.contains('success') && !otherCard.classList.contains('success'))) {
                    card.classList.add('success');
                    otherCard.classList.add('success');
                    matchCounter += 1;
                    card = null;
                    otherCard = null;

                } else if (card.textContent === otherCard.textContent) {
                    card.classList.add('success');
                    otherCard.classList.add('success');
                    card = null;
                    otherCard = null;
                }
            }

            if ((matchCounter === (parseInt(gameField.value) ** 2) / 2) || (matchCounter === ((fieldDefaultVal ** 2) / 2))) {
                createResetBtn();
            }
        });

        // console.log(matchCounter)
        // console.log(listItems)
        // console.log(gameField)
        // console.log(gameField.value)
    });
};

const resetGame = () => {
    document.getElementById('resetBtn').addEventListener('click', () => {
        document.querySelector('.win-block').remove();
        document.querySelector('.list').remove();
        document.getElementById('resetBtn').remove();
        items = [];
        matchCounter = 0;
        gameField.value = '';
        document.getElementById('start').style.display = 'block';
        document.querySelector('.wrapper').style.display = 'flex';

    });
}

document.addEventListener('DOMContentLoaded', () => {

    initialGame(document.querySelector('.container'));

    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        newGame()
    });
});