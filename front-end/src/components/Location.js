import React from "react";

import Button from "./Button";
import Slider from "./Slider";
import D3images from "./D3images";
import OrdersCalendar from "./ordersCalendar/OrdersCalendar";
import arrow from "../static/photos/cuts/Arrow_Left.svg";

import history from "../JS/history";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.buttonText = "שירינו לי מקום";
    this.state = {
      popupTag: false,
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

  render() {
    let popup = <div></div>;
    if (this.state.popupTag) {
      popup = (
        <OrdersCalendar
          {...this.props}
          updateOrder={(date, time, weekDay) =>
            this.props.updateOrder(date, time, weekDay)
          }
          onClickCancelCalendar={() => this.onClickCancelCalendar()}
          openDatesForOrder={this.props.openDatesForOrder}
        />
      );
    }
    return (
      <div className="mainDiv">
        <div className="locationName">חוף עתלית</div>
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
            <span className="D3bannerRight"> חוף עתלית </span>{" "}
          </div>
        </div>
        <div className="photosFromThere">
          <div className="diagonaled">Photos from there</div>
        </div>
        <Slider />
        <div>
          <Button buttonText={this.buttonText} clicked={() => this.clicked()} />
        </div>
        {popup}
      </div>
    );
  }
}

export default Location;
