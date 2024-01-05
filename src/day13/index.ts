import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const VERTICAL = "VERTICAL";
  const HORIZONTAL = "HORIZONTAL";
  type Direction = [typeof VERTICAL, typeof HORIZONTAL][number];

  const input = parseInput(rawInput)
    .split("\n\n")
    .map((i) => i.split("\n"));

  const rotateArray = (arr: string[]): string[] =>
    arr[0].split("").map((_, i) => arr.reduce((acc, str) => acc + str[i], ""));

  const getLines = (arr: string[]): [number, number][] =>
    arr
      .map((i, idx, self) => (i === self[idx - 1] ? [idx - 1, idx] : undefined))
      .filter((i) => i !== undefined) as Array<[number, number]>;

  const getRange = (arr: string[], start: number, end: number): number =>
    Math.min(arr.slice(0, start).length, arr.slice(end + 1).length);

  const getReflections = (
    arr: string[],
    start: number,
    end: number,
    range: number,
  ): [string[], string[]] => [
    arr.slice(start - range, start),
    arr.slice(end + 1, end + 1 + range).reverse(),
  ];

  const compareReflections = (arr1: string[], arr2: string[]): boolean => {
    return arr1.every((i, idx) => i === arr2[idx]);
  };

  const checkReflection = (arr: string[], direction: Direction): number => {
    arr = direction === VERTICAL ? rotateArray(arr) : arr;

    return getLines(arr)
      .map(([start, end]) => {
        const range = getRange(arr, start, end);

        if (!compareReflections(...getReflections(arr, start, end, range)))
          return 0;

        return (
          arr.slice(0, start + 1).length * (direction === VERTICAL ? 1 : 100)
        );
      })
      .reduce((acc, curr) => acc + curr, 0);
  };

  let points = 0;

  input.forEach((i) => {
    points += checkReflection(i, VERTICAL);
    points += checkReflection(i, HORIZONTAL);
  });

  return points;
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
