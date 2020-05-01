let result = [];
let beforeInput = [];
let operator = null;

const resultBox = document.querySelector(".result-btn");
const cBtn = document.querySelector(".c-btn");
const equalBtn = document.querySelector(".equal");
const numBtns = document.querySelectorAll(".numbers");
const processBtns = document.querySelectorAll(".process");

const processing = newValue => {
    if (operator === "+") {
        return Number(beforeInput[0]) + Number(newValue);
    }
    if (operator === "-") {
        return Number(beforeInput[0]) - Number(newValue);
    }
    if (operator === "*") {
        return Number(beforeInput[0]) * Number(newValue);
    }
    if (operator === "/") {
        return Number(beforeInput[0]) / Number(newValue);
    }
};

cBtn.addEventListener("click", () => {
    result = [];
    beforeInput = [];
    resultBox.innerHTML = "0";
});

numBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const newValue = btn.value;
        result.length === 0
            ? (result = [newValue])
            : (result[0] = result[0] + newValue);
        resultBox.innerHTML = result;
    });
});

processBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        operator = btn.value;
        if (beforeInput.length === 0) {
            beforeInput = [result[0]];
            result = [];
        } else {
            result.length === 0
                ? (result = ["0"])
                : (result = [`${processing(result[0])}`]);
            resultBox.innerHTML = result[0];
            beforeInput = result;
            result = [];
        }
    });
});

equalBtn.addEventListener("click", () => {
    result = [`${processing(result[0])}`];
    resultBox.innerHTML = result[0];
    beforeInput = [];
});
