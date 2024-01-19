let userEntry = '';

function add (numOne, numTwo) {
    return numOne + numTwo;
};

function subtract (numOne, numTwo) {
    return numOne - numTwo;
};

function multiply (numOne, numTwo) {
    return numOne * numTwo;
};

function divide (numOne, numTwo) {
    return numOne / numTwo;
};

function percentOf (numOne, numTwo) {
    //divide by 100 to get 1% of numTwo
    return (numTwo/100)*numOne;
}


const calculate = {
    '+': add(a, b),
    '-': subtract(a, b),
    '*': multiply(a, b),
    '/': divide(a, b),
    '%': percentOf(a, b),
};



