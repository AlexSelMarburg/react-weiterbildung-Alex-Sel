import axios from "redaxios";

const fetchITunesData = axios.create({
  baseURL: " https://itunes.apple.com/search?",
  params: {
    limit: 50,
  },
});

export async function fetchITunesDataByMedia(term, media = "music") {
  try {
    const response = await fetchITunesData("", { params: { term, media } });
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
