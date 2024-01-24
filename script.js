
//separate display from logic
//imrpove keydown listener conditions
//improve button click listener conditions
//write separate function for updating operator button color

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
        } else if (key === 'Enter') {
            const result = shuntingYard(userEntry);
            userEntry = result; 
            display.textContent = result.join('');
        };
    });
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
                const result = shuntingYard(userEntry);
                userEntry = result; //make sure func returns array not string
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


function shuntingYard(expr) {
    const output = [];
    const stack = [];
    let accum = '';
    for (let i = 0; i < expr.length; i++) {

        if (isNaN(expr[i]) && expr[i] !== '.') {
            if (expr[i] === '(' || !stack.length || stack[stack.length - 1] === '(') {
                stack.push(expr[i]);
            } else if (expr[i] !== ')') {
                while (stack[stack.length - 1] !== '(' && stack.length && oper[expr[i]].precedence <= oper[stack[stack.length - 1]].precedence) {
                    output.push(stack.pop());
                };
                stack.push(expr[i]);
            } else {
                while (stack[stack.length - 1] !== '(') {
                    output.push(stack.pop());
                };
                stack.pop();
            }
        } else {
            //if next char is number, add to accumulate
            if (!isNaN(expr[i + 1]) || expr[i + 1] === '.') {
                accum += expr[i];
            } else {
                //next char is oper, then check if last digit, else single digit num
                if (accum) {
                    accum += expr[i];
                    output.push(accum);
                    accum = '';
                } else output.push(expr[i]);
            };
        };

    };

    //pushes remaining operators onto output
    while (stack.length) {
        output.push(stack.pop());
    };

    //evaluates postfix expression
    output.forEach(char => {
        if (!isNaN(char)) {
            stack.push(char);
        } else {
            const [num2, num1] = [stack.pop(), stack.pop()];
            const result = (oper[char].fn(num1, num2)).toString();
            stack.push(result);
        };
    });

    //checks for incorrect '-' characters after initial evaluation
    if (stack[0].includes('-') && stack[0][0] !== '-') {
        return shuntingYard(stack[0]);
    } else {
        let expression = stack;

        return expression;
    };
};



