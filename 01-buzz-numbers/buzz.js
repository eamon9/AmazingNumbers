// buzz numbers

import {
  showAlert,
  MAX_VALUE,
  isOddNumber,
  isNaturalNumber,
  handleEnterKeyPress,
} from "../util.js";

const userInput = document.getElementById("user-input");
const inputDisplay = document.getElementById("input-display");
const reviewDisplay = document.getElementById("review-display");
let explanationMessage = "";

const checkNumber = () => {
  const value = parseInt(userInput.value, 10);

  if (isNaN(value)) {
    showAlert(`Please enter a valid number!`);
    userInput.value = "";
    return;
  }

  if (!isNaturalNumber(value)) {
    showAlert(`This number is not natural!`);
    userInput.value = "";
    return;
  }

  if (Number.isInteger(value) && value >= 1 && value <= MAX_VALUE) {
    inputDisplay.textContent = value;
    displayReviewMessage(value);

    userInput.value = "";
  } else {
    showAlert(`Please enter a valid non-negative integer [1-${MAX_VALUE}].`);
    userInput.value = "";
  }
};

function isBuzzNumber(value) {
  if (value.toString().slice(-1) === "7" && value % 7 === 0) {
    explanationMessage = `is divisible by 7 and ends with 7.`;
  } else if (value.toString().slice(-1) === "7") {
    explanationMessage = `ends with 7.`;
  } else if (value % 7 === 0) {
    explanationMessage = `is divisible by 7.`;
  } else {
    explanationMessage = `is neither divisible by 7 nor does it end with 7.`;
  }

  return value.toString().slice(-1) === "7" || value % 7 === 0;
}

function displayReviewMessage(value) {
  let message = "";

  message += isOddNumber(value)
    ? `This number is Odd.\n`
    : `This number is Even.\n`;

  message += isBuzzNumber(value)
    ? `It is a Buzz number.\nExplanation:\n`
    : `It is not a Buzz number.\nExplanation:\n`;

  message += explanationMessage;

  reviewDisplay.innerHTML = message.replace(/\n/g, "<br>");

  return message;
}

document.addEventListener("DOMContentLoaded", () => {
  handleEnterKeyPress(checkNumber);
  document.getElementById("checkBtn").addEventListener("click", checkNumber);
});
