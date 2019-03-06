import React from 'react';

class MovieContent extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: null,
    }
  }

  componentDidMount() {
    this.getMovieData();
  }

  getMovieData = async() => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/76341?api_key='
      +process.env.REACT_APP_THEMOVIEDB_KEY);
    const movieData = await response.json();
    console.log(movieData);
    this.setState({ movie: movieData });
  }

  render() {
    const movie = this.state.movie ? this.state.movie.title : '';
    const moviePoster = this.state.movie ? 'https://image.tmdb.org/t/p/w300'+this.state.movie.poster_path : '';

    return(
      <div>
        <h2>
          {movie}
        </h2>
        <div>
          <img src={moviePoster} alt="Movie poster" />
        </div>
      </div>
    );
  }
}

export default MovieContent;
