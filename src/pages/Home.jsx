import { Helmet } from "react-helmet-async";
import Button from "../components/Button.jsx";
import "../css/componenets/Home.css";
import { FaGithub } from "react-icons/fa";
import { fetchITunesDataByMedia } from "../fetchITunesData.js";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetchITunesDataByMedia("music");
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div id="home-page" className="page">
        <h1>Lorem ipsum dolor sit amet consectetur.</h1>
        <Button
          text="Default BTN"
          isDisabled={true}
          onClick={() => {
            console.log("Hello");
          }}
          icon={<FaGithub />}
        />

        <Button
          icon={<FaGithub />}
          text="Inverted BTN"
          isInverted={true}
          onClick={() => {
            console.log("Hello");
          }}
          isDisabled={true}
        />
      </div>
    </>
  );
}
