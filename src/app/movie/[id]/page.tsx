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

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

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
        <button className={styles.favorite}>Add to Favorites</button>
      </div>
    </div>
  );
}
