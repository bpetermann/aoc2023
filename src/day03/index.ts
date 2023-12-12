import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  let output = 0;

  const input = parseInput(rawInput)
    .split("\n")
    .map((row) => row.trim().split(""));

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (!isNaN(+input[i][j])) {
        let potentialPartNumber = input[i][j - 1] || "";
        let startPosition = j - 1 >= 0 ? j - 1 : j;

        while (!isNaN(+input[i][j])) {
          potentialPartNumber += input[i][j];
          j += 1;
        }

        potentialPartNumber += input[i][j] || "";
        const endPosition = j + 1;

        const below =
          input[i - 1]?.slice(startPosition, endPosition)?.join("") || "";
        const above =
          input[i + 1]?.slice(startPosition, endPosition)?.join("") || "";

        if (/[^0-9.]/.test(below.concat(potentialPartNumber, above))) {
          output += +(potentialPartNumber.match(/\d+/) || [0])[0];
        }
      }
    }
  }

  return output;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((row) => row.trim().split(""));

  const isAsterisk = (str: string) => {
    return str === "*";
  };

  const gearArray: { values: number[]; position: number[] }[] = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (!isNaN(+input[i][j])) {
        let number = "";
        let position: number[] = [];

        if (i + 1 <= input.length - 1 && isAsterisk(input[i + 1][j - 1])) {
          position = [i + 1, j - 1];
        } else if (i - 1 >= 0 && isAsterisk(input[i - 1][j - 1])) {
          position = [i - 1, j - 1];
        } else if (isAsterisk(input[i][j - 1])) {
          position = [i, j - 1];
        }

        while (!isNaN(+input[i][j])) {
          number += input[i][j];

          if (i + 1 <= input.length - 1 && isAsterisk(input[i + 1][j])) {
            position = [i + 1, j];
          } else if (i - 1 >= 0 && isAsterisk(input[i - 1][j])) {
            position = [i - 1, j];
          }

          j += 1;
        }

        if (i + 1 <= input.length - 1 && isAsterisk(input[i + 1][j])) {
          position = [i + 1, j];
        } else if (i - 1 >= 0 && isAsterisk(input[i - 1][j])) {
          position = [i - 1, j];
        } else if (isAsterisk(input[i][j])) {
          position = [i, j];
        }

        if (position.length === 2) {
          const foundObj = gearArray.find(
            (obj) =>
              obj.position[0] === position[0] &&
              obj.position[1] === position[1],
          );

          if (foundObj) {
            foundObj.values.push(+number);
          } else {
            gearArray.push({
              values: [+number],
              position,
            });
          }
        }
      }
    }
  }

  return gearArray
    .filter((obj) => obj.values.length === 2)
    .reduce(
      (acc, obj) => acc + obj.values.reduce((prod, val) => prod * val, 1),
      0,
    );
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
