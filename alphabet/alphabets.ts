import data from "./json/v1.json";

type alphabet = {
  eng: string;
  glyph: string;
  gridSize: number;
  coloredCells: Array<Array<number>>;
};

type incompleteAlphabet = {
  eng: string;
  glyph: string;
};

class Alphabets {
  getBasicAlphabets(): Array<alphabet | incompleteAlphabet> {
    const basicAlphabets: Array<alphabet | incompleteAlphabet> = [];
    for (let group of data) {
      basicAlphabets.push(group[0]);
    }

    return basicAlphabets;
  }

  getDerivative(nth: number): Array<alphabet | incompleteAlphabet> {
    if (!(nth >= 0 && data.length > nth)) {
      return [];
    }

    let derivatives: Array<alphabet | incompleteAlphabet> = [];
    let group: Array<alphabet | incompleteAlphabet> = data[nth] as Array<
      alphabet | incompleteAlphabet
    >;
    derivatives = group;
    return derivatives;
  }

  getGrid(
    coloredCells: Array<Array<number>>,
    gridSize: number
  ): Array<Array<number>> {
    const grid: number[][] = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(0)
    );

    for (const [row, col] of coloredCells) {
      grid[row][col] = 1;
    }

    return grid;
  }
}
