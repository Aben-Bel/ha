import { For } from "solid-js";

import styles from "./HomeGrid.module.css";

export default function HomeGrid() {
  return (
    <div class={styles.layout}>
      <h1 class={styles.heading}>HA</h1>
      <div class={styles.grid}>
        <For each={[...Array(36)]}>
          {(_, i) => <div class={styles.cell}></div>}
        </For>
      </div>
    </div>
  );
}
