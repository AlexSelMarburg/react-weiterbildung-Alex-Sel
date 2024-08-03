import "../src/css/componenets/AudioPlayer.css";
import { FaRegPauseCircle, FaRegPlayCircle, FaVolumeOff } from "react-icons/fa";

export default function AudioPlayer() {
  return (
    <div className="audio-player">
      <div className="top-container">
        <img
          src="https://t4.ftcdn.net/jpg/05/65/36/03/360_F_565360370_LrWWCTxczrmwqpsPYPljiFyE4gFqpecr.jpg"
          alt="Album Art"
        />
        <div className="volume-setting">
          <FaVolumeOff className="volume-icon" />
          <input type="range" className="volume-slider" />
        </div>
      </div>
      <div className="bottom-container">
        <div className="actions">
          <button>
            <FaRegPlayCircle />
          </button>
        </div>
        <div className="info-container">
          <h3>Artist</h3>
          <p>Lorem ipsum dolor sit.</p>
        </div>
      </div>
    </div>
  );
}
