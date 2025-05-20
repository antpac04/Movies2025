import { headers } from "next/headers";
import { fetchMovies } from "@/lib/api";
import { MovieList } from "@/components/MovieList";

export default async function PopularPage() {
  const headersList = await headers();
  const url = new URL(headersList.get("x-url") || "http://localhost");
  const pageParam = url.searchParams.get("page");
  const page = parseInt(pageParam || "1", 10);

  const data = await fetchMovies("/movie/popular", page);

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Películas Populares</h1>
      <MovieList movies={data.results} page={page} route="popular" />
    </div>
  );
}
