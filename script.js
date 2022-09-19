const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = ['sigh','tense','airplane','ball','pies','juice','warlike','bad','north','dependent','steer','silver','highfalutin','superfacial','quince','eight','feeble','admit','drag','loving'];

let randomWord;
let score = 0;
let time = 10;
let difficulty = getdifficulty() !== null ? getdifficulty() : setdifficulty('easy');
difficultySelect.value = difficulty;
const timeInterval = setInterval(updateTime,1000);

function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM(){
    randomWord = getRandomWord();
    word.textContent = randomWord;
}

function updateScore(){
    scoree++;
    scoreEl.textContent = score;
}

function updateTime(){
    time--;
    timeEl.textContent = time + 's';
    if(time == 0){
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time's ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.classList.remove('none');
    console.log('Ooops, Time ran out');
}

function getdifficulty(){
    return localStorage.getItem('difficulty');
}

function setdifficulty(difficult){
    localStorage.setItem('difficulty',difficult);
}

text.focus();

addWordToDOM();

text.addEventListener('input',(e) => {
    let value = e.target.value;
    if(value == randomWord){
        text.value = '';
        addWordToDOM();
        updateScore();
        if(difficulty == 'hard'){
            time += 2;
        } else if (difficulty == 'medium'){
            time += 3;
        } else {
            time += 5;
        }
        updateTime();
    }
});

settingsBtn.addEventListener('click',(e) => {
    settings.classList.toggle('hide');
});

difficultySelect.addEventListener('change',function(e){
    difficulty = difficultySelect.value;
    setdifficulty(difficulty);
});

// const numbers = [1,2,3];
// numbers[10] = 11;
// console.log(numbers);