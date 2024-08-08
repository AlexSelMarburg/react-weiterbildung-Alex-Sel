import { Helmet } from "react-helmet-async";
import "../css/componenets/HomePage.css";
import MovingComponent from "react-moving-text";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div id="home-page" className="page">
        <div className="left-container">
          <MovingComponent
            type="fadeInFromTop"
            duration="1200ms"
            delay="0s"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="none"
          >
            <h1>
              <span style={{ display: "block" }}>React</span>iTunes{" "}
              <span>-</span> API Projekt
            </h1>
          </MovingComponent>

          <MovingComponent
            type="popIn"
            duration="1000ms"
            delay="800ms"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="backwards"
          >
            <h2>
              Ein kleines Projekt, das ich im Rahmen meiner Weiterbildung im
              Frontend-Bereich erstellt habe.
            </h2>
          </MovingComponent>

          <MovingComponent
            type="fadeInFromBottom"
            duration="1000ms"
            delay="0s"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="backwards"
          >
            <p className="description">
              Diese Webanwendung ermöglicht es Benutzern, nach bestimmten Musik-
              oder Videodateien zu suchen und diese anzuzeigen. Die
              Informationen zu den Dateien werden von der iTunes-API abgerufen.
            </p>
          </MovingComponent>
        </div>
        <div className="right-container">
          <img src="img/music_note.png" alt="" />
        </div>
      </div>
    </>
  );
}
