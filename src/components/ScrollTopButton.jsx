import { BiSolidToTop } from "react-icons/bi";
import "../css/componenets/ScrollTopButton.css";

export default function ScrollTopButton({ show }) {
  return (
    <div
      className={show ? "show" : ""}
      id="scroll-top-button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <BiSolidToTop />
    </div>
  );
}
