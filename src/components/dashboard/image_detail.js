import React, { Component } from "react";

export default class ImageDetail extends Component {
  render() {
    const { image } = this.props;

    if (!image) {
      return <div>Loading...</div>;
    }

    return (
      <div className="col-md-8">
        <div>
          <iframe className="embed-responsive-item" src={image.url} />
        </div>
        <div className="details">
          <div>{image.title}</div>
          <div>{image.description}</div>
        </div>
      </div>
    );
  }

};
