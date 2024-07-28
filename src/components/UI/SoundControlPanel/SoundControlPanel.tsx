import { motion } from "framer-motion";
import m from "./SoundControlPanel.module.scss";
import Image from "next/image";
import volumeImg from "@/assets/icons/volume-high.svg";

const SoundControlPanel = ({
  buttonColor,
  handlePlayPause,
  handleReset,
  handleVolumeChange,
  volume,
  displayVolume,
  isPlaying
}: any) => {
  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <motion.button
          className={m.button}
          whileHover={{ scale: 1.04, opacity: 1, backgroundColor: "#A7BBFF" }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
            backgroundColor: { duration: 0.3 },
          }}
          type="button"
          style={{ backgroundColor: buttonColor }}
          onClick={() => handlePlayPause()}
        >
          {isPlaying ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M10.65 19.11V4.89C10.65 3.54 10.08 3 8.64 3H5.01C3.57 3 3 3.54 3 4.89V19.11C3 20.46 3.57 21 5.01 21H8.64C10.08 21 10.65 20.46 10.65 19.11Z"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21 19.11V4.89C21 3.54 20.43 3 18.99 3H15.36C13.93 3 13.35 3.54 13.35 4.89V19.11C13.35 20.46 13.92 21 15.36 21H18.99C20.43 21 21 20.46 21 19.11Z"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12V8.44002C4 4.02002 7.13 2.21002 10.96 4.42002L14.05 6.20002L17.14 7.98002C20.97 10.19 20.97 13.81 17.14 16.02L14.05 17.8L10.96 19.58C7.13 21.79 4 19.98 4 15.56V12Z"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
        </motion.button>
        <motion.button
          className={m.button}
          whileHover={{ scale: 1.04, opacity: 1, backgroundColor: "#A7BBFF" }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
            backgroundColor: { duration: 0.3 },
          }}
          type="button"
          style={{ backgroundColor: buttonColor }}
          onClick={() => handleReset()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.3 21H14.7C19.2 21 21 19.2 21 14.7V9.3C21 4.8 19.2 3 14.7 3H9.3C4.8 3 3 4.8 3 9.3V14.7C3 19.2 4.8 21 9.3 21Z"
              stroke="#D8E9FE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </motion.button>
      </div>
      <div className={m.valueWrapper} style={{ backgroundColor: buttonColor }}>
        <Image src={volumeImg} width={24} height={24} alt="" />
        <div className={m.volumeWrapper}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className={m.progressBar}
          />
          <span className={m.progress}>{displayVolume}</span>
        </div>
      </div>
    </div>
  );
};

export default SoundControlPanel;
