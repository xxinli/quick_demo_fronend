import React from "react";

const ImageListItem = ({ image, onImageSelect }) => {
  const imageUrl = image.url;

  return (
    <li onClick={() => onImageSelect(image)} className="list-group-item">
      <div >
        <div>
          <img src={imageUrl} />
        </div>
        <div>
          <div>{image.title}</div>
        </div>
      </div>
    </li>
  );
};

export default ImageListItem
