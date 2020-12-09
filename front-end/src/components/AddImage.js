import React from "react";

import history from "../JS/history";
import * as proxy from "../JS/proxy";

class OrdersCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageType: "Regular",
      imageLocation: "City",
      imageViewType: "Family",
      bannerApearence: false,
    };
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

  mySubmitHandler() {
    proxy
      .addNewImage(
        this.state.name,
        this.state.imageType,
        this.state.imageLocation,
        this.state.imageViewType,
        this.state.bannerApearence
      )
      .then(
        (loginResponse) => {
          console.log(loginResponse);
          alert("Saved");
          history.push("/galeryManager/addImage");
        },
        (result) => {
          console.log(result);
          alert(" Not Saved :" + result);
          history.push("/galeryManager/addImage");
        }
      );
  }
  render() {
    return (
      <div className=" popup mainDiv" style={{ color: "white" }}>
        <form onSubmit={(event) => this.mySubmitHandler(event)}>
          <h1>Feel the fields </h1>
          <p>Name of image:</p>
          <input type="text" onChange={(event) => this.ChangeName(event)} />
          <p>Image type:</p>
          <select
            name="imageType"
            id="imType"
            onChange={(event) => this.ChangeImageType(event)}
          >
            <option value="Regular">Regular</option>
            <option value="360">360</option>
          </select>
          <p>Image location:</p>
          <select
            name="location"
            id="imLoc"
            onChange={(event) => this.ChangeImageLocation(event)}
          >
            <option value="City">City</option>
            <option value="Forest">Forest</option>
            <option value="Sea">Sea</option>
            <option value="Park">Park</option>
            <option value="Other">Other</option>
          </select>
          <p>Image view type:</p>
          <select
            name="imViewType"
            id="imViewType"
            onChange={(event) => this.ChangeImageViewType(event)}
          >
            <option value="Family">Family</option>
            <option value="Irua">Irua</option>
            <option value="Pregnancy">Pregnancy</option>
            <option value="Other">Other</option>
          </select>
          <p>Should appear at baner:</p>
          <select
            name="onBaner"
            id="baner"
            onChange={(event) => this.ChangeBannerAppearance(event)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default OrdersCalendar;
