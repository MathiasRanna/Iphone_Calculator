const numberButtons = document.querySelectorAll('[data-nr]');
const operation = document.querySelectorAll('[operation]');
const equalsButton = document.querySelector('[data-equal]');

class Calculator {
    constructor() {
        this.currVal = null;
        this.prevVal = null;
        this.currOperation = null;
    }

    clear() {
        this.currVal = null;

    }

    delete() {
        this.currVal = "";
    }

    appendNumber(number) {
        this.currVal == null ? this.currVal = number.toString() : this.currVal += number.toString();
    }

    chooseOperator(sign) {
        this.currOperation = sign;
        this.prevVal = this.currVal;
        this.currVal = "";
    }

    compute() {
        if (this.currOperation === "÷") {
            this.currVal = parseInt(this.prevVal) / parseInt(this.currVal);
        } else if (this.currOperation === "×") {
            this.currVal = parseInt(this.prevVal) * parseInt(this.currVal);
        } else if (this.currOperation === "-") {
            this.currVal = parseInt(this.prevVal) - parseInt(this.currVal);
        } else if (this.currOperation === "+") {
            this.currVal = parseInt(this.prevVal) + parseInt(this.currVal);
        }
        this.updateDisplay()
    }

    updateDisplay() {
        document.getElementById("calculator-line-text").innerHTML = this.currVal;
    }

}

const calculator = new Calculator();


/* Numbers */
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
})

/* Operations */
operation.forEach(operator => {
    operator.addEventListener("click", () => {
        // call to calculator obj
        calculator.chooseOperator(operator.innerHTML);
    })
})

/* Equals button */
equalsButton.addEventListener("click", () => {
    calculator.compute();
})

