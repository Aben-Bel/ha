import { For, createSignal, onCleanup } from "solid-js";
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


  const [showGrid, setShowGrid] = createSignal(true);
  const [countdown, setCountdown] = createSignal(10);
  let intervalId: number | undefined;

  const handleCompletion = () => {
    setShowGrid(false);
    setCountdown(10);
    clearInterval(intervalId); 
    intervalId = setInterval(() => {
      setCountdown((currentCount) => {
        if (currentCount === 1) {
          clearInterval(intervalId);
          goToNextGlyph();
        }
        return currentCount - 1;
      });
    }, 1000);
  };
  
  const goToNextGlyph = () => {
    clearInterval(intervalId);
    const currentIndex = derivatives.findIndex(glyph => glyph === selectedGlyph());
    const nextIndex = (currentIndex + 1) % derivatives.length;
    setSelectedGlyph(derivatives[nextIndex]);
    setShowGrid(true);
  };

  onCleanup(() => {
    clearInterval(intervalId); 
  });  
  

  return (
    <div class={styles.layout}>

      {showGrid() && (
        <div class={styles["drawing-area"]}>
          {isAlphabet(selectedGlyph()) ? (
            <GlyphGrid
              glyph={selectedGlyph() as Alphabet}
              onCompletion={handleCompletion}
            />
          ) : (
            <h1>Incomplete</h1>
          )}
        </div>
      )}
      
      {!showGrid() && (
        <div class={styles["drawing-area"]}>
          <div><span class={styles["glyph-font"]}>{selectedGlyph().glyph}</span></div>
          <button class={styles["next-glyph-button"]} onClick={goToNextGlyph}>
             ({countdown()})
          </button>
        </div>
      )}


      <div class={styles["glyph-group"]}>
        <For each={derivatives}>
          {({ glyph }, index) => (
            <button class={styles.glyph} 
classList={{[styles["select-glyph"]]: derivatives[index()].glyph===selectedGlyph.glyph,}}
onClick={() => {selectGlyph(index());clearInterval(intervalId);setShowGrid(true)}}>
              {glyph}
            </button>
          )}
        </For>
      </div>
    </div>
  );
}
