const display = document.getElementById('display');
const historyBtn = document.getElementById('historyBtn');
const historyList = document.getElementById('historyList');
const historySection = document.getElementById('history');
let expression = '';
let history = [];

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Handle clear button
        if (value === 'C') {
            expression = '';
            display.value = '';
        } 
        // Handle equals button
        else if (value === '=') {
            try {
                expression = expression.replace('sin', 'Math.sin');
                expression = expression.replace('cos', 'Math.cos');
                expression = expression.replace('tan', 'Math.tan');
                expression = expression.replace('log', 'Math.log10');
                expression = expression.replace('√', 'Math.sqrt');
                expression = expression.replace('^', '**');

                // Evaluate the expression
                display.value = eval(expression);
                
                // Add result to history
                history.push(`${expression} = ${display.value}`);
                updateHistory();

                // Reset expression to the result
                expression = display.value;
            } catch {
                display.value = 'Error';
            }
        } 
        // Handle backspace button
        else if (value === '⌫') {
            expression = expression.slice(0, -1);
            display.value = expression;
        } 
        // Append value to expression
        else {
            expression += value;
            display.value = expression;
        }
    });
});

// Update history list
function updateHistory() {
    historyList.innerHTML = '';
    history.forEach(calc => {
        const li = document.createElement('li');
        li.textContent = calc;
        historyList.appendChild(li);
    });
}

// Toggle history visibility
historyBtn.addEventListener('click', () => {
    historySection.classList.toggle('hidden');
});
