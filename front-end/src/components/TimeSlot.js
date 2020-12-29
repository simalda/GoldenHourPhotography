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
        readTime={(time) => this.props.readTime(time)}
        time={time}
        key={index}
      ></TimeButton>
    ));
    timeOptions.reduce((x, y) => x + y);

    return (
      <div>
      <div className="timeItems">
        {timeOptions}
        <button
          className="miniButton1 justCenter"
          onClick={() => this.props.onClickCancelTime()}
        >
          יציאה
        </button>
      </div>
      </div>
    );
  }
}

export default TimeSlot;
