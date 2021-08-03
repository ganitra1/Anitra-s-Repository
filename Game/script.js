//sounds//

var sounds = [
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
];

function playSound(id) {
    sounds[id].play();
}

var inputEnabled = false;
var stepList = [];
var currentStep = 0;
// var timeout;
var box = document.querySelectorAll('.box');
var info = document.querySelector('#info');
var startButton = document.querySelector('#start');
var resetButton = document.querySelector('#reset');


for (var i = 0; i < box.length; i++) {
    const val = i;
    box[i].onclick = function () {
        if (!inputEnabled) return;

        playSound(val);
        if (val === stepList[currentStep]) {
            if (currentStep + 1 === stepList.length) {
                inputEnabled = false;
                if (stepList.length < 10) {
                    makeLastStep();
                    info.innerHTML = "Sweet!"
                    timeout = setTimeout(showSteps, 1500);
                    currentStep = 0;
                }
                else {
                    info.innerHTML = "Winner Winner!";
                    
                }
            }
            else {
                currentStep++;
            }
        }
        else {
            info.innerHTML = "Mistake!";
            inputEnabled = false;
            setTimeout(function () {
                if (any) {
                    reset();
                }
                else {
                    currentStep = 0;
                    inputEnabled = false;
                    info.innerHTML = "Watch the sequence!";
                    
                }
            } );

        }
    }
}

startButton.onclick = function () {
    this.disabled = true;
    start();
}

resetButton.onclick = reset;

function reset() {
    startButton.disabled = false;
    stepList = [];
    currentStep = 0;
    inputEnabled = false;
    clearTimeout(timeout);
    info.innerHTML = "Start Over";
}



function start() {
    makeLastStep();
    info.innerHTML = 'Watch & Learn!';
    timeout = setTimeout(showSteps, 500);
}


function makeLastStep() {
    stepList.push(rand(0, 2));
}

function showSteps() {
    if (currentStep > stepList.length - 1) {
        currentStep = 0;
        inputEnabled = true;
        return;
    }

    var id = stepList[currentStep];

    playSound(id);
    box[id].className += ' active';

    setTimeout(function () {

        box[id].className = box[id].className.replace(' active', '');

        currentStep++;

        timeout = setTimeout(showSteps, 0.3 * 1000);

    }, 0.6 * 1000);

    info.innerHTML = "Watch & Learn!";
}

//math//
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}