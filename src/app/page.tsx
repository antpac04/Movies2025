'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Popular Movies</h1>
      <div className={styles.grid}>
        {movies.map((movie) => (
          <div className={styles.card} key={movie.id}>
            <Link href={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.image}
              />
              <div className={styles.content}>
                <h2>{movie.title}</h2>
                <p className={styles.date}>({movie.release_date})</p>
                <p className={styles.overview}>{movie.overview}</p>
                <p className={styles.score}>
                  <strong>Score:</strong> {movie.vote_average.toFixed(1)} ⭐
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
