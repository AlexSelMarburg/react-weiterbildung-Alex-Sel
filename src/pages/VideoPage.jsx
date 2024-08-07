import { Helmet } from "react-helmet-async";
import "../css/componenets/VideoPage.css";
import SearchForm from "../components/SearchForm.jsx";
import {
  getInitialSearchTerm,
  useSearchParams,
} from "../hooks/useSearchParams.js";
import { useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue.js";
import { useQuery } from "@tanstack/react-query";
import { fetchITunesDataByMedia } from "../helpers/fetchITunesData.js";
import VideoMediaCard from "../components/VideoMediaCard.jsx";

const typesOfVideMedia = ["movie", "tvShow", "podcast"];

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState(getInitialSearchTerm);
  const [mediaType, setMediaType] = useState(typesOfVideMedia[0]);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 600);

  console.log(searchTerm, mediaType);

  useSearchParams(debouncedSearchTerm);

  const {
    data: videoFiles = [],
    isPending = true,
    isError,
    error,
  } = useQuery({
    queryKey: ["term", debouncedSearchTerm, mediaType],
    queryFn: fetchVideo,
  });

  console.log(videoFiles?.[0]);

  return (
    <>
      <Helmet>
        <title>Movies</title>
      </Helmet>

      <div id="videos-page" className="page">
        <div className="top-container">
          <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
          >
            {typesOfVideMedia.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="bottom-container">
          {!isPending && !isError && videoFiles.length > 0 && (
            <div className="fetched-data-container">
              <VideoMediaCard {...videoFiles?.[0]} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

async function fetchVideo({ queryKey }) {
  const searchTerm = queryKey[1];
  const type = queryKey[2];

  if (searchTerm.length < 2) {
    return [];
  }

  const data = await fetchITunesDataByMedia(searchTerm, type);
  return data;
}
