import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const times = input
    .split("\n")[0]
    .split(":")[1]
    .split(" ")
    .map(Number)
    .filter(Boolean);
  const distances = input
    .split("\n")[1]
    .split(":")[1]
    .split(" ")
    .map(Number)
    .filter(Boolean);

  let total = 1;

  times.map((time, index) => {
    const distanceToBeat = distances[index];
    let wins = 0;

    new Array(time).fill(time).forEach((time, index) => {
      wins += (time - index) * index > distanceToBeat ? 1 : 0;
    });

    total *= wins;
  });

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const times = [+input.split("\n")[0].split(":")[1].split(" ").join("")];
  const distances = [+input.split("\n")[1].split(":")[1].split(" ").join("")];

  let total = 1;

  times.map((time, index) => {
    let wins = 0;
    let distanceEnchancer = 0;
    let timeLeft = time;

    for (let i = 0; i < time; i++) {
      timeLeft -= i;
      distanceEnchancer += i;

      if (timeLeft * distanceEnchancer > distances[index]) {
        wins += 1;
      }
      timeLeft = time;
      distanceEnchancer = 0;
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
