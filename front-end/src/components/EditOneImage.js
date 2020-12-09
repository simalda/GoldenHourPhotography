import React from "react";

import importAll from "../JS/imageManager";

class EditOneImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      imageType: this.props.imageType,
      imageLocation: this.props.imageLocation,
      imageViewType: this.props.imageViewType,
      bannerApearence: this.props.bannerApearence,
    };
  }

  render() {
    return (
      <div className="editImageDiv">
        <img
          className="editImage"
          src={this.props.path}
          key={this.props.index}
        ></img>
        <input defaultValue={this.props.name} />
        <div>{this.props.imageType}</div>
        <div>{this.props.imageLocation}</div>
        <div>{this.props.imageViewType}</div>
        <div>{this.props.bannerApearence}</div>
        <button onClick={() => this.editImage()}>Edit image</button>
      </div>
    );
  }
}

export default EditOneImage;
