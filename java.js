/*
2/6/2025 - This is the final project of the foundations course. It took a while to get here, keep it going. 
Remember to think about each feature as it's own thing and break down the problem in steps before coding.
Ask for help in the odin project discord if needed. Also try to branch new features out.

Use cases for the project:
1. Calculator will contain functions for all basic math operations:
    - add
    - subtract
    - multiply 
    - divide
2. calculator operation will consist of a number, an operator, and another number.
    - Advice is to create three variables, each variable representing one part of the operation.
    - Using these variables to update display later
3. Create new function operate that takes operator and two numbers and then calls one of the above functions on the numbers
4. Create a basic HTML calculator with buttons for each digit and operator including an (=) button
    - Do not have to make them functional just yet
    - Should be a display for the calculator. Can fill with dummy numbers for now
    - Should also have a "clear" button.
5. Create functions that populate the display when clicking the digit buttons. 
    - Should store the content of display (the number) in a variable for next step
6. Make the calculator work! Need to store first and second numbers input by the user and then operate() on them when the 
user presses the (=) button, according to the operator that was selected between the numbers.
    - Should already have the code that can populate display, so once operate() has been called, 
    update the display with the result of the operation.
    - You need to figure out how to store all the values and call the operate function with them.
7. Gotchas: watch out for and fix these bugs if they show up in code:
    - calculator should not evaluate more than a single pair of numbers at a time.
    - should roundd answers with long decimals to not overflow in the display
    - Pressing (=) before entering all the numbers could cause problems
    - Pressing clear should wipe out any data. Make sure that the user is starting fresh if pressing clear
    - Display a snarky error message if user tries to divide by 0, do not let it crash calculator
    - Calculator only runs IF there is two numbers and an operator. If you press
    an operator twice, it will not do a calculation. (pressing 2 + + does not equal 2 + 2 = 4, it should wait until another number is given)
Extra credits located on TOP calculator page: https://www.theodinproject.com/lessons/foundations-calculator
    */

//Step 1: basic add, subtract, multiply, and divide functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "Bruh.";
    }
    return Math.round((num1 / num2) * 10000) / 10000; //round to the nearest 4th decimal place
}

//step 2: create 3 variables that represent a part of the calculator operation
let operand1 = 0;
let operator = "";
let operand2 = 0;

//step 3: Create a function that takes the operator and two numbers then performs the operation on the numbers (call it operate()) by
//calling the functions made above in step 1.
function operate(operand1, operator, operand2) {
    switch (operator) {
        case "+":
            return add(operand1, operand2);
        case "-":
            return subtract(operand1, operand2);
        case "*":
            return multiply(operand1, operand2);
        case "/":
            return divide(operand1, operand2);
    }
}

//step 4: creating basic HTML calculator with buttons with each digit and operators including the (=) 
//Done in HTML

//step 5: Create functions that populate the display when clicking the digit buttons.
//      - Should store content of the display (the number) in a variable for use in the next step
const calcDisplay = document.querySelector(".displayContent");
let displayStored = ""; //Used to store the display of the calculator for use in the next step

function displayChangeDigits(){
    const numNodeList = document.querySelectorAll(".num");
    numNodeList.forEach((digitButton) => { //Assign event listener for every digit button so that display changes to number pressed
        digitButton.addEventListener("click", function() {
            displayStored += digitButton.textContent;
            calcDisplay.textContent = displayStored;
        });
    });
}

displayChangeDigits();

//Step 6: Make the calculator work.

/* 
1. When pressing operator button store what operation I am doing
2. Find a way to store operator 1 and operator 2
3. When pressing equals button, call operate() with operand 1, operand 2, and the operation
4. Add functionality to other buttons, but work on operation buttons for now.
*/

//Used to display to user what operation is currently selected before pressing "="
const operationDisplay = document.querySelector(".operationBox"); 

//Clear button resets the calculator display and variable back to empty string
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", function() {
    displayStored = "";
    calcDisplay.textContent = "";
    operationDisplay = "";
    operand1 = 0;
    operand2 = 0;
    operator = "";
});

//Addition button
/*
1. store operator chosen
2. store first operand
3. make sure when pressing operator repeatedly, do not store over first operand again
*/
const addButton = document.querySelector(".add");
addButton.addEventListener("click", function() {
    operationDisplay.textContent = "Operation: Addition";
    operator = "+";
});

//Subtraction button
const subButton = document.querySelector(".sub");
subButton.addEventListener("click", function() {
    operationDisplay.textContent = "Operation: Subtraction";
    operator = "-";
});

//Multiplication button
const multButton = document.querySelector(".mult");
multButton.addEventListener("click", function() {
    operationDisplay.textContent = "Operation: Multiplication";
    operator = "*";
});

//Division button
const divisButton = document.querySelector(".divis");
divisButton.addEventListener("click", function() {
    operationDisplay.textContent = "Operation: Division";
    operator = "/";
});

//Equals button (Evaluate button) 
const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", function(){

});