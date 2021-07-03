const screen = document.getElementById("screen");
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const cleanerButton = document.getElementById("ac");
const removeButton = document.getElementById("remove");
const dot = document.getElementById("dot");
const equal = document.getElementById("result");

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let resetable = false;

function add(a, b){
  return a + b;
}

function substract(a, b){
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, param) {
  let ab = Number(a);
  let bb = Number(b);
  switch (param) {
    case "+":
      return add(ab, bb);
    case "-":
      return substract(ab, bb);
    case "x":
      return multiply(ab, bb);
    case "/":
      if (b === 0) return null;
      else return divide(ab, bb);
    default:
      return null;
  }
}

function roundNumber(param) {
  return Number((param).toFixed(1));
}

function cleanScreen() {
  screen.textContent = "";
  resetable = false;
}

function cleaner() {
  screen.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
}

function addComma() {
  if (resetable) cleanScreen;
  if (screen.textContent === "") screen.textContent = "0";
  if (screen.textContent.includes(".")) return;
  screen.textContent += ".";
}

function deleteNumber() {
  screen.textContent = screen.textContent.toString().slice(0, -1);
}

function setOperator(operator) {
  if (currentOperator !== null) valuate();
  firstNumber = screen.textContent;
  currentOperator = operator;
  resetable = true;
}

function valuate() {
  if (currentOperator === null || resetable) return;
  if (currentOperator === "/" && screen.textContent === "0") {
    screen.textContent = "NaN";
    setTimeout(500);
    cleaner();
    return;
  }
  secondNumber = screen.textContent;
  screen.textContent = roundNumber(operate(firstNumber, secondNumber, currentOperator));
  currentOperator = null;
}

function addNumber(number) {
  if (screen.textContent === "0" || resetable) cleanScreen();
  screen.textContent += number;
}

equal.addEventListener("click", valuate);
cleanerButton.addEventListener("click", cleaner);
removeButton.addEventListener("click", cleanScreen);
dot.addEventListener("click", addComma);

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", () => addNumber(numbers[i].textContent));
};

for (let a = 0; a < operators.length; a++) {
  operators[a].addEventListener("click", () => setOperator(operators[a].textContent));
};



// Thanks Michael for help.