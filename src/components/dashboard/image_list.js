import React from "react";
import ImageListItem from "./image_list_item";

const ImageList = props => {
  const items = props.images.map(img => {
    return (
      <ImageListItem
        onImageSelect={props.onImageSelect}
        key={img.etag}
        image={img}
      />
    );
  });

  return (
    <ul className="col-md-4 list-group">
      {items}
    </ul>
  );
};

export default ImageList;
