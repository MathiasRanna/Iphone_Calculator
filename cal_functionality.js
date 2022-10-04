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
        if (this.currVal !== ""){
            this.prevVal = this.currVal;
        }
        this.currVal = "";
    }

    compute() {
        if (this.currVal !== ""){
            if (this.currOperation === "÷") {
                this.currVal = this.round(parseFloat(this.prevVal) / parseFloat(this.currVal));
            } else if (this.currOperation === "×") {
                this.currVal = this.round(parseFloat(this.prevVal) * parseFloat(this.currVal));
            } else if (this.currOperation === "-") {
                this.currVal = this.round(parseFloat(this.prevVal) - parseFloat(this.currVal));
            } else if (this.currOperation === "+") {
                this.currVal = this.round(parseFloat(this.prevVal) + parseFloat(this.currVal));
            } else {
                this.currVal = "Error";
            }
            this.updateDisplay()
        }
    }

    round(value) {
        const valueStr = value.toString();
        if (valueStr.length > 5) {
            const firstThreeDig = valueStr.substring(0,3);
            const lastDig = (Math.round(parseFloat(valueStr.substring(3,4) + "." + valueStr.substring(4,)))).toString();
            if (value > 1){
                const firstThreeDig = valueStr.substring(0,3);
                const lastDig = (Math.round(parseFloat(valueStr.substring(3,4) + "." + valueStr.substring(4,)))).toString();
                const stepOfTen = valueStr.substring(4,).length
                return firstThreeDig + lastDig + "e" + stepOfTen;
            } else {
                const firstFourDig = valueStr.substring(0,4);
                const lastDig = (Math.round(parseFloat(valueStr.substring(4,5) + "." + valueStr.substring(5,)))).toString();
                return firstFourDig + lastDig;
            }

        }
        return value.toString();
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
        reset_operation_style();
    })
})

document.getElementById('zero-btn').addEventListener("click", () => {
    if (calculator.currVal != null){
        document.getElementById('C-btn').innerHTML = "C";
        highlight(document.getElementById('zero-btn'), "#474747");
        calculator.appendNumber(document.getElementById('zero-btn').children[0].innerHTML);
        calculator.updateDisplay();
    }
})

/* Operations */
operation.forEach(operator => {
    operator.addEventListener("click", () => {
        if (calculator.currOperation != null){
            calculator.compute();
        }
        calculator.chooseOperator(operator.innerHTML);
        highlight_operation(operator);
    })
})

/* Equals button */
equalsButton.addEventListener("click", () => {
    calculator.compute();
    highlight_operation()
})

/* Clear Button */
document.getElementById('C-btn').addEventListener("click", () => {
    highlight(document.getElementById('C-btn').parentNode, "#d6d6d6");
    if (document.getElementById('C-btn').innerHTML === "AC") {
        calculator.clear();
        reset_operation_style();
    } else {
        calculator.delete();
        document.getElementById('C-btn').innerHTML = "AC";
    }
})

/* Change sign button */
document.getElementById('change-sign').addEventListener("click", () => {
    highlight(document.getElementById('change-sign').parentNode, "#d6d6d6");
    if (calculator.currVal != null){
        if (calculator.currVal[0] !== "-"){
            calculator.currVal = "-" + calculator.currVal;
        } else {
            calculator.currVal = calculator.currVal.substring(1);
        }
    }
    calculator.updateDisplay();
})

/* Highlight when click */
function highlight(obj, color_code) {
    const orig = obj.style.background;
    obj.style.background = color_code;
    setTimeout(function () {
        obj.style.background = orig;
    }, 100);
}

/* Highlight operation */
function highlight_operation(operator) {
    if (calculator.currOperation === null) {
        operator.parentNode.style.background = "#ffffff";
        operator.style.color = "#f69906";
    } else {
        reset_operation_style();
        operator.parentNode.style.background = "#ffffff";
        operator.style.color = "#f69906";
    }
}

function reset_operation_style(){
    operation.forEach(operator => {
        operator.parentNode.style.background = "#f69906";
        operator.style.color = "#ffffff";
    })
}
