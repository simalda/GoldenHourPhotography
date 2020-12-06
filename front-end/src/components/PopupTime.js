import React from "react";

import TimeSlot from "./TimeSlot";

class PopupTime extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="popup timeslot">
        <TimeSlot onCklick={this.props.onCklick} />
      </div>
    );
  }
}

export default PopupTime;
