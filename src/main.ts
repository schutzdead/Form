import './style.css'

const cache:any = document.querySelector('.cache');
const cache2:any = document.querySelector('.cache2');
const check2:any = document.querySelector('.right');
const check:any = document.querySelector('.left');
const ok:any = document.querySelector('.okLeft');
const ok2:any = document.querySelector('.okRight');

const box:any = document.querySelector('.question1');
const surBox:any = document.querySelector('.frameOptional');

const cachea:any = document.querySelector('.cachea');
const cache2a:any = document.querySelector('.cache2a');
const check2a:any = document.querySelector('.righta');
const checka:any = document.querySelector('.lefta');
const oka:any = document.querySelector('.okLefta');
const ok2a:any = document.querySelector('.okRighta');

const boxa:any = document.querySelector('.question2');

const buttonSubmit:any = document.querySelector('.create');
const required:any = document.querySelector('.formRequired')
const requiredInput:any = required.querySelectorAll('input');
const allLabel:any = required.querySelectorAll('div>label')

var i = 0

var posMouseX=0
var posMouseY=0

var initalMouseX:number = 0;
var initalMouseY:number = 0;

var memoireX:number = 0;
var memoireY:number = 0;
var previousMemoireX:number = 0;


//Customisation du message d'erreur
function styleLabel (aim:any, current:any, bulle:string, span:string, police:string, margin:string) {
    aim.setCustomValidity(bulle);
    current.style.display = span;
    aim.style.fontSize = police;
    aim.style.marginTop = margin;
}

// Gestion des messages d'erreur
function suppBulle (condition:any, aim:any){
const currentSpan:any = document.querySelector(`#${aim['id']}+span`)
allLabel.forEach((element:any)=>element.style.color = 'black')
if (condition){
        styleLabel(aim, currentSpan, " ", "unset", "0.85rem", "-5px")        
    } else {
        styleLabel(aim, currentSpan, "", "none", "1.1rem", "0")     
        }
}

//Msgs d'erreur pour le bouton type 'submit'
buttonSubmit.addEventListener('click', () =>{
    i=0
    requiredInput.forEach((element:any) => {
        i=i+1
        const currentLabel:any = required.querySelector(`.div${i}>label`)
        if(element.value.length === 0 || element.validity.patternMismatch || element.validity.tooShort){
            currentLabel.style.color = 'red';
            element.setCustomValidity(" ");
        }
    })
})

//Msg d'erreur pour chaque input
requiredInput.forEach((element:any) => element.addEventListener('input', () => {
        suppBulle(element.validity.patternMismatch || element.validity.tooShort, element);
}))


//Gestion de la mise en forme lors du choix
// ------- 1 -------
function choiceStyle(cacheLeft:any, cacheRight:any,input:any,okLeft:any, okRight:any, ){
function colorChoiceR (first:string, second:string){
    cacheRight.style.animation=first;
    cacheLeft.style.animation=second;
}

cacheLeft.addEventListener('click', () => {
    input.click();
    colorChoiceR("unset", "test 1s forwards");
    okLeft.style.display="block";
    okRight.style.display="none";
})

cacheRight.addEventListener('click', () => {
    input.click();
    colorChoiceR("test 1s forwards", "unset");
    okRight.style.display="block";
    okLeft.style.display="none";
})
}

choiceStyle(cache, cache2, check, ok, ok2);
choiceStyle(cachea, cache2a, checka, oka, ok2a);



//Permettre l'effet drag&drop
var mouseIsDown = false;
box.addEventListener('mousedown', () => mouseIsDown=true)
surBox.addEventListener('mouseup', () => mouseIsDown=false)
box.addEventListener('mousedown', () => mouseIsDown=true)
surBox.addEventListener('mouseup', () => mouseIsDown=false)

//Drag&Drop
surBox.addEventListener('mousedown', (e:any) => {
    //pos souris, 1er clic
    initalMouseX = e.x; 
    initalMouseY = e.y; 
})

surBox.addEventListener('mousemove', function(event:any){
    if(mouseIsDown===true){
        //pos souris - sa pos initiale - border = pos relative à bouger
        posMouseX = event.x-initalMouseX-2;
        posMouseY = event.y-initalMouseY-2;
        //pos relative à bouger + celle en mémoire
        box.setAttribute('style',`left:${posMouseX+memoireX}px;top:${posMouseY+memoireY}px`);
    } else {
        return;
    }
})

surBox.addEventListener('mouseup', () => {
    //test dans le cas d'un double clic pour ne pas doubler la sauvegarde
    if (posMouseX===previousMemoireX) return memoireX; memoireY; 
    //pos relative sur la zone à la fin du clic
    memoireX = posMouseX + memoireX;   
    memoireY = posMouseY + memoireY;
    previousMemoireX = posMouseX;
})