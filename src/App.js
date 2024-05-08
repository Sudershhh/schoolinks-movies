import "./App.css";
import { useRef, useState, useEffect } from "react";
function App() {
  const movieTitleRef = useRef("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isSorted, setSorted] = useState(false);

  async function searchMovie(event) {
    event.preventDefault();
    const movieTitleValue = movieTitleRef.current.value;
    console.log(movieTitleValue);

    try {
      setLoading(true);
      const movieSearchResponse = await fetch(
        `http://www.omdbapi.com/?apikey=922db138&t=${movieTitleValue}`
      );

      const movieSearchResult = await movieSearchResponse.json();

      console.log(movieSearchResult);

      let movieArray = [];
      movieArray.push(movieSearchResult);
      console.log(movieArray);
      setMovies(movieArray);

      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }
  console.log(movies);

  function sortTitle() {
    movies.sort((a, b) => a.Title.toLowerCase() > b.Title.toLowerCase());
  }

  function sortType() {
    movies.sort((a, b) => a.Type.toLowerCase() > b.Type.toLowerCase());
  }

  function sortYear() {
    movies.sort((a, b) => +a.Year > +b.Year);
  }

  return (
    <div className="App">
      <section className="movie-title-input">
        <form onSubmit={searchMovie}>
          <label>Enter Movie Title</label>
          <input type="text" placeholder="Movie title" ref={movieTitleRef} />

          <button type="submit">Search Movie</button>
        </form>
      </section>

      <section className="movies">
        {isLoading && <h3>Loading...</h3>}
        {error && <h3>{error}</h3>}
        {movies.length == 0 && <h3>Movie Not Found</h3>}

        <table>
          <thead>
            <tr>
              <td onClick={sortTitle}>Title</td>
              <td onClick={sortYear}>Year</td>
              <td onClick={sortType}>Type</td>
              <td>ImdbId</td>
              <td>Poster</td>
            </tr>
          </thead>
          <tbody>
            {movies.length > 0 &&
              movies.map((movie, movieIndex) => (
                <tr key={movie.imdbID}>
                  <td>{movie.Title}</td>
                  <td>{movie.Year}</td>
                  <td>{movie.Type}</td>
                  <td>{movie.imdbID}</td>
                  <td>
                    <img src={movie.Poster} />{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
