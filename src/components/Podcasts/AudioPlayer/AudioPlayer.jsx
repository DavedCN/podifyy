import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioPlayer = ({ audioSrc, image }) => {
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleDurationChange = (event) => {
    setCurrentTime(event.target.value);
    audioRef.current.currentTime = event.target.value;
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    audioRef.current.volume = volume;
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isMuted) {
      audioRef.current.volume = volume;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isMuted]);

  useEffect(() => {
    audioRef.current.volume = volume;

    setIsMuted(volume === 0);
  }, [volume]);

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="w-full fixed bottom-0 left-0 py-4 px-0 flex justify-center items-center gap-10 bg-audioBg ">
      <img
        className="w-10 h-10 object-cover "
        src={image}
        alt="dispplayImage"
      />
      <audio ref={audioRef} src={audioSrc} type="audio/mpeg" />

      <div className="flex justify-start items-center gap-2 w-1/2">
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="cursor-pointer"
        >
          {!isPlaying ? <FaPlay /> : <FaPause />}
        </div>
        <p>{typeof currentTime === "number" ? currentTime.toFixed(2) : 0}</p>

        <input
          className="w-full hue-rotate-25"
          type="range"
          onChange={handleDurationChange}
          min={0}
          step={1}
          max={duration}
          value={currentTime}
        />
        <p>{duration.toFixed(2)}</p>
        <div
          className="cursor-pointer ml-20 hidden md:block"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </div>
        <input
          className="w-2/5 hue-rotate-25  cursor-pointer hidden md:block"   
          type="range"
          onChange={handleVolumeChange}
          min={0}
          max={1}
          step={0.01}
          value={volume}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
