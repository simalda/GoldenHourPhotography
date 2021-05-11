import React from "react";
import D3images from "../../D3images";
import * as selectoptions from "../../../JS/getOptions";
import ImageLinkerHandler from "../../../JS/ImageLinkerHandler";
import ImageLinker from "../../../JS/ImageLinker";

const photoSphereImage = "PhotoImage";
const updateDeleteScreen = "UpdateDeleteScreen";
const editOneConnetion = "EditOneConnection";

class EditSphereImageConnections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whatToShow: photoSphereImage,
      image: {},
      linker: new ImageLinker(),
    };
  }
  openUpdateDeleteScreen() {
    return (
      <div>
        <button className="button" type="submit">
          {this.props.dictionary["edit"]}
        </button>

        <button className="button" onClick={() => this.back()}>
          {this.props.dictionary["delete"]}
        </button>
      </div>
    );
  }
  changeImage(event) {
    this.setState({ image: event.target.value });
  }
  handleOneConnection() {
    const ImageOptions = selectoptions.getOptions(
      this.props.locationDescription.sphereImageList
    );
    return (
      <div>
        <select
          name="photoShereImagesFromThisLocation"
          id="spImges"
          className=""
          onChange={(event) => this.changeImage(event)}
        >
          {ImageOptions}
        </select>
        <div></div>
        <div></div>
        <button className="button" onClick={() => this.back()}>
          {this.props.dictionary["save"]}
        </button>
      </div>
    );
  }
  addNewConnection() {
    const linkerHandler = new ImageLinkerHandler();
    linkerHandler.addConnection(this.state.connection);
  }
  updateConnection() {}
  deleteConnection() {}
  render() {
    let displayed = <div></div>;
    if (this.state.whatToShow === photoSphereImage) {
      displayed = (
        <D3images
          location={this.props.locationDescription}
          admin={this.props.admin}
          addNewConnection={(connection) => this.addNewConnection(connection)}
          updateConnection={(connection) => this.updateConnection(connection)}
          deleteConnection={(connection) => this.deleteConnection(connection)}
        />
      );
    } else if (this.state.whatToShow === updateDeleteScreen) {
      displayed = this.openUpdateDeleteScreen();
    } else if (this.state.whatToShow === editOneConnetion) {
      displayed = this.handleOneConnection();
    }
    return { displayed };
  }
}

export default EditSphereImageConnections;
