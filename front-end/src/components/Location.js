import React from "react";

import Button from "./Button";
import Slider from "./slider/Slider";
import D3images from "./D3images";
import OrdersCalendar from "./ordersCalendar/OrdersCalendar";
import arrow from "../static/photos/cuts/Arrow_Left.svg";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.buttonText = "שירינו לי מקום";
    this.state = {
      popupTag: false,
      pathList: this.createPathList(),
    };
  }

  clicked() {
    this.setState({
      popupTag: true,
    });
  }

  onClickCancelCalendar() {
    this.setState({
      popupTag: false,
    });
  }
  createPathList() {
    return this.props.locationDescription.images.map(
      (image) => "./static/" + image.name
    );
  }
  render() {
    let popup = <div></div>;
    if (this.state.popupTag) {
      popup = (
        <OrdersCalendar
          {...this.props}
          updateOrder={(date, time, weekDay) =>
            this.props.updateOrder(
              date,
              time,
              weekDay,
              this.props.locationDescription
            )
          }
          onClickCancelCalendar={() => this.onClickCancelCalendar()}
          openDatesForOrder={this.props.openDatesForOrder}
        />
      );
    }
    return (
      <div className="mainDiv">
        {/* <div className="locationName">
          {this.props.locationDescription.name}
        </div> */}
        <div className="3d" style={{ height: "40hv" }}>
          <D3images />
          <div className="D3banner">
            <span className="D3bannerLeft">
              <img
                className="D3bannerArrow"
                src={arrow}
                alt={"arrow to next image"}
              />
              <span style={{ color: "#515151", opacity: 0.5 }}>הבא</span> 1/3{" "}
            </span>
            <span className="D3bannerRight">
              {this.props.dictionary[this.props.locationDescription.name]}
            </span>
          </div>
        </div>
        <div className="photosFromThere">
          <div className="diagonaled">Photos from there</div>
        </div>
        <Slider pathList={this.state.pathList} />
        <div>
          <Button buttonText={this.buttonText} clicked={() => this.clicked()} />
        </div>
        {popup}
      </div>
    );
  }
}

export default Location;
