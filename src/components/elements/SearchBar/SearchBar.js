import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "./SearchBar.css";
class SearchBar extends Component {
  state = {
    value: ""
  };
  //timeout = null;
  /*
  doSearch = e => {
    this.setState({
      value: e.target.value
    });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.callback(this.state.value);
    }, 1500);
  };
*/
  handleSearch = e => {
    if (e.key === "Enter") {
      this.props.callback(this.state.value);
    }
  };

  render() {
    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-searchbar-content">
          <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
          <input
            type="text"
            className="rmdb-searchbar-input"
            placeholder="Search ..."
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
            onKeyDown={e => this.handleSearch(e)}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
