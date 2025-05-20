'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const ids = JSON.parse(localStorage.getItem('favorites') || '[]');
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

      const requests = ids.map((id: number) =>
        axios
          .get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
              api_key: API_KEY,
              language: 'es-MX',
            },
          })
          .then((res) => res.data as Movie)
      );

      const movies = await Promise.all(requests);
      setFavorites(movies);
    };

    loadFavorites();
  }, []);

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    localStorage.setItem(
      'favorites',
      JSON.stringify(updatedFavorites.map((m) => m.id))
    );
    setFavorites(updatedFavorites);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mis Películas Favoritas</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
        }}
      >
        {favorites.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
            <button
              onClick={() => removeFavorite(movie.id)}
              style={{ marginTop: '10px' }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
