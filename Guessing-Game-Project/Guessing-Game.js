const readline = require('readline');
const { runInNewContext } = require('vm');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let secretNumber = 0;
let numAttempts = 5;

function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

function checkGuess(num){
    if(num > secretNumber){
        console.log('Too high.')
        return false;
    }
    else if(num < secretNumber){
        console.log('Too low.');
        return false;
    }
    else if(num === secretNumber){
        console.log('Correct!');
        rl.close();
        return true;
    }
}

function askGuess(){
    rl.question('What is your guess? ', (num) =>{
        let guess = Number(num);
        let check = checkGuess(guess);
        if(check === false){
            numAttempts--;
            if(numAttempts === 0){
                console.log('You lose.')
                rl.close();
            }
            else{
                askGuess();
            }
        }
    })
}

function askRange(){
    rl.question('Please enter a minimum value. ', (n1) => {
        let min = Number(n1);
        rl.question('Please enter a max value. ', (n2) => {
            let max = Number(n2);
            console.log('I am thinking of a number between ' + min + ' and ' + max + '...');
            secretNumber = randomInRange(min, max);
            askGuess();
        })
    })
}

function askLimit(){
    rl.question('How many attempts do you think it will take to get my number? ', (num) =>{
        numAttempts = Number(num);
        askRange();
    })
}

askLimit();
