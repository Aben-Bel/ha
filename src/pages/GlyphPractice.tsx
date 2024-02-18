import { For, createSignal } from "solid-js";
import { useParams } from "@solidjs/router";

import styles from "./GlyphPractice.module.css";

import { type Alphabet, Alphabets, isAlphabet } from "../../alphabet/alphabets";
import GlyphGrid from "./GlyphGrid";

export default function GlyphPractice() {
  const { alphabetIndex } = useParams();

  const derivatives = new Alphabets().getDerivatives(Number(alphabetIndex));

  const [selectedGlyph, setSelectedGlyph] = createSignal(derivatives[0]);
  const selectGlyph = (glyphIndex: number) =>
    setSelectedGlyph(derivatives[glyphIndex]);

  return (
    <div class={styles.layout}>
      <div class={styles["drawing-area"]}>
        {isAlphabet(selectedGlyph()) ? (
          <GlyphGrid glyph={selectedGlyph() as Alphabet} />
        ) : (
          <h1>Incomplete</h1>
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
