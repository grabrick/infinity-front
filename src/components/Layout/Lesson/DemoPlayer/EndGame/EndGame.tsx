import { motion } from "framer-motion";
import m from "./EndGame.module.scss";
import { useLayoutEffect } from "react";
import ShowAnswer from "./ShowAnswer/ShowAnswer";
import Menu from "./Menu/Menu";

const EndGame = ({
  handleResetLesson,
  lessonSlug,
  setIsShowAnswer,
  isPlayingUser,
  currentTime,
  lessonSetting,
  isShowAnswer,
  lives,
  isOverTime
}: any) => {
  const endGame = lessonSetting.endGame;
  const questions = lessonSlug.questions;
  const accessActive = lessonSetting?.access.find(
    (el: any) => el.selected === true
  );
  
  useLayoutEffect(() => {
    if (endGame.name === "Показать ответы после игры" && endGame.selected === true) {
      setIsShowAnswer(true)
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
            lives={lives}
            accessActive={accessActive}
            isOverTime={isOverTime}
          />
        </>
      )}
    </motion.div>
  );
};

export default EndGame;
