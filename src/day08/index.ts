import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const [i, n] = parseInput(rawInput).split("\n\n");
  const instructions = i.split("");
  const nodes = n.split("\n").map((i) => ({
    start: i.split(" ")[0],
    L: i.split("(")[1].split(",")[0],
    R: i.split(", ")[1].split(")")[0],
  }));

  const getNextNode = (
    node: string,
  ): { start: string; L: string; R: string } => {
    return nodes.find((i) => i.start === node) as {
      start: string;
      L: string;
      R: string;
    };
  };

  let start = getNextNode("AAA");
  let index = 0;
  let steps = 0;

  while (start.start !== "ZZZ") {
    start = getNextNode(instructions[index] === "L" ? start.L : start.R);

    index = index + 1 < instructions.length ? index + 1 : 0;

    steps += 1;
  }

  return steps;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
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
