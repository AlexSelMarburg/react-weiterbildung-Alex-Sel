import { Helmet } from "react-helmet-async";

export default function Movies() {
  return (
    <>
      <Helmet>
        <title>Movies</title>
      </Helmet>

      <div id="movies-page" className="page">
        Movies
      </div>
    </>
  );
}
