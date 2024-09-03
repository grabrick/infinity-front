import { useState } from "react";

const usePlayingLessonHandler = () => {
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  
  const handleShowAnswer = (value: boolean) => {
    setIsShowAnswer(value);
  };

  const handleResetLesson = () => {
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

  return { handleResetLesson, handleFullScreen, handleShowAnswer, isShowAnswer }
}

export { usePlayingLessonHandler }