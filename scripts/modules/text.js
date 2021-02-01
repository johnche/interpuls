import { rothkoUpdate } from './rothko.js';
// import { chooseVisualizer } from "./visualizer.js";
export let mode = 0;
export let changeColor = 0;
export const textList = [
'Click anywhere to start',
'<p>The frequency between clicks determines what kind of sounds will be playing </p>',
'',
'<p>The sounds you are hearing are coming from American composer Morton Feldmans String Quartet no 2</p>',
'',
'<p>One of Feldmans points of interests was to separate the sounds from their context;</p>', 
'<p>To focus on the immediate in comparison to what came before, or what is about to be.</p>',
'',
'<p>The quartet, depending on how one interprets it, can last until 6 hours, the longest in the history of string quartets.</p>', 
'<p>By writing a piece with multiple fragments that does not necessarily feel connected on the first listen-through,</p>', 
'<p>some listeners feel confronted with the idea of having to let go of trying to make sense of it all;</p>',
'<p>To rather give oneself up to the moment.</p>',
'',
'',
'',
'<p>At the later stages of his career Morton Feldman was obsessed with ancient Middle Eastern patterned rugs</p>',
'<p>Specifically how there is an imperfection in the way the carpets are dyed, giving each part of the carpet a different configuration, but still functioning as one whole</p>',
'<p>One of Feldmans texture-inspired pieces (there were many, including this one) was Rothko Chapel written for his friend Mark Rothko.</p>',
'<p>The color palettes that is used in this audio visualizer is lifted from Mark Rothko`s color field paintings.</p>',
'<p>Feel free to explore different color configurations and visualizers by hovering over the bottom of your screen</p>'
]
//12 change color
//16 change to textiles visualizer

export let textCounter = 0;
const increaseTextCounter = () => {
    textCounter++;
    if (textCounter === 12) {
        rothkoUpdate();
    }
};

let questionClick = 0;
let soundsCounter = 0;
    
const questionSymbol = document.getElementById('question');
const visualizer = document.getElementById('visualizer');
const dropdownButton = document.getElementById('dropdownbutton');
const theSounds = document.getElementById('the sounds');
const bythemselves = document.getElementById('by themselves');
const textBox = document.getElementById("introtext");
const question = document.getElementById("question");
const questionText = document.getElementById("questiontext");
const body = document.getElementsByClassName('body');
const audioVisual = document.getElementById('audio_visual');

const iterator = textList[Symbol.iterator]();
audioVisual.onclick = () => {
    const textBoxIterator = iterator.next().value;
    if (textBoxIterator !== undefined) {
        increaseTextCounter();

        textBox.innerHTML = textBoxIterator;
        textBox.style.setProperty('display', 'block');
        textBox.style.setProperty('opacity', 1);
        questionText.style.display = 'none';
    }
    else {
        textBox.style.setProperty('display', 'none');
        textBox.style.setProperty('opacity', 0);
    }
}
textBox.onclick = () => {
    const textBoxIterator = iterator.next().value;
    if (textBoxIterator !== undefined) {
        increaseTextCounter();

        textBox.innerHTML = textBoxIterator;
        textBox.style.setProperty('display', 'block');
        textBox.style.setProperty('opacity', 1);
        questionText.style.display = 'none';
    }
    else {
        textBox.style.setProperty('display', 'none');
        textBox.style.setProperty('opacity', 0);
    }
}

question.onclick = () => {
    if (questionClick >= 1){
        questionClick = 0;
    }
    else{
    questionClick ++;
    }
    if (questionClick == 1){
    questionText.style.display = 'block';
    questionSymbol.style.setProperty('opacity', 1);
    }
    if (questionClick == 0){
    questionText.style.display = 'none';
    questionSymbol.style.setProperty('opacity', 0.5);
    }
    textBox.style.setProperty('display', 'none');
}

questionText.onclick = () => {
    if (questionClick >= 1){
        questionClick = 0;
    }
    else{
    questionClick ++;
    }
    if (questionClick == 1){
    questionText.style.display = 'block';
    questionSymbol.style.setProperty('opacity', 1);
    }
    if (questionClick == 0){
    questionText.style.display = 'none';
    questionSymbol.style.setProperty('opacity', 0.5);
    }
}

visualizer.onclick = () => {
    console.log('potet');
    console.log('potet');
}
bythemselves.onclick = () => {
    if (soundsCounter >= 1){
    soundsCounter = 0;
}
else {
soundsCounter ++;
}
if (soundsCounter == 1){
    dropdownButton.innerHTML = 'in context';  
    bythemselves.innerHTML = 'by themselves';
    document.getElementById("clear").style.visibility = "visible";
    mode = 1;
     
}
if (soundsCounter == 0){
    dropdownButton.innerHTML = 'by themselves';
    bythemselves.innerHTML = 'in context';
    document.getElementById("clear").style.visibility = "hidden";
    mode = 0;
}
}




