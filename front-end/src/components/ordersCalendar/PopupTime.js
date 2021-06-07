import React from "react";

import TimeSlotJSX from "./TimeSlotJSX";

class PopupTime extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="popup">
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
