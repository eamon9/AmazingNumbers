// Side / Burger Menu Functionality
const burgerMenu = document.getElementById("burgerMenu");
const sideMenu = document.getElementById("sideMenu");

if (burgerMenu && sideMenu) {
  burgerMenu.addEventListener("click", (event) => {
    sideMenu.classList.toggle("open");
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (
      !sideMenu.contains(event.target) &&
      !burgerMenu.contains(event.target)
    ) {
      sideMenu.classList.remove("open");
    }
  });
}

// Info and Description Section with toogle info look
const taskInfo = document.getElementById("taskInfo");
const description = document.querySelector(".description");
const toggleText = document.querySelector(".toogle-text");

if (toggleText && description && taskInfo) {
  toggleText.addEventListener("click", () => {
    taskInfo.classList.toggle("cirkle-sides");
    description.classList.toggle("active");
  });

  taskInfo.addEventListener("click", () => {
    taskInfo.textContent = taskInfo.textContent === "i." ? "info" : "i.";
    taskInfo.classList.toggle("hidden");

    if (taskInfo.textContent === "info") {
      setTimeout(() => {
        taskInfo.classList.remove("hidden");
        taskInfo.classList.add("visible");
      }, 500);
    }
  });
}

// INPUT Section
const userInput = document.getElementById("user-input");
const inputDisplay = document.getElementById("input-display");
const reviewDisplay = document.getElementById("review-display");

export const displayReviewMessage = (value) => {
  let message = `${value} is `;
  if (isBuzzNumber(value)) message += `buzz, `;
  if (isDuckNumber(value)) message += `duck, `;
  if (isPalindromicNumber(value)) message += `palindromic, `;
  if (isGapfulNumber(value)) message += `gapful, `;
  if (isSpyNumber(value)) message += `spy, `;
  if (isSunnyNumber(value)) message += `sunny, `;
  if (isSquareNumber(value)) message += `square, `;
  if (isJumpingNumber(value)) message += `jumping, `;
  message += isOddNumber(value) ? `odd\n` : `even\n`;

  return message;
};

export const displayReviewMessageWithOneParameter = (value) => {
  let message = `even: ${!isOddNumber(value)}\nodd: ${isOddNumber(value)}\n`;
  message += `buzz: ${isBuzzNumber(value)}\nduck: ${isDuckNumber(value)}\n`;
  message += `palindromic: ${isPalindromicNumber(value)}\n`;
  message += `gapful: ${isGapfulNumber(value)}\n`;
  message += `spy: ${isSpyNumber(value)}\n`;
  message += `sunny: ${isSunnyNumber(value)}\n`;
  message += `square: ${isSquareNumber(value)}\n`;
  message += `jumping: ${isJumpingNumber(value)}\n`;

  return message;
};

// VALIDATE INPUT and properties check
export const validateInput = (maxAllowedSpaces) => {
  const spaces = (userInput.value.match(/\s+/g) || []).length;

  const paramTexts = [
    "Too many parameters...\n",
    "* First parameter represents a starting number",
    "* Second parameter shows how many consecutive numbers are to be printed",
    "* Third parameter shows what type of amazing number to present",
    "* Fourth parameter shows second type to add on search",
  ];

  if (spaces > maxAllowedSpaces) {
    return displayErrorAndClearReview(
      paramTexts.slice(0, spaces + 1).join("\n")
    );
  }

  const inputs = userInput.value.trim().toUpperCase().split(" ");
  const [value, consecutives = 1, ...propertiesArr] = inputs;
  const consecutiveCount = Number(consecutives);
  const tempValue = Number(value);

  validate1stParam(tempValue);
  validate2ndParam(consecutiveCount);

  if (spaces >= 2) {
    handleUnlimitedPropertiesCheck(tempValue, consecutiveCount, propertiesArr);
  }

  if (spaces === 1 || spaces === 0) {
    handleConsecutiveCheck(tempValue, consecutiveCount);
  }
};

const handleConsecutiveCheck = (tempValue, consecutiveCount) => {
  let message = "";
  for (let i = 0; i < consecutiveCount && tempValue <= MAX_VALUE; i++) {
    message += checkNumber(tempValue);
    tempValue++;
  }
  reviewDisplay.innerHTML = message.replace(/\n/g, "<br>");
};

const validProperties = (propertiesArr) => {
  for (let property of propertiesArr) {
    if (!(property in allNumberFunctions)) {
      return false;
    }
  }
  return true;
};

// 12 2 even buzz gapful sunny
// 1 2 buzz even gapful sunny

const handleUnlimitedPropertiesCheck = (
  tempValue,
  consecutiveCount,
  propertiesArr
) => {
  let message = "";

  if (
    validProperties(propertiesArr) &&
    isNotMutuallyExclusiveProperties(propertiesArr)
  ) {
    const functionsArr = propertiesArr.map(
      (property) => allNumberFunctions[property]
    );

    let countAllPropertyFinds = 0;

    while (countAllPropertyFinds < consecutiveCount) {
      const allPropertiesPass = functionsArr.every((func) => func(tempValue));

      if (allPropertiesPass) {
        countAllPropertyFinds++;
        message += checkNumber(tempValue);
      }
      tempValue++;
    }
    reviewDisplay.innerHTML = message.replace(/\n/g, "<br>");
  } else if (!validProperties(propertiesArr)) {
    propertiesArr.map((property) => validateProperty(property));
  } else {
    displayErrorAndClearReview(
      `The request contains mutually exclusive properties: [${mutualExclusiveProperties}]`
    );
  }
};

// CHECK NUMBER
export const MAX_VALUE = 1000000;

export const checkNumber = (value) => {
  value = Number(value);

  if (!isNumberValid(value)) {
    return displayErrorAndClearReview("Please enter a valid number!");
  }

  if (value > MAX_VALUE) {
    displayErrorAndClearReview(
      `Please enter a valid non-negative integer [1-${MAX_VALUE}].`
    );

    return (reviewDisplay.textContent = ``);
  }

  if (value >= 1 && value <= MAX_VALUE) {
    const valuesArr = userInput.value.split(" ");
    const [firstValue, secondValue, ...propertiesArr] = valuesArr;
    const countSpaces = (userInput.value.match(/\s+/g) || []).length;

    if (countSpaces >= 2) {
      inputDisplay.textContent = `
      Start from [${firstValue}] print next ${secondValue} numbers with properties [${propertiesArr.map(
        (property) => property.toUpperCase()
      )}]`;
    } else if (countSpaces === 1) {
      inputDisplay.textContent = `From ${firstValue} To ${
        Number(firstValue) + Number(secondValue)
      }`;
    } else {
      inputDisplay.textContent = `Properties of ${firstValue}`;
      return displayReviewMessageWithOneParameter(value);
    }

    return displayReviewMessage(value);
  } else {
    return displayErrorAndClearReview(
      `.Please enter a valid non-negative integer [1-${MAX_VALUE}].`
    );
  }
};

// Number Validation Functions
export const availablePropertiesArr = [
  "EVEN",
  "ODD",
  "BUZZ",
  "DUCK",
  "PALINDROMIC",
  "GAPFUL",
  "SPY",
  "SUNNY",
  "SQUARE",
  "JUMPING",
];

const mutuallyExclusivePairs = {
  EVEN: "ODD",
  ODD: "EVEN",
  DUCK: "SPY",
  SPY: "DUCK",
  SUNNY: "SQUARE",
  SQUARE: "SUNNY",
};

export const isNumberValid = (value) => {
  return !isNaN(value) && isNaturalNumber(value);
};

export const validate1stParam = (param) => {
  if (!isNumberValid(param)) {
    displayErrorAndClearReview(
      `The first parameter is wrong.\nPlease enter a valid starting number.`
    );
  }
};

export const validate2ndParam = (param) => {
  if (!isNumberValid(param)) {
    displayErrorAndClearReview(
      `The second parameter is wrong.\nPlease enter a valid number of consecutives.`
    );
  }
};

export const validateProperty = (property) => {
  if (!availablePropertiesArr.includes(property)) {
    displayErrorAndClearReview(
      `The property [${property}] is wrong.\nAvailable properties: [${availablePropertiesArr.join(
        ", "
      )}]`
    );
  }
};

let mutualExclusiveProperties = "";

export const isNotMutuallyExclusiveProperties = (...propertiesArr) => {
  mutualExclusiveProperties = "";
  propertiesArr = propertiesArr.flat();

  for (let i = 0; i < propertiesArr.length; i++) {
    for (let j = i + 1; j < propertiesArr.length; j++) {
      const property1 = propertiesArr[i];
      const property2 = propertiesArr[j];

      if (
        mutuallyExclusivePairs[property1] === property2 ||
        property1 === property2
      ) {
        console.log(property1, property2);
        mutualExclusiveProperties += `${property1}, ${property2}`;
        return false;
      }
    }
  }

  return true;
};

// Number Functions
export const allNumberFunctions = {
  EVEN: (value) => !isOddNumber(value),
  ODD: (value) => isOddNumber(value),
  BUZZ: (value) => isBuzzNumber(value),
  DUCK: (value) => isDuckNumber(value),
  PALINDROMIC: (value) => isPalindromicNumber(value),
  GAPFUL: (value) => isGapfulNumber(value),
  SPY: (value) => isSpyNumber(value),
  SUNNY: (value) => isSunnyNumber(value),
  SQUARE: (value) => isSquareNumber(value),
  JUMPING: (value) => isJumpingNumber(value),
};

export function isNaturalNumber(value) {
  return value > 0 && Number.isInteger(value);
}

export function isOddNumber(value) {
  return value % 2 !== 0;
}

export function isBuzzNumber(value) {
  return value % 7 === 0 || value.toString().endsWith("7");
}

export function isDuckNumber(value) {
  return value.toString().includes("0");
}

export function isPalindromicNumber(value) {
  const reversed = value.toString().split("").reverse().join("");
  return value.toString() === reversed;
}

export function isGapfulNumber(value) {
  const valueStr = value.toString();
  if (valueStr.length >= 3) {
    const firstAndLastCharPair = Number(
      valueStr[0] + valueStr[valueStr.length - 1]
    );
    return value % firstAndLastCharPair === 0;
  }
  return false;
}

export function isSpyNumber(value) {
  const valueToNumArr = value.toString().split("").map(Number);
  const sum = valueToNumArr.reduce((total, num) => total + num);
  const product = valueToNumArr.reduce((total, num) => total * num);
  return sum === product;
}

export function isSunnyNumber(value) {
  value++;
  const squareOfValue = Math.sqrt(value);
  return squareOfValue % 1 === 0;
}

export function isSquareNumber(value) {
  const squareOfValue = Math.sqrt(value);
  return squareOfValue % 1 === 0;
}

export function isJumpingNumber(value) {
  const valueToNumArr = value.toString().split("").map(Number);

  for (let i = 1; i < valueToNumArr.length; i++) {
    const number = valueToNumArr[i - 1];
    const secondNum = valueToNumArr[i];

    if (number - secondNum === 1 || secondNum - number === 1) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

// press Enter for executing checkNumber
export function handleEnterKeyPress(callback) {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      callback();
    }
  });
}

export function enterKeyListener(event) {
  if (event.key === "Enter") {
    closeAlert();
  }
}

// Alert Functions
export function showAlert(message) {
  let alertOverlay = document.getElementById("alertOverlay");

  // checks if alert overlay exists
  if (!alertOverlay) {
    alertOverlay = document.createElement("div");
    alertOverlay.id = "alertOverlay";
    alertOverlay.className = "alert-overlay";

    const alertBox = document.createElement("div");
    alertBox.className = "custom-alert";

    const alertMessage = document.createElement("p");
    alertMessage.id = "alertMessage";
    alertMessage.innerHTML = message;

    const btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "alert-button";
    cancelBtn.innerText = "Close";

    cancelBtn.addEventListener("click", closeAlert);

    btnContainer.appendChild(cancelBtn);
    alertBox.appendChild(alertMessage);
    alertBox.appendChild(btnContainer);
    alertOverlay.appendChild(alertBox);
    document.body.appendChild(alertOverlay);

    document.addEventListener("keydown", enterKeyListener);
  }

  const alertMessage = document.getElementById("alertMessage");
  alertMessage.innerHTML = message.replace(/\n/g, "<br>");
  alertOverlay.style.display = "flex";
}

export function closeAlert() {
  const alertOverlay = document.getElementById("alertOverlay");
  if (alertOverlay) {
    document.body.removeChild(alertOverlay);
    document.removeEventListener("keydown", enterKeyListener);
    alertOverlay.style.display = "none";
  }
}

export const displayErrorAndClearReview = (msg) => {
  showAlert(msg);
  inputDisplay.textContent = msg;
  reviewDisplay.textContent = "";
};
