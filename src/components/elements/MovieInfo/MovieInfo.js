import React from "react";
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from "../../../config";
import { truncText } from "../../../helpers";
import FontAwesome from "react-fontawesome";
import MovieThumb from "../MovieThumb/MovieThumb";
import "./MovieInfo.css";
const MoreInfo = props => {
  const {
    backdrop_path,
    poster_path,
    overview,
    title,
    vote_average
  } = props.movie;
  const { directors } = props;
  return (
    <div
      className="rmdb-movieinfo"
      style={{
        background: backdrop_path
          ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}/${backdrop_path}')`
          : "#000"
      }}
    >
      <div className="rmdb-movieinfo-content">
        <div className="rmdb-movieinfo-thumb">
          <MovieThumb
            image={
              poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${poster_path}`
                : `${process.env.PUBLIC_URL}/images/no_image.jpg`
            }
            clickable={false}
          />
        </div>
        <div className="rmdb-movieinfo-text">
          <h1>{title}</h1>
          <h3>PLOT</h3>
          <p>{truncText(overview, 250)}</p>
          <h3>IMDB RATING</h3>
          <div className="rmdb-rating">
            <meter
              min="0"
              max="100"
              optimum="100"
              low="40"
              high="70"
              value={vote_average * 10}
            />
            <p className="rmdb-score">{vote_average}</p>
          </div>
          {directors.length > 1 ? <h3>DIRECTORS</h3> : <h3>DIRECTOR</h3>}
          {directors.map((director, i) => {
            return (
              <p key={i} className="rmdb-director">
                {director.name}
              </p>
            );
          })}
        </div>
        <FontAwesome className="fa-film" name="film" size="5x" />
      </div>
    </div>
  );
};

export default MoreInfo;
