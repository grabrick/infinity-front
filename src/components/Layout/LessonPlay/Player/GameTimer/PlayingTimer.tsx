import { useEffect, useState } from "react";

const PlayingTimer = (isPlay: boolean, isEnd: boolean) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: any;

    if (isPlay && !isEnd) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000); // Обновляем время каждую секунду
    }

    if (isEnd) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Очищаем интервал при размонтировании или изменении isPlay или isEnd
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
