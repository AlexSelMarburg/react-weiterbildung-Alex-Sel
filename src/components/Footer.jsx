import "../css/componenets/Footer.css";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <span>© Alex Sel - Weiterbildung React</span>{" "}
      <a href="https://github.com/AlexSelMarburg" target="_blank">
        <FaGithub className="footer-icon" />
      </a>
    </footer>
  );
}
