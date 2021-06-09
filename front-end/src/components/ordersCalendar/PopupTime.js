import React from "react";

import TimeSlotJSX from "./TimeSlotJSX";

class PopupTime extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="popup" style={{ backgroundColor: "rgb(61 61 61 / 80%)" }}>
        <TimeSlotJSX
          readTime={(time) => this.props.readTime(time)}
          onClickCancelTime={() => this.props.onClickCancelTime()}
          curentDateTimeSlot={this.props.curentDateTimeSlot}
        />
      </div>
    );
  }
}

export default PopupTime;
