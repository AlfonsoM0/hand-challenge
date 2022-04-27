'use strict';
const fs = require('fs');

const ASCII = [];
let translation = '';

// instructions and instruction-protocol
const instructions = Array.from(fs.readFileSync('input.hand').toString());
let protocol = 0;

// memory and memory-cell.
let memory = [0];
let cell = 0;

// loops control
const starts = [];
const loops = {};
instructions.forEach((instruction, index) => {
  if (instruction === '🤜') starts.push(index);
  else if (instruction === '🤛') {
    let start = starts.pop();
    loops[start] = index;
    loops[index] = start;
  }
});

// instructions to execute.
const execute = {
  '👆': () => (memory[cell] < 255 ? ++memory[cell] : (memory[cell] = 0)),
  '👇': () => (memory[cell] > 0 ? --memory[cell] : (memory[cell] = 255)),
  '👉': () => {
    if (memory.length - 1 === cell) memory.push(0);
    ++cell;
  },
  '👈': () => --cell,
  '🤜': () => {
    if (memory[cell] === 0) protocol = loops[protocol];
  },
  '🤛': () => {
    if (memory[cell] !== 0) protocol = loops[protocol];
  },
  '👊': () => ASCII.push(memory[cell]),
};

// Assemble!
while (protocol < instructions.length) {
  execute[instructions[protocol]]();
  protocol++;
}

translation = String.fromCharCode(...ASCII);

console.log('Loops 🤜:🤛 ', loops);
console.log('Final protocol n°', protocol);
console.log('Memory: ', memory);
console.log('ASCII codes: ', ASCII);
console.log('<>--------------------HPL to Text--------------------<>');
console.log(translation);
