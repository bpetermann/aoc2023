import run from "aocrunner";

type Step = {
  line: number;
  position: number;
  symbol: string;
};

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((i) => i.split(""));

  let start = { line: -1, position: -1, symbol: "S" };

  input.forEach((line, i) => {
    const index = line.findIndex((j) => j === "S");
    if (index !== -1) start = { line: i, position: index, symbol: "S" };
  });

  const checkFirstStep = (): Step[] => {
    const directions = [
      { line: 0, position: 1, symbols: ["-", "J", "7"] },
      { line: 0, position: -1, symbols: ["-", "L", "F"] },
      { line: -1, position: 0, symbols: ["|", "7", "F"] },
      { line: 1, position: 0, symbols: ["|", "J", "L"] },
    ];

    const firstSteps = [];

    for (const dir of directions) {
      const { line, position, symbols } = dir;
      const symbol = input[start.line + line][start.position + position];

      if (symbols.includes(symbol)) {
        firstSteps.push({
          line: start.line + line,
          position: start.position + position,
          symbol,
        });
      }
    }

    return firstSteps;
  };

  let lastStep = start;
  let currentStep = checkFirstStep()[0];
  const allSteps = [lastStep, currentStep];

  const getNextStep = (line: number, position: number): Step => {
    lastStep = currentStep;
    const next = {
      line: line,
      position: position,
      symbol: input[line][position],
    };
    allSteps.push(next);

    return next;
  };

  while (
    currentStep.line !== start.line ||
    currentStep.position !== start.position
  ) {
    switch (input[currentStep.line][currentStep.position]) {
      case "-": {
        const direction = currentStep.position - 1 === lastStep.position;
        currentStep = getNextStep(
          currentStep.line,
          direction ? currentStep.position + 1 : currentStep.position - 1,
        );
        break;
      }

      case "7": {
        const direction = currentStep.position - 1 === lastStep.position;
        currentStep = getNextStep(
          direction ? currentStep.line + 1 : currentStep.line,
          !direction ? currentStep.position - 1 : currentStep.position,
        );
        break;
      }
      case "|": {
        const direction = currentStep.line - 1 === lastStep.line;
        currentStep = getNextStep(
          direction ? currentStep.line + 1 : currentStep.line - 1,
          currentStep.position,
        );
        break;
      }
      case "J": {
        const direction = currentStep.line - 1 === lastStep.line;
        currentStep = getNextStep(
          direction ? currentStep.line : currentStep.line - 1,
          direction ? currentStep.position - 1 : currentStep.position,
        );
        break;
      }
      case "L": {
        const direction = currentStep.position + 1 === lastStep.position;
        currentStep = getNextStep(
          direction ? currentStep.line - 1 : currentStep.line,
          direction ? currentStep.position : currentStep.position + 1,
        );
        break;
      }
      case "F": {
        const direction = currentStep.line + 1 === lastStep.line;
        currentStep = getNextStep(
          direction ? currentStep.line : currentStep.line + 1,
          direction ? currentStep.position + 1 : currentStep.position,
        );
        break;
      }
    }
  }

  return Math.floor(allSteps.length / 2);
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
