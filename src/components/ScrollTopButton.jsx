import { BiSolidToTop } from "react-icons/bi";
import "../css/componenets/ScrollTopButton.css";

export default function ScrollTopButton() {
  return (
    <div
      id="scroll-top-button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <BiSolidToTop />
    </div>
  );
}
