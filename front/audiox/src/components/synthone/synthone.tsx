import { useState } from "react";
import Knob from "./knob/knob";
import useSynthoneLogic from "./useSynthOneLogic";
import "./synthone.css";

export default function SynthOne() {
  const [freqValue, setFreqValue] = useState(0.5);
  const { toggleNote, isPlaying } = useSynthoneLogic(freqValue);

  return (
    <div className="synthone-container">
      <Knob initialValue={freqValue} onChange={setFreqValue} />

      <button
        onClick={() => {
          toggleNote();
          console.log(freqValue);
        }}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>

      <p>Frequency: {freqValue.toFixed(2)}</p>
    </div>
  );
}
