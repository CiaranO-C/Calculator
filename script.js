
const userEntry = document.querySelector('#display');
const btnContainer = document.querySelector('#button-container');
const operBtns = document.querySelectorAll('.oper');
const backspace = document.querySelector('#backspace');

//handles keyboard entries
window.addEventListener('keydown', event => {
    if (!isNaN(event.key)) userEntry.textContent += event.key;

    if (oper.hasOwnProperty(event.key)) {
        userEntry.textContent += event.key;
    };

    if (event.key === '/') userEntry.textContent += '÷';

    if (event.key === 'Enter') {
        const result = shuntingYard(userEntry.textContent);
        userEntry.textContent = result;
    };
});

//handles button clicks
btnContainer.addEventListener('click', button => {
    if (button.target.id !== 'button-container') {
        if (button.target.id !== 'equals' && button.target.parentNode.id !== 'edit') {
            userEntry.textContent += button.target.textContent;
        };

        if (button.target.classList.contains('oper')) {
            operBtns.forEach(btn => btn.style.color = 'white');
            button.target.style.color = 'orange';
        } else {
            operBtns.forEach(btn => btn.style.color = 'white');
        };
    };
    if (button.target.id === 'equals') {
        const result = shuntingYard(userEntry.textContent);
        userEntry.textContent = result;
    };
    if (button.target.id === 'cancel') userEntry.textContent = '';

    if (button.target.id === 'backspace') userEntry.textContent = userEntry.textContent.slice(0, -1);
});


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
        prec: 1,
    },
    '-': {
        fn: subtract,
        prec: 1,
    },
    '*': {
        fn: multiply,
        prec: 2,
    },
    '÷': {
        fn: divide,
        prec: 2,
    },
};


function shuntingYard(infixExpr) {
    const expr = infixExpr.split('');
    const output = [];
    const stack = [];
    let accum = '';
    for (let i = 0; i < expr.length; i++) {
        
        if (isNaN(expr[i]) && expr[i] !== '.') {
            if (expr[i] === '(' || !stack.length || stack[stack.length - 1] === '(') {
                stack.push(expr[i]);
            } else if (expr[i] !== ')') {
                while (stack[stack.length - 1] !== '(' && stack.length && oper[expr[i]].prec <= oper[stack[stack.length - 1]].prec) {
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
        let expression = stack.toString();

        return expression;
    };
};



