import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { keyword: "" };
  }

  handleKeywordsSearch = (event) => {
    this.setState({
      keyword: event.target.value
    }, () => {
      this.props.onSearchChange(this.state.keyword)
    })
  }

  render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.keyword}
          onChange={this.handleKeywordsSearch}
        />
      </div>
    );
  }
}
