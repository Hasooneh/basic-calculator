let resultDisplay = {
  input: document.querySelector(".calc-head input"),
}

let calculator = {
  buttons: document.querySelectorAll("button"),

  logic: {
    numberClickedLast: false,
    operatorClickedLast:true,
    calcClickedLast:true,
    lastNumberEntered: "",
    inputs: [],
  },

  checkBtnType(btn) {
    if (btn.name == "num" &&
    this.logic.numberClickedLast == false) {
      this.numberBtnClicked(btn);
    } else if (btn.name == "oper" &&
    this.logic.operatorClickedLast == false) {
      this.operatorClicked(btn);
    } else if (btn.name == "equal" &&
      this.logic.calcClickedLast == false) {
      this.calculateResult();
    } else if (btn.name == "delete") {
      this.clearInput();
    }
    console.log(this.logic.inputs);
  },

  numberBtnClicked(btn) {
    this.updateDisplay(btn.value);

    this.updateOperatorLogic(false);

    this.logic.lastNumberEntered += btn.value;

    this.logic.calcClickedLast = false;
  },

  operatorClicked(operator) {

    if (this.logic.lastNumberEntered != "") {
      this.logic.inputs.push(this.logic.lastNumberEntered);
    }

    this.logic.lastNumberEntered = "";

    this.logic.inputs.push(operator.value);

    this.updateDisplay(operator.value);

    this.updateOperatorLogic(true);
    this.logic.numberClickedLast = false;
  },

  calculateResult() {

    this.logic.inputs.push(this.logic.lastNumberEntered);

    console.log(this.logic.inputs);

    while (this.logic.inputs.length > 1) {

      if (this.logic.inputs.includes("*") || this.logic.inputs.includes("/")) {
        let index = this.logic.inputs.findIndex(cur => cur == "*" || cur == "/");

        if (this.logic.inputs[index] == "*") {
          this.logic.inputs[index - 1] = Number(this.logic.inputs[index - 1]) * Number(this.logic.inputs[index + 1]);

          this.logic.inputs.splice(index,2);
          } else {
           this.logic.inputs[index - 1] = Number(this.logic.inputs[index - 1]) / Number(this.logic.inputs[index + 1]);

           this.logic.inputs.splice(index,2);
         }
      } else if (this.logic.inputs.includes("+") || this.logic.inputs.includes("-")) {
          let index = this.logic.inputs.findIndex(cur => cur == "+" || cur == "-");
          console.log(index);
          if (this.logic.inputs[index] == "+") {
            this.logic.inputs[index - 1] = Number(this.logic.inputs[index - 1]) + Number(this.logic.inputs[index + 1]);

            this.logic.inputs.splice(index,2);
            } else {
             this.logic.inputs[index - 1] = Number(this.logic.inputs[index - 1]) - Number(this.logic.inputs[index + 1]);

             this.logic.inputs.splice(index,2);
           }
      }
    }
    this.clearDisplay();
    this.showResult(this.logic.inputs);
    this.logic.lastNumberEntered = "";
    this.logic.calcClickedLast = true;
    this.logic.numberClickedLast = true;
    this.logic.operatorClickedLast = false;
  },

  updateDisplay(value) {
    resultDisplay.input.value += value;
  },
  showResult(num) {
    num = String(num);
    console.log(num);
    if (num.includes(".")) {
     let numberSplit = num.split(".");
     let roundedNumber = numberSplit[0] + "." + Math.floor(Number("0." + numberSplit[1]) * 10);
     this.updateDisplay(roundedNumber);
   } else {
     this.updateDisplay(num);
   }
  },
  clearInput() {
    this.clearDisplay();
    this.logic.lastNumberEntered = "";
    this.logic.inputs= [];
    this.logic.numberClickedLast = false;
    this.logic.operatorClickedLast = true;
    this.logic.calcClickedLast = true;
  },
  clearDisplay() {
    resultDisplay.input.value = "";
  },
  updateOperatorLogic(boolean) {
    this.logic.operatorClickedLast = boolean;
  },
}


calculator.buttons.forEach(btn => btn.addEventListener("click", function () {
  calculator.checkBtnType(this);
}));
