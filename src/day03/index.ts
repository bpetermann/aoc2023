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
  const input = parseInput(rawInput);

  return;
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
