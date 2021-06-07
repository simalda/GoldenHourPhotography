import React from "react";
import D3images from "../../D3images";
import * as selectoptions from "../../../JS/getOptions";
import ImageLinkerHandler from "../../../JS/ImageLinkerHandler";
import ImageLinker from "../../../JS/ImageLinker";
import history from "../../../JS/history";
import { Fragment } from "react";

const photoSphereImage = "PhotoImage";
// const updateDeleteScreen = "UpdateDeleteScreen";
const editOneConnetion = "EditOneConnection";

class EditSphereImageConnections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whatToShow: photoSphereImage,
      linker: new ImageLinker(this.props.image.name, "", "", "", ""),
    };
  }

  componentDidMount() {
    const linkerHandler = new ImageLinkerHandler();
    linkerHandler.getConnections(this.props.image).then((result) =>
      this.setState({
        connections: result,
      })
    );
  }

  // openUpdateDeleteScreen() {
  //   return (
  //     <div>
  //       <button className="button" type="submit">
  //         {this.props.dictionary["edit"]}
  //       </button>

  //       <button className="button" onClick={() => this.back()}>
  //         {this.props.dictionary["delete"]}
  //       </button>
  //     </div>
  //   );
  // }
  changeImage(event) {
    this.setState((state) => {
      return {
        whatToShow: editOneConnetion,
        linker: {
          ...state.linker,
          destination: event.target.value,
        },
      };
    });
  }
  handleOneConnection() {
    const ImageOptions = selectoptions.getOptionsWithCurrent(
      this.props.locationDescription.sphereImageList.map((image) => image.name),
      this.state.linker.destination
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
        <div>{this.state.linker.longitude}</div>
        <div>{this.state.linker.latitude}</div>
        <button className="button" onClick={() => this.upsertConnection()}>
          {this.props.dictionary["save"]}
        </button>

        <button className="button" onClick={() => this.deleteConnection()}>
          {this.props.dictionary["delete"]}
        </button>

        <button className="button" onClick={() => history.goBack()}>
          {this.props.dictionary["back"]}
        </button>
      </div>
    );
  }
  openDestinations(linker) {
    this.setState({
      whatToShow: editOneConnetion,
      linker: linker,
    });
  }

  upsertConnection() {
    const linkerHandler = new ImageLinkerHandler();
    linkerHandler.upsertLink(this.state.linker);
    this.props.reloadApp();
  }
  deleteConnection() {
    const linkerHandler = new ImageLinkerHandler();
    linkerHandler.deleteLink(this.state.linker);
    this.props.reloadApp();
  }
  render() {
    if (!this.state.connections) {
      return null;
    }
    if (this.state.whatToShow === photoSphereImage) {
      return (
        <Fragment>
          <D3images
            locationDescription={this.props.locationDescription}
            admin={this.props.admin}
            openDestinations={(data) => this.openDestinations(data)}
            panorama={this.props.image}
            connections={this.state.connections}
          />
          <button className="button" onClick={() => history.goBack()}>
            {this.props.dictionary["back"]}
          </button>
        </Fragment>
      );
      // } else if (this.state.whatToShow === updateDeleteScreen) {
      //   return this.openUpdateDeleteScreen();
    } else if (this.state.whatToShow === editOneConnetion) {
      return this.handleOneConnection();
    }
    return <div></div>;
  }
}

export default EditSphereImageConnections;
