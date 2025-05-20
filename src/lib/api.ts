import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (endpoint: string, page: number = 1) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`, {
    params: {
      api_key: API_KEY,
      language: "es-MX",
      page,
    },
  });
  return response.data;
};

export const fetchMovieDetails = async (movieId: string) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      language: "es-MX",
    },
  });
  return response.data;
};

export const fetchRecommendations = async (movieId: string) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/recommendations`, {
    params: {
      api_key: API_KEY,
      language: "es-MX",
    },
  });
  return response.data.results;
};
