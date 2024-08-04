// import "../src/css/componenets/AudioPlayer.css";
import { useEffect, useRef, useState } from "react";
import "../css/componenets/AudioPlayer.css";
import { FaVolumeOff, FaPause, FaPlay } from "react-icons/fa";

const DEFAULT_VOLUME = 0.2;

export default function AudioPlayer({ artworkUrl100, previewUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const volumeSliderRef = useRef(null);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current.currentTime === audioRef.current.duration) {
        setIsPlaying(false);
      }
    };

    volumeSliderRef.current.value = DEFAULT_VOLUME;
    audioRef.current.volume = DEFAULT_VOLUME;
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (previewUrl) {
      setIsPlaying(false);
      audioRef.current.src = previewUrl;
    }

    return () => {
      audioRef?.current.pause();
    };
  }, [previewUrl]);

  const handleVolumeChange = (volume) => {
    audioRef.current.volume = Number(volume);
  };

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const largerArtworkUrl = artworkUrl100?.replace("100x100bb", "300x300bb");

  return (
    <div className="audio-player">
      <div className="wrapper-container">
        <img src={largerArtworkUrl || ""} alt="Album Art" />
        <div className="actions">
          <button onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
        <div className="volume-setting">
          <FaVolumeOff className="volume-icon" />
          <input
            ref={volumeSliderRef}
            type="range"
            min="0"
            max="1"
            step="0.01"
            className="volume-slider"
            onChange={(e) => handleVolumeChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
