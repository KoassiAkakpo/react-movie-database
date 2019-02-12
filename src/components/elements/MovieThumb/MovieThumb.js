import React from "react";
import { Link } from "react-router-dom";
import "./MovieThumb.css";

const MovieThumb = props => {
  return (
    <div className="rmdb-moviethumb">
      {props.clickable ? (
        <Link
          to={{
            pathname: `movie/${props.movieId}`,
            movieName: `${props.movieName}`
          }}
        >
          <img src={props.image} alt={props.movieName} />
        </Link>
      ) : (
        <img src={props.image} alt={props.movieName} />
      )}
    </div>
  );
};

export default MovieThumb;
