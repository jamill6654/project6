const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
let missed = 0;
const phrases = ['no pain no gain', 'what doesnt kill you makes you stronger', 'one bird in the hand equals two in the bush', 'dont count your eggs before theyre hatched', 'you are what you eat'];
let showCon = document.querySelectorAll('.show');


startButton.addEventListener('click', (e) => {
    overlay.style.display = 'none';
})

startAgain ();
function startAgain () {
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
            check[i].className = "show";
            match = btn.textContent;
        }
    }
    return match;
}

let letterCon = document.querySelectorAll('.letter');

qwerty.addEventListener('click', (e)=> {
    if(e.target.tagName === 'BUTTON' && e.target.className !== 'chosen'){
    let checking = checkLetter(e.target);

        if(checking === null){
            let tries = document.getElementsByClassName('tries')[missed];
            tries.style.display = 'none';
            missed++;
        }
    
        e.target.className = "chosen";
        let showCon = document.querySelectorAll('.show');

        if(letterCon.length === showCon.length){
            startButton.className += 'win';
            document.querySelector('h2').innerHTML = "YOU HAVE WON";
            overlay.style.display = 'flex';

            startButton.addEventListener('click', (e) => {
                for (let i = 0; i < 26; i++){
                    let toChange = document.getElementsByTagName('button')[i]
                    toChange.classList.remove('chosen');
                }
                let ul = document.querySelector('#phrase');
                ul.innerHTML = '';
                missed = 0;
                for (let i = 0; i < 5; i++){
                    let tries = document.getElementsByClassName('tries')[i];
                    tries.style.display = '';
                }
                overlay.style.display = 'none';
                startAgain();
            })
        }
        
        if(missed > 4){
            startButton.className += 'lose';
            document.querySelector('h2').innerHTML = "YOU HAVE LOST";
            overlay.style.display = 'flex';

            startButton.addEventListener('click', (e) => {
                for (let i = 0; i < 26; i++){
                    let toChange = document.getElementsByTagName('button')[i]
                    toChange.classList.remove('chosen');
                }
                let ul = document.querySelector('#phrase');
                ul.innerHTML = '';
                missed = 0;
                for (let i = 0; i < 5; i++){
                    let tries = document.getElementsByClassName('tries')[i];
                    tries.style.display = '';
                }
                overlay.style.display = 'none';
                startAgain();
            })
        }
    }
})
}