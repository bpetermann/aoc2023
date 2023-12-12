import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const allSeeds = input.split("\n")[0].split("seeds:")[1].trim().split(" ");

  type Index = 1 | 2 | 3 | 4 | 5 | 6 | 7;

  const almanac: { [k in Index]: string } = {
    1: "seed-to-soil map:",
    2: "soil-to-fertilizer map:",
    3: "fertilizer-to-water map:",
    4: "water-to-light map:",
    5: "light-to-temperature map:",
    6: "temperature-to-humidity map:",
    7: "humidity-to-location map:",
  };

  const sourceToDestination = (index: Index, convert: number): number => {
    const almanacEntry = input
      .split(almanac[index])[1]
      .split(almanac[(index + 1) as Index] || "\n\n")[0]
      .split("\n")
      .map((row) => row.split(" "));

    for (const entry of almanacEntry) {
      const [destination, source, range] = entry.map(Number);
      if (source <= convert && convert < source + range) {
        const difference = convert - source;
        return destination + difference;
      }
    }

    return convert;
  };

  let output = Infinity;

  allSeeds.forEach((seed) => {
    let convert = +seed;
    for (const key in almanac) {
      convert = sourceToDestination(parseInt(key) as Index, convert);
    }
    if (convert < output) output = convert;
  });

  return output;
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
