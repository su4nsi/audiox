import { useState } from "react";
import Knob from "./knob/knob";
import useSynthoneLogic from "./useSynthOneLogic";
import PianoOctave from "./piano/pianooctave";
import "./synthone.css";

export default function SynthOne() {
  const [freqValue, setFreqValue] = useState(0.5);
  const {} = useSynthoneLogic();

  return (
    <div>
      <div className="synthone-container">
        <Knob initialValue={freqValue} onChange={setFreqValue} />

        <button
          onClick={() => {
            console.log(freqValue);
          }}
        ></button>

        <p>Frequency: {freqValue.toFixed(2)}</p>
      </div>
      <div>
        {" "}
        <PianoOctave />
      </div>
    </div>
  );
}
