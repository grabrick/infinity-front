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
import Initial from "./Initial/Initial";
import { useLessonPlay } from "../useLessonPlay";

const Player = ({ lessonSlug, setIsPlay, isPlay, isPlayingUser, setIsPlayingUser }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const lessonSetting = lessonSlug.lessonSettings;
  const selectedMode =
    lessonSetting.timer !== null &&
    lessonSetting.timer.selected.find((mode: any) => mode.selected);
  const initialTime =
    lessonSetting.timer !== null &&
    lessonSetting.timer.time.minutes * 60 + lessonSetting.timer.time.seconds;
  const { addedName } = useLessonPlay(lessonSlug.lessonID || "");

  const handleResetLesson = () => {
    setIsPlay(false);
    setIsEnd(false);
    location.reload();
  };

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
      {!isPlay ? (
        <Initial
          setIsPlay={setIsPlay}
          lessonSlug={lessonSlug}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
        />
      ) : (
        <>
          {!isEnd ? (
            <div className={m.modal}>
              {!isEnd && (
                <h1 className={m.time}>
                  {
                    <GameTimer
                      selectedMode={selectedMode}
                      initialTime={initialTime}
                      isPlay={isPlay}
                      setIsEnd={setIsEnd}
                      endTime={false}
                    />
                  }
                </h1>
              )}
              <Quiz
                questions={lessonSlug?.questions}
                lessonSettings={lessonSetting}
                setIsEnd={setIsEnd}
                isEnd={isEnd}
                setIsPlayingUser={setIsPlayingUser}
                isPlayingUser={isPlayingUser}
              />
              {!isEnd && (
                <div className={m.board}>
                  <span>Sound</span>
                  <span> Screen</span>
                </div>
              )}
            </div>
          ) : (
            <EndGame
              selectedMode={selectedMode}
              initialTime={initialTime}
              isPlay={isPlay}
              setIsEnd={setIsEnd}
              handleResetLesson={handleResetLesson}
              lessonSlug={lessonSlug}
              setIsShowAnswer={setIsShowAnswer}
              isPlayingUser={isPlayingUser}
              addedName={addedName}
            />
          )}
        </>
      )}
    </motion.div>
  );
};

export default Player;
