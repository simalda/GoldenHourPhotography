import React from "react";

import classes from "./editCalendar.module.scss";

class EditOneSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slotToUpdate: [],
      timeUnit: this.props.timeUnit,
      isOpen: this.props.isOpen,
      isModalOpen: false,
    };
  }

  render() {
    return (
      <button
        className={`${classes[this.props.slot.status]}  ${
          classes.calendarButton
        }`}
        onClick={() => this.props.onClick(this.props.slot)}
      >
        {this.props.slot.status}
      </button>
    );
  }
}

export default EditOneSlot;
