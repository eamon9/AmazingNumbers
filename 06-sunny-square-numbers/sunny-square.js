// sunny and square numbers

import {validateInput, handleEnterKeyPress} from "../util.js";

const MAX_SPACES = 3;

const checkInput = () => {
  validateInput(MAX_SPACES);
};

document.addEventListener("DOMContentLoaded", () => {
  handleEnterKeyPress(checkInput);
  document.getElementById("checkBtn").addEventListener("click", () => {
    checkInput();
    /* const resultDiv = document.getElementById("input-display");
    resultDiv.scrollIntoView({behavior: "smooth"}); */
  });

  //document.querySelector(".alert-button").addEventListener("click", closeAlert);
});
