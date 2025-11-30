const resultInput = document.getElementById('result');
const buttons = document.querySelector('.buttons');

let currentInput = '0';
let operator = null;
let previousInput = null;

buttons.addEventListener('click', (e) => {
    const value = e.target.dataset.value;
    if (!value) return;

    if (!isNaN(value)) {
        if (currentInput === '0') {
            currentInput = value;
        } else {
            currentInput += value;
        }
        resultInput.value = currentInput;
        return;
    }

    if (value === '.') {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            resultInput.value = currentInput;
        }
        return;
    }

    if (value === 'C') {
        currentInput = '0';
        operator = null;
        previousInput = null;
        resultInput.value = '0';
        return;
    }

    if (value === '=') {
        if (operator && previousInput !== null) {
            const result = calculate(previousInput, currentInput, operator);
            currentInput = result.toString();
            operator = null;
            previousInput = null;
            resultInput.value = currentInput;
        }
        return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
        if (operator && previousInput !== null) {
            previousInput = calculate(previousInput, currentInput, operator);
        } else {
            previousInput = currentInput;
        }
        operator = value;
        currentInput = '0';
    }
});

function calculate(a, b, op) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    if (op === '+') return num1 + num2;
    if (op === '-') return num1 - num2;
    if (op === '*') return num1 * num2;
    if (op === '/') return num2 === 0 ? 0 : num1 / num2;
}
