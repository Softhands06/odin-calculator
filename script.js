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

// Operate Function
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

// Variables 
var currentInput = '';
var num1 = null;
var currentOperator = null;
var display = document.getElementById('display');

// Function to update display
function updateDisplay(value) {
    display.value = value;
}

// Function to handle number button clicks
function handleNumberClick(value) {
    currentInput += value; // Append the clicked number
    updateDisplay(currentInput);
}

// Function to handle operator button clicks
function handleOperatorClick(operator) {
    if (currentInput === '') return; // Prevent operation if no number is entered

    if (num1 === null) {
        num1 = parseFloat(currentInput);
    } else if (currentOperator) {
        // If an operator was already selected, calculate the result
        num1 = operate(currentOperator, num1, parseFloat(currentInput));
        updateDisplay(num1);
    }

    currentOperator = operator; // Set the new operator
    currentInput = ''; // Clear current input for next number
}

// Function to handle equals button click
function handleEqualsClick() {
    if (currentInput === '' || num1 === null || currentOperator === null) return;

    var result = operate(currentOperator, num1, parseFloat(currentInput));
    updateDisplay(result);
    // Reset for the next calculation
    num1 = result; // Store the result for the next operation
    currentInput = ''; // Clear current input
    currentOperator = null; // Reset operator
}

// Function to handle clear button click
function handleClearClick() {
    currentInput = '';
    num1 = null;
    currentOperator = null;
    updateDisplay('');
}

// listeners to number buttons
var numberButtons = document.querySelectorAll('.btn:not(.operator)');
numberButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        handleNumberClick(button.getAttribute('data-value'));
    });
});

// listeners to operator buttons
var operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        handleOperatorClick(button.getAttribute('data-value'));
    });
});

// listeners for equals and clear buttons
document.getElementById('equal').addEventListener('click', handleEqualsClick);
document.getElementById('clear').addEventListener('click', handleClearClick);