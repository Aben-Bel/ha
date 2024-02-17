import { data } from "./json/v1";

export type Alphabet = {
  eng: string;
  glyph: string;
  gridSize: number;
  coloredCells: Array<Array<number>>;
};

export type IncompleteAlphabet = {
  eng: string;
  glyph: string;
};

export class Alphabets {
  getBasicAlphabets(): Array<Alphabet | IncompleteAlphabet> {
    const basicAlphabets: Array<Alphabet | IncompleteAlphabet> = [];
    for (let group of data) {
      basicAlphabets.push(group[0]);
    }

    return basicAlphabets;
  }

  getDerivatives(nth: number): Array<Alphabet | IncompleteAlphabet> {
    if (!(nth >= 0 && data.length > nth)) {
      return [];
    }

    let derivatives: Array<Alphabet | IncompleteAlphabet> = [];
    let group: Array<Alphabet | IncompleteAlphabet> = data[nth] as Array<
      Alphabet | IncompleteAlphabet
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
