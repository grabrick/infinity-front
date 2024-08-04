import { useRef, useState } from "react";
import SoundProgressBar from "@/components/UI/SoundProgressBar/SoundProgressBar";
import SoundControlPanel from "@/components/UI/SoundControlPanel/SoundControlPanel";
import { SERVER_URL } from "@/api/api.config";

const Player = ({ file, progressTextColor, controlTextColor }: any) => {
  const audioRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.1);
  const [displayVolume, setDisplayVolume] = useState(10);  
  
  const handlePlayPause = async () => {
    const audio = audioRef.current;
    audio.volume = volume
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err: any) => {
        console.error("Error playing audio:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.pause();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatDate = (seconds: any) => {
    let date = new Date(0);
    date.setSeconds (seconds);
    return date.toISOString().substr(11, 8);
  }

  const handleVolumeChange = (newVolume: any) => {
    const audio = audioRef.current;
    audio.volume = newVolume;
    setVolume(newVolume);
    setDisplayVolume(Math.round(newVolume * 100));
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
  };

  const handleProgressBarChange = (event: any) => {
    const audio = audioRef.current;
    const newTime = event.target.value;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <audio
        ref={audioRef}
        src={`${SERVER_URL}/${file?.fileUrl}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <SoundProgressBar
        handleProgressBarChange={handleProgressBarChange}
        formatDate={formatDate}
        currentTime={currentTime}
        duration={duration}
        textColor={progressTextColor}
      />

      <SoundControlPanel
        buttonColor={controlTextColor}
        handlePlayPause={handlePlayPause}
        handleReset={handleReset}
        handleVolumeChange={handleVolumeChange}
        displayVolume={displayVolume}
        isPlaying={isPlaying}
        volume={volume}
      />
    </div>
  );
};

export default Player;