"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const ids = JSON.parse(localStorage.getItem("favorites") || "[]");
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const requests = ids.map((id: number) =>
        axios
          .get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
              api_key: API_KEY,
              language: "es-MX",
            },
          })
          .then((res) => res.data)
      );
      const movies = await Promise.all(requests);
      setFavorites(movies);
    };

    loadFavorites();
  }, []);

  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-bold">Mis películas favoritas</h1>
      <div className="rid grid-cols-2 md:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
