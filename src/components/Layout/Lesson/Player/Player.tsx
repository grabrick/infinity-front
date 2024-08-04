import { motion } from "framer-motion";
import m from "./Player.module.scss";
import { useState } from "react";
import Image from "next/image";
import VolumeIcons from "@/assets/icons/volume-high.svg";
import ResizeIcons from "@/assets/icons/resize.svg";
import PlayIcons from "@/assets/icons/play.svg";

const Player = ({ lessonSlug, setIsPlay, isPlay, setIsVisiblePlayer }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.div
      className={m.player}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {!isPlay && (
        <motion.div
          className={m.overlay}
          onAnimationComplete={() => {
            setIsVisible(true), setIsVisiblePlayer(true);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          {isVisible && (
            <>
              <motion.div
                className={m.info}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              >
                <h1 className={m.title}>{lessonSlug?.lessonName}</h1>
                <motion.span
                  className={m.desc}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                >
                  Серия вопросов с множественным выбором. Нажмите на правильный
                  ответ что бы продолжить
                </motion.span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              >
                <motion.button
                  className={m.play}
                  onClick={() => setIsPlay(true)}
                  whileHover={{ scale: 1.08, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <Image src={PlayIcons} alt="" />
                </motion.button>
              </motion.div>

              <motion.div
                className={m.controls}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              >
                <motion.button
                  className={m.button}
                  whileHover={{ scale: 1.03, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image src={VolumeIcons} alt="" />
                  Включить звук
                </motion.button>
                <motion.button
                  className={m.button}
                  whileHover={{ scale: 1.03, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image src={ResizeIcons} alt="" />
                  На весь экран
                </motion.button>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Player;
