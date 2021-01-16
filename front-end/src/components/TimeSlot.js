import React from "react";

import TimeButton from "./TimeButton";

class TimeSlot extends React.Component {
  constructor(props) {
    super(props);
    // this.time = ["14:00-15:00", "15:00 - 16:00"];
  }

  render() {
    let timeOptions = this.props.curentDateTimeSlot.map((time, index) => (
      <TimeButton
        readTime={(x) => this.props.readTime(x)}
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
