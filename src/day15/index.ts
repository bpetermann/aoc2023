import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split(",");

  const getHashValue = (input: string) => {
    let currenValue = 0;

    for (let i = 0; i < input.length; i++) {
      currenValue += input[i].charCodeAt(0);
      currenValue *= 17;
      currenValue = currenValue % 256;
    }

    return currenValue;
  };

  return input.map((i) => getHashValue(i)).reduce((prev, cur) => prev + cur, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split(",");

  const getHashValue = (input: string) => {
    let currenValue = 0;

    for (let i = 0; i < input.length; i++) {
      currenValue += input[i].charCodeAt(0);
      currenValue *= 17;
      currenValue = currenValue % 256;
    }

    return currenValue;
  };

  const boxes: { [k: number]: string[][] } = {};

  const getOperation = (input: string) => {
    return input.includes("=") ? "=" : "-";
  };

  const getBox = (hash: number) => {
    return boxes[hash];
  };

  input.forEach((i) => {
    const operation = getOperation(i);
    const [box, label] = i.split(operation);
    const hash = getHashValue(box);
    const currentBox = getBox(hash);

    if (operation === "=") {
      if (!currentBox) {
        boxes[hash] = [[box, label]];
        return;
      }

      const lensIndex = currentBox.findIndex((i) => i[0] === box);

      if (lensIndex > -1) {
        currentBox[lensIndex][1] = label;
        return;
      }
      currentBox.push([box, label]);
    } else {
      if (!currentBox) {
        return;
      }
      const lensIndex = currentBox.findIndex((i) => i[0] === box);
      if (lensIndex < 0) {
        return;
      }
      boxes[hash] = currentBox
        .slice(0, lensIndex)
        .concat(currentBox.slice(lensIndex + 1));
    }
  });

  const getTotalPower = (boxes: { [k: number]: string[][] }) => {
    let result = 0;

    for (const hash in boxes) {
      const box = boxes[hash];
      box.forEach((i, idx) => {
        result += (+hash + 1) * (idx + 1) * +i[1];
      });
    }

    return result;
  };

  return getTotalPower(boxes);
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
