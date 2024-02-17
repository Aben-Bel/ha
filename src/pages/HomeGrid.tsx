import { For } from "solid-js";
import { useNavigate } from "@solidjs/router";

import styles from "./HomeGrid.module.css";

import { Alphabets } from "../../alphabet/alphabets";

export default function HomeGrid() {
  const navigate = useNavigate();

  const alphabets = new Alphabets().getBasicAlphabets();

  return (
    <div class={styles.layout}>
      <h1 class={styles.heading}>HA</h1>
      <div class={styles.grid}>
        <For each={alphabets}>
          {({ glyph }, index) => (
            <div
              class={styles.cell}
              onClick={() => navigate(`/practice/${index()}`)}
            >
              {glyph}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
