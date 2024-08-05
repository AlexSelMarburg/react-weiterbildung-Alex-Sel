import "../css/componenets/SearchResults.css";
import { BsArrowUpSquareFill } from "react-icons/bs";

export default function SearchResults({ count = 0, handleScrollToTop }) {
  return (
    <div className="serch-info">
      <div>
        <span className="serch-info-count">{count}</span> Reslultate gefunden
      </div>

      <BsArrowUpSquareFill
        className="scroll-up-btn"
        onClick={handleScrollToTop}
      />
    </div>
  );
}
