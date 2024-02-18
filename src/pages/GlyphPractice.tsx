import { For, createMemo, createSignal } from "solid-js";
import { useParams } from "@solidjs/router";

import styles from "./GlyphPractice.module.css";

import { type Alphabet, Alphabets } from "../../alphabet/alphabets";

export default function GlyphPractice() {
  const { alphabetIndex } = useParams();

  const derivatives = new Alphabets().getDerivatives(Number(alphabetIndex));

  const [selectedGlyph, setSelectedGlyph] = createSignal(derivatives[0]);
  const selectGlyph = (glyphIndex: number) =>
    setSelectedGlyph(derivatives[glyphIndex]);

  const composePracticeGrid = createMemo(() => {
    if (!("gridSize" in selectedGlyph())) {
      return [];
    }

    const gridSize = (selectedGlyph() as Alphabet).gridSize;
    const coloredCells = (selectedGlyph() as Alphabet).coloredCells;

    const grid: number[][] = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(0)
    );

    for (const [row, col] of coloredCells) {
      grid[row][col] = 1;
    }

    return grid.flat();
  });

  return (
    <div class={styles.layout}>
      <div
        class={styles["drawing-area"]}
        style={{
          "--columns": (selectedGlyph() as Alphabet).gridSize ?? 5,
        }}
      >
        {composePracticeGrid().length !== 0 ? (
          <For each={composePracticeGrid()}>
            {(value) => (
              <div
                class={styles["drawing-cell"]}
                classList={{
                  [styles["drawing-cell--filled"]]: value === 1,
                }}
              ></div>
            )}
          </For>
        ) : (
          <h1>Nope</h1>
        )}
      </div>

      <div class={styles["glyph-group"]}>
        <For each={derivatives}>
          {({ glyph }, index) => (
            <button class={styles.glyph} onClick={() => selectGlyph(index())}>
              {glyph}
            </button>
          )}
        </For>
      </div>
    </div>
  );
}
