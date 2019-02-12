import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="rmdb-header">
      <div className="rmdb-header-content">
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/images/reactMovie_logo.png`}
            alt="React Movie DB"
            className="rmdb-logo"
          />
        </Link>
        <img
          src={`${process.env.PUBLIC_URL}/images/tmdb_logo.png`}
          alt="React Movie DB"
          className="rmdb-tmdb-logo"
        />
      </div>
    </div>
  );
};

export default Header;
