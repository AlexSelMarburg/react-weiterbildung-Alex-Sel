import "../css/componenets/SearchResults.css";

export default function SearchResults({ count = 0 }) {
  return (
    <div className="serch-info">
      <span className="serch-info-count">{count}</span> Reslultate gefunden
    </div>
  );
}
