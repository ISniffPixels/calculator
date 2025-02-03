'use strict';

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const assignButton = document.querySelector('[data-assign]');
const deleteButton = document.querySelector('[data-delete]');
const dotButton = document.querySelector('[data-dot]');
const clearAllButton = document.querySelector('[data-clear-all]');
const previousNumberText = document.querySelector('[data-previous-operand]');
const currentNumberText = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(previousNumberText, currentNumberText){
        this.previousNumberText = previousNumberText;
        this.currentNumberText = currentNumberText;
        this.clear();
    }

    // CLASS METHODS (FUNCTIONS)
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(operand) {
        if(operand === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + operand.toString();
    }

    chooseOperation(operator) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        };
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prevNumber = parseFloat(this.previousOperand);
        const curNumber = parseFloat(this.currentOperand);
        if(isNaN(prevNumber) || isNaN(curNumber)) return;

        switch (this.operator) {
            case '+':
                computation = prevNumber + curNumber;
                break;
            case '-':
                computation = prevNumber - curNumber;
                break;
            case '*':
                computation = prevNumber * curNumber;
                break;
            case '/':
                if (curNumber === 0) {
                    this.currentOperand = "Terrence Howard Says Hello!";
                    this.operator = undefined;
                    this.previousOperand = '';
                    return;
                }
                computation = prevNumber / curNumber;
                break;
    
            default:
                return;
        }
        this.currentOperand = computation;
        this.operator = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        if (isNaN(this.currentOperand)) {
            this.currentNumberText.innerText = this.currentOperand; // STRING ERROR MESSAGE
        } else {
            this.currentNumberText.innerText = this.getDisplayNumber(this.currentOperand);
        }
    
        if (this.operator != null) {
            this.previousNumberText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`;
        } else {
            this.previousNumberText.innerText = '';
        }
    }
}

const calculator = new Calculator(previousNumberText, currentNumberText);

numberButtons.forEach(btns => {
    btns.addEventListener('click', ()=> {
        calculator.appendNumber(btns.innerText);
        calculator.updateDisplay();
    });
});

operatorButtons.forEach(btns => {
    btns.addEventListener('click', ()=> {
        calculator.chooseOperation(btns.innerText);
        calculator.updateDisplay();
    });
});

assignButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearAllButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

dotButton.addEventListener('click', () => {
    calculator.appendNumber('.');
    calculator.updateDisplay();
});