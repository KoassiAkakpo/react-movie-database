import React, { Component } from "react";
import axios from "axios";
import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE
} from "../../config";
import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../elements/Spinner/Spinner";

import "./Home.css";

class Home extends Component {
  state = {
    movies: [],
    HeroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ""
  };
  fetchItems = endpoint => {
    axios
      .get(endpoint)
      .then(response => {
        const movies = response.data.results;
        this.setState(
          {
            movies: [...this.state.movies, ...movies],
            HeroImage: this.state.HeroImage || movies[0],
            loading: false,
            currentPage: response.data.page,
            totalPages: response.data.total_pages
          },
          () => {
            localStorage.setItem("HomeState", JSON.stringify(this.state));
          }
        );
      })
      .catch(err => console.error(err));
  };
  loadMoreItems = () => {
    let endpoint = "";
    this.setState({ loading: true });

    if (this.state.searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this
        .state.currentPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie/?api_key=${API_KEY}&language=en-US&query=${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };
  searchItems = searchTerm => {
    let endpoint = "";
    this.setState({ movies: [], loading: true, searchTerm, HeroImage: null });
    //console.log(this.state.movies);
    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie/?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  };
  componentDidMount() {
    document.title = "Movie Database App with React";
    if (localStorage.getItem("HomeState")) {
      const state = JSON.parse(localStorage.getItem("HomeState"));
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      this.fetchItems(endpoint);
    }
  }
  render() {
    return (
      <div className="rmdb-home">
        {this.state.HeroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}/${
                this.state.HeroImage.backdrop_path
              }`}
              title={this.state.HeroImage.original_title}
              text={this.state.HeroImage.overview}
            />
            <SearchBar callback={this.searchItems} />
          </div>
        ) : null}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={this.state.searchTerm ? "Search results" : "Popular movies"}
            loading={this.state.loading}
          >
            {this.state.movies.map((movie, i) => {
              return (
                <MovieThumb
                  key={i}
                  clickable={true}
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${movie.poster_path}`
                      : `${process.env.PUBLIC_URL}/images/no_image.jpg`
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              );
            })}
          </FourColGrid>
          {this.state.loading ? <Spinner /> : null}
          {this.state.currentPage <= this.state.totalPages &&
          !this.state.loading ? (
            <LoadMoreBtn onClick={this.loadMoreItems} text="Load More" />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
