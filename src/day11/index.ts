import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((i) => i.split(""));

  const expandedInput: (number | string)[][] = [];
  let galaxyCount = 0;

  input.forEach((i) => {
    !i.includes("#")
      ? expandedInput.push(i, i)
      : expandedInput.push(
          i
            .map((i) => (i === "." ? i : ++galaxyCount))
            .flatMap((i, idx) =>
              input.every((i) => i[idx] === ".") ? [i, i] : i,
            ),
        );
  });

  let galaxyPositionMap: Map<number, [number, number]> = new Map();

  const getGalaxyPosition = (point: number): [number, number] => {
    if (galaxyPositionMap.has(point))
      return galaxyPositionMap.get(point) as [number, number];

    let galaxyPosition: [number, number] = [0, 0];

    expandedInput.find((row, i) => {
      const j = row.indexOf(point);
      if (j !== -1) galaxyPosition = [i, j];
    });

    galaxyPositionMap.set(point, galaxyPosition);

    return galaxyPosition;
  };

  const findShortestPath = (p1: number, p2: number) => {
    const [x1, y1] = getGalaxyPosition(p1);
    const [x2, y2] = getGalaxyPosition(p2);
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  let shortestPaths = 0;

  for (let i = 1; i <= galaxyCount; i++) {
    for (let j = i + 1; j <= galaxyCount; j++) {
      shortestPaths += findShortestPath(i, j);
    }
  }

  return shortestPaths;
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
