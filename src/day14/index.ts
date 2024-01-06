import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((i) => i.split(""));

  let count = input.length;

  while (count) {
    for (let i = 1; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] === "O" && input[i - 1][j] === ".") {
          input[i][j] = ".";
          input[i - 1][j] = "O";
        }
      }
    }
    count--;
  }

  return input
    .map(
      (i, idx) =>
        (input.length - idx) * i.filter((item) => item === "O").length,
    )
    .reduce((acc, cum) => acc + cum, 0);
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
