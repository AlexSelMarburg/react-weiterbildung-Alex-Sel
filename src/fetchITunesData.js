import axios from "redaxios";

const fetchITunesData = axios.create({
  baseURL: " https://itunes.apple.com/search?",
  params: {
    limit: 50,
  },
});

const audio = new Audio();

export async function fetchITunesDataByMedia(term, media = "music") {
  try {
    const response = await fetchITunesData("", { params: { term, media } });

    // console.log(response.data.results.length);
    // console.log(response.data.results[0].previewUrl);
    // const previewUrl = response.data.results[0].previewUrl;
    // const audio = new Audio(previewUrl);

    // console.log(previewUrl);

    // audio.src = previewUrl;
    // audio.volume = 0.25;
    // audio.play();
    // console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
