import { motion } from "framer-motion";
import m from "./DemoPlayer.module.scss";
import { useState } from "react";
import EndGame from "./EndGame/EndGame";
import { PlayingTimer } from "./GameTimer/PlayingTimer";
import Preview from "./Preview/Preview";
import { useAppSelector } from "@/redux/hook/redux.hook";
import OverLayer from "./OverLayer/OverLayer";
import { useSounds } from "@/hooks/useSounds/useSounds";
import { useSettings } from "@/hooks/useSettings/useSettings";
import { usePlayingLessonHandler } from "@/hooks/usePlayingLessonHandler/usePlayingLessonHandler";
import GameModule from "@/modules/GameModule/GameModule";

const DemoPlayer = ({
  lessonSlug,
  lessonSettings,
  setIsPlay,
  isPlay,
  setIsVisiblePlayer,
  setIsPlayingUser,
  isPlayingUser,
}: any) => {
  const { timer, sounds, getLives, access, endGame } = useSettings(lessonSettings);
  const { handleResetLesson, handleFullScreen, handleShowAnswer, isShowAnswer } = usePlayingLessonHandler();
  const [isVisible, setIsVisible] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isOverTime, setIsOverTime] = useState(false);
  const [lives, setIsLives] = useState(getLives);
  const userData = useAppSelector((state) => state.userSlice.userData);
  const { currentTime } = PlayingTimer(isPlay, isEnd);
  const {
    handleClickCorrect,
    handleClickIncorrect,
    toggleMute,
    isMuted,
  } = useSounds(sounds.backgroundMusic, sounds.interactiveSounds, isPlay, isEnd);
  
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
          setIsVisiblePlayer={setIsVisiblePlayer}
          setIsPlayingUser={setIsPlayingUser}
          userData={userData}
          handleFullScreen={handleFullScreen}
          toggleMute={toggleMute}
          isMuted={isMuted}
          settings={{
            access
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
                  lives
                }}
              />
            </div>
          ) : (
            <EndGame
              handleResetLesson={handleResetLesson}
              handleShowAnswer={handleShowAnswer}
              isShowAnswer={isShowAnswer}
              lessonSlug={lessonSlug}
              isPlayingUser={isPlayingUser}
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

export default DemoPlayer;
