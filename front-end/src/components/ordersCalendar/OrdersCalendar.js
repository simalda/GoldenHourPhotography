import React, { Fragment } from "react";
// import SVG from "react-inlinesvg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import rightArrow from "../../static/photos/cuts/Arrow_Right.svg";
import PopupTime from "./PopupTime";

import history from "../../JS/history";
// import { convertDateToDateArrayDDMMYYYY } from "../../JS/dateManipulations";
import * as dateManager from "../../JS/dateManipulations";
// import TimeSlotManager from "../editCalendar/TimeSlotManager";
import TimeUnitHandler from "../../JS/TimeUnitHandler";
import OrderHandler from "../../JS/Orderhandler";
import * as config from "../../JS/config";
import UICalendarManager from "./UICalendarManager";

class OrdersCalendar extends React.Component {
  constructor(props) {
    super(props);
    // var emptyArray = [];
    // for (let i = 0; i < 31; i++) {
    //   emptyArray.push([]);
    // }
    this.state = {
      date: new Date(),
      popupTag: false,
      isLoading: true,
      curentDateTimeSlot: [],
      time: "",
      hebrew: {
        weekDay: "",
        dateString: "",
      },
      timePicked: false,
      // avilableTimeSlots: this.props.openDatesForOrder,
      availableDatesFormated: [],
    };
  }

  // componentDidMount() {
  //   this.dateFormatedopenDates();
  // }
  componentDidMount() {
    this.updateTable();
  }
  async updateTable() {
    let timeUnitsSingle = await this.getTimeUnitsSingleFromDB();
    let timeUnitsWeekly = await this.getTimeUnitsWeeklyFromDB();
    let orders = await this.getOrdersFromDB();
    this.getCalendarTable(timeUnitsSingle, timeUnitsWeekly, orders);
  }
  getTimeUnitsSingleFromDB() {
    const tu = new TimeUnitHandler();
    return tu.getSingleTimeSlots();
  }
  getTimeUnitsWeeklyFromDB() {
    const tu = new TimeUnitHandler();
    return tu.getTimeSlotsWeekly();
  }
  getOrdersFromDB() {
    const orderHandler = new OrderHandler();
    return orderHandler.getOrders();
  }

  getCalendarTable(timeUnitSingleList, timeUnitWeeklyList, ordersList) {
    let calManager = new UICalendarManager(
      this.props.calendar.month,
      this.props.calendar.year
    );
    calManager.getInfoAboutDays(
      timeUnitSingleList,
      timeUnitWeeklyList,
      ordersList
    );
    this.setState({
      timeUnitSingleList,
      timeUnitWeeklyList,
      ordersList,
      calManager,
      isLoading: false,
    });
  }

  onChange(ev) {
    console.log(ev);
    const hebrewDate = dateManager.hebrewDate(ev);

    const dateTimeSlot = this.getCurentDateTimeSlot(ev);

    if (!dateTimeSlot.isThereSlotsToReserve()) {
      alert("אין שעות פנויות ביום זה");
    } else {
      this.setState({
        ...this.state,
        popupTag: true,
        date: ev,
        curentDateTimeSlot: dateTimeSlot,
        hebrew: {
          weekDay: hebrewDate.weekDay,
          dateString: hebrewDate.dateString,
        },
      });
    }
  }
  onViewChange(ev) {
    console.log("hi");
    const switchMonth = (calendar, step) =>
      setMonth({
        ...month,
        [calendar]: moment(month[calendar]).add(step, "months"),
      });
    switchMonth(ev, 1);
  }
  getCurentDateTimeSlot(date) {
    return this.state.calManager.openDaysList[date.getDate() - 1];
  }

  onClick(date) {
    console.log(date);
    this.setState({
      popupTag: false,
    });
  }

  onClickOK() {
    this.props.updateOrder(
      this.state.date,
      this.state.time,
      this.state.hebrew.weekDay
    );
    history.push("/orderDetails");
  }
  onClickOKnotReady() {
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
    try {
      if (this.getCurentDateTimeSlot(date).isThereSlotsToReserve()) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  render() {
    // const NextArrow = (ev) => (
    //   <SVG onClick={() => this.onViewChange(ev)} src={rightArrow} />
    // );
    // const PrevArrow = calendar => <SVG onClick={() => switchMonth(calendar, -1)} src={ArrowLeftIcon}/>;
    let body = <div></div>;
    if (this.state.isLoading) {
      body = <div>Loading</div>;
      this.updateTable();
    } else {
      let popup = <div></div>;
      let pickedTime = <div></div>;
      if (this.state.popupTag) {
        popup = (
          <PopupTime
            onClickCancelTime={() => this.onClickCancelTime()}
            readTime={(time) => this.readTime(time)}
            curentDateTimeSlot={this.state.curentDateTimeSlot.getTimeSlotsAsArray()}
          />
        );
      }
      var OkButton = (
        <button
          className="miniButton2 "
          onClick={() => this.onClickOKnotReady()}
        >
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
      body = (
        <div className="calendar popup mainDiv">
          <div className="calendarWrap">
            <div className="calendarHeader">
              <div className="calendarHeaderYear">
                {this.state.date.getFullYear()}
              </div>
              <div className="calendarHeaderDate">
                {dateManager.hebrewDate(this.state.date).dateString}
              </div>
              {pickedTime}
            </div>
            <Calendar
              tileClassName={({ date }) => {
                if (this.shouldDateBeSelected(date)) {
                  return "dayNotAvailable cellStyle";
                }
                return "cellStyle";
              }}
              // tileDisabled={this.tileDisabled}
              // tileClassName="react-calendar__tile--active2"
              calendarType="Hebrew"
              locale="HE"
              onChange={(ev) => this.onChange(ev)}
              // nextLabel={NextArrow()}
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
    return <Fragment> {body}</Fragment>;
  }
}

export default OrdersCalendar;
