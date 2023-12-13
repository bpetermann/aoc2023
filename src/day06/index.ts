import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  let [t, d] = parseInput(rawInput).split("\n");
  const times = t.split(":")[1].split(" ").map(Number).filter(Boolean);
  const distances = d.split(":")[1].split(" ").map(Number).filter(Boolean);

  let total = 1;

  times.map((time, index) => {
    let wins = 0;

    for (let i = 0; i < time; i++) {
      wins += (time - i) * i > distances[index] ? 1 : 0;
    }

    total *= wins;
  });

  return total;
};

const part2 = (rawInput: string) => {
  let [t, d] = parseInput(rawInput).split("\n");
  const times = [+t.split(":")[1].split(" ").join("")];
  const distances = [+d.split(":")[1].split(" ").join("")];

  let total = 1;

  times.map((time, index) => {
    let wins = 0;

    for (let i = 0; i < time; i++) {
      wins += (time - i) * i > distances[index] ? 1 : 0;
    }

    total *= wins;
  });

  return total;
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
