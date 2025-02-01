'use strict';

function add(a, b){
    return a + b;
}

function subtract(a, b){
    const noNegatives = a - b < 0 ? "No negatives, dweeb!" : a - b;
    return noNegatives;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function square(num){
    return Math.pow(num, 2);
}

function sqroot(num){
    return Math.sqrt(num);
}

console.log(add(2, 2));
console.log(subtract(2, 4));
console.log(multiply(4, 4));
console.log(divide(6, 2));
console.log(square(8));
console.log(sqroot(9));