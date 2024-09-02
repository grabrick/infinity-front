import { motion } from "framer-motion";
import m from "./DemoPlayer.module.scss";
import { useState } from "react";
import EndGame from "./EndGame/EndGame";
import { PlayingTimer } from "./GameTimer/PlayingTimer";
import { useLessonPlay } from "../../LessonPlay/useLessonPlay";
import Preview from "./Preview/Preview";
import Quiz from "@/components/Games/Quiz/Quiz";
import { useAppSelector } from "@/redux/hook/redux.hook";
import OverLayer from "./OverLayer/OverLayer";

const DemoPlayer = ({
  lessonSlug,
  lessonSettings,
  setIsPlay,
  isPlay,
  setIsVisiblePlayer,
  setIsPlayingUser,
  isPlayingUser,
}: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isOverTime, setIsOverTime] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [lives, setIsLives] = useState(lessonSettings?.limitOnLives && lessonSettings?.limitOnLives?.lives);
  const userData = useAppSelector((state) => state.userSlice.userData);
  
  const selectedMode =
    lessonSettings?.timer !== null &&
    lessonSettings?.timer?.selected.find((mode: any) => mode.selected);
  const initialTime =
    lessonSettings?.timer !== null &&
    lessonSettings?.timer?.time?.minutes * 60 +
      lessonSettings?.timer?.time?.seconds;

  const { currentTime } = PlayingTimer(isPlay, isEnd);
  // const currentTime = ""

  const handleResetLesson = () => {
    setIsPlay(false);
    setIsEnd(false);
    location.reload();
  };

  const handleFullScreen = () => {
    const playerElement: any = document.getElementById("player-container");
    if (!document.fullscreenElement) {
      playerElement.requestFullscreen().catch((err: any) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <motion.div
      id="player-container"
      className={m.player}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      style={{
        padding: isPlay ? 0 : "3px",
        border: isPlay ? "3px solid #6982C3" : "none",
      }}
    >
      {!isPlay ? (
        <Preview
          setIsPlay={setIsPlay}
          lessonSlug={lessonSlug}
          lessonSettings={lessonSettings}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          setIsVisiblePlayer={setIsVisiblePlayer}
          setIsPlayingUser={setIsPlayingUser}
          userData={userData}
          handleFullScreen={handleFullScreen}
        />
      ) : (
        <>
          {!isEnd ? (
            <div className={m.modal}>
              <OverLayer
                handleFullScreen={handleFullScreen}
                setIsOverTime={setIsOverTime}
                selectedMode={selectedMode}
                lessonSettings={lessonSettings}
                initialTime={initialTime}
                isPlay={isPlay}
                setIsEnd={setIsEnd}
                isEnd={isEnd}
                lives={lives}
              />
              <Quiz
                questions={lessonSlug?.questions}
                lessonSettings={lessonSettings}
                setIsEnd={setIsEnd}
                isEnd={isEnd}
                setIsPlayingUser={setIsPlayingUser}
                isPlayingUser={isPlayingUser}
                currentTime={currentTime}
                setIsLives={setIsLives}
                lives={lives}
              />
            </div>
          ) : (
            <EndGame
              handleResetLesson={handleResetLesson}
              lessonSlug={lessonSlug}
              setIsShowAnswer={setIsShowAnswer}
              isPlayingUser={isPlayingUser}
              currentTime={currentTime}
              lessonSetting={lessonSettings}
              isShowAnswer={isShowAnswer}
              isOverTime={isOverTime}
              lives={lives}
            />
          )}
        </>
      )}
    </motion.div>
  );
};

export default DemoPlayer;
