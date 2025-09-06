import { useRef } from "react";
import useKnobLogic from "./useKnobLogic";
import "./knob.css";

interface KnobProps {
  initialValue?: number;
  label?: string;
  onChange?: (value: number) => void;
}

export default function Knob({
  initialValue = 0.5,
  label,
  onChange,
}: KnobProps) {
  const { value, handleChange } = useKnobLogic(initialValue);
  const knobRef = useRef<HTMLDivElement>(null);

  const angle = value * 270 - 135; //map 0-1 from -135° to 135°

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startValue = value;

    const onMouseMove = (e: MouseEvent) => {
      const delta = startY - e.clientY;
      const newValue = Math.min(Math.max(startValue + delta / 200, 0), 1);
      handleChange(newValue);
      onChange?.(newValue);
      console.log("Knob value:", newValue.toFixed(2));
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="knob-container">
      <div className="knob" ref={knobRef} onMouseDown={handleMouseDown}>
        <div
          className="knob-pointer"
          style={{ transform: `rotate(${angle}deg)` }}
        />
      </div>
      {label && <div className="knob-label">{label}</div>}
    </div>
  );
}
