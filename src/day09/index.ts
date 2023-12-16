import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(" ").map(Number));

  return input
    .map((line) => {
      let last = line[line.length - 1];
      while (!line.every((i) => i === 0)) {
        line = line
          .map((_, index, self) => self[index + 1] - self[index])
          .filter((i) => !isNaN(i));
        last += line[line.length - 1];
      }
      return last;
    })
    .reduce((prev, cur) => prev + cur, 0);
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
