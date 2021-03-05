import React from "react";

import history from "../../../JS/history";
// import * as proxy from "../JS/proxy";
import * as selectoptions from "../../../JS/getOptions";
import Button from "../../Button";
import Image from "../../../JS/Image";
import ImageHandler from "../../../JS/ImageHandler";

class OrdersCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: null,
      imageType: "regular",
      imageLocation: "city",
      imageViewType: "family",
      bannerApearence: false,
      isNameInputDisabled: false,
    };
  }
  back() {
    history.goBack();
  }

  onUploadImage(event) {
    var str = event.target.value;
    var res = str.split("\\");
    this.setState({
      name: res[res.length - 1],
      image: event.target.value,
      isNameInputDisabled: true,
    });
  }

  ChangeName(event) {
    this.setState({ name: event.target.value });
  }
  ChangeImageType(event) {
    this.setState({ imageType: event.target.value });
  }
  ChangeImageLocation(event) {
    this.setState({ imageLocation: event.target.value });
  }
  ChangeImageViewType(event) {
    this.setState({ imageViewType: event.target.value });
  }
  ChangeBannerAppearance(event) {
    this.setState({ bannerApearence: event.target.value });
  }

  mySubmitHandler(event) {
    event.preventDefault();
    const image = new Image(
      this.state.name,
      this.state.imageType,
      this.state.imageViewType,
      this.state.imageLocation
    );
    let imHandler = new ImageHandler();

    imHandler.addNewImage(image).then(
      (loginResponse) => {
        console.log(loginResponse);
        alert("Saved");
        this.props.reloadApp();
        history.push("/appManager ");
      },
      (result) => {
        console.log(result);
        alert(" Not Saved :" + result);
        this.props.reloadApp();
        history.push("/appManager");
      }
    );
  }
  render() {
    const ImageTypeOptions = selectoptions.getImageTypeOptions(
      this.props.imageTypes
    );
    const ImageLocationsOptions = selectoptions.getImageLocationsOptions(
      this.props.locationList
    );
    const EventTypesOptions = selectoptions.getEventTypesOptions(
      this.props.eventTypes
    );
    if (this.state.isNameInputDisabled) {
      document.getElementById("name").disabled = true;
    }
    return (
      <div className=" popup mainDiv" style={{ color: "white" }}>
        <form onSubmit={(event) => this.mySubmitHandler(event)}>
          <h1>Feel the fields </h1>
          <input
            type="file"
            id="input"
            multiple
            onChange={(event) => this.onUploadImage(event)}
          ></input>
          <p>Name of image:</p>
          <input
            id="name"
            className="inputImageManagment"
            type="text"
            value={this.state.name}
            onChange={(event) => this.ChangeName(event)}
          />
          <div>{this.state.name}</div>
          <p>Image type:</p>
          <select
            name="imageType"
            id="imType"
            className="selectImageManagment"
            onChange={(event) => this.ChangeImageType(event)}
          >
            {ImageTypeOptions}
          </select>
          <p>Image location:</p>
          <select
            name="location"
            id="imLoc"
            className="selectImageManagment"
            onChange={(event) => this.ChangeImageLocation(event)}
          >
            {ImageLocationsOptions}
          </select>
          <p>Image view type:</p>
          <select
            name="imViewType"
            id="imViewType"
            className="selectImageManagment"
            onChange={(event) => this.ChangeImageViewType(event)}
          >
            {EventTypesOptions}
          </select>
          <p>Should appear at baner:</p>
          {/* <select
            name="onBaner"
            id="baner"
            className="selectImageManagment"
            onChange={(event) => this.ChangeBannerAppearance(event)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select> */}

          <div>
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
        <Button buttonText={"back"} clicked={() => this.back()} />
      </div>
    );
  }
}

export default OrdersCalendar;
