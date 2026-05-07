import { useState, useEffect } from 'react';
import moviesData from "./data/filmList";


function App() {
  //stato base
  const [movies, setMovies] = useState(moviesData);

  //stato filtri
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  // stato lista filtrata
  const [filteredMovies, setFilteredMovies] = useState(moviesData)

  // genera lista generi unica
  const genres = [...new Set(movies.map((movie) => movie.genre))]

  // useEffect che si attiva quando cambiano i filtri
  useEffect(() => {
    let result = movies

    // filtro per genere
    if (selectedGenre !== '') {
      result = result.filter(
        (movie) => movie.genre === selectedGenre
      )
    }

    // filtro per titolo
    if (searchTitle !== '') {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchTitle.toLowerCase())
      )
    }

    setFilteredMovies(result)
  }, [selectedGenre, searchTitle, movies])

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>React Movie Filter</h1>

      {/* FILTRI */}
      <div style={{ marginBottom: '20px' }}>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Tutti i generi</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Cerca per titolo..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
      </div>

      {/* LISTA FILM */}
      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            {movie.title} - <strong>{movie.genre}</strong>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default App
