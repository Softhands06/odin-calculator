// Step 1: Define Math Functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("You can't divide by zero!");
        return null;
    }
    return a / b;
}

// Step 2: Define the Operate Function
function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return null;
    }
}

// Step 3: Declare Variables
let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let shouldResetDisplay = false;

const display = document.getElementById('display');

// Step 4: Handle Button Clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value >= '0' && value <= '9') {
            if (shouldResetDisplay) {
                display.value = '';
                shouldResetDisplay = false;
            }
            display.value += value;
        } else if (value === 'C') {
            clearCalculator();
        } else if (value === '=') {
            if (firstNumber && currentOperator && display.value) {
                secondNumber = display.value;
                const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
                display.value = result;
                firstNumber = result; // Update firstNumber to the result
                secondNumber = '';
                currentOperator = '';
                shouldResetDisplay = true;
            }
        } else {
            // Handle operator buttons
            if (!firstNumber) {
                firstNumber = display.value; // Set firstNumber if it's not already set
            } else if (currentOperator && display.value) {
                secondNumber = display.value;
                const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
                display.value = result;
                firstNumber = result; // Update firstNumber to the result
                secondNumber = ''; // Reset secondNumber
            }
            currentOperator = value; // Update the current operator
        }
    });
});

// Clear function
function clearCalculator() {
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    display.value = '';
    shouldResetDisplay = false;
}