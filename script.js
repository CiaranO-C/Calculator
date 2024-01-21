
let userEntry = document.querySelector('#display');
const btnContainer = document.querySelector('#button-container');
const operBtns = document.querySelectorAll('.oper');

const equals = document.querySelector('#equals');
equals.addEventListener('click', ()=>{
    const result = shuntingYard(userEntry.textContent);
    userEntry.textContent = result;
})

btnContainer.addEventListener('click', button => {
   if(button.target.id !== 'button-container'){
    if(button.target.id !== 'equals' && button.target.id !== 'cancel') {
    userEntry.textContent += button.target.textContent;
   };

   if(button.target.classList.contains('oper')){
    operBtns.forEach(btn => btn.style.color = 'white');
    button.target.style.color = 'orange';
   } else {
    operBtns.forEach(btn => btn.style.color = 'white');
   };

   if(button.target.id === 'cancel') userEntry.textContent = ''; 
   };
});

/*const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    if(button.id !== 'equals' && button.id !== 'cancel') {
       button.addEventListener('click', event =>{userEntry.textContent += event.target.textContent;});
    };

    if(button.classList.contains('oper')){
        button.addEventListener('click', event =>{
            operBtns.forEach(btn => btn.style.color = 'white');
            event.target.style.color = 'orange'; 
        });
    } else operBtns.forEach(btn => btn.style.color = 'white');

    if(button.id === 'cancel') {
        button.addEventListener('click', () => userEntry.textContent = '');    
    };
});*/



function add(numOne, numTwo) {
    const a = Number(numOne);
    const b = Number(numTwo);
    const result = (a+b).toString()
    console.log(result);
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
    '/': {
        fn: divide,
        prec: 2,
    },
};


function shuntingYard(infixExpr) {
    const expr = infixExpr.split('');
    const output = [];
    const stack = [];
    let accum = '';
    //POOOOOO
    for (let i = 0; i<expr.length; i++){
        if (isNaN(expr[i])) {
            if (expr[i] === '(' || !stack.length || stack[stack.length - 1] === '(') {
                stack.push(expr[i]);
            } else if (expr[i] !== ')') {
               while (stack[stack.length-1] !== '(' && stack.length && oper[expr[i]].prec <= oper[stack[stack.length - 1]].prec){
                    output.push(stack.pop());
                };
                stack.push(expr[i]);
            } else {
                while(stack[stack.length-1] !== '('){
                    output.push(stack.pop());
                };
                stack.pop();
            }
        } else {
            //if next char is number, add to accumulate
            if(!isNaN(expr[i+1])){
                accum += expr[i];
            } else {
                //next char is oper, check if last digit else single digit num
                if(accum){
                    accum+=expr[i];
                    output.push(accum);
                    accum = '';
                } else output.push(expr[i]);
            };
        };
        console.log(`outp(${i+1}) ${output}`);
        console.log(`stak(${i+1}) ${stack}`);
    };

    while (stack.length) {
        output.push(stack.pop());
    };

    console.log(output.join('')); //postfix expression

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



