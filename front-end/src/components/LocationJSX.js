import React from "react";

import Slider from "./slider/Slider";
import D3images from "./D3images";
import OrdersCalendar from "./ordersCalendar/OrdersCalendar";
import arrow from "../static/photos/cuts/Arrow_Left.svg";
import ImageLinkerHandler from "../JS/ImageLinkerHandler";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupTag: false,
      pathList: this.createPathList(),
      connections: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    const linkerHandler = new ImageLinkerHandler();
    linkerHandler
      .getConnections(this.props.locationDescription.sphereImageList[0])
      .then((result) =>
        this.setState({
          connections: result,
          isLoaded: true,
        })
      );
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
    return this.props.locationDescription.regularImageList.map(
      (image) => image.path
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
    if (!this.state.isLoaded) {
      return <span>wait....</span>;
    }
    return (
      <div className="mainDiv">
        <div className="d3">
          <D3images
            admin={this.props.admin}
            locationDescription={this.props.locationDescription}
            panorama={this.props.locationDescription.sphereImageList[0]}
            connections={this.state.connections}
          />
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
              {this.props.locationDescription.name}
            </span>
          </div>
        </div>
        <div className="photosFromThere">
          <div className="diagonaled">Photos from there</div>
        </div>
        <Slider pathList={this.state.pathList} />
        <div>
          <button className="button" onClick={() => this.clicked()}>
            {this.props.dictionary["savePlace"]}
          </button>
        </div>
        {popup}
      </div>
    );
  }
}

export default Location;
