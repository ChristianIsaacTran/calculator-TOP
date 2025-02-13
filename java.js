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
    console.log("OPERATE CALLED ON: " + operator);
    console.log("Operand 1: " + operand1);
    console.log("Operand 2: " + operand2);
    switch (operator) {
        case "+":
            console.log("RESULT: " + add(operand1, operand2));
            return add(operand1, operand2);
        case "-":
            console.log("RESULT: " + subtract(operand1, operand2));
            return subtract(operand1, operand2);
        case "*":
            console.log("RESULT: " + multiply(operand1, operand2));
            return multiply(operand1, operand2);
        case "/":
            console.log("RESULT: " + divide(operand1, operand2));
            return divide(operand1, operand2);
    }
}

//step 4: creating basic HTML calculator with buttons with each digit and operators including the (=) 
//Done in HTML

//step 5: Create functions that populate the display when clicking the digit buttons.
//      - Should store content of the display (the number) in a variable for use in the next step
const calcDisplay = document.querySelector(".displayContent");
let displayStored = ""; //Used to store the display of the calculator for use in the next step

function displayChangeDigits() {
    const numNodeList = document.querySelectorAll(".num");
    numNodeList.forEach((digitButton) => {
        digitButton.addEventListener("click", function () {
            //Checks if the calculator error'd out. If true, then do not allow user to type more numbers.
            if (errorActivated === false) {
                //Resets the display and math expression if the equals sign has been used already for new calculation
                if (equalsUsed === true) {
                    reset();
                    displayStored += digitButton.textContent;
                    calcDisplay.textContent = displayStored;
                    equalsUsed = false;
                }
                else {
                    if (continuousExpression === true && equalsUsed === false) {
                        if (continuousExpression === true) {
                            displayStored = "";
                            continuousExpression = false;
                        }
                        displayStored += digitButton.textContent;
                        calcDisplay.textContent = displayStored;


                    }
                    else {
                        displayStored += digitButton.textContent;
                        calcDisplay.textContent = displayStored;
                    }
                }
            }
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

//function to reset calculator and boolean flags
function reset() {
    displayStored = "";
    calcDisplay.textContent = "";
    operationDisplay.textContent = "";
    operand1 = 0;
    operand2 = 0;
    operator = "";
    equalsUsed = false;
    operationClicked = 0;
    errorActivated = false;
    continuousExpression = false;

}

//function to check if user has empty display
function displayEmpty() {
    if (displayStored === "") {
        return 0;
    }
    else {
        return parseInt(displayStored);
    }
}


//Clear button resets the calculator display and variables back to empty string
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", reset);

//Addition button
/*
1. store operator chosen
2. store first operand
3. make sure when pressing operator repeatedly, store the display into operand 1
*/
//A counter to check if the operator button has been clicked twice in quick succession
let operationClicked = 0;

//A boolean flag to tell if the calculator error'd out
let errorActivated = false;

//A boolean flag to tell if the user is continuously adding to the expression by pressing the operator
let continuousExpression = false;

const addButton = document.querySelector(".add");
addButton.addEventListener("click", function () {
    operationClicked++;

    //If the user clicked this button from a different button, do the previous operation first and assign result to operand1
    if (operationClicked > 1 && operator != "+") {
        operand2 = displayEmpty();
        displayStored = operate(operand1, operator, operand2);
        calcDisplay.textContent = displayStored;
        operand1 = displayEmpty();
        operationDisplay.textContent = "Operation: Addition";
        operator = "+";
        continuousExpression = true;
        return;
    }

    //If the user keeps adding things to the math expression, then calculate and use result in next operation
    if (operationClicked > 1 && equalsUsed === false) {

        operationDisplay.textContent = "Operation: Addition";
        operator = "+";
        operand2 = displayEmpty();
        if (equalsUsed === true) {
            equalsUsed = false;
            operand1 = parseInt(displayStored);
        }

        displayStored = "";
        calcDisplay.textContent = displayStored;
        displayStored = operate(operand1, operator, operand2);
        calcDisplay.textContent = displayStored;
        operand1 = displayEmpty();
        operationClicked = 1;
        continuousExpression = true;
    }
    else {
        //Store the operator and the operand 1 to use (even if it is blank, then use 0) 
        operationDisplay.textContent = "Operation: Addition";
        operator = "+";
        operand1 = displayEmpty(); //If the display is left empty "" then tell it to store 0 in operand1

        //Allows the result to be used in the next operation
        if (equalsUsed === true) {
            equalsUsed = false;
            operand1 = parseInt(displayStored);
        }

        displayStored = "";
        calcDisplay.textContent = displayStored;
    }

});

//Subtraction button
const subButton = document.querySelector(".sub");
subButton.addEventListener("click", function () {
    operationClicked++;

    //If the user clicked this button from a different button, do the previous operation first and assign result to operand1
    if (operationClicked > 1 && operator != "-") {
        operand2 = displayEmpty();
        displayStored = operate(operand1, operator, operand2);
        calcDisplay.textContent = displayStored;
        operand1 = displayEmpty();
        operationDisplay.textContent = "Operation: Subtraction";
        operator = "-";
        continuousExpression = true;
        return;
    }

    //If the user keeps adding things to the math expression, then calculate and use result in next operation
    if (operationClicked > 1 && equalsUsed === false) {

        operationDisplay.textContent = "Operation: Subtraction";
        operator = "-";
        operand2 = displayEmpty();
        if (equalsUsed === true) {
            equalsUsed = false;
            operand1 = parseInt(displayStored);
        }

        displayStored = "";
        calcDisplay.textContent = displayStored;
        displayStored = operate(operand1, operator, operand2);
        calcDisplay.textContent = displayStored;
        operand1 = displayEmpty();
        operationClicked = 1;
        continuousExpression = true;
    }
    else {
        //Store the operator and the operand 1 to use (even if it is blank, then use 0) 
        operationDisplay.textContent = "Operation: Subtraction";
        operator = "-";
        operand1 = displayEmpty(); //If the display is left empty "" then tell it to store 0 in operand1

        //Allows the result to be used in the next operation
        if (equalsUsed === true) {
            equalsUsed = false;
            operand1 = parseInt(displayStored);
        }

        displayStored = "";
        calcDisplay.textContent = displayStored;
    }
});

//Multiplication button
const multButton = document.querySelector(".mult");
multButton.addEventListener("click", function () {
    operationClicked++;

    //If the user clicked this button from a different button, do the previous operation first and assign result to operand1
    if (operationClicked > 1 && operator != "*") {
        operand2 = displayEmpty();
        displayStored = operate(operand1, operator, operand2);
        calcDisplay.textContent = displayStored;
        operand1 = displayEmpty();
        operationDisplay.textContent = "Operation: Multiplication";
        operator = "*";
        continuousExpression = true;
        return;
    }

    //If the user keeps adding things to the math expression, then calculate and use result in next operation
    if (operationClicked > 1 && equalsUsed === false) {

        operationDisplay.textContent = "Operation: Multiplication";
        operator = "*";
        operand2 = displayEmpty();
        if (equalsUsed === true) {
            equalsUsed = false;
            operand1 = parseInt(displayStored);
        }

        displayStored = "";
        calcDisplay.textContent = displayStored;
        displayStored = operate(operand1, operator, operand2);
        calcDisplay.textContent = displayStored;
        operand1 = displayEmpty();
        operationClicked = 1;
        continuousExpression = true;
    }
    else {
        //Store the operator and the operand 1 to use (even if it is blank, then use 0) 
        operationDisplay.textContent = "Operation: Multiplication";
        operator = "*";
        operand1 = displayEmpty(); //If the display is left empty "" then tell it to store 0 in operand1

        //Allows the result to be used in the next operation
        if (equalsUsed === true) {
            equalsUsed = false;
            operand1 = parseInt(displayStored);
        }

        displayStored = "";
        calcDisplay.textContent = displayStored;
    }
});

//Division button
const divisButton = document.querySelector(".divis");
divisButton.addEventListener("click", function () {
    operationClicked++;

    //If the user clicked this button from a different button, do the previous operation first and assign result to operand1
    if(operationClicked > 1 && operator != "/"){
        operand2 = displayEmpty();
        displayStored = operate(operand1, operator, operand2);
        calcDisplay.textContent = displayStored;
        operand1 = displayEmpty();
        operationDisplay.textContent = "Operation: Division";
        operator = "/";
        continuousExpression = true;
        return;
    }
    
    //If the user keeps adding things to the math expression, then calculate and use result in next operation
    if (operationClicked > 1 && equalsUsed === false) {

        operationDisplay.textContent = "Operation: Division";
        operator = "/";
        operand2 = displayEmpty();
        if (equalsUsed === true) {
            equalsUsed = false;
            operand1 = parseInt(displayStored);
        }

        displayStored = "";
        calcDisplay.textContent = displayStored;
        displayStored = operate(operand1, operator, operand2);
        calcDisplay.textContent = displayStored;
        operand1 = displayEmpty();
        operationClicked = 1;
        continuousExpression = true;
    }
    else {
        //Store the operator and the operand 1 to use (even if it is blank, then use 0) 
        operationDisplay.textContent = "Operation: Division";
        operator = "/";
        operand1 = displayEmpty(); //If the display is left empty "" then tell it to store 0 in operand1

        //Allows the result to be used in the next operation
        if (equalsUsed === true) {
            equalsUsed = false;
            operand1 = parseInt(displayStored);
        }

        displayStored = "";
        calcDisplay.textContent = displayStored;
    }
});

//Equals button (Evaluate button) 
/*
1. store second operand2 
2. call operate() function to evaluate the current selected operation
3. display the results in the calculator display.
*/
//boolean variable to prevent multiple calculations with = button
let equalsUsed = false;

const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", function () {
    //If there is no operation and the user presses equals, then error out.
    if (operationClicked === 0) {
        errorActivated = true;
        calcDisplay.textContent = "ERROR";
        operationDisplay.textContent = "ERROR";
    }

    //As long as there is no error and the equals hasn't been used
    if (equalsUsed === false && errorActivated === false) {
        operand2 = displayEmpty(); //Check if display is left empty "" then assign operand2 to 0
        equalsUsed = true;
        operationClicked = 0;
        displayStored = operate(operand1, operator, operand2);
        calcDisplay.textContent = displayStored;
        operationDisplay.textContent = "";
    }
});