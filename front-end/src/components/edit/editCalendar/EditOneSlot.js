import React from "react";

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
        className={this.props.slot.status + " calendarButton"}
        onClick={() => this.props.onClick(this.props.slot)}
      >
        {this.props.slot.status}
      </button>
    );
  }
}

export default EditOneSlot;
