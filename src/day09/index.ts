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
  const input = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(" ").map(Number));

  const extrapolateBackwards = (arr: number[]): number => {
    const reversed = arr.reverse();

    let leftMostHistory = reversed[0];
    for (let i = 1; i < reversed.length; i++) {
      leftMostHistory = reversed[i] - leftMostHistory;
    }
    return leftMostHistory;
  };

  return input
    .map((line) => {
      let beginningNumbers = [line[0]];
      while (!line.every((i) => i === 0)) {
        line = line
          .map((_, index, self) => self[index + 1] - self[index])
          .filter((i) => !isNaN(i));
        beginningNumbers.push(line[0]);
      }

      return extrapolateBackwards(beginningNumbers);
    })
    .reduce((prev, cur) => prev + cur, 0);
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
