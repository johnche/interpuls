import { rothkoUpdate } from './rothko.js';
// import { chooseVisualizer } from "./visualizer.js";
export let mode = 0;
export let changeColor = 0;
export const textList = [
'Click anywhere to start',
'<p>The frequency between clicks determines what kind of sounds will be playing </p>',
'<p>The frequency between clicks determines what kind of sounds will be playing </p>',
'<p>The frequency between clicks determines what kind of sounds will be playing </p>',
'<p>The frequency between clicks determines what kind of sounds will be playing </p>',
'<p>The frequency between clicks determines what kind of sounds will be playing </p>',
'<p>The sounds you are hearing are coming from American composer Morton Feldmans String Quartet no 2</p>',
'<p>The sounds you are hearing are coming from American composer Morton Feldmans String Quartet no 2</p>',
'<p>The sounds you are hearing are coming from American composer Morton Feldmans String Quartet no 2</p>',
'<p>The sounds you are hearing are coming from American composer Morton Feldmans String Quartet no 2</p>',
'<p>The sounds you are hearing are coming from American composer Morton Feldmans String Quartet no 2</p>',
'<p>One of Feldmans points of interests was to separate the sounds from their context;</p>', 
'<p>One of Feldmans points of interests was to separate the sounds from their context;</p>', 
'<p>One of Feldmans points of interests was to separate the sounds from their context;</p>', 
'<p>To focus on the immediate in comparison to what came before, or what is about to be.</p>',
'<p>To focus on the immediate in comparison to what came before, or what is about to be.</p>',
'<p>To focus on the immediate in comparison to what came before, or what is about to be.</p>',
'<p>To focus on the immediate in comparison to what came before, or what is about to be.</p>',
'<p>To focus on the immediate in comparison to what came before, or what is about to be.</p>',
'<p>The quartet, depending on how one interprets it, can last until 6 hours, the longest in the history of string quartets.</p>', 
'<p>The quartet, depending on how one interprets it, can last until 6 hours, the longest in the history of string quartets.</p>', 
'<p>The quartet, depending on how one interprets it, can last until 6 hours, the longest in the history of string quartets.</p>', 
'<p>The quartet, depending on how one interprets it, can last until 6 hours, the longest in the history of string quartets.</p>', 
'<p>The quartet, depending on how one interprets it, can last until 6 hours, the longest in the history of string quartets.</p>', 
'<p>By writing a piece with multiple fragments that does not necessarily feel connected on the first listen-through,</p>', 
'<p>By writing a piece with multiple fragments that does not necessarily feel connected on the first listen-through,</p>', 
'<p>By writing a piece with multiple fragments that does not necessarily feel connected on the first listen-through,</p>', 
'<p>some listeners feel confronted with the idea of having to let go of trying to make sense of it all;</p>',
'<p>some listeners feel confronted with the idea of having to let go of trying to make sense of it all;</p>',
'<p>some listeners feel confronted with the idea of having to let go of trying to make sense of it all;</p>',
'<p>To rather give oneself up to the moment.</p>',
'<p>To rather give oneself up to the moment.</p>',
'<p>To rather give oneself up to the moment.</p>',
'<p>To rather give oneself up to the moment.</p>',
'<p>To rather give oneself up to the moment.</p>',
'<p>To rather give oneself up to the moment.</p>',
'<p>At the later stages of his career Morton Feldman was obsessed with ancient Middle Eastern patterned rugs</p>',
'<p>At the later stages of his career Morton Feldman was obsessed with ancient Middle Eastern patterned rugs</p>',
'<p>At the later stages of his career Morton Feldman was obsessed with ancient Middle Eastern patterned rugs</p>',
'<p>Specifically how there is an imperfection in the way the carpets are dyed, giving each part of the carpet a different configuration, but still functioning as one.</p>',
'<p>Specifically how there is an imperfection in the way the carpets are dyed, giving each part of the carpet a different configuration, but still functioning as one.</p>',
'<p>Specifically how there is an imperfection in the way the carpets are dyed, giving each part of the carpet a different configuration, but still functioning as one.</p>',
'<p>One of Feldmans texture-inspired pieces was Rothko Chapel written for his friend Mark Rothko.</p>',
'<p>One of Feldmans texture-inspired pieces was Rothko Chapel written for his friend Mark Rothko.</p>',
'<p>One of Feldmans texture-inspired pieces was Rothko Chapel written for his friend Mark Rothko.</p>',
'<p>The color palettes that is used in this audio visualizer is lifted from Mark Rothko`s color field paintings.</p>',
'<p>The color palettes that is used in this audio visualizer is lifted from Mark Rothko`s color field paintings.</p>',
'<p>The color palettes that is used in this audio visualizer is lifted from Mark Rothko`s color field paintings.</p>',
'<p>The color palettes that is used in this audio visualizer is lifted from Mark Rothko`s color field paintings.</p>',
'<p>The color palettes that is used in this audio visualizer is lifted from Mark Rothko`s color field paintings.</p>',
'<p>Feel free to explore different color configurations and visualizers by hovering over the bottom of your screen</p>',
'<p>Feel free to explore different color configurations and visualizers by hovering over the bottom of your screen</p>',
'<p>Feel free to explore different color configurations and visualizers by hovering over the bottom of your screen</p>',
'<p>Feel free to explore different color configurations and visualizers by hovering over the bottom of your screen</p>',
''
]

export let textCounter = 0;
let questionClick = 0;
let soundsCounter = 0;
    
const questionSymbol = document.getElementById('question');
const visualizer = document.getElementById('visualizer');
const dropdownButton = document.getElementById('dropdownbutton');
const bythemselves = document.getElementById('by themselves');
const textBox = document.getElementById("introtext");
const question = document.getElementById("question");
const questionText = document.getElementById("questiontext");
const audioVisual = document.getElementById('audio_visual');
const iterator = textList[Symbol.iterator]();

const increaseTextCounter = () => {
    textCounter++;
    if (textCounter === 1) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 2) {
        textBox.style.setProperty('opacity', 1);
    }
    if (textCounter === 4) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 7) {
        textBox.style.setProperty('opacity', 1);
    }
    if (textCounter === 9) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 12) {
        textBox.style.setProperty('opacity', 1);
    }
    if (textCounter === 14) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 15) {
        textBox.style.setProperty('opacity', 1);
    }
    if (textCounter === 17) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 20) {
        textBox.style.setProperty('opacity', 1);
    }
    if (textCounter === 22) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 25) {
        textBox.style.setProperty('opacity', 1);
    }
    if (textCounter === 27) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 28) {
        textBox.style.setProperty('opacity', 1);
    }
    if (textCounter === 30) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 31) {
        textBox.style.setProperty('opacity', 1);
    }
    if (textCounter === 32) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 37) {
        textBox.style.setProperty('opacity', 1);
    }
    if (textCounter === 39) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 40) {
        textBox.style.setProperty('opacity', 1);
    }
    if (textCounter === 42) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 43) {
        textBox.style.setProperty('opacity', 1);
    }
    if (textCounter === 45) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 46) {
        textBox.style.setProperty('opacity', 1);
    }
    if (textCounter === 48) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 51) {
        textBox.style.setProperty('opacity', 1);
    }
    if (textCounter === 53) {
        textBox.style.setProperty('opacity', 0);
    }
    if (textCounter === 31) {
        rothkoUpdate();
    }
    if (textCounter === 51) {
        rothkoUpdate();
    }
};

audioVisual.onclick = () => {
    const textBoxIterator = iterator.next().value;
    if (textBoxIterator !== undefined) {
        increaseTextCounter();

        textBox.innerHTML = textBoxIterator;
        textBox.style.setProperty('display', 'block');
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




