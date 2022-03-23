// initialize Unsplash API
import { createApi } from "unsplash-js";
const unsplashapi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
  //...other fetch options
});

const getListOfCoffeStorePhotos = async () => {
  const photos = await unsplashapi.search.getPhotos({
    query: "coffee shops",
    page: 1,
    perPage: 10,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    "https://api.foursquare.com/v3/places/nearby?ll=37.8136%2C37.8136&query=coffee%20stores&limit=6",
    options
  );
  try {
    const data = await response.json();
    console.log("data", data.results);

    return data.results.map((results, idx) => {
      return {
        ...results,
        imgUrl: photos[idx],
      };
    });
  } catch (err) {}
};
