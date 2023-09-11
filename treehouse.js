const fs = require("fs");

const filePath = "./data.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const lines = data.split("\n").map((line) => line.trim());

  const matrix = [];

  for (const line of lines) {
    const row = line.split("").map(Number);
    matrix.push(row);
  }

  let checkCol = "";
  let checkRow = "";
  let checkRowArr = [];
  let checkColArr = [];
  let getCount = 0;
  const columns = [];

  for (let colIndex = 0; colIndex < matrix[0].length; colIndex++) {
    const column = [];
    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      column.push(matrix[rowIndex][colIndex]);
    }
    columns.push(column);
  }

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const value = matrix[row][col];
      if (
        row > 0 &&
        col > 0 &&
        col != matrix[row].length - 1 &&
        row != matrix.length - 1
      ) {
        checkRowArr = matrix[row].map((element, index) => {
          if (index === col) {
            return element;
          } else {
            return element >= matrix[row][col];
          }
        });

        checkColArr = columns[col].map((element, index) => {
          if (index === row) {
            return element;
          } else {
            return element >= matrix[row][col];
          }
        });

        checkRow = checkArray(getNeighbors(checkRowArr, matrix[row][col]));
        checkCol = checkArray(getNeighbors(checkColArr, matrix[row][col]));

        checkConditions(checkRow, checkCol) ? null : (getCount += 1);
      }
    }
  }
  const getOuterTreeCount = matrix.length * 2 + (matrix[0].length - 2) * 2;
  console.log(getCount + getOuterTreeCount);
});

function getNeighbors(array, value) {
  const neighbors = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      const leftNeighbors = [];
      const rightNeighbors = [];

      for (let j = i - 1; j >= 0; j--) {
        leftNeighbors.push(array[j]);
      }

      for (let j = i + 1; j < array.length; j++) {
        rightNeighbors.push(array[j]);
      }

      neighbors.push(leftNeighbors, rightNeighbors);
    }
  }

  return neighbors;
}

function checkArray(array) {
  const hasTrueInBoth = array[0].includes(true) && array[1].includes(true);
  return hasTrueInBoth;
}

function checkConditions(a, b) {
  return !(a === false || b === false) && !(a === false && b === false);
}
