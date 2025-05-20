import { fetchMovies } from "@/lib/api";
import { MovieList } from "@/components/MovieList";

export default async function NowPlayingPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = parseInt(searchParams?.page || "1", 10);
  const data = await fetchMovies("/movie/now_playing", page);

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Películas en Cartelera</h1>
      <MovieList movies={data.results} page={page} route="now-playing" />
    </div>
  );
}
