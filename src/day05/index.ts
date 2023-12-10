import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const allSeeds = input.split("\n")[0].split("seeds:")[1].trim().split(" ");

  let output = Infinity;

  type IndexRange = 1 | 2 | 3 | 4 | 5 | 6 | 7;

  const tableOfContents: { [k in IndexRange]: string } = {
    1: "seed-to-soil map:",
    2: "soil-to-fertilizer map:",
    3: "fertilizer-to-water map:",
    4: "water-to-light map:",
    5: "light-to-temperature map:",
    6: "temperature-to-humidity map:",
    7: "humidity-to-location map:",
  };

  const sourceToDestination = (index: IndexRange, convert: number): number => {
    const category = input
      .split(tableOfContents[index])[1]
      .split(tableOfContents[(index + 1) as IndexRange] || "\n\n")[0]
      .split("\n")
      .map((row) => row.split(" "));

    let result: number = convert;

    category.forEach((cat) => {
      const source = +cat[1];
      const destination = +cat[0];
      const range = +cat[2];

      if (source <= convert && convert < source + range) {
        const difference = convert - source;
        result = destination + difference;
      }
    });

    return result;
  };

  allSeeds.forEach((seed) => {
    let start = +seed;
    for (const key in tableOfContents) {
      start = sourceToDestination(parseInt(key) as IndexRange, start);
    }
    if (start < output) output = start;
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
