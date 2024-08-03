import axios from "redaxios";

const fetchITunesData = axios.create({
  baseURL: " https://itunes.apple.com/search?",
  params: {
    //   country: "FR",
    //   lang: "fr_fr",
    limit: 150,
  },
});

const audio = new Audio();

export async function fetchITunesDataByMedia(term) {
  try {
    const response = await fetchITunesData("", { params: { term } });

    console.log(response.data.results[0].previewUrl);
    const previewUrl = response.data.results[72].previewUrl;
    // const audio = new Audio(previewUrl);

    console.log(previewUrl);

    audio.src = previewUrl;
    audio.volume = 0.25;
    audio.play();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
