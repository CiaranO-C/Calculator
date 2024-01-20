let userEntry = '4+4*2/(1-5)';

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
'%': percentOf,
};


function shuntingYard (infixExpr) {
    const expr = infixExpr.split('');
    const output = [];
    const operators = []; 
    expr.forEach(char => {
        if(isNaN(char)){
            if(char === '(' || !operators.length || operators[operators.length-1] === '('){
                operators.push(char);
            } else if(char !== ')' && operators.length){
                (oper[char].prec > oper[operators[operators.length-1]].prec)
                ? operators.push(char)
                : (output.push(operators.pop()), operators.push(char));
            } else {
                output.push(operators.pop());
                operators.pop();
            }
        }else {
            output.push(char);
        }
        console.log(`out: ${output}`);
        console.log(`oper: ${operators}`);
    });

    while (operators.length) {
    output.push(operators.pop());
    };

    console.log(output);
};



