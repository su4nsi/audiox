import { useState } from "react";

const useKnobLogic = (initialValue: number = 0.5) => {
  const [value, setValue] = useState(initialValue); // range 0 1

  const handleChange = (newValue: number) => {
    if (newValue < 0) newValue = 0;
    if (newValue > 1) newValue = 1;
    setValue(newValue);
  };

  return { value, handleChange };
};

export default useKnobLogic;
