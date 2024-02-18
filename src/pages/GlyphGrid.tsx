import { For, createMemo } from "solid-js";
import styles from "./GlyphGrid.module.css";
import { type Alphabet } from "../../alphabet/alphabets";

export default function GlyphGrid(props: { glyph: Alphabet }) {
  const glyph = () => props.glyph;

  const composePracticeGrid = createMemo(() => {
    const gridSize = glyph().gridSize;
    const coloredCells = glyph().coloredCells;

    const grid: number[][] = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(0)
    );

    for (const [row, col] of coloredCells) {
      grid[row][col] = 1;
    }

    return grid.flat();
  });

  return (
    <div
      class={styles["drawing-grid"]}
      style={{
        "--columns": glyph().gridSize,
      }}
    >
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
    </div>
  );
}
