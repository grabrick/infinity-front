import { motion } from "framer-motion";
import m from "./Player.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import VolumeIcons from "@/assets/icons/volume-high.svg";
import ResizeIcons from "@/assets/icons/resize.svg";
import PlayIcons from "@/assets/icons/play.svg";
import Quiz from "@/components/Games/Quiz/Quiz";
import GameTimer from "./GameTimer/GameTimer";
import EndGame from "./EndGame/EndGame";
import Preview from "./Preview/Preview";
import { useLessonPlay } from "../useLessonPlay";
import { PlayingTimer } from "./GameTimer/PlayingTimer";
import OverLayer from "./OverLayer/OverLayer";
import { useAppSelector } from "@/redux/hook/redux.hook";

const Player = ({
  lessonSlug,
  setIsPlay,
  isPlay,
  isPlayingUser,
  setIsPlayingUser,
}: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isOverTime, setIsOverTime] = useState(false);
  const lessonSettings = lessonSlug.lessonSettings;
  const [lives, setIsLives] = useState(lessonSettings.limitOnLives && lessonSettings?.limitOnLives?.lives);
  const userData = useAppSelector((state) => state.userSlice.userData);
  const selectedMode =
    lessonSettings.timer !== null &&
    lessonSettings.timer.selected.find((mode: any) => mode.selected);
  const initialTime =
    lessonSettings.timer !== null &&
    lessonSettings.timer.time.minutes * 60 + lessonSettings.timer.time.seconds;

  const { addedName } = useLessonPlay(lessonSlug.lessonID || "");
  const { currentTime } = PlayingTimer(isPlay, isEnd);
  // let currentTime = "";

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
              addedName={addedName}
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

export default Player;
