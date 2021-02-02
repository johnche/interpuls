import { shuffleArray } from "./utils.js";
import { textCounter } from "./text.js";
const colorList2 = [
    {
        colorList: ['8c094f', '#0264c7'],
        background: '#043288'
    },
    {
        colorList: ['#f6f2e7', '#e18202', '#020204'],
        background: '#0c37a0'
    },
    {
        colorList: ['#a1a19d', '#09134a'],
        background: '#191d30'
    },
    {
        colorList: ['#a42c11', '#410e0d'],
        background: '#322c29'
    },
    {
        colorList: ['#f7b306', '#d62207'],
        background: '#da5f05'
    },
    {
        colorList: ['#e069c6', '#e7919d'],
        background: '#5250bd'
    },
    {
        colorList: ['#c04634', '#1f192c'],
        background: '#321c22'
    },
    {
        colorList: ['#277eb1', '#007e9c'],
        background: '#0183c8'
    },
    {
        colorList: ['#a80615'],
        background: '#720518'
    },
    {
        colorList: ['#F3316E'],
        background: '#fa8e22'
    },
    {
        colorList: ['#da0809', '#f80e07'],
        background: '#e92829'
    },
    {
        colorList: ['#1e1d23', '#2b2146', '#a8a0b8'],
        background: '#3f3456'
    },
    {
        colorList: ['#221912', '#f9c55f'],
        background: '#b47247'
    },
    {
        colorList: ['#2c387d', '#162e2c', '#300e1e', '#1b2741'],
        background: '#4c4787'
    },
    {
        colorList: ['#0f0e14', '#43404b'],
        background: '#000000'
    },
    {
        colorList: ['#a25d24', '#f64800'],
        background: '#b84540'
    },
    {
        colorList: ['#07080a', '#551220'],
        background: '#964838'
    },
    {
        colorList: ['#d74714', '#121f40'],
        background: '#352321'
    }
];

let counter = 4;

let colorListCopy = [...colorList2];
export function rothkoUpdate() {
    counter++;
    if (counter >= colorList2.length){
        counter = 0;
        colorListCopy = shuffleArray(colorList2);
    }
    console.log('here', counter, colorListCopy[counter]);
    console.log(counter);
}

export function getRothko() {
    return colorListCopy[counter];
}