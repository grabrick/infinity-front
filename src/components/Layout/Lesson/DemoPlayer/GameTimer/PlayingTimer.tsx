import { useEffect, useState } from "react";

const PlayingTimer = (isPlay: boolean, isEnd: boolean) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: any;

    if (isPlay && !isEnd) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    if (isEnd) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlay, isEnd]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  let currentTime = formatTime(time);

  return { currentTime };
};

export { PlayingTimer };
