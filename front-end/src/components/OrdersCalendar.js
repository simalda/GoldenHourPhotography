import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import PopupTime from "./PopupTime";

import history from "../JS/history";

class OrdersCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      popupTag: false,
      time: "",
      timePicked: false,
    };
  }

  hebrewDate() {
    var dateText;
    var days = new Array();
    days[days.length] = "יום ראשון";
    days[days.length] = "יום שני";
    days[days.length] = "יום שלישי";
    days[days.length] = "יום רביעי";
    days[days.length] = "יום חמישי";
    days[days.length] = "יום שישי";
    days[days.length] = "יום שבת";

    var months = new Array();
    months[months.length] = "ינואר";
    months[months.length] = "פברואר";
    months[months.length] = "מרץ";
    months[months.length] = "אפריל";
    months[months.length] = "מאי";
    months[months.length] = "יוני";
    months[months.length] = "יולי";
    months[months.length] = "אוגוסט";
    months[months.length] = "ספטמבר";
    months[months.length] = "אוקטובר";
    months[months.length] = "נובמבר";
    months[months.length] = "דצמבר";

    dateText =
      days[this.state.date.getDay()] +
      ", " +
      this.state.date.getDate() +
      " ל" +
      months[this.state.date.getMonth()];

    return dateText;
  }
  onChange(ev) {
    console.log(ev);
    this.setState({
      ...this.state,
      popupTag: true,
      date: ev,
    });
  }

  onClick(date) {
    console.log(date);
    this.setState({
      popupTag: false,
    });
  }

  onClickOK() {
    this.props.updateOrder(this.state.date, this.state.time);
    history.push("/orderDetails");
  }
  onClickOKnotREady() {
    alert("Please, pick time first");
  }
  onClickCancel() {
    history.goBack();
    this.setState({
      timePicked: false,
    });
  }
  readTime(newTime) {
    console.log(newTime);
    this.setState({
      popupTag: false,
      time: newTime,
      timePicked: true,
    });
  }
  onClickCancelTime() {
    this.setState({
      popupTag: false,
    });
  }

  render() {
    let popup = <div></div>;
    let pickedTime = <div></div>;
    if (this.state.popupTag) {
      popup = (
        <PopupTime
          onClickCancelTime={() => this.onClickCancelTime()}
          readTime={(time) => this.readTime(time)}
        />
      );
    }
    var OkButton = (
      <button className="miniButton2 " onClick={() => this.onClickOKnotREady()}>
        OK
      </button>
    );
    if (this.state.timePicked) {
      OkButton = (
        <button className="miniButton2" onClick={() => this.onClickOK()}>
          OK
        </button>
      );
      pickedTime = <div>{this.state.time}</div>;
    }
    return (
      <div className="calendar popup mainDiv">
        <div className="calendarWrap">
          <div className="calendarHeader">
            <div className="calendarHeaderYear">
              {this.state.date.getFullYear()}
            </div>
            <div className="calendarHeaderDate">{this.hebrewDate()}</div>
            {pickedTime}
          </div>
          <Calendar
            tileClassName="react-calendar__tile--active2"
            calendarType="Hebrew"
            locale="HE"
            onChange={(ev) => this.onChange(ev)}
            value={this.state.date}
          />

          <div className="calendarFooter">
            <button
              className="miniButton1"
              onClick={() => this.onClickCancel()}
            >
              יציאה
            </button>
            {OkButton}
          </div>
        </div>
        {popup}
      </div>
    );
  }
}

export default OrdersCalendar;
