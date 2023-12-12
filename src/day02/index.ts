import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((i) => {
      const [game, rounds] = i.split(":");
      return {
        game: +game.split(" ")[1],
        rounds: rounds.trim(),
      };
    });

  let total = 0;

  type Color = "blue" | "red" | "green";

  const cubeLimit: { [k in Color]: number } = {
    blue: 14,
    red: 12,
    green: 13,
  };

  const isRoundPossible = (str: string) => {
    return !str.split(",").some((i) => {
      const [amount, color] = i.trim().split(" ");
      return cubeLimit[color as Color] < +amount;
    });
  };

  input.map(({ game, rounds }) => {
    const allRounds = rounds.split(";").map((round) => {
      return isRoundPossible(round);
    });

    if (allRounds.findIndex((i) => i === false) === -1) {
      total += game;
    }
  });

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((i) => ({ rounds: i.split(":")[1].trim() }));

  let total = 0;

  type Color = "blue" | "red" | "green";

  const requiredCubes: { [k in Color]: number } = {
    blue: 0,
    red: 0,
    green: 0,
  };

  const reset = () => {
    requiredCubes["blue"] = 0;
    requiredCubes["red"] = 0;
    requiredCubes["green"] = 0;
  };

  const getRequiredCubes = (str: string) => {
    str.split(",").forEach((i) => {
      const [amount, color] = i.trim().split(" ");
      if (requiredCubes[color as Color] < +amount) {
        requiredCubes[color as Color] = +amount;
      }
    });
  };

  input.forEach(({ rounds }) => {
    rounds.split(";").forEach((round) => {
      getRequiredCubes(round);
    });
    const { red, blue, green } = requiredCubes;
    total += blue * red * green;
    reset();
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
