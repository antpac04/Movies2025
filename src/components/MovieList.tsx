"use client";

import MovieCard from "./MovieCard";
import Link from "next/link";

export const MovieList = ({
  movies,
  page = 1,
  route = "",
}: {
  movies: any[];
  page?: number;
  route?: string;
}) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
    <div className="flex justify-center gap-4 mt-4">
      {page > 1 && (
        <Link
          href={`/${route}?page=${page - 1}`}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          ← Anterior
        </Link>
      )}
      <Link
        href={`/${route}?page=${page + 1}`}
        className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
      >
        Siguiente →
      </Link>
    </div>
  </div>
);
