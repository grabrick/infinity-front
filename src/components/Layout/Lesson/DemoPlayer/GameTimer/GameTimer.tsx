import { useEffect, useState } from "react";

interface TimerProps {
  selectedMode: any;
  initialTime: number;
  isPlay: boolean;
  setIsEnd: (value: boolean) => void;
  endTime: boolean;
}

const GameTimer = ({ selectedMode, initialTime, isPlay, setIsEnd, endTime }: TimerProps) => {
  const [time, setTime] = useState<number>(0);
  
  useEffect(() => {
    if (selectedMode.id === 1) {
      // Прямой счёт
      setTime(0);
    } else if (selectedMode.id === 2) {
      // Обратный отсчёт
      setTime(initialTime);
    }
  }, [selectedMode, initialTime]);

  useEffect(() => {
    let interval: any;

    if (isPlay) {
      interval = setInterval(() => {
        setTime((prevTime: any) => {
          if (selectedMode.id === 1) {
            // Прямой счёт
            if (prevTime >= initialTime) {
              clearInterval(interval);
              setIsEnd(true);
              return prevTime;
            }
            return prevTime + 1;
          } else if (selectedMode.id === 2) {
            // Обратный отсчёт
            if (prevTime <= 0) {
              clearInterval(interval);
              setIsEnd(true);
              return prevTime;
            }
            return prevTime - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlay, selectedMode, initialTime, setIsEnd]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  if (!initialTime) {
    return 'Таймер выключен'
  }
  
  if (endTime === true) {
    return formatTime(initialTime)
  } else {
    return formatTime(time)
  }
};

export default GameTimer;
