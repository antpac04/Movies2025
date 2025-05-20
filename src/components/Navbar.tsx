import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">Movies DB</div>
      <div className="nav-links">
        <Link href="/">Popular</Link>
        <Link href="/now-playing">Now Playing</Link>
        <Link href="/top-rated">Top Rated</Link>
        <Link href="/favorites">My Favorites</Link>
      </div>
    </nav>
  );
}
