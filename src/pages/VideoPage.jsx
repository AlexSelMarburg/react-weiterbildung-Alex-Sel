import { Helmet } from "react-helmet-async";
import "../css/componenets/VideoPage.css";
import SearchForm from "../components/SearchForm.jsx";

export default function Movies() {
  return (
    <>
      <Helmet>
        <title>Movies</title>
      </Helmet>

      <div id="videos-page" className="page">
        <div className="top-container">
          {/* <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
        </div>
        <div className="bottom-container"></div>
      </div>
    </>
  );
}
