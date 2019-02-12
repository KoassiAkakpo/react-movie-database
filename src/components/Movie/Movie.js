import React, { Component } from "react";
import axios from "axios";
import { API_KEY, API_URL } from "../../config";
import Navigation from "../elements/Navigation/Navigation";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
import Actor from "../elements/Actor/Actor";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Spinner from "../elements/Spinner/Spinner";
import "./Movie.css";

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    laoding: false
  };
  componentDidMount() {
    this.setState({ laoding: true });
    //? 1- Fetch movie
    const movie = this.props.match.params.movieId;
    const endpoint = `${API_URL}movie/${movie}?api_key=${API_KEY}&append_to_response=videos&language=en-US`;
    this.fetchItems(endpoint);
  }

  fetchItems = async endpoint => {
    await axios
      .get(endpoint)
      .then(res => {
        if (!res.status) {
          this.setState({ laoding: false });
        } else {
          this.setState({ movie: res.data }, async () => {
            //?Fetch actors in setState callback function
            const movie = this.props.match.params.movieId;
            const endpoint = `${API_URL}movie/${movie}/credits?api_key=${API_KEY}`;
            await axios
              .get(endpoint)
              .then(res => {
                const directors = res.data.crew.filter(
                  member => member.job === "Director"
                );
                this.setState({
                  actors: res.data.cast,
                  directors,
                  laoding: false
                });
              })
              .catch(err => console.error("Error", err));
          });
        }
      })
      .catch(err => console.error("Error", err));
  };
  render() {
    const { movie, directors, actors, laoding } = this.state;
    return (
      <div className="rmdb-movie">
        {movie ? (
          <div>
            <Navigation movie={movie.original_title} />
            <MovieInfo movie={movie} directors={directors} />
            <MovieInfoBar movie={movie} />
          </div>
        ) : null}
        {actors ? (
          <div className="rmdb-movie-grid">
            <FourColGrid header="Actors">
              {actors.map((actor, i) => {
                return <Actor key={i} actors={actor} />;
              })}
            </FourColGrid>
          </div>
        ) : null}
        {!actors && !laoding ? <h1>No Movie found!!!</h1> : null}
        {laoding ? <Spinner /> : null}
      </div>
    );
  }
}

export default Movie;
