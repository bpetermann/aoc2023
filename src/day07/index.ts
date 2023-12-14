import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((i) => {
      const [cards, bid] = i.split(" ");
      return { cards, bid };
    });

  const getCardStrength = (card: string) => {
    const index = "23456789TJQKA".indexOf(card) + 2;
    return index >= 10 ? index.toString() : "0" + index;
  };

  const getHandStrength = (value: string[]) => {
    switch (true) {
      case value.length === 1:
        return 7;
      case value.some((i) => i.length === 4):
        return 6;
      case value.length === 2:
        return 5;
      case value.some((i) => i.length === 3):
        return 4;
      case value.length === 3:
        return 3;
      case value.some((i) => i.length === 2):
        return 2;
      default:
        return 1;
    }
  };

  const getHandValues = (cards: string) => {
    const value: string[] = [cards[0]];

    for (let i = 1; i < cards.length; i++) {
      let existingIndex = value.findIndex((value) => value[0] === cards[i]);

      existingIndex === -1
        ? value.push(cards[i])
        : (value[existingIndex] += cards[i]);
    }

    return getHandStrength(value);
  };

  return input
    .map(({ cards, bid }) => {
      const hand =
        getHandValues(cards) +
        cards
          .split("")
          .map((i) => getCardStrength(i))
          .join("");

      return { cards, bid, hand: +hand };
    })
    .sort((a, b) => a.hand - b.hand)
    .reduce((acc, { bid }, index) => {
      return acc + (index + 1) * +bid;
    }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((i) => {
      const [cards, bid] = i.split(" ");
      return { cards, bid };
    });

  const getCardStrength = (card: string) => {
    const index = "J23456789TJQKA".indexOf(card) + 2;
    return index >= 10 ? index.toString() : "0" + index;
  };

  const getHandStrength = (value: string[], joker: number) => {
    switch (true) {
      case value.length === 1 || joker === 5:
        return 7;
      case value.some((i) => i.length + joker === 4):
        return 6;
      case value.length === 2:
        return 5;
      case value.some((i) => i.length + joker === 3):
        return 4;
      case value.length === 3:
        return 3;
      case value.some((i) => i.length + joker === 2):
        return 2;
      default:
        return 1;
    }
  };

  const getHandValues = (cards: string) => {
    let joker = "";
    const value: string[] = [];
    cards[0] === "J" ? (joker += cards[0]) : value.push(cards[0]);

    for (let i = 1; i < cards.length; i++) {
      if (cards[i] === "J") {
        joker += cards[i];
      } else {
        let existingIndex = value.findIndex((value) => value[0] === cards[i]);

        existingIndex === -1
          ? value.push(cards[i])
          : (value[existingIndex] += cards[i]);
      }
    }

    return getHandStrength(value, joker.length);
  };

  return input
    .map(({ cards, bid }) => {
      const hand =
        getHandValues(cards) +
        cards
          .split("")
          .map((i) => getCardStrength(i))
          .join("");

      return { cards, bid, hand: +hand };
    })
    .sort((a, b) => a.hand - b.hand)
    .reduce((acc, { bid }, index) => {
      return acc + (index + 1) * +bid;
    }, 0);
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
