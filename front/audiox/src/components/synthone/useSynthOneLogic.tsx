import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

const useSynthoneLogic = (frequencyValue: number) => {
  const synthRef = useRef<Tone.Synth | null>(null);
  const synthRef2 = useRef<Tone.Synth | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    synthRef.current = new Tone.Synth({
      oscillator: { type: "triangle" },
    }).toDestination();
    synthRef2.current = new Tone.Synth({
      oscillator: { type: "fmsine" },
    }).toDestination();

    return () => {
      synthRef.current?.dispose();
      synthRef.current = null;
      synthRef2.current?.dispose();
      synthRef2.current = null;
    };
  }, []);

  useEffect(() => {
    if (!synthRef.current || !synthRef2.current) return;
    const freq = 20 + frequencyValue * 100;
    const freq2 = 100 + frequencyValue * 400;
    synthRef.current.oscillator.frequency.value = freq;
    synthRef2.current.oscillator.frequency.value = freq2;
  }, [frequencyValue]);

  const toggleNote = () => {
    if (!synthRef.current || !synthRef2.current) return;
    const freq = 20 + frequencyValue * 100;
    const freq2 = 100 + frequencyValue * 400;
    synthRef.current.oscillator.frequency.value = freq;
    synthRef.current.oscillator.frequency.value = freq2;
    if (isPlaying) {
      synthRef.current.triggerRelease();
      synthRef2.current.triggerRelease();
      setIsPlaying(false);
    } else {
      synthRef.current.triggerAttack(freq);
      synthRef2.current.triggerAttack(freq2);
      setIsPlaying(true);
    }
  };

  return { toggleNote, isPlaying };
};

export default useSynthoneLogic;
