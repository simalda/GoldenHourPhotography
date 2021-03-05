import React from "react";

import TimeButton from "./TimeButton";

class TimeSlotJSX extends React.Component {
  constructor(props) {
    super(props);
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

export default TimeSlotJSX;
