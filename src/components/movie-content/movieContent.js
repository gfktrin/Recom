import React from 'react';
import { Row, Col, Card, Chip } from 'react-materialize';

const MOVIE_SEARCH_URL = 'https://api.themoviedb.org/3/movie/76341?api_key=';
const MOVIE_POSTER_URL = 'https://image.tmdb.org/t/p/w300';

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
      MOVIE_SEARCH_URL
      +process.env.REACT_APP_THEMOVIEDB_KEY);
    const movieData = await response.json();
    console.log(movieData);
    this.setState({ movie: movieData });
  }

  render() {
    const movie = this.state.movie ? this.state.movie : '';
    const moviePoster = MOVIE_POSTER_URL+movie.poster_path;
    const movieGenres = movie ? (
      movie.genres.map(genre => (
        <Chip>
          {genre.name}
        </Chip>
      ))
    ) : '';

    return(
      <Card>
        <Row>
          <Col m={6} s={12}>
            <img src={moviePoster} alt="Movie poster" />
          </Col>
          <Col m={5} s={12}>
            <div>
              {movieGenres}
            </div>
            <h3>
              {movie.title}
            </h3>
            <p>
              {movie.overview}
            </p>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default MovieContent;
