export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_URL = "https://image.tmdb.org/t/p";

export const fetchGenre = async (id: string) => {
  const { results } = await (
    await fetch(
      `${BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko&include_adult=true&with_genres=${id}`
    )
  ).json();

  return results;
};
