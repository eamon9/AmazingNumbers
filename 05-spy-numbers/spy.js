// spy numbers

import {validateInput, handleEnterKeyPress} from "../util.js";

const MAX_SPACES = 2;

const checkInput = () => {
  validateInput(MAX_SPACES);
};

document.addEventListener("DOMContentLoaded", () => {
  handleEnterKeyPress(checkInput);
  document.getElementById("checkBtn").addEventListener("click", () => {
    checkInput();
  });
});
