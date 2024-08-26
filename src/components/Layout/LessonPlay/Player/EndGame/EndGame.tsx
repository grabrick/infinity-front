import { motion } from "framer-motion";
import m from "./EndGame.module.scss";
import GameTimer from "../GameTimer/GameTimer";
import RestartLessonIcon from "@/assets/icons/rotate-left.svg";
import ShowSelected from "@/assets/icons/task-square.svg";
import Image from "next/image";
import { useEffect, useLayoutEffect } from "react";
import { useRef } from 'react';

const EndGame = ({
  selectedMode,
  initialTime,
  isPlay,
  setIsEnd,
  handleResetLesson,
  lessonSlug,
  setIsShowAnswer,
  isPlayingUser,
  addedName,
}: any) => {
  const isCalled = useRef(false);

  useLayoutEffect(() => {
    if (isPlayingUser && !isCalled.current) {
      addedName.mutate(isPlayingUser);
      isCalled.current = true;
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlayingUser]);

  return (
    <motion.div
      className={m.endOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
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
        <h1
          className={m.title}
        >{`Вы прошли урок: ${lessonSlug?.lessonName}`}</h1>
        <motion.span
          className={m.desc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          Ваши результаты будут записаны у преподавателя, для обратной связи
          обратитесь к преподавателю или создателю урока
        </motion.span>
      </motion.div>
      <motion.div
        className={m.endWrapp}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <div className={m.textWrapp}>
          <span>
            Время:{" "}
            {
              <GameTimer
                selectedMode={selectedMode}
                initialTime={initialTime}
                isPlay={isPlay}
                setIsEnd={setIsEnd}
                endTime={true}
              />
            }
          </span>
          <span>Баллы: 1/2</span>
        </div>
        <div className={m.buttons}>
          <motion.button
            className={m.button}
            whileHover={{ scale: 1.03, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => setIsShowAnswer(true)}
          >
            <Image src={ShowSelected} alt="" />
            Показать ответы
          </motion.button>
          <motion.button
            className={m.button}
            whileHover={{ scale: 1.03, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => handleResetLesson()}
          >
            <Image src={RestartLessonIcon} alt="" />
            Начать заново
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EndGame;
