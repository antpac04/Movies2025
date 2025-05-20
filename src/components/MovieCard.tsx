"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
};

export default function MovieCard({ movie }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updatedFavorites = favorites.includes(movie.id)
      ? favorites.filter((id: number) => id !== movie.id)
      : [...favorites, movie.id];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="rounded-xl shadow-md bg-white hover:shadow-lg hover:scale-[1.02] transition-transform">
      <Link href={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-t-xl w-full object-cover h-[360px]"
        />
      </Link>
      <div className="p-3 flex justify-between items-start">
        <p className="text-sm font-semibold line-clamp-2">{movie.title}</p>
        <button
          onClick={toggleFavorite}
          className={`text-xl ${isFavorite ? "text-red-500" : "text-gray-400"} hover:scale-110 transition-transform`}
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          ❤️
        </button>
      </div>
    </div>
  );
}
