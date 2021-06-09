import React, { Fragment } from "react";
// import SVG from "react-inlinesvg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PopupTime from "./PopupTime";

import history from "../../JS/history";
import * as dateManager from "../../JS/dateManipulations";
import TimeUnitHandler from "../../JS/TimeUnitHandler";
import OrderHandler from "../../JS/Orderhandler";
// import UICalendarManager from "./UICalendarManager";

import classes from "./calendar.module.scss";
// import { registerButton } from "photo-sphere-viewer";
import OneDayTimeSlot from "../../JS/OneDayTimeSlot";
class OrdersCalendar extends React.Component {
  constructor(props) {
    super(props);
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
    this.setState({
      timeUnitSingleList: timeUnitsSingle,
      timeUnitWeeklyList: timeUnitsWeekly,
      ordersList: orders,
      isLoading: false,
    });
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

  getCurentDateTimeSlot(date) {
    const currentTimeSlot = new OneDayTimeSlot(date);
    currentTimeSlot.fillOneDayTimeSlot(
      date,
      this.state.timeUnitSingleList,
      this.state.timeUnitWeeklyList,
      this.state.ordersList
    );
    return currentTimeSlot;
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
          className={classes.miniButton2}
          onClick={() => this.onClickOKnotReady()}
        >
          OK
        </button>
      );
      if (this.state.timePicked) {
        OkButton = (
          <button
            className={classes.miniButton2}
            onClick={() => this.onClickOK()}
          >
            OK
          </button>
        );
        pickedTime = <div>{this.state.time}</div>;
      }
      body = (
        <div
          className={`${classes.calendar} popup`}
          style={{ backgroundColor: "rgb(61 61 61 / 80%)" }}
        >
          <div className={classes.calendarWrap}>
            <div className={classes.calendarHeader}>
              <div className={classes.calendarHeaderYear}>
                {this.state.date.getFullYear()}
              </div>
              <div className={classes.calendarHeaderDate}>
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
              calendarType="Hebrew"
              locale="HE"
              onChange={(ev) => this.onChange(ev)}
              value={this.state.date}
            />

            <div className={classes.calendarFooter}>
              <button
                className={classes.miniButton1}
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
