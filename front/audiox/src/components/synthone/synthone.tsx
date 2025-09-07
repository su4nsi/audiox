import { useState } from "react";
import Knob from "./knob/knob";
import useSynthoneLogic from "./useSynthOneLogic";
import PianoOctave from "./piano/pianooctave";
import "./synthone.css";

export default function SynthOne() {
  const [filterValue, setFilterValue] = useState(0.5);
  const [freqValuex, setFreqValuex] = useState(0.5);
  const { pressedKeys } = useSynthoneLogic(filterValue);

  return (
    <div className="synthone-container">
      <h1>SYNTH-ONE</h1>
      <div className="bottom-container">
        <div className="knobs">
          <Knob initialValue={filterValue} onChange={setFilterValue} />{" "}
          <Knob initialValue={freqValuex} onChange={setFreqValuex} />{" "}
          <Knob initialValue={freqValuex} onChange={setFreqValuex} />{" "}
          <Knob initialValue={freqValuex} onChange={setFreqValuex} />{" "}
          <Knob initialValue={freqValuex} onChange={setFreqValuex} />{" "}
          <Knob initialValue={freqValuex} onChange={setFreqValuex} />{" "}
        </div>
        <div className="piano-container">
          {" "}
          <PianoOctave pressedKeys={pressedKeys} />
        </div>
      </div>
    </div>
  );
}
