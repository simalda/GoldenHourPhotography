import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import PopupTime from "./PopupTime";

import history from "../JS/history";
import convertDateToDateArrayDDMMYYYY from '../JS/dateManipulations'

class OrdersCalendar extends React.Component {
  constructor(props) {
    super(props);
    var emptyArray = []
    for (let i=0; i<31;i++){
       emptyArray.push([])
    }
    this.state = {
      date: new Date(),
      popupTag: false,
      time: "",
      timePicked: false,
      avilableTimeSlots:emptyArray,
    };
  }

  componentDidMount() {
    // this.createEmptytimeSlotArray();
    this.getAvailableTimeSlots();
  }

  // createEmptytimeSlotArray(){
  //  var daysInMonth =31
  //  var emptyArray = []
  //  for (let i=0; i<31;i++){
  //     emptyArray.push([])
  //  }
  //  this.setState({
  //    ...this.state,
  //    avilableTimeSlots: emptyArray
  //  })
  // }
  getAvailableTimeSlots() {
    var today = new Date();
    var tommor = new Date();
  

this.setState((prevState) => {
  let avilableTimeSlots = prevState.avilableTimeSlots.slice(0);
  avilableTimeSlots[3] =["14:00-15:00", "15:00 - 16:00", "16:00-17:00", "17:00 - 18:00"]
  avilableTimeSlots[5] = ["14:00-15:00", "15:00 - 16:00"]
  return {avilableTimeSlots}
})
  }

  //   this.setState((prevState) => {
  //     var today = new Date();
  //     var tommor = new Date();
  //     // var numberOfDaysToAdd = 1;
  //     today = convertDateToDateArrayDDMMYYYY(today.setDate(today.getDate() - 21));
  //     tommor = convertDateToDateArrayDDMMYYYY( tommor.setDate(today.getDate() - 28));
  //     // this.setState((prevState) => {
  //     //   let avilableTimeSlots = {
  //     //     ...prevState.avilableTimeSlots,
  //     //     today: ["14:00-15:00", "15:00 - 16:00", "16:00-17:00", "17:00 - 18:00"],
  //     //     tommor: ["14:00-15:00", "15:00 - 16:00"],
  //     //   };
  //     //   return { avilableTimeSlots };
  //     // });

  //     let avilableTimeSlots = new Map([
  //       ...prevState.avilableTimeSlots,
  //       [
  //         today,
  //         ["14:00-15:00", "15:00 - 16:00", "16:00-17:00", "17:00 - 18:00"],
  //       ],
  //       [
  //         tommor, 
  //         ["14:00-15:00", "15:00 - 16:00"]],
  //     ]);
  //     return { avilableTimeSlots };
  //   });
  // }

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

  shouldDateBeSelected(date) {
    var someDate = new Date();
    var numberOfDaysToAdd = 2;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    // if(date.getDay() === someDate.getDay() && (date.getMonth() === someDate.getMonth())){
    if (
      date.getDay() === 6 ||
      !this.state.avilableTimeSlots[date.getDate()-1].length
    ) {
      return true;
    }
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
            tileClassName={({ date }) => {
              if (this.shouldDateBeSelected(date)) {
                return "dayNotAvailable";
              }
              return null;
            }}
            // tileClassName="react-calendar__tile--active2"
            calendarType="Hebrew"
            locale="HE"
            onChange={(ev) => this.onChange(ev)}
            value={this.state.date}
          />

          <div className="calendarFooter">
            <button
              className="miniButton1"
              onClick={() => this.props.onClickCancelCalendar()}
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
