import React from "react";

class PopupOpenTimeSlotClicked extends React.Component {
  makeOrderManually() {}

  render() {
    return (
      <div className="popup">
        <div className="white">
          <button
            className="button"
            onClick={() => this.props.closeTimeSlot(this.props.timeSlot)}
          >
            לסגור את השעה להזמנות
          </button>

          <button className="button" onClick={() => this.makeOrderManually()}>
            לעשות הזמנה ידנית
          </button>
          <button
            className="button"
            onClick={() => this.props.closeOpenTimeSlotPopup()}
          >
            חזרה
          </button>
        </div>
      </div>
    );
  }
}
export default PopupOpenTimeSlotClicked;
