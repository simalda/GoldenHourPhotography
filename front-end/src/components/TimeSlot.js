import React from "react";

import TimeButton from "./TimeButton";

class TimeSlot extends React.Component {
  constructor(props) {
    super(props);
    this.time = ["14:00-15:00", "15:00 - 16:00"];
  }

  render() {
    let timeOptions = this.time.map((time, index) => (
      <TimeButton
        onCklick={this.props.onCklick}
        time={time}
        key={index}
      ></TimeButton>
    ));
    timeOptions.reduce((x, y) => x + y);

    return <div className="">{timeOptions}</div>;
  }
}

export default TimeSlot;
