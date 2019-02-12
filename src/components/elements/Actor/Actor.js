import React from "react";
import { IMAGE_BASE_URL } from "../../../config";
//import { truncText } from "../../../helpers";
import "./Actor.css";
const Actor = props => {
  const { profile_path, name, character } = props.actors;
  const POSTER_SIZE = "w154";

  return (
    <div className="rmdb-actor">
      <img
        src={
          profile_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${profile_path}`
            : `${process.env.PUBLIC_URL}/images/no_image.jpg`
        }
        alt={name}
      />
      <span className="rmdb-actor-name">{name}</span>
      <span className="rmdb-actor-character">{character}</span>
    </div>
  );
};

export default Actor;
