const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
let missed = 0;
const phrases = ['no pain no gain', 'what doesnt kill you makes you stronger', 'one bird in the hand equals two in the bush', 'dont count your eggs before theyre hatched', 'you are what you eat'];


startButton.addEventListener('click', (e) => {
    overlay.style.display = 'none';
})

function getRandomPhraseAsArray(arr){
    let randPhrase = phrases[Math.floor(Math.random()*arr.length)];
    let charArr = randPhrase.split('');
    return charArr;
}

function addPhraseToDisplay(arr){
    let ul = document.querySelector('#phrase');

    for(let i = 0; i < arr.length; i++){

       var li = document.createElement('li');
       if (arr[i] !== " "){
            li.className += "letter";
        } else { li.className += "space";}
       ul.appendChild(li);
       li.textContent = arr[i];

    }
}

const randphrases = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randphrases);

function checkLetter(btn){
    let check = document.querySelectorAll('li');
    let match = null;

    for(let i = 0; i < check.length; i++){
        if (check[i].textContent === btn.textContent){
            check[i].className += "show";
            match = btn.textContent;
        }
        return match;
    }
}

qwerty.addEventListener('click', (e)=> {
    if(e.target.tagName === 'BUTTON' && e.target.className !== 'chosen'){
    let checking = checkLetter(e.target);
        if(checking === null){
            missed++;
            var hearts = document.querySelector('ol')
            hearts.removeChild(hearts.firstChild);
        }
        e.target.className = "chosen";
    }
})

let letterCon = document.querySelectorAll('.letter');
let showCon = document.querySelectorAll('.show');

if(letterCon === showCon){
    startButton.className += 'win';
    document.querySelector('h2').innerHTML = "YOU HAVE WON";
    startButton.style.display = 'flex';
}

if(missed > 4){
    startButton.className += 'lose';
    document.querySelector('h2').innerHTML = "YOU HAVE LOST";
    startButton.style.display = 'flex';
}