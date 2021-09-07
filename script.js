const board = [
  null, 0, null, 1, null, 2, null, 3,
  4, null, 5, null, 6, null, 7, null,
  null, 8, null, 9, null, 10, null, 11,
  null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null,
  12, null, 13, null, 14, null, 15, null,
  null, 16, null, 17, null, 18, null, 19,
  20, null, 21, null, 22, null, 23, null
];

const cells = document.querySelectorAll("td");
const primaryCheckers = document.querySelectorAll(".checker-primary");
const secondaryCheckers = document.querySelectorAll(".checker-secondary");
const primaryTurnText = document.querySelectorAll(".text-primary");
const secondaryTurnText = document.querySelectorAll(".text-secondary");
const divider = document.querySelector("#divider");

let turn = true;
let primaryScore = 12;
let secondaryScore = 12;
let playerCheckers;

let selectedField = {
  fieldId: -1,
  indexOfBoardField: -1,
  isKing: false,
  seventhSpace: false,
  ninthSpace: false,
  fourteenthSpace: false,
  eighteenthSpace: false,
  minusSevenSpace: false,
  minusNinthSpace: false,
  minusFourteenthSpace: false,
  minusEighteenthsSpace: false,
};

function giveFieldsEventListeners() {
  if (turn) {
    for (let i = 0; i < primaryCheckers.length; i++) {
      primaryCheckers[i].addEventListener("click", getPlayerField);
      } 
  } else {
    for (let i = 0; i < secondaryCheckers.length; i++) {
      secondaryCheckers[i].addEventListener("click", getPlayerField);
    }
  }
}

function getPlayerField() {
  if (turn) {
    playerCheckers = primaryCheckers;
  } else {
    playerCheckers = secondaryCheckers;
  }
  removeCellOnClick();
  resetBorders();
}

function removeCellOnClick() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeAttribute("onclick");
  }
}

function resetBorders() {
  for (let i = 0; i < playerCheckers.length; i++) {
    playerCheckers[i].style.border = "1px solid white";
  }
  resetSelectedFieldProperties();
  getSelectedField();
}

function resetSelectedFieldProperties() {
  selectedField.fieldId = -1;
  selectedField.isKing = false;
  selectedField.seventhSpace = false;
  selectedField.ninthSpace = false;
  selectedField.fourteenthSpace = false;
  selectedField.eighteenthSpace = false;
  selectedField.minusSeventhSpace = false;
  selectedField.minusNinthSpace = false;
  selectedField.minusFourteenthSpace = false;
  selectedField.minusEighteenthSpace = false;
}

function getSelectedField() {
  selectedField.fieldId = parseInt(event.target.id);
  selectedField.indexOfBoardField = findField(selectedField.fieldId);
  isFieldKing();
}

let findField = (fieldId) => {
  let parsed = parseInt(fieldId);
  return board.indexOf(parsed);
};

function isFieldKing() {
  if (document.getElementById(selectedField.fieldId).classList.contains("king")) {
    selectedField.isKing = true;
  } else {
    selectedField.isKing = false;
  }
  getAvailableSpaces();
}

function getAvailableSpaces() {
  if (board[selectedField.indexOfBoardField + 7] === null && 
      cells[selectedField.indexOfBoardField + 7].classList.contains("empty-field") !== true) {
      selectedField.seventhSpace = true;
  }
  if (board[selectedField.indexOfBoardField + 9] === null && 
      cells[selectedField.indexOfBoardField + 9].classList.contains("empty-field") !== true) {
      selectedField.ninthSpace = true;
  }
  if (board[selectedField.indexOfBoardField - 7] === null && 
      cells[selectedField.indexOfBoardField - 7].classList.contains("empty-field") !== true) {
      selectedField.minusSeventhSpace = true;
  }
  if (board[selectedField.indexOfBoardField - 9] === null && 
      cells[selectedField.indexOfBoardField - 9].classList.contains("empty-field") !== true) {
      selectedField.minusNinthSpace = true;
  }
  checkAvailableJumpSpaces();
}

function checkAvailableJumpSpaces() {
  if (turn) {
      if (board[selectedField.indexOfBoardField + 14] === null 
      && cells[selectedField.indexOfBoardField + 14].classList.contains("empty-field") !== true
      && board[selectedField.indexOfBoardField + 7] >= 12) {
          selectedField.fourteenthSpace = true;
      }
      if (board[selectedField.indexOfBoardField + 18] === null 
      && cells[selectedField.indexOfBoardField + 18].classList.contains("empty-field") !== true
      && board[selectedField.indexOfBoardField + 9] >= 12) {
          selectedField.eighteenthSpace = true;
      }
      if (board[selectedField.indexOfBoardField - 14] === null 
      && cells[selectedField.indexOfBoardField - 14].classList.contains("empty-field") !== true
      && board[selectedField.indexOfBoardField - 7] >= 12) {
          selectedField.minusFourteenthSpace = true;
      }
      if (board[selectedField.indexOfBoardField - 18] === null 
      && cells[selectedField.indexOfBoardField - 18].classList.contains("empty-field") !== true
      && board[selectedField.indexOfBoardField - 9] >= 12) {
          selectedField.minusEighteenthSpace = true;
      }
  } else {
      if (board[selectedField.indexOfBoardField + 14] === null 
      && cells[selectedField.indexOfBoardField + 14].classList.contains("empty-field") !== true
      && board[selectedField.indexOfBoardField + 7] < 12 && board[selectedField.indexOfBoardField + 7] !== null) {
          selectedField.fourteenthSpace = true;
      }
      if (board[selectedField.indexOfBoardField + 18] === null 
      && cells[selectedField.indexOfBoardField + 18].classList.contains("empty-field") !== true
      && board[selectedField.indexOfBoardField + 9] < 12 && board[selectedField.indexOfBoardField + 9] !== null) {
          selectedField.eighteenthSpace = true;
      }
      if (board[selectedField.indexOfBoardField - 14] === null && cells[selectedField.indexOfBoardField - 14].classList.contains("empty-field") !== true
      && board[selectedField.indexOfBoardField - 7] < 12 
      && board[selectedField.indexOfBoardField - 7] !== null) {
          selectedField.minusFourteenthSpace = true;
      }
      if (board[selectedField.indexOfBoardField - 18] === null && cells[selectedField.indexOfBoardField - 18].classList.contains("empty-field") !== true
      && board[selectedField.indexOfBoardField - 9] < 12
      && board[selectedField.indexOfBoardField - 9] !== null) {
          selectedField.minusEighteenthSpace = true;
      }
  }
  checkFieldConditions();
}

function checkFieldConditions() {
  if (selectedField.isKing) {
      giveFieldBorder();
  } else {
      if (turn) {
          selectedField.minusSeventhSpace = false;
          selectedField.minusNinthSpace = false;
          selectedField.minusFourteenthSpace = false;
          selectedField.minusEighteenthSpace = false;
      } else {
          selectedField.seventhSpace = false;
          selectedField.ninthSpace = false;
          selectedField.fourteenthSpace = false;
          selectedField.eighteenthSpace = false;
      }
      giveFieldBorder();
  }
}

function giveFieldBorder() {
  if (selectedField.seventhSpace || selectedField.ninthSpace || selectedField.fourteenthSpace || selectedField.eighteenthSpace
  || selectedField.minusSeventhSpace || selectedField.minusNinthSpace || selectedField.minusFourteenthSpace || selectedField.minusEighteenthSpace) {
      document.getElementById(selectedField.fieldId).style.border = "3px solid green";
      giveCellsClick();
  } else {
      return;
  }
}

function giveCellsClick() {
  if (selectedField.seventhSpace) {
      cells[selectedField.indexOfBoardField + 7].setAttribute("onclick", "makeMove(7)");
  }
  if (selectedField.ninthSpace) {
      cells[selectedField.indexOfBoardField + 9].setAttribute("onclick", "makeMove(9)");
  }
  if (selectedField.fourteenthSpace) {
      cells[selectedField.indexOfBoardField + 14].setAttribute("onclick", "makeMove(14)");
  }
  if (selectedField.eighteenthSpace) {
      cells[selectedField.indexOfBoardField + 18].setAttribute("onclick", "makeMove(18)");
  }
  if (selectedField.minusSeventhSpace) {
      cells[selectedField.indexOfBoardField - 7].setAttribute("onclick", "makeMove(-7)");
  }
  if (selectedField.minusNinthSpace) {
      cells[selectedField.indexOfBoardField - 9].setAttribute("onclick", "makeMove(-9)");
  }
  if (selectedField.minusFourteenthSpace) {
      cells[selectedField.indexOfBoardField - 14].setAttribute("onclick", "makeMove(-14)");
  }
  if (selectedField.minusEighteenthSpace) {
      cells[selectedField.indexOfBoardField - 18].setAttribute("onclick", "makeMove(-18)");
  }
}

function makeMove(number) {
  document.getElementById(selectedField.fieldId).remove();
  cells[selectedField.indexOfBoardField].innerHTML = "";
  if (turn) {
      if (selectedField.isKing) {
          cells[selectedField.indexOfBoardField + number].innerHTML = `<p class="primary-checker king" id="${selectedField.fieldId}"></p>`;
          primaryCheckers = document.querySelectorAll("p");
      } else {
          cells[selectedField.indexOfBoardField + number].innerHTML = `<p class="primary-checker" id="${selectedField.fieldId}"></p>`;
          primaryCheckers = document.querySelectorAll("p");
      }
  } else {
      if (selectedField.isKing) {
          cells[selectedField.indexOfBoardField + number].innerHTML = `<span class="secondary-checker king" id="${selectedField.fieldId}"></span>`;
          secondaryCheckers = document.querySelectorAll("span");
      } else {
          cells[selectedField.indexOfBoardField + number].innerHTML = `<span class="secondary-checker" id="${selectedField.fieldId}"></span>`;
          secondaryCheckers = document.querySelectorAll("span");
      }
  }

  let indexOfField = selectedField.indexOfBoardField
  if (number === 14 || number === -14 || number === 18 || number === -18) {
      changeData(indexOfField, indexOfField + number, indexOfField + number / 2);
  } else {
      changeData(indexOfField, indexOfField + number);
  }
}

function changeData(indexOfBoardField, modifiedIndex, removeField) {
  board[indexOfBoardField] = null;
  board[modifiedIndex] = parseInt(selectedField.fieldId);
  if (turn && selectedField.fieldId < 12 && modifiedIndex >= 57) {
      document.getElementById(selectedField.fieldId).classList.add("king")
  }
  if (turn === false && selectedField.fieldId >= 12 && modifiedIndex <= 7) {
      document.getElementById(selectedField.fieldId).classList.add("king");
  }
  if (removeField) {
      board[removeField] = null;
      if (turn && selectedField.fieldId < 12) {
          cells[removeField].innerHTML = "";
          primaryCheckers--
      }
      if (turn === false && selectedField.fieldId >= 12) {
          cells[removeField].innerHTML = "";
          secondaryCheckers--
      }
  }
  resetselectedFieldProperties();
  removeCellonclick();
  removeEventListeners();
}

function removeEventListeners() {
  if (turn) {
      for (let i = 0; i < primaryCheckers.length; i++) {
          primaryCheckers[i].removeEventListener("click", getPlayerField);
      }
  } else {
      for (let i = 0; i < secondaryCheckers.length; i++) {
          secondaryCheckers[i].removeEventListener("click", getPlayerField);
      }
  }
  checkForWin();
}

function checkForWin() {
  if (primaryCheckers === 0) {
      divider.style.display = "none";
      for (let i = 0; i < primaryTurnText.length; i++) {
          primaryTurnText[i].style.color = "black";
          secondaryTurnText[i].style.display = "none";
          primaryTurnText[i].textContent = "RED WINS!";
      }
  } else if (secondaryCheckers === 0) {
      divider.style.display = "none";
      for (let i = 0; i < secondaryTurnText.length; i++) {            
          secondaryTurnText[i].style.color = "black";
          primaryTurnText[i].style.display = "none";
          secondaryTurnText[i].textContent = "BLACK WINS!";
      }
  }
  changePlayer();
}

function changePlayer() {
  if (turn) {
      turn = false;
      for (let i = 0; i < primaryTurnText.length; i++) {
          primaryTurnText[i].style.color = "lightGrey";
          secondaryTurnText[i].style.color = "black";
      }
  } else {
      turn = true;
      for (let i = 0; i < secondaryTurnText.length; i++) {
          secondaryTurnText[i].style.color = "lightGrey";
          primaryTurnText[i].style.color = "black";
      }
  }
  giveFieldsEventListeners();
}

giveFieldsEventListeners();