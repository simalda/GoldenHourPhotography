import React from "react";
import Button from "../Button";

import history from "../../JS/history";
import OrderHandler from "../../JS/Orderhandler";
import Order from "../../JS/Order";
import * as proxy from "../../JS/proxy";
import * as dateManager from "../../JS/dateManipulations";
// import * as hebrew from "../../JS/Languages/Hebrew";
class EditOneOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      telefon: "",
      email: "",
      location: "",
      date: this.props.date,
      time: this.props.timeSlot.time,
      eventType: "",
      note: "",
    };
  }
  componentDidMount() {
    if (this.props.order !== null) {
      this.setState({
        name: this.props.order.name,
        telefon: this.props.order.telefon,
        email: this.props.order.email,
        location: this.props.order.location,
        date: this.props.date,
        time: this.props.timeSlot.time,
        eventType: this.props.order.eventType,
        note: this.props.order.note,
      });
    }
  }
  clicked() {}
  saveOrder(event) {
    event.preventDefault();

    const orHandler = new OrderHandler();
    const order = new Order(
      this.props.date,
      this.state.time,
      this.state.name,
      this.state.telefon,
      this.state.email,
      this.state.location,
      this.state.eventType,
      this.state.note
    );
    if (this.props.order === null) {
      orHandler.addNewOrder(order);
    } else if (this.props.order !== null) {
      orHandler.updateOrder(order);
    }
    this.props.closeEditOrderPopup();
  }

  onInputChange(event) {
    this.setState((prevState, props) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  }

  createEventTypes() {
    let options = <option></option>;
    if (this.props.order === null) {
      options = this.props.eventTypes.map((type, index) => {
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
    } else if (this.props.order !== null) {
      options = this.props.eventTypes.map((type, index) => {
        if (type === this.props.order.eventType) {
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
    }
    return options;
  }
  createLocationTypes() {
    let options = <option></option>;
    if (this.props.order === null) {
      options = this.props.locationsInfo.map((location, index) => {
        if (index === 0) {
          return (
            <option value={location.name} selected key={index}>
              {this.props.dictionary[location.name]}
            </option>
          );
        }
        return (
          <option value={location.name} key={index}>
            {this.props.dictionary[location.name]}
          </option>
        );
      });
    } else if (this.props.order !== null) {
      options = this.props.locationsInfo.map((location, index) => {
        if (location.name === this.props.order.location) {
          return (
            <option value={location.name} selected key={index}>
              {this.props.dictionary[location.name]}
            </option>
          );
        }
        return (
          <option value={location.name} key={index}>
            {this.props.dictionary[location.name]}
          </option>
        );
      });
    }

    return options;
  }

  changeImageType(event) {
    this.setState({ eventType: event.value });
  }
  changeLocation(event) {
    this.setState({
      location: event.value,
    });
  }
  render() {
    const EventTypes = this.createEventTypes();
    const LocaationTypes = this.createLocationTypes();
    const dateFormated = dateManager.convertDateToDateStringDDMMYYYY(
      this.props.date
    );
    let body = (
      <div className="popup">
        <div className="orderDetails mainDiv white">
          <div
            className="headerDetails"
            style={{ paddingTop: "0px", marginTop: "0px" }}
          >
            פרטים אישיים
          </div>
          <div className="divContainsOrderDetailsEdit">
            <form onSubmit={(event) => this.saveOrder(event)}>
              <div className="userDetailsEdit">
                <div className="heebo-Bold" style={{ fontSize: "2vh" }}>
                  {dateFormated}
                  <span> :{this.props.dictionary["date"]}</span>
                </div>
                <div className="heebo-Bold " style={{ fontSize: "2vh" }}>
                  {this.props.timeSlot.time}
                  <span> :{this.props.dictionary["time"]}</span>
                </div>
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
                  className="orderDetailsEventType"
                  onChange={(event) =>
                    this.changeImageType(event.currentTarget)
                  }
                >
                  {EventTypes}
                </select>
                <select
                  name="locationType"
                  id="locationType"
                  className="orderDetailsEventType"
                  onChange={(event) => this.changeLocation(event.currentTarget)}
                >
                  {LocaationTypes}
                </select>
                <input
                  placeholder="הערות"
                  id="note"
                  onChange={(event) => this.onInputChange(event)}
                ></input>
                <Button
                  buttonText={this.props.dictionary["send"]}
                  clicked={() => this.clicked()}
                />
                <Button
                  buttonText={this.props.dictionary["back"]}
                  clicked={() => this.props.closeEditOrderPopup()}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
    if (this.props.order !== null) {
      body = (
        <div className="popup">
          <div className="orderDetails mainDiv white">
            <div
              className="headerDetails"
              style={{ paddingTop: "0px", marginTop: "0px" }}
            >
              פרטים אישיים
            </div>
            <div className="divContainsOrderDetailsEdit">
              <form onSubmit={(event) => this.saveOrder(event)}>
                <div className="userDetailsEdit">
                  <div className="heebo-Bold" style={{ fontSize: "2vh" }}>
                    {dateFormated}
                    <span> :{this.props.dictionary["date"]}</span>
                  </div>
                  <div className="heebo-Bold " style={{ fontSize: "2vh" }}>
                    {this.props.timeSlot.time}
                    <span> :{this.props.dictionary["time"]}</span>
                  </div>
                  <input
                    value={this.props.order.name}
                    placeholder="שם"
                    id="name"
                    onChange={(event) => this.onInputChange(event)}
                  ></input>
                  <input
                    value={this.props.order.telefon}
                    placeholder="פלאפון"
                    id="telefon"
                    onChange={(event) => this.onInputChange(event)}
                  ></input>
                  <input
                    value={this.props.order.email}
                    placeholder="אימייל"
                    id="email"
                    onChange={(event) => this.onInputChange(event)}
                  ></input>
                  <select
                    name="eventType"
                    id="eventType"
                    className="orderDetailsEventType"
                    onChange={(event) =>
                      this.changeImageType(event.currentTarget)
                    }
                  >
                    {EventTypes}
                  </select>
                  <select
                    name="locationType"
                    id="locationType"
                    className="orderDetailsEventType"
                    onChange={(event) =>
                      this.changeLocation(event.currentTarget)
                    }
                  >
                    {LocaationTypes}
                  </select>
                  <input
                    placeholder="הערות"
                    id="note"
                    value={this.props.order.note}
                    onChange={(event) => this.onInputChange(event)}
                  ></input>
                  <Button
                    buttonText={this.props.dictionary["send"]}
                    clicked={() => this.clicked()}
                  />
                  <Button
                    buttonText={this.props.dictionary["back"]}
                    clicked={() => this.props.closeEditOrderPopup()}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    return <div>{body}</div>;
  }
}
export default EditOneOrder;
