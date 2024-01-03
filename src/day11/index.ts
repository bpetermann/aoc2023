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
  const input = parseInput(rawInput)
    .split("\n")
    .map((i) => i.split(""));

  const expandedInput: (number | string)[][] = [];
  const expansionRate = 1000000;
  const EXPAND_ROW = "EXPAND_ROW";
  const EXPAND_COLUMN = "EXPAND_COLUMN";
  let galaxyCount = 0;

  input.forEach((i) => {
    !i.includes("#")
      ? expandedInput.push([EXPAND_ROW])
      : expandedInput.push(
          i
            .map((i) => (i === "." ? i : ++galaxyCount))
            .flatMap((i, idx) =>
              input.every((i) => i[idx] === ".") ? [i, EXPAND_COLUMN] : i,
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

  const getExpandedRows = (start: number, end: number) => {
    const expandedRowsFound = expandedInput
      .slice(start, end)
      .filter((i) => i[0] === EXPAND_ROW).length;
    return expandedRowsFound * expansionRate - expandedRowsFound;
  };

  const sortPoints = (p1: number, p2: number) =>
    p1 < p2 ? [p1, p2] : [p2, p1];

  const getExpandedColumns = (row: number, p1: number, p2: number) => {
    const [start, end] = sortPoints(p1, p2);

    const columnsFound = expandedInput[row]
      .slice(start, end)
      .filter((i) => i === EXPAND_COLUMN).length;

    return columnsFound * expansionRate - columnsFound * 2;
  };

  const findShortestPath = (p1: number, p2: number) => {
    const [x1, y1] = getGalaxyPosition(p1);
    const [x2, y2] = getGalaxyPosition(p2);
    
    return (
      Math.abs(x1 - x2) +
      Math.abs(y1 - y2) +
      getExpandedColumns(x2, y1, y2) +
      getExpandedRows(x1, x2)
    );
  };

  let shortestPaths = 0;

  for (let i = 1; i <= galaxyCount; i++) {
    for (let j = i + 1; j <= galaxyCount; j++) {
      shortestPaths += findShortestPath(i, j);
    }
  }

  return shortestPaths;
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
