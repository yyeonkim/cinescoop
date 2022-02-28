export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_URL = "https://image.tmdb.org/t/p";
export const BASE_QUERY = `api_key=${process.env.NEXT_PUBLIC_API_KEY}&region=KR&language=ko&include_adult=true&include_image_language=ko`;

export const fetchGenre = async (id: string) => {
  const { results } = await (
    await fetch(`${BASE_URL}/discover/movie?${BASE_QUERY}&with_genres=${id}`)
  ).json();

  return results;
};

export const fetchDetail = async (id?: string | string[]) => {
  const data = await (
    await fetch(`${BASE_URL}/movie/${id}?${BASE_QUERY}`)
  ).json();

  return data;
};

export const fetchCredit = async (id?: string | string[]) => {
  const { cast } = await (
    await fetch(`${BASE_URL}/movie/${id}/credits?${BASE_QUERY}`)
  ).json();

  return cast;
};
