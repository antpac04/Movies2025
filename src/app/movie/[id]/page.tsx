'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './movie.module.css';

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  tagline: string;
  release_date: string;
  genres: { name: string }[];
  vote_average: number;
  poster_path: string;
}

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=es-MX`
      );
      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(Number(id)));
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((favId: number) => favId !== Number(id));
    } else {
      updatedFavorites = [...favorites, Number(id)];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.detailContainer}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={styles.poster}
      />
      <div className={styles.details}>
        <h1>{movie.title}</h1>
        <p className={styles.tagline}>{movie.tagline}</p>
        <p>{movie.overview}</p>
        <p><strong>Release:</strong> {movie.release_date}</p>
        <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
        <p><strong>Rating:</strong> {movie.vote_average}</p>
        <button className={styles.favorite} onClick={toggleFavorite}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
}
