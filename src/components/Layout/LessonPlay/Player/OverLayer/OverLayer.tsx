import m from "./OverLayer.module.scss";

import GameTimer from "../GameTimer/GameTimer";
import HeartFull from "@/assets/icons/heart-full.svg";
import HeartEmpty from "@/assets/icons/heart-empty.svg";
import ResizeIcons from "@/assets/icons/resize.svg";
import VolumeIcons from "@/assets/icons/volume-high.svg";
import MuteVolume from "@/assets/icons/volume-cross.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const OverLayer = ({
  isEnd,
  selectedMode,
  settings,
  isPlay,
  setIsEnd,
  handleFullScreen,
  toggleMute,
  isMuted,
}: any) => {
  const [hearts, setHearts] = useState(() => (typeof settings.lives === 'number' && settings.lives > 0 ? Array(settings.lives).fill(true) : []));

  useEffect(() => {
    if (typeof settings.lives === 'number' && settings.lives >= 0) {
      setHearts((prevHearts) => prevHearts.map((_, i) => i < settings.lives));

      if (settings.lives === 0) {
        setIsEnd(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.lives]);
  
  return (
    <div className={m.container}>
      {!isEnd && (
        <>
          <div className={m.wrap}>
            <h1 className={m.time}>
              <GameTimer
                setIsOverTime={settings.setIsOverTime}
                initialTime={settings.initialTime}
                selectedMode={selectedMode}
                isPlay={isPlay}
                setIsEnd={setIsEnd}
                endTime={false}
              />
            </h1>
          </div>
          {settings.lives !== null && settings.lives > 0 && (
            <div
              className={m.wrap2}
              style={{
                paddingLeft: settings.lives >= 8 ? "60px" : "40px",
              }}
            >
              {hearts.map((isFull, i) => (
                <Image
                  key={i}
                  src={isFull ? HeartFull : HeartEmpty}
                  alt={isFull ? "Full Heart" : "Empty Heart"}
                />
              ))}
            </div>
          )}
          <div className={m.wrap3}>
            <div className={m.board}>
            <motion.button
                className={m.button}
                whileHover={{ scale: 1.03, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                onClick={toggleMute}
              >
                <Image src={isMuted ? MuteVolume : VolumeIcons} alt="" />
              </motion.button>
              <motion.button
                className={m.button}
                whileHover={{ scale: 1.03, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                onClick={handleFullScreen}
              >
                <Image src={ResizeIcons} alt="" />
              </motion.button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OverLayer;
