import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

const useSynthoneLogic = (filterValue: number) => {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const filterRef = useRef<Tone.Filter | null>(null);
  const [currentFreq, setCurrentFreq] = useState(261.63);
  const [level, setLevel] = useState(3);
  const levelRef = useRef(3);

  const pressedKeysRef = useRef<Set<string>>(new Set());
  const activeFrequenciesRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    Tone.start();
    filterRef.current = new Tone.Filter(1000, "lowpass").toDestination();
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: {
        attack: 0.0,
        decay: 0.1,
        sustain: 0.5,
        release: 1.5,
      },
    }).connect(filterRef.current);
    synthRef.current.volume.value = -10;
    const keyMap: Record<string, number> = {
      s: 261.63,
      d: 293.66,
      f: 329.63,
      g: 349.23,
      h: 392.0,
      j: 440.0,
      k: 493.88,
      e: 277.18,
      r: 311.13,
      y: 369.99,
      u: 415.3,
      i: 466.16,
    };

    const updateLevel = (delta: number) => {
      setLevel((l) => {
        const newLevel = Math.min(5, Math.max(1, l + delta));
        levelRef.current = newLevel;
        return newLevel;
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!synthRef.current) return;

      if (key === ",") {
        updateLevel(-1);
        return;
      }
      if (key === ".") {
        updateLevel(+1);
        return;
      }

      if (!pressedKeysRef.current.has(key)) {
        pressedKeysRef.current.add(key);
        const baseFreq = keyMap[key];
        if (!baseFreq) return;
        const freq = baseFreq * Math.pow(2, levelRef.current - 3);
        activeFrequenciesRef.current.set(key, freq);
        setCurrentFreq(freq);
        synthRef.current.triggerAttack(freq);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!synthRef.current) return;
      if (pressedKeysRef.current.has(key)) {
        pressedKeysRef.current.delete(key);
        const freq = activeFrequenciesRef.current.get(key);
        if (!freq) return;
        synthRef.current.triggerRelease(freq);
        activeFrequenciesRef.current.delete(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      synthRef.current?.dispose();
      filterRef.current?.dispose();
      synthRef.current = null;
      filterRef.current = null;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (filterRef.current) {
      filterRef.current.frequency.value = 200 + filterValue * 4800;
    }
  }, [filterValue]);

  return { currentFreq, level };
};

export default useSynthoneLogic;
