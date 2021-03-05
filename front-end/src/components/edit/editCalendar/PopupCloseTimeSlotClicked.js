import React from "react";
import TimeUnitHandler from "../../../JS/TimeUnitHandler";
import TimeUnit from "../../../JS/TimeUnit";

class PopupCloseTimeSlotClicked extends React.Component {
  render() {
    return (
      <div className="popup  ">
        <div className="white">
          <button
            className="button"
            onClick={() => this.props.openOnlyThisTimeUnit(this.props.timeSlot)}
          >
            לאפשר את השעה חד פעמית
          </button>
          <button
            className="button"
            onClick={() => this.props.openTimeUnitWeekly(this.props.timeSlot)}
          >
            לאפשר את השעה שבועית
          </button>
          <button
            className="button"
            onClick={() => this.props.makeOrderManually(this.props.timeSlot)}
          >
            לעשות הזמנה ידנית
          </button>
          <button
            className="button"
            onClick={() => this.props.closeCloseTimeSlotPopup()}
          >
            חזרה
          </button>
        </div>
      </div>
    );
  }
}
export default PopupCloseTimeSlotClicked;
