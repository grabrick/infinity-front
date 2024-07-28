import m from "./SoundProgressBar.module.scss";

const SoundProgressBar = ({ duration, handleProgressBarChange, currentTime, formatDate, textColor }: any) => {
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressBarChange}
          className={m.progressBar}
          list="tickmarks"
        />
      </div>
      <div className={m.progressWrapper}>
        <span className={m.progress} style={{ color: textColor }}>{formatDate(currentTime)}</span>
        <span className={m.progress} style={{ color: textColor }}>{formatDate(duration)}</span>
      </div>
    </div>
  );
};

export default SoundProgressBar;
