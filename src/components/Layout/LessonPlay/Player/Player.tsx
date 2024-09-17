import { motion } from "framer-motion";
import m from "./Player.module.scss";
import { useState } from "react";
import EndGame from "./EndGame/EndGame";
import Preview from "./Preview/Preview";
import { useLessonPlay } from "../useLessonPlay";
import { PlayingTimer } from "./GameTimer/PlayingTimer";
import OverLayer from "./OverLayer/OverLayer";
import { useAppSelector } from "@/redux/hook/redux.hook";
import { useSounds } from "@/hooks/useSounds/useSounds";
import { useSettings } from "@/hooks/useSettings/useSettings";
import { usePlayingLessonHandler } from "@/hooks/usePlayingLessonHandler/usePlayingLessonHandler";
import GameModule from "@/components/Modules/GameModule/GameModule";

const Player = ({
  lessonSlug,
  setIsPlay,
  isPlay,
  isPlayingUser,
  setIsPlayingUser,
}: any) => {
  const {
    timer,
    sounds,
    getLives,
    access,
    endGame,
  } = useSettings(lessonSlug.lessonSettings);
  const {
    handleResetLesson,
    handleFullScreen,
    handleShowAnswer,
    isShowAnswer,
  } = usePlayingLessonHandler();
  const [isVisible, setIsVisible] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isOverTime, setIsOverTime] = useState(false);
  const [lives, setIsLives] = useState(getLives);
  const userData = useAppSelector((state) => state.userSlice.userData);
  const { wrapUpLesson } = useLessonPlay(lessonSlug.lessonID || "");
  const { currentTime } = PlayingTimer(isPlay, isEnd);
  const { handleClickCorrect, handleClickIncorrect, toggleMute, isMuted } =
    useSounds(sounds.backgroundMusic, sounds.interactiveSounds, isPlay, isEnd);
  
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
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          setIsPlayingUser={setIsPlayingUser}
          userData={userData}
          toggleMute={toggleMute}
          isMuted={isMuted}
          settings={{
            access,
          }}
        />
      ) : (
        <>
          {!isEnd ? (
            <div className={m.modal}>
              <OverLayer
                handleFullScreen={handleFullScreen}
                setIsOverTime={setIsOverTime}
                isPlay={isPlay}
                setIsEnd={setIsEnd}
                isEnd={isEnd}
                toggleMute={toggleMute}
                isMuted={isMuted}
                settings={{
                  selectedMode: timer.selectedMode,
                  initialTime: timer.initialTime,
                  lives,
                }}
              />
              <GameModule
                gameTemplate={lessonSlug.template}
                lessonSlug={lessonSlug}
                soundHandlers={{
                  handleClickCorrect,
                  handleClickIncorrect,
                }}
                actions={{
                  isPlay,
                  isEnd,
                  setIsEnd,
                  setIsPlayingUser,
                  isPlayingUser,
                  currentTime,
                  setIsLives,
                  lives,
                }}
              />
            </div>
          ) : (
            <EndGame
              handleResetLesson={handleResetLesson}
              handleShowAnswer={handleShowAnswer}
              isShowAnswer={isShowAnswer}
              isPlayingUser={isPlayingUser}
              lessonSlug={lessonSlug}
              wrapUpLesson={wrapUpLesson}
              currentTime={currentTime}
              isOverTime={isOverTime}
              settings={{
                lives,
                endGame,
                access,
              }}
            />
          )}
        </>
      )}
    </motion.div>
  );
};

export default Player;
