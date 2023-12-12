import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((line) => {
      const [winner, cards] = line.split("|");
      const extractNumbers = (str: string) =>
        str.trim().split(" ").map(Number).filter(Boolean);
      return {
        winners: extractNumbers(winner.split(":")[1]),
        cards: extractNumbers(cards),
      };
    });

  let result = 0;

  input.forEach(({ winners, cards }) => {
    const points = cards
      .map((i) => (winners.includes(i) ? 1 : 0))
      .reduce((acc: number, cur) => acc + cur, 0);

    points > 1 ? (result += 2 ** (points - 1)) : (result += points);
  });

  return result;
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
