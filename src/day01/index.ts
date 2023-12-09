import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  let output = 0;

  parseInput(rawInput)
    .split("\n")
    .forEach((line) => {
      const first = line.split("").find((item) => !isNaN(+item));
      const last = line.split("").findLast((item) => !isNaN(+item));
      if (first && last) {
        output += +(first + last);
      }
    });

  return output;
};

const part2 = (rawInput: string) => {
  const replacements: { [k: string]: string } = {
    one: "o-1-e",
    two: "t-2-o",
    three: "t-3-e",
    four: "f-4-r",
    five: "f-5-e",
    six: "s-6-x",
    seven: "s-7-n",
    eight: "e-8-t",
    nine: "n-9-e",
  };

  return parseInput(rawInput)
    .split("\n")
    .map((line) => {
      let clean = line;
      for (const key in replacements) {
        clean = clean.replace(new RegExp(key, "gi"), replacements[key]);
      }
      
      const first = clean.split("").find((item) => !isNaN(+item));
      const last = clean.split("").findLast((item) => !isNaN(+item));

      if (first && last) {
        return +(first + last);
      } else {
        return 0;
      }
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
