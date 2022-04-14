const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function updateDisplay() {
    display.value = calculator.displayValue;
}

updateDisplay();

function performCalculation(operator) {
    const value = parseFloat(calculator.displayValue);
    if (calculator.firstOperand == null) {
        calculator.firstOperand = value;
    } else if (calculator.operator) {
        const result = calculator.operator(calculator.firstOperand, value);
        calculator.displayValue = result;
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = operator;
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let key = button.innerText;
        if (key === 'AC') {
            calculator.displayValue = '0';
            calculator.firstOperand = null;
            calculator.waitingForSecondOperand = false;
            calculator.operator = null;
        } else if (key == '=') {
            performCalculation(calculator.operator);
        } else if (key == '+' || key == '-' || key == 'x' || key == '÷') {
            if(key == 'x') key = '*'
            if(key == '÷') key = '/'
            performCalculation(new Function('a, b', `return a ${key} b`));
        } else if (key === '.') {
            if (!calculator.displayValue.includes('.')) {
                calculator.displayValue += '.';
            }
        } else if (key == '+/-') {
            calculator.displayValue = calculator.displayValue * -1;
        } else if (key == "%") {
            calculator.displayValue = calculator.displayValue / 100;
        } else if (key == "help") {
            
        } else {
            if (calculator.waitingForSecondOperand) {
                calculator.displayValue = key;
                calculator.waitingForSecondOperand = false;
            } else {
                calculator.displayValue =
                    calculator.displayValue === '0' ? key : calculator.displayValue + key;
            }
        }
        updateDisplay();
    })
})