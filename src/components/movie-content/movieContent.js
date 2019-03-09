import React from 'react';
import { Row, Col, Card, Chip, Button } from 'react-materialize';

const LATEST_MOVIE_URL = 'https://api.themoviedb.org/3/movie/latest?api_key=';
const MOVIE_SEARCH_URL = 'https://api.themoviedb.org/3/movie/{id}?api_key=';
const MOVIE_POSTER_URL = 'https://image.tmdb.org/t/p/w300';
const MOVIE_GENRES_IDS = [28, 12, 16, 35, 80, 99,
                          18, 10751, 14, 36, 27,
                          10402, 9648, 10749, 878,
                          10770, 53, 10752, 37];

function getRandomInt(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

class MovieContent extends React.Component {
  constructor() {
    super();
    this.state = {
      latestMovieId: null,
      movie: null,
    }
  }

  componentDidMount() {
    fetch(
      LATEST_MOVIE_URL
      +process.env.REACT_APP_THEMOVIEDB_KEY)
      .then(response => response.json())
      .then(data => this.setState({ latestMovieId: data.id },
        () => {
          this.getMovieData();
        }));
  }

  generateRandomMovieUrl = () => {
    const latestMovieId = this.state.latestMovieId;
    console.log(latestMovieId);
    const randomId = getRandomInt(1, latestMovieId);
    return MOVIE_SEARCH_URL.replace('{id}', randomId);
  }

  getMovieData = async() => {
    if(!this.state.latestMovieId){
      return null;
    }
    const response = await fetch(
      this.generateRandomMovieUrl()
      +process.env.REACT_APP_THEMOVIEDB_KEY);
    if (!response.ok) {
      this.getMovieData();
    }
    const movieData = await response.json();
    this.setState({ movie: movieData });
  }

  getMoviePoster = (movie) => {
    const moviePoster = MOVIE_POSTER_URL+movie.poster_path;
    return (
      <img src={moviePoster} alt="Movie poster" />
    )
  }

  getMovieGenres = (movie) => {
    if (!movie.genres) {
      return null;
    }
    return (
      movie.genres.map(genre => (
        <Chip>
          {genre.name}
        </Chip>
      ))
    )
  }

  render() {
    const movie = this.state.movie ? this.state.movie : '';
    const movieGenres = movie ? this.getMovieGenres(movie) : '';
    const moviePoster = movie ? this.getMoviePoster(movie) : '';

    return(
      <Card>
        <Row>
          <Col m={6} s={12}>
            {moviePoster}
          </Col>
          <Col m={5} s={12}>
            <div>
              {movieGenres}
            </div>
            <div>
              <h3>
                {movie.title}
              </h3>
              <p>
                {movie.overview}
              </p>
            </div>
            <div class="button-card-section">
              <Button
              waves='light'
              className="purple darken-4"
              onClick={this.getMovieData}>Try again</Button>
              <Button waves='light' className="grey">Watch the trailer</Button>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default MovieContent;
