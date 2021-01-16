import React from "react";

import TimeSlot from "./TimeSlot";

class PopupTime extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="popup timeslot">
        <TimeSlot
          readTime={(time) => this.props.readTime(time)}
          onClickCancelTime={() => this.props.onClickCancelTime()}
          curentDateTimeSlot={this.props.curentDateTimeSlot}
        />
      </div>
    );
  }
}

export default PopupTime;
