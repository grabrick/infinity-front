import { motion } from "framer-motion";
import m from "./SoundControlPanel.module.scss";
import Image from "next/image";
import volumeImg from "@/assets/icons/volume-high.svg";
import Reset from "@/assets/icons/reset-sound.svg";
import Pause from '@/assets/icons/pause-sound.svg';
import Playing from '@/assets/icons/play-sound.svg';

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
          <Image src={isPlaying ? Pause : Playing} alt="" />
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
          <Image src={Reset} alt="" />
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
