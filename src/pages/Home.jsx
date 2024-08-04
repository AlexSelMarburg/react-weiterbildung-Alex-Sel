import { Helmet } from "react-helmet-async";
import Button from "../components/Button.jsx";
import "../css/componenets/HomePage.css";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div id="home-page" className="page">
        <h1>Lorem ipsum dolor sit amet consectetur.</h1>
        <Button
          text="Default BTN"
          // isDisabled={true}
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
          // isDisabled={true}
        />

        <Button
          icon={<FaGithub />}
          text="Shadow BTN"
          hasShadow={true}
          onClick={() => {
            console.log("Hello");
          }}
          // isDisabled={true}
        />
      </div>
    </>
  );
}
