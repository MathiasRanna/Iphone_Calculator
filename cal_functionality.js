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
        this.currVal = "0";
        this.prevVal = null;
        this.currOperation = null;
        this.updateDisplay();
        this.currVal = null;
    }

    delete() {
        this.currVal = "0";
        this.updateDisplay();
        this.currVal = null;
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
        } else {
            this.currVal = "Error";
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
        document.getElementById('C-btn').innerHTML = "C";
        highlight(button.parentNode, "#474747");
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
        // Change operator color back to normal if not null
        if (calculator.currOperation != null) {
            operation.forEach(operator => {
                operator.parentNode.style.background = "#f69906";
                operator.style.color = "#ffffff";
            })
        }
    })
})

/* Operations */
operation.forEach(operator => {
    operator.addEventListener("click", () => {
        calculator.chooseOperator(operator.innerHTML);
        operator.parentNode.style.background = "#ffffff";
        operator.style.color = "#f69906";
    })
})

/* Equals button */
equalsButton.addEventListener("click", () => {
    calculator.compute();
})

/* Clear Button */
document.getElementById('C-btn').addEventListener("click", () => {
    if (document.getElementById('C-btn').innerHTML === "AC") {
        calculator.clear();
    } else {
        calculator.delete();
        document.getElementById('C-btn').innerHTML = "AC";
    }
})

/* Highlight when click */
function highlight(obj, color_code) {
    const orig = obj.style.background;
    obj.style.background = color_code;
    setTimeout(function () {
        obj.style.background = orig;
    }, 100);


}

