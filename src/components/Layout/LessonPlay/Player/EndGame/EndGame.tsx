import { motion } from "framer-motion";
import m from "./EndGame.module.scss";
import GameTimer from "../GameTimer/GameTimer";
import Image from "next/image";
import { useEffect, useLayoutEffect } from "react";
import { useRef } from "react";
import { spawn } from "child_process";
import ShowAnswer from "./ShowAnswer/ShowAnswer";
import Menu from "./Menu/Menu";

const EndGame = ({
  handleResetLesson,
  lessonSlug,
  setIsShowAnswer,
  isPlayingUser,
  addedName,
  currentTime,
  lessonSetting,
  isShowAnswer
}: any) => {
  const isCalled = useRef(false);
  const endGame = lessonSetting.endGame;
  const questions = lessonSlug.questions;

  useLayoutEffect(() => {
    if (isPlayingUser && !isCalled.current) {
      addedName.mutate(isPlayingUser);
      isCalled.current = true;
    }

    if (endGame.name === "Показать ответы после игры" && endGame.selected === true) {
      setIsShowAnswer(true)
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
      {isShowAnswer ? (
        <>
          <ShowAnswer lessonSlug={lessonSlug} questions={questions} setIsShowAnswer={setIsShowAnswer} />
        </>
      ) : (
        <>
          <Menu 
            setIsShowAnswer={setIsShowAnswer}
            handleResetLesson={handleResetLesson}
            lessonSlug={lessonSlug}
            currentTime={currentTime}
            isPlayingUser={isPlayingUser}
          />
        </>
      )}
    </motion.div>
  );
};

export default EndGame;
