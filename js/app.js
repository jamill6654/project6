const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
let missed = 0;
const phrases = ['no pain no gain', 'what doesnt kill you makes you stronger', 'one bird in the hand equals two in the bush', 'dont count your eggs before theyre hatched', 'you are what you eat'];
let letterCon = ' ';

//MAIN START SCREEN
startButton.addEventListener('click', (e) => {
    overlay.style.display = 'none';
})


//RETURNS RANDOM PHRASE
function getRandomPhraseAsArray(arr){
    let randPhrase = phrases[Math.floor(Math.random()*arr.length)];
    let charArr = randPhrase.split('');
    return charArr;
}

//ADDS RANDOM PHRASE TO SCREEN
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

//CHECKS IF LETTER MATCHES RETURNS LETTER OR NULL
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

//REFRESH FUNCTION FOR PLAYING AGAIN
//CALLS STARTAGAIN TO START MAIN FUNCTION
function refresh(){
    startButton.addEventListener('click', (e) => {

        for (let i = 0; i < 26; i++){
            let toChange = document.getElementsByTagName('button')[i]
            toChange.classList.remove('chosen');
            toChange.disabled = false;
        }
        let ul = document.querySelector('#phrase');
        ul.innerHTML = '';
        missed = 0;
        for (let i = 0; i < 5; i++){
            let tries = document.getElementsByTagName('img')[i];
            tries.setAttribute('src', 'images/liveHeart.png');
        }

        overlay.style.display = 'none';
        startAgain();

    })
}

startAgain();
function startAgain(){
const randphrases = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randphrases);
letterCon = document.querySelectorAll('.letter');
}

/*KEYBOARD EVENT LISTENER
*INCREASES MISSED COUNTER
*CHECKS WIN/LOSE CON AND CALLS REFRESH TO PLAY AGAIN
*/
qwerty.addEventListener('click', (e)=> {
  
    if(e.target.tagName === 'BUTTON'){
    let checking = checkLetter(e.target);

        if(checking === null){
            let tries = document.getElementsByTagName('img')[missed];
            tries.setAttribute('src', 'images/lostHeart.png');
            missed++;
        }
        
        e.target.className = "chosen";
        e.target.disabled = true;

        let showCon = document.querySelectorAll('.show');
        if(letterCon.length === showCon.length){
            startButton.className += 'win';
            document.querySelector('h2').innerHTML = "YOU HAVE WON";
            overlay.style.display = 'flex';
            refresh();
        }
        
        if(missed > 4){
            startButton.className += 'lose';
            document.querySelector('h2').innerHTML = "YOU HAVE LOST";
            overlay.style.display = 'flex';
            refresh();
        }
    }
})
