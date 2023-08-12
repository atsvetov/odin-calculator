
let calculatorData = {
    isScreenResetState: true,
    storedNum: null,
    operatorFunc: null,
};

function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function pow(a, b)
{
    return a ** b;
}

function divide(a, b)
{
    return a / b;
}

function clear()
{
    calculatorData.storedNum = null;
    calculatorData.operatorFunc = null;
    calculatorData.isScreenResetState = true;
    clearScreen();
}

function isReadyForOp()
{
    return calculatorData.storedNum !== null && calculatorData.operatorFunc !== null;
}

function clearScreen() 
{
    const mainScreen = document.querySelector(".main-screen");
    mainScreen.textContent = 0;
    const intermidiateScreen = document.querySelector(".intermidiate-screen");
    intermidiateScreen.textContent = "";
}

function processOperaionClick(opFunction, opChar)
{
    performOp();
    calculatorData.operatorFunc = opFunction;
    const mainScreen = document.querySelector(".main-screen");
    calculatorData.storedNum = Number(mainScreen.textContent);
    document.querySelector(".intermidiate-screen").textContent = `${calculatorData.storedNum} ${opChar}`;
    calculatorData.isScreenResetState = true;
}

function performOp()
{
    const screen = document.querySelector(".main-screen");
    const currentNum = Number(screen.textContent);
    const intermidiateScreen = document.querySelector(".intermidiate-screen");
    if (isReadyForOp())
    { 
        calculatorData.storedNum = calculatorData.operatorFunc(calculatorData.storedNum, currentNum);
        screen.textContent = calculatorData.storedNum;
        intermidiateScreen.textContent += ` ${currentNum} =`;
    }
    else
    {
        intermidiateScreen.textContent = `${currentNum} =`;
    }

    calculatorData.operatorFunc = null;
    calculatorData.isScreenResetState = true;
}

function processDecimalPointClick()
{
    const screen = document.querySelector(".main-screen");
    if (calculatorData.isScreenResetState)
    {
        screen.textContent = '0.'; 
        calculatorData.isScreenResetState = false;
    }
    else if (!screen.textContent.includes('.'))
    {
        screen.textContent += '.'; 
    }
}

function processNumberClick(numberStr)
{
    const screen = document.querySelector(".main-screen");
    if (calculatorData.isScreenResetState)
    {
        newNumber = Number(numberStr);
        calculatorData.isScreenResetState = false;
    }
    else
    {
        newNumber = Number(screen.textContent + numberStr);
    }
    if (newNumber <= Number.MAX_SAFE_INTEGER)
    {
        screen.textContent = newNumber;
    }
}

function undo()
{
    if (!calculatorData.isScreenResetState)
    {
        const screen = document.querySelector(".main-screen");
        screen.textContent = screen.textContent.slice(0, -1);
    }
}

function processSignButton()
{
    const screen = document.querySelector(".main-screen");
    screen.textContent = -1 * Number(screen.textContent);
}

function start()
{
    const numberButtons = document.querySelectorAll(".number-button");
    numberButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            processNumberClick(e.target.innerText);
        });
    });

    const decimaplPointButton = document.querySelector(".decimal-point-button");
    decimaplPointButton.addEventListener("click", () => {
        processDecimalPointClick();
    });

    const clearButton = document.querySelector(".clear-button");
    clearButton.addEventListener("click", () => {
        clear();
    });

    document.querySelector(".add-button").addEventListener("click", (e) => { processOperaionClick(add, e.target.innerText); });
    document.querySelector(".multiply-button").addEventListener("click", (e) => { processOperaionClick(multiply, e.target.innerText); });
    document.querySelector(".divide-button").addEventListener("click", (e) => { processOperaionClick(divide, e.target.innerText); });
    document.querySelector(".subtract-button").addEventListener("click", (e) => { processOperaionClick(subtract, e.target.innerText); });
    document.querySelector(".pow-button").addEventListener("click", () => { processOperaionClick(pow, "^"); });
    document.querySelector(".equal-button").addEventListener("click", () => { performOp(); });
    document.querySelector(".undo-button").addEventListener("click", () => { undo(); } );
    document.querySelector(".sign-button").addEventListener("click", () => { processSignButton(); });
}

start();