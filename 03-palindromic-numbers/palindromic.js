// palindromic numbers

import {
  showAlert,
  MAX_VALUE,
  isOddNumber,
  isNaturalNumber,
  isBuzzNumber,
  isDuckNumber,
  isPalindromicNumber,
  isGapfulNumber,
  isSpyNumber,
  isSunnyNumber,
  isSquareNumber,
  handleEnterKeyPress,
} from "../util.js";

const userInput = document.getElementById("user-input");
const inputDisplay = document.getElementById("input-display");
const reviewDisplay = document.getElementById("review-display");

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
    inputDisplay.textContent = `Properties of ${value}\n`;
    displayReviewMessage(value);

    userInput.value = "";
  } else {
    showAlert(`Please enter a valid non-negative integer [1-${MAX_VALUE}].`);
    userInput.value = "";
  }
};

function displayReviewMessage(value) {
  let message = ``;

  message += `even: ${!isOddNumber(value)}\nodd: ${isOddNumber(value)}\n`;

  message += `buzz: ${isBuzzNumber(value)}\nduck: ${isDuckNumber(value)}\n`;

  message += `palindromic: ${isPalindromicNumber(value)}\n`

  message += `gapful: ${isGapfulNumber(value)}\n`

  message += `spy: ${isSpyNumber(value)}\n`

  message += `sunny: ${isSunnyNumber(value)}\n`;

  message += `square: ${isSquareNumber(value)}\n`;

  reviewDisplay.innerHTML = message.replace(/\n/g, "<br>");

  return message;
}

document.addEventListener("DOMContentLoaded", () => {
  handleEnterKeyPress(checkNumber);
  document.getElementById("checkBtn").addEventListener("click", checkNumber);
});
