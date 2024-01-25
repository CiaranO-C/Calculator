
const display = document.querySelector('#display');
const buttonList = document.querySelectorAll('button');
const operBtns = document.querySelectorAll('.oper');
const backspace = document.querySelector('#backspace');
let userEntry = [];


window.addEventListener('keydown', event => {
    const key = event.key;

    buttonList.forEach(button => {
        if (key === button.value) {
            userEntry.push(key);
            (key === '/')
                ? display.textContent += '÷'
                : display.textContent += key;
        };
    });

    if (key === 'Enter') {
        const result = convertExpression(userEntry);
        userEntry = result;
        display.textContent = result.join('');
    } else if (key === 'Escape') {
        userEntry = [];
        display.textContent = '';
    } else if (key === 'Backspace') {
        userEntry.pop();
        display.textContent = display.textContent.slice(0, -1);
    };
});

buttonList.forEach(button => {

    button.addEventListener('click', event => {
        const btn = event.target;
        buttonColor(btn);

        if (btn.classList.contains('alterDisplay')) {
            if (btn.id === 'cancel') {
                display.textContent = '';
                userEntry = [];
            } else if (btn.id === 'backspace') {
                display.textContent = display.textContent.slice(0, -1);
                userEntry.pop();
            } else {
                const result = convertExpression(userEntry);
                userEntry = result;
                display.textContent = result.join('');
            };
        } else {
            display.textContent += btn.textContent;
            userEntry.push(btn.value);
        };
    });
});

function buttonColor(button) {
    operBtns.forEach(btn => btn.style.color = 'white');

    if (button.classList.contains('oper')) {
        button.style.color = 'orange'
    };
};


function add(numOne, numTwo) {
    //prevents numbers being concatenated 
    const a = Number(numOne);
    const b = Number(numTwo);
    const result = (a + b).toString()
    return result;
};

function subtract(numOne, numTwo) {
    return numOne - numTwo;
};

function multiply(numOne, numTwo) {
    return numOne * numTwo;
};

function divide(numOne, numTwo) {
    return numOne / numTwo;
};

function percentOf(numOne, numTwo) {
    //divide by 100 to get 1% of numTwo
    return (numTwo / 100) * numOne;
}


const oper = {
    '+': {
        fn: add,
        precedence: 1,
    },
    '-': {
        fn: subtract,
        precedence: 1,
    },
    '*': {
        fn: multiply,
        precedence: 2,
    },
    '/': {
        fn: divide,
        precedence: 2,
    },
};

//converts to postfix expression
function convertExpression(expr) {
    const output = [];
    const stack = [];
    let accum = '';

    for (let i = 0; i < expr.length; i++) {
        let top = stack.length - 1;
        const char = expr[i];
        const next = expr[i + 1];

        if (isNaN(char) && char !== '.') {

            if (!stack.length || char === '(' || stack[top] === '(') {
                stack.push(char);
            } else if (oper.hasOwnProperty(char)) {
                while (stack.length && stack[top] !== '(' && oper[char].precedence <= oper[stack[top]].precedence) {
                    output.push(stack.pop());
                    top = stack.length - 1;
                };
                stack.push(char);
            } else {
                while (stack[top] !== '(') {
                    output.push(stack.pop());
                    top = stack.length - 1;
                };
                stack.pop(); //pops remaining '('
            };
        } else {

            if (!isNaN(next) || next === '.') {
                accum += char;
            } else if (accum) {
                accum += char;
                output.push(accum);
                accum = '';
            } else {
                output.push(char); //pushes single digit numbers
            };
        };
    };
    //pushes remaining operators
    while (stack.length) {
        output.push(stack.pop());
    };
    const result = [evaluate(output)];

    return result;
};

function evaluate(postfixExpr) {
    const result = [];

    postfixExpr.forEach(char => {
        if (!isNaN(char)) {
            result.push(char);
        } else {
            const [num2, num1] = [result.pop(), result.pop()];
            const output = (oper[char].fn(num1, num2)).toString();
            result.push(output);
        };
    });

    //checks for incorrect '-' characters after initial evaluation
    if (result[0].includes('-') && result[0][0] !== '-') {
        //splits element into char array, passes as argument
        const newResult = convertExpression(result[0].split(''));
    } else {
        return result;
    };
};

