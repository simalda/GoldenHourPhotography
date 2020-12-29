import React from "react";

import Button from "./Button";
import Slider from "./Slider";
import D3images from "./D3images";
import OrdersCalendar from "./OrdersCalendar";

import history from "../JS/history";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.buttonText = "שירינו לי מקום";
    this.state={
      popupTag:false
    }
  }

  clicked() {
    this.setState({
      popupTag:true
    })
  }

  onClickCancelCalendar() {
    this.setState({
      popupTag:false
    });
  }

  render() {
    let popup = <div></div>
    if (this.state.popupTag) {
        popup = (
        <OrdersCalendar
        {...this.props}
        updateOrder={(date, time) => this.props.updateOrder(date, time)} onClickCancelCalendar ={() => this.onClickCancelCalendar()}
      />
      );
    }
    return (
      <div className="mainDiv">
        <div className="locationName">פארק קישון</div>
        <div className="3d" style={{ height: "40hv" }}>
          <D3images />
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
