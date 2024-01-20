let userEntry = '3+4*2/(1-5)';

function add(numOne, numTwo) {
    return numOne + numTwo;
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
    '/': {
        fn: divide,
        prec: 2,
    },
};


function shuntingYard(infixExpr) {
    const expr = infixExpr.split('');
    const output = [];
    const stack = [];
    expr.forEach(char => {
        if (isNaN(char)) {
            if (char === '(' || !stack.length || stack[stack.length - 1] === '(') {
                stack.push(char);
            } else if (char !== ')' && stack.length) {
                (oper[char].prec > oper[stack[stack.length - 1]].prec)
                    ? stack.push(char)
                    : (output.push(stack.pop()), stack.push(char));
            } else {
                output.push(stack.pop());
                stack.pop();
            }
        } else {
            output.push(char);
        }
    });

    while (stack.length) {
        output.push(stack.pop());
    };

    output.forEach(char => {
        if (!isNaN(char)) {
            stack.push(char);
        } else {
            const [num2, num1] = [stack.pop(), stack.pop()];
            const result = (oper[char].fn(num1, num2)).toString();
            stack.push(result);
        };
    });

    if (stack[0].includes('-') && stack[0][0] !== '-') {
        return shuntingYard(stack[0]);
    } else {
    let expression = stack.toString();
    return expression;
    };
};



