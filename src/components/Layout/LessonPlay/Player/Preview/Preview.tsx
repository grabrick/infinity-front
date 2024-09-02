import Image from "next/image";
import m from "./Preview.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import VolumeIcons from "@/assets/icons/volume-high.svg";
import ResizeIcons from "@/assets/icons/resize.svg";
import PlayIcons from "@/assets/icons/play.svg";
import ClaimIcons from "@/assets/icons/tick-square.svg";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const Preview = ({
  lessonSlug,
  lessonSettings,
  setIsPlay,
  setIsVisible,
  isVisible,
  setIsPlayingUser,
  userData,
  handleFullScreen,
}: any) => {
  const accessActive = lessonSettings?.access.find(
    (el: any) => el.selected === true
  );
  
  const handlePlay = () => {
    if (accessActive.title === "Для не зарегистрированных пользователей") {
      setIsPlay(true);
    } else if (accessActive.title === "Для зарегистрированных пользователей") {
      setIsPlayingUser({
        userName: userData.firstName,
        userID: userData._id,
        correct: 0,
        incorrect: 0,
        selectedAnswers: [],
      });
      setIsPlay(true)
    } else if (accessActive.title === "Для анонимных пользователей") {
      setIsPlayingUser({
        userName: null,
        userID: null,
        correct: 0,
        incorrect: 0,
        selectedAnswers: [],
      });
      setIsPlay(true)
    }
  };
  
  return (
    <motion.div
      className={m.overlay}
      onAnimationComplete={() => setIsVisible(true)}
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
              ответ чтобы продолжить
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
              onClick={() => {
                handlePlay()
              }}
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
              onClick={handleFullScreen}
            >
              <Image src={ResizeIcons} alt="" />
              На весь экран
            </motion.button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Preview;
