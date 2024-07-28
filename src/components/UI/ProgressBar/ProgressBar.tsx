import { useState } from "react";
import m from './ProgressBar.module.scss';

const ProgressBar = ({ min, max, steps }: any) => {
  const [value, setValue] = useState(min);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className={m.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className={m.progressBar}
        list="tickmarks"
      />
      <datalist id="tickmarks">
        {steps?.map((step: any) => (
          <option key={step} value={step} label={step}></option>
        ))}
      </datalist>
      <div className={m.progress}>{value}</div>
    </div>
  );
};

export default ProgressBar;
