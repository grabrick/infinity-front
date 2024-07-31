import { useState } from "react";
import m from './ProgressBar.module.scss';

const ProgressBar = ({ min, max, onChange, value }: any) => {  
  return (
    <div className={m.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={m.progressBar}
      />
      <div className={m.progress}>{value}</div>
    </div>
  );
};

export default ProgressBar;
