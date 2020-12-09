import React from "react";

import importAll from "../JS/imageManager";
import EditOneImage from "./EditOneImage";

class EditImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      divList: [],
    };
  }

  componentDidMount() {
    this.loadImages();
  }

  loadImages() {
    const pathList = importAll();
    var name = "";
    var imageType = "Regular";
    var imageLocation = "City";
    const imageViewType = "Family";
    const bannerApearence = false;
    var imList = pathList.map((path, index) => (
      <EditOneImage
        key={index}
        path={path}
        index={index}
        name={name}
        imageType={imageType}
        imageLocation={imageLocation}
        imageViewType={imageViewType}
        bannerApearence={bannerApearence}
      />
    ));
    imList.reduce((x, y) => x + y);
    this.setState({
      imageList: imList,
    });
  }

  render() {
    return (
      <div className="mainDiv">
        {this.state.imageList}

        <button onClick={() => this.addImage()}>Add image</button>
      </div>
    );
  }
}

export default EditImage;
