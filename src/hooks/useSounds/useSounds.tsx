/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';

const useSounds = (backgroundMusic: any, interactiveSounds: any[], isPlay: boolean, isEnd: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.protocol}//${window.location.host}/${backgroundMusic?.fileUrl}`);
    }
  }, [backgroundMusic]);

  const interactiveRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});

  useEffect(() => {

    interactiveSounds?.forEach(sound => {
      const fullUrl = `${window.location.protocol}//${window.location.host}/${sound.audioFile.fileUrl}`
      if (!interactiveRefs.current[sound.id]) {
        interactiveRefs.current[sound.id] = new Audio(fullUrl);
        interactiveRefs.current[sound.id]!.volume = 0.5;
      }
    });

    return () => {
      Object.values(interactiveRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, [interactiveSounds]);

  useEffect(() => {
    if (audioRef.current && audioRef.current.src === fullUrl) {
      return;
    }

    if (typeof Audio !== "undefined" && backgroundMusic && backgroundMusic?.fileUrl) {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        audioRef.current = new Audio(fullUrl);
        audioRef.current.loop = true;
        audioRef.current.volume = isMuted ? 0 : 0.01;  // Управляем громкостью фона в зависимости от isMuted

        if (isPlay) {
          audioRef.current.play().catch(error => {
            console.error("Failed to play background audio:", error);
          });
        }
      } catch (error) {
        console.error("Failed to create background Audio object:", error);
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [backgroundMusic, fullUrl, isPlay, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.01; // Управляем только громкостью фоновой музыки
    }
  }, [isMuted]);

  useEffect(() => {
    if (isEnd && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isEnd])

  useEffect(() => {
    if (isPlay && audioRef.current) {
      audioRef.current.play();
    }
  }, [isPlay])

  const handleClickElement = () => {
    const audio = interactiveRefs.current[1]; // ID для "Звук клика на элемент"
    if (audio) {
      audio.volume = 0.1;
      audio.play().catch(error => {
        console.error("Failed to play sound:", error);
      });
    } else {
      console.error("Audio element for ID 1 not found");
    }
  };

  const handleDragElement = () => {
    const audio = interactiveRefs.current[2]; // ID для "Звук перетаскивания"
    if (audio) {
      audio.volume = 0.1;
      audio.play().catch(error => {
        console.error("Failed to play sound:", error);
      });
    } else {
      console.error("Audio element for ID 2 not found");
    }
  };

  const handleClickCorrect = () => {
    const audio = interactiveRefs.current[3]; // ID для "Звук клика на верный ответ"
    if (audio) {
      audio.volume = 0.1;
      audio.play().catch(error => {
        console.error("Failed to play sound:", error);
      });
    } else {
      console.error("Audio element for ID 3 not found");
    }
  };

  const handleClickIncorrect = () => {
    const audio = interactiveRefs.current[4]; // ID для "Звук клика на неверный ответ"
    if (audio) {
      audio.volume = 0.1;
      audio.play().catch(error => {
        console.error("Failed to play sound:", error);
      });
    } else {
      console.error("Audio element for ID 4 not found");
    }
  };

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Failed to play background audio:", error);
      });
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return {
    playMusic,
    stopMusic,
    pauseMusic,
    toggleMute,
    handleClickElement,
    handleDragElement,
    handleClickCorrect,
    handleClickIncorrect,
    isMuted,
  };
};

export { useSounds };
