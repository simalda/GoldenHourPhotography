import React from "react";

import Button from "./Button";

import history from "../JS/history";
import OrderHandler from "../JS/Orderhandler";
import Order from "../JS/Order";
import * as proxy from "../JS/proxy";
import * as dateManager from "../JS/dateManipulations";
import * as hebrew from "../JS/Languages/Hebrew";
class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.buttonText = "שליחה";
    this.state = {
      name: "",
      telefon: "",
      email: "",
      location: this.props.order.location,
      date: this.props.order.date,
      time: this.props.order.time,
      eventType: "",
      note: "",
    };
  }

  clicked() {}
  saveOrder(event) {
    event.preventDefault();

    const orHandler = new OrderHandler();
    const order = new Order(
      this.state.date,
      this.state.time,
      this.state.name,
      this.state.telefon,
      this.state.email,
      this.props.locationDescription.name,
      this.state.eventType,
      this.state.note
    );
    orHandler.addNewOrder(order);
    history.push("/endPage");
  }

  onInputChange(event) {
    this.setState((prevState, props) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  }

  createEventTypes() {
    const options = this.props.eventTypes.map((type, index) => {
      if (index === 0) {
        return (
          <option value={type} selected key={index}>
            {this.props.dictionary[type]}
          </option>
        );
      }
      return (
        <option value={type} key={index}>
          {this.props.dictionary[type]}
        </option>
      );
    });

    return options;
  }

  changeImageType(event) {
    this.setState({ eventType: event.value });
  }
  render() {
    const EventTypes = this.createEventTypes();
    return (
      <div className="orderDetails mainDiv">
        <div className="headerDetails">פרטים אישיים</div>
        <div className="divContainsOrderDetails">
          <div className="divPaymentDescription">
            <div>
              <span className="sale">Sale </span> מבצע לימי חורף
            </div>
            <div>
              <div className="saleAmount">₪ רק 350 </div>
              <span className="basePrice"> ₪ 599 </span>
            </div>
            <div className="preSaleDescription">
              <div> ₪תשלום מקדמה בסך 50 </div>
              <div>ניתן לשלם בהעברה בביט או העברה בנקאית</div>
            </div>
          </div>
          <form onSubmit={(event) => this.saveOrder(event)}>
            <div className="userDetails">
              <input
                placeholder="שם"
                id="name"
                onChange={(event) => this.onInputChange(event)}
              ></input>
              <input
                placeholder="פלאפון"
                id="telefon"
                onChange={(event) => this.onInputChange(event)}
              ></input>
              <input
                placeholder="אימייל"
                id="email"
                onChange={(event) => this.onInputChange(event)}
              ></input>
              <select
                name="eventType"
                id="eventType"
                className=""
                onChange={(event) => this.changeImageType(event.currentTarget)}
              >
                {EventTypes}
              </select>
              <input
                placeholder="הערות"
                id="note"
                onChange={(event) => this.onInputChange(event)}
              ></input>
              <Button
                buttonText={this.buttonText}
                clicked={() => this.clicked()}
              />
            </div>
          </form>
          <div className="divOrderDetail">
            <div>{this.props.order.location} :מיקום</div>
            {/* <div>{this.props.order.date.toString()} יום ... </div> */}
            <div>{this.props.order.hebrewDay} :יום </div>
            <div>{this.props.order.time} :שעה </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetails;
