import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const axios = require('axios').default;
  const [movies, setMovies] = useState([]);


  // Axios 
  function axiosMoviesHandler() {
    axios.get('https://swapi.dev/api/films/')
      .then(function (response) {
        return(response.data);
      })
      .then(function (data){
        const transformedMovies = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          };
        });
        setMovies(transformedMovies)
      })
  }

  // Try Catch block
  async function tryCatchMoviesHandler() {
    try {
      const response = await fetch('https://swapi.dev/api/films/')
      const data = await response.json();

      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      console.log(error)
    }
  }

  // Promise
  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films/').then(response => {
      return response.json();
    }).then(data => {
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
      setMovies(transformedMovies);
    });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={axiosMoviesHandler}>Axios Movies</button>
        {/* <button onClick={tryCatchMoviesHandler}>Fetch Movies</button> */}
        {/* <button onClick={fetchMoviesHandler}>Fetch Movies</button> */}
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
