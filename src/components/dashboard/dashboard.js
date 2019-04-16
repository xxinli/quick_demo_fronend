import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "./search_bar";
import ImageList from "./image_list";
import ImageDetail from "./image_detail";
import { API_URL } from "../../config"

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgs: [],
      selectedImg: null
    };

    this.imgSearch("");
  }

  imgSearch(key) {
    fetch(`${API_URL}/images/${key}`).then(response => {
      console.log(response)
    })
  }

  handleImageSelect = (img) => {
    this.setState({
      selectedImg: img
    })
  }

  render() {
    const imageSearch = _.debounce(keyword => {
      this.imgSearch(keyword);
    }, 300);


    return (
      <div className="row">

        <SearchBar onSearchChange={imageSearch} />
        {/* <ImageDetail video={this.state.selectedImg} />
        <ImageList
          onImageSelect={this.handleImageSelect}
          images={this.state.imgs}
        /> */}
      </div>
    );
  }
}
