import { useState } from "react";
import Knob from "./knob/knob";
import useSynthoneLogic from "./useSynthOneLogic";
import PianoOctave from "./piano/pianooctave";
import "./synthone.css";

export default function SynthOne() {
  const [freqValue, setFreqValue] = useState(0.5);
  const {} = useSynthoneLogic();

  return (
    <div className="synthone-container">
      <h1>SYNTH-ONE</h1>
      <div className="bottom-container">
        <div className="knobs">
          <Knob initialValue={freqValue} onChange={setFreqValue} />{" "}
          <Knob initialValue={freqValue} onChange={setFreqValue} />{" "}
          <Knob initialValue={freqValue} onChange={setFreqValue} />{" "}
          <Knob initialValue={freqValue} onChange={setFreqValue} />{" "}
          <Knob initialValue={freqValue} onChange={setFreqValue} />{" "}
          <Knob initialValue={freqValue} onChange={setFreqValue} />{" "}
        </div>
        <div className="piano-container">
          {" "}
          <PianoOctave />
        </div>
      </div>
    </div>
  );
}
