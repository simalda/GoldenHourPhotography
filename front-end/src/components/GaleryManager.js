import React from "react";

import history from "../JS/history";

class GaleryManager extends React.Component {
  constructor(props) {
    super(props);
  }

  editImages() {
    history.push("/galeryManager/editImage");
  }
  addImage() {
    history.push("/galeryManager/addImage");
  }
  render() {
    return (
      <div className="mainDiv">
        <button onClick={() => this.editImages()}>Edit images</button>
        <button onClick={() => this.addImage()}>Add image</button>
      </div>
    );
  }
}

export default GaleryManager;
