import { For, createEffect, createMemo, createSignal } from "solid-js";
import styles from "./GlyphGrid.module.css";
import { type Alphabet } from "../../alphabet/alphabets";

enum CELL_STATES{
  WHITE=0, GREY=1, BLACK=2, RED=3, GREEN=4
}

export default function GlyphGrid(props: { glyph: Alphabet }) {
  const glyph = () => props.glyph;

  const composePracticeGrid = () => {
    const gridSize = glyph().gridSize;
    const coloredCells = glyph().coloredCells;

    const grid: number[][] = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(0)
    );

    for (const [row, col] of coloredCells) {
      grid[row][col] = CELL_STATES.GREY;
    }

    return grid;
  };

  const [cells,setCells] = createSignal(composePracticeGrid());
  
  const gridMemo = createMemo(() => cells());

  function nextCellState(cell: number): number {
    switch (cell) {
      case CELL_STATES.BLACK:
        return CELL_STATES.GREY;
      case CELL_STATES.WHITE:
        return CELL_STATES.RED;
      case CELL_STATES.RED:
        return CELL_STATES.WHITE;
      case CELL_STATES.GREY:
        return CELL_STATES.BLACK;
      default:
        return cell;
    }
  }

  function toggleCell(rowIndex : number, colIndex: number): void {
    setCells((currentStates) => {
      const newGrid = [...currentStates];
      newGrid[rowIndex][colIndex] = nextCellState(currentStates[rowIndex][colIndex]);
      return newGrid;
    });
  }

  function changeAllCellToGreen(cells : number[][]){
    for (const [row, col] of props.glyph.coloredCells) {
      cells[row][col] = CELL_STATES.GREEN;
    }
    return cells;
  }

  createEffect(()=>{
    const allBlack = props.glyph.coloredCells.every(([row, col])=>cells()[row][col] === CELL_STATES.BLACK);
    if(allBlack){
      setCells((currentStates)=>{
        const newGrid = [...currentStates];
        return changeAllCellToGreen(newGrid);
      });
    }
  })

  return (
    <div
      class={styles["drawing-grid"]}
      style={{
        "--columns": glyph().gridSize,
      }}
    >
      <For each={gridMemo()}>{(row:number[], rowIndex)=>(
          <For each={row}>{(cell:number, colIndex) => (
              <div
                class={styles["drawing-cell"]}
                classList={{
                  [styles["drawing-cell--white"]]: gridMemo()[rowIndex()][colIndex()] === CELL_STATES.WHITE,
                  [styles["drawing-cell--grey"]]: gridMemo()[rowIndex()][colIndex()] === CELL_STATES.GREY,
                  [styles["drawing-cell--black"]]: gridMemo()[rowIndex()][colIndex()] === CELL_STATES.BLACK,
                  [styles["drawing-cell--red"]]: gridMemo()[rowIndex()][colIndex()] === CELL_STATES.RED,
                  [styles["drawing-cell--green"]]: gridMemo()[rowIndex()][colIndex()] === CELL_STATES.GREEN,
                }}
                onclick={()=>toggleCell(rowIndex(),colIndex())}
              ></div>
            )}
          </For>
        )}
      </For>
    </div>
  );
}
