const letterContainer = document.getElementById('letter-container');
const hidden = document.querySelectorAll('.hidden');
const wrongLetters = document.getElementById('wrong-letters');
const popUp = document.getElementById('popUp-container');
const finalMessage = document.getElementById('final-message');
const notify = document.getElementById('notification-container');
const playBtn = document.getElementById('playAgain');

const words = ['articulate', 'premium', 'feedback', 'icon','valley','domain','studio','warranty','slice','descendant','goblin',
'conspiracy','abyss','avenue','abruptly','jazzy','mystify','rhythm','vixen','syndrome','vortex','woozy','zilch','miniature',
'transcript','topaz','thumbscrew','quorum','scandium','illusion','slumber','cryptic','nymph','nectar','offensive','platonic',
'vaccum','squish','alternate','unleash','delicacy','obscure','metallic','crevice','desktop','google','venture','monotonous',
'linguistic','wolfram','argentum','jinx','gregarious','dazzling','noble','deed','beetle','ambrosia','appeal'];

const correctLArr = [];
const wrongLArr = [];

let hiddenWord = words[Math.floor(Math.random() * words.length)];



function showWord() {
    letterContainer.innerHTML = `
    ${hiddenWord
            .split('')
            .map(
                letter => `
                            <div class='letter'> 
                                ${correctLArr.includes(letter) ? letter : ''}
                            </div>
                            `
            )
            .join('')}`;
    mainWord = letterContainer.innerText.replace(/\n/g,'');
    if (mainWord === hiddenWord) {
        finalMessage.innerText = 'Congratulations!!! You won!';
        popUp.style.display = 'flex';
    }
}

function showWrongLetters(){
    wrongLetters.innerHTML = `
                                ${wrongLArr.length > 0 ? '<div>WRONG :</div>' : ''}
                                ${wrongLArr.map(letter => `<span>${letter}</span>`)}
                                `;
    hidden.forEach((fig,index) => {
        if (index < wrongLArr.length) {
            fig.style.display = 'block';
        }else{
            fig.style.display = 'none';
        }
    })
    if (wrongLArr.length == hidden.length) {
        finalMessage.innerText = 'Sorry!!! You lost!!';
        popUp.style.display = 'flex';
    }
}

function showNotification(){
    notify.style.display = 'flex';
    setTimeout( () => {
        notify.style.display = 'none'
    },2000);
}

document.addEventListener('keydown', e => {
    
    if (e.code >= 'KeyA' && e.code <= 'KeyZ') {
        const letter = e.key;
        if (hiddenWord.includes(letter)) {
            if (!correctLArr.includes(letter)) {
                correctLArr.push(letter);
                
                showWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLArr.includes(letter)) {
                wrongLArr.push(letter);
                showWrongLetters();
            } else {
                showNotification();
            }
        }
    }
})

playBtn.addEventListener('click',() => {
    correctLArr.splice(0);
    wrongLArr.splice(0);

    hiddenWord = words[Math.floor(Math.random() * words.length)];

    showWord();
    showWrongLetters();
    
    popUp.style.display = 'none';
})

showWord();


