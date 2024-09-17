import { motion } from "framer-motion";
import m from "./EndGame.module.scss";
import { useLayoutEffect, useRef } from "react";
import ShowAnswer from "./ShowAnswer/ShowAnswer";
import Menu from "./Menu/Menu";

const EndGame = ({
  handleResetLesson,
  handleShowAnswer,
  isShowAnswer,
  lessonSlug,
  isPlayingUser,
  currentTime,
  settings,
  isOverTime,
  wrapUpLesson,
}: any) => {
  const isCalled = useRef(false);
  const questions = lessonSlug.questions;

  useLayoutEffect(() => {
    if (
      isPlayingUser &&
      !isCalled.current &&
      settings.access.title !== "Для анонимных пользователей" &&
      settings.lives > 0
    ) {
      wrapUpLesson.mutate(isPlayingUser);
      isCalled.current = true;
    }

    if (
      settings.endGame.name === "Показать ответы после игры" &&
      settings.endGame.selected === true
    ) {
      handleShowAnswer(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <ShowAnswer
            lessonSlug={lessonSlug}
            questions={questions}
            handleShowAnswer={handleShowAnswer}
          />
        </>
      ) : (
        <>
          <Menu
            handleShowAnswer={handleShowAnswer}
            handleResetLesson={handleResetLesson}
            lessonSlug={lessonSlug}
            currentTime={currentTime}
            isPlayingUser={isPlayingUser}
            lives={settings.lives}
            access={settings.access}
            isOverTime={isOverTime}
          />
        </>
      )}
    </motion.div>
  );
};

export default EndGame;
