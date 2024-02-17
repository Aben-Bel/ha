import { For, createSignal } from "solid-js";
import { useParams } from "@solidjs/router";

import styles from "./GlyphPractice.module.css";

import { Alphabets } from "../../alphabet/alphabets";

export default function GlyphPractice() {
  const { alphabetIndex } = useParams();

  const derivatives = new Alphabets().getDerivatives(Number(alphabetIndex));

  const [selectedGlyph, setSelectedGlyph] = createSignal(derivatives[0].glyph);
  const selectGlyph = (glyphIndex: number) =>
    setSelectedGlyph(derivatives[glyphIndex].glyph);

  return (
    <div class={styles.layout}>
      <div class={styles["drawing-area"]}>
        <h1>{selectedGlyph()}</h1>
      </div>

      <div class={styles["glyph-group"]}>
        <For each={derivatives}>
          {({ glyph }, index) => (
            <div class={styles.glyph} onClick={() => selectGlyph(index())}>
              {glyph}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
