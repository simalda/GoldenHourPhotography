import React from "react";
import EditOneOrder from "../EditOneOrder";

class PopupReservedTimeSlotClicked extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
    };
  }

  render() {
    return (
      <div className="popup  ">
        <div className="white">
          <button
            className="button"
            onClick={() => this.props.makeOrderManually()}
          >
            לעדכן הזמנה
          </button>

          <button
            className="button"
            onClick={() => this.props.deleteOrder(this.props.timeSlot.orderId)}
          >
            למחוק הזמנה
          </button>
          <button
            className="button"
            onClick={() => this.props.closeReservedTimeSlotPopup()}
          >
            חזרה
          </button>
        </div>
      </div>
    );
  }
}
export default PopupReservedTimeSlotClicked;
