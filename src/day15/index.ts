import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split(",");

  const getHashValue = (input: string) => {
    let currenValue = 0;

    for (let i = 0; i < input.length; i++) {
      currenValue += input[i].charCodeAt(0);
      currenValue *= 17;
      currenValue = currenValue % 256;
    }

    return currenValue;
  };

  return input.map((i) => getHashValue(i)).reduce((prev, cur) => prev + cur, 0);
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
