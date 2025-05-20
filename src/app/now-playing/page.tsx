import { MovieList } from "../../components/MovieList";
import { headers } from "next/headers";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function fetchMovies(page: number = 1) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-MX&page=${page}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch now playing movies");
  }

  const data = await res.json();
  return data.results;
}

export default async function NowPlayingPage() {
  const headersList = await headers(); 
  const url = headersList.get("x-url") || "http://localhost/now-playing"; 
  const searchParams = new URL(url).searchParams;
  const pageParam = searchParams.get("page");
  const currentPage = Number(pageParam || 1);

  const movies = await fetchMovies(currentPage);

  return (
    <div>
      <h1 style={{ padding: "20px" }}>Películas en Cartelera</h1>
      <MovieList movies={movies} page={currentPage} route="now-playing" />
    </div>
  );
}
