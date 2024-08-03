import { Helmet } from "react-helmet-async";
import AudioPlayer from "../AudioPlayer.jsx";

export default function Music() {
  return (
    <>
      <Helmet>
        <title>Music</title>
      </Helmet>

      <div id="music-page" className="page">
        Music
        <AudioPlayer />
      </div>
    </>
  );
}
