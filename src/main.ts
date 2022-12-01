import './style.css'

const question:any = document.querySelector('.question1');
const cacheLeft:any = document.querySelector('.cacheLeft');
const cacheRight:any = document.querySelector('.cacheRight');
const input:any = document.querySelector('.left');
const okLeft:any = document.querySelector('.okLeft');
const okRight:any = document.querySelector('.okRight');

const question2:any = document.querySelector('.question2');
const cacheLeft2:any = document.querySelector('.cacheLeft2');
const cacheRight2:any = document.querySelector('.cacheRight2');
const input2:any = document.querySelector('.left2');
const okLeft2:any = document.querySelector('.okLeft2');
const okRight2:any = document.querySelector('.okRight2');

const question3:any = document.querySelector('.question3');
const cacheLeft3:any = document.querySelector('.cacheLeft3');
const cacheRight3:any = document.querySelector('.cacheRight3');
const input3:any = document.querySelector('.left3');
const okLeft3:any = document.querySelector('.okLeft3');
const okRight3:any = document.querySelector('.okRight3');

const question4:any = document.querySelector('.question4');
const cacheLeft4:any = document.querySelector('.cacheLeft4');
const cacheRight4:any = document.querySelector('.cacheRight4');
const input4:any = document.querySelector('.left4');
const okLeft4:any = document.querySelector('.okLeft4');
const okRight4:any = document.querySelector('.okRight4');

const surBox:any = document.querySelector('.frameOptional');
const buttonSubmit:any = document.querySelector('.create');
const required:any = document.querySelector('.formRequired')
const requiredInput:any = required.querySelectorAll('input');
const allLabel:any = required.querySelectorAll('div>label')

//Positionnement aléatoire questions non-obligatoires
function boxPos (question:any, minY:number, maxY:number){
    question.style.left = `${Math.random()*(50-10)+10}%`;
    question.style.top = `${Math.random()*(maxY-minY)+minY}%`;
}
boxPos(question,5,16);boxPos(question2,28,39),boxPos(question3,51,62),boxPos(question4,74,85);

//Prendre en compte la position de la box initial (auquel on ajoute la souris (posMouseX/Y)
var startPosX = (parseInt(question.style.left)/100)*surBox.clientWidth;
var startPosY = (parseInt(question.style.top)/100)*surBox.clientHeight;
var startPosX2 = (parseInt(question2.style.left)/100)*surBox.clientWidth;
var startPosY2 = (parseInt(question2.style.top)/100)*surBox.clientHeight;
var startPosX3 = (parseInt(question3.style.left)/100)*surBox.clientWidth;
var startPosY3 = (parseInt(question3.style.top)/100)*surBox.clientHeight;
var startPosX4 = (parseInt(question4.style.left)/100)*surBox.clientWidth;
var startPosY4 = (parseInt(question4.style.top)/100)*surBox.clientHeight;

var posMouseX=0, posMouseY=0, initalMouseX = 0, initalMouseY = 0, memoireX = startPosX, memoireY = startPosY, previousMemoireX = 0;
var posMouseX2=0, posMouseY2=0, initalMouseX2 = 0, initalMouseY2 = 0, memoireX2 = startPosX2, memoireY2 = startPosY2, previousMemoireX2 = 0;
var posMouseX3=0, posMouseY3=0, initalMouseX3 = 0, initalMouseY3 = 0, memoireX3 = startPosX3, memoireY3 = startPosY3, previousMemoireX3 = 0;
var posMouseX4=0, posMouseY4=0, initalMouseX4 = 0, initalMouseY4 = 0, memoireX4 = startPosX4, memoireY4 = startPosY4, previousMemoireX4 = 0;

var i = 0;

//Customisation du message d'erreur (obligatoire)
function styleLabel (aim:any, current:any, bulle:string, span:string, police:string, margin:string) {
    aim.setCustomValidity(bulle);
    current.style.display = span;
    aim.style.fontSize = police;
    aim.style.marginTop = margin;
}

// Gestion des messages d'erreur (obligatoire)
function suppBulle (condition:any, aim:any){
const currentSpan:any = document.querySelector(`#${aim['id']}+span`);
allLabel.forEach((element:any)=>element.style.color = 'black');
if (condition){
        styleLabel(aim, currentSpan, " ", "unset", "0.85rem", "-5px");      
    } else {
        styleLabel(aim, currentSpan, "", "none", "1.1rem", "0")  ;  
        };
};

//Msgs d'erreur pour le bouton type 'submit' (obligatoire)
buttonSubmit.addEventListener('click', () =>{
    i=0;
    requiredInput.forEach((element:any) => {
        i=i+1;
        const currentLabel:any = required.querySelector(`.div${i}>label`);
        if(element.value.length === 0 || element.validity.patternMismatch || element.validity.tooShort){
            currentLabel.style.color = 'red';
            element.setCustomValidity(" ");
        };
    });
});

//Msg d'erreur pour chaque input (obligatoire)
requiredInput.forEach((element:any) => element.addEventListener('input', () => {
        suppBulle(element.validity.patternMismatch || element.validity.tooShort, element);
}));


//Gestion de la mise en forme lors du choix (non-obligatoire)
function choiceStyle(cacheLeft:any, cacheRight:any,input:any,okLeft:any, okRight:any){
function colorChoiceR (first:string, second:string){
    cacheRight.style.animation=first;
    cacheLeft.style.animation=second;
};

cacheLeft.addEventListener('click', () => {
    input.click();
    colorChoiceR("unset", "test 1s forwards");
    okLeft.style.display="block";
    okRight.style.display="none";
});

cacheRight.addEventListener('click', () => {
    input.click();
    colorChoiceR("test 1s forwards", "unset");
    okRight.style.display="block";
    okLeft.style.display="none";
});
};

choiceStyle(cacheLeft, cacheRight, input, okLeft, okRight);
choiceStyle(cacheLeft2, cacheRight2, input2, okLeft2, okRight2);
choiceStyle(cacheLeft3, cacheRight3, input3, okLeft3, okRight3);
choiceStyle(cacheLeft4, cacheRight4, input4, okLeft4, okRight4);

//Drag&Drop (non-obligatoire)
function choiceDrop(question:any, startMouseX:any, startMouseY:any, positionX:any, positionY:any, memoryX:any, memoryY:any, exMemory:any){
//Permettre l'effet drag&drop
var mouseIsDown = false;
question.addEventListener('mousedown', () => mouseIsDown=true);
surBox.addEventListener('mouseup', () => mouseIsDown=false);

surBox.addEventListener('mousedown', (e:any) => {
    //pos souris, 1er clic
    startMouseX = e.x; 
    startMouseY = e.y;
});

surBox.addEventListener('mousemove', function(event:any){
    if(mouseIsDown===true){
        //pos souris - sa pos initiale - border = pos relative à bouger
        positionX = event.x-startMouseX-2;
        positionY = event.y-startMouseY-2;
        console.log(memoireX, memoireY)
        console.log(event.x, event.y);
        console.log(startMouseX, startMouseY)
        console.log(positionX, positionY)
        //pos relative à bouger + celle en mémoire (initialisé en ligne 54-57 à la position aléa générée)
        question.setAttribute('style',`left:${positionX+memoryX}px;top:${positionY+memoryY}px`);
    } else {
        return;
    };
});

surBox.addEventListener('mouseup', () => {
    //test dans le cas d'un double clic pour ne pas doubler la mémoire
    if (positionX===exMemory) return memoryX; memoryY; 
    //pos relative sur la zone à la fin du clic
    memoryX = positionX + memoryX;   
    memoryY = positionY + memoryY;
    exMemory = positionX;
});
};

choiceDrop(question, initalMouseX, initalMouseY, posMouseX, posMouseY, memoireX, memoireY, previousMemoireX);
choiceDrop(question2, initalMouseX2, initalMouseY2, posMouseX2, posMouseY2, memoireX2, memoireY2, previousMemoireX2);
choiceDrop(question3, initalMouseX3, initalMouseY3, posMouseX3, posMouseY3, memoireX3, memoireY3, previousMemoireX3);
choiceDrop(question4, initalMouseX4, initalMouseY4, posMouseX4, posMouseY4, memoireX4, memoireY4, previousMemoireX4);