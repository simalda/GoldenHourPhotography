import React, { Fragment } from "react";

import history from "../../../JS/history";
import Button from "../../Button";
// import * as proxy from "../../JS/proxy";
import EditOneSlot from "./EditOneSlot";
import "./editCalendar.css";
import TimeUnit from "../../../JS/TimeUnit";

import * as dateManager from "../../../JS/dateManipulations";
import TimeUnitHandler from "../../../JS/TimeUnitHandler";
import * as config from "./config";
import TimeSlotManager from "./TimeSlotManager";
// import OrdersCalendar from "../ordersCalendar/OrdersCalendar";
import OrderHandler from "../../../JS/Orderhandler";

class EditCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: dateManager.countStartDate(this.props.date),
      endDate: dateManager.countEndDate(this.props.date),
      isLoading: true,
    };
  }

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
    let timeSlotManager = new TimeSlotManager();
    timeSlotManager.getTimeSlotsForPeriod(
      this.state.startDate,
      this.state.endDate,
      timeUnitSingleList,
      timeUnitWeeklyList,
      ordersList
    );
    this.setState({
      timeUnitSingleList,
      timeUnitWeeklyList,
      ordersList,
      timeSlotManager,
      isLoading: false,
    });
  }

  onOneSlotClick(oldTimeUnit) {
    const date = dateManager.addDay(
      this.state.startDate,
      oldTimeUnit.dayOfWeek
    );
    let timeHandler = new TimeUnitHandler();
    if (oldTimeUnit.status === "Close") {
      var answer = window.confirm(
        "Do you want to make this to be available weekly?"
      );
      if (answer) {
        let timeUnit = new TimeUnit(
          null,
          oldTimeUnit.dayOfWeek,
          oldTimeUnit.time,
          true
        );
        timeHandler.addNewTimeUnit(timeUnit);
      } else {
        let timeUnit = new TimeUnit(
          date,
          oldTimeUnit.dayOfWeek,
          oldTimeUnit.time,
          false
        );
        timeHandler.addNewTimeUnit(timeUnit);
      }
    } else {
      var answer = window.confirm(
        "Are you sure you want to change this time cell?"
      );
      if (answer) {
        timeHandler.deleteTimeUnit(oldTimeUnit);
      } else {
        //some code
      }
    }
    this.updateTable();
  }

  back() {
    history.goBack();
  }

  createCalendarBody() {
    let calBody = [];
    // let times = config.times;
    this.state.timeSlotManager.slotList.forEach((slot, index) => {
      if (index % 7 == 0) {
        calBody.push(<div>{slot.time}</div>);
      }
      calBody.push(
        <div className="oneSlot" key={index} id={index}>
          <EditOneSlot
            // timeUnit={slot.time}
            // isOpen={slot.status}
            slot={slot}
            onClick={(slot) => this.onOneSlotClick(slot)}
          />
        </div>
      );
    });
    calBody.reduce((x, y) => x + y);
    return calBody;
  }

  getPreviosWeekDates() {
    let date = new Date();
    let start = date.setDate(this.state.startDate.getDate() - 7);
    let date2 = new Date();
    let end = date2.setDate(this.state.endDate.getDate() - 7);
    this.setState({
      startDate: start,
      endDate: end,
    });
  }
  getNextWeekDates() {
    let startDate2 = this.state.startDate;
    let endDate2 = this.state.endDate;
    let date = new Date();
    this.setState({
      startDate: new Date(date.setDate(startDate2.getDate() + 7)),
      endDate: new Date(date.setDate(endDate2.getDate() + 7)),
      isLoading: true,
    });
  }

  render() {
    let body = <div></div>;
    if (this.state.isLoading) {
      body = <div>Loading</div>;
      this.updateTable();
    } else {
      let calBody = this.createCalendarBody();
      let startDate = dateManager.convertDateToDateStringDDMMYYYY(
        this.state.startDate
      );
      let endDate = dateManager.convertDateToDateStringDDMMYYYY(
        this.state.endDate
      );
      body = (
        <div className="mainDiv">
          <div className="headerDiv">
            <button onClick={() => this.getPreviosWeekDates()}>
              Previous week
            </button>
            <h1 className="headerH1">
              Week from
              <span>{startDate}</span> to
              <span> {endDate}</span>
            </h1>
            <button onClick={() => this.getNextWeekDates()}> Next week</button>
          </div>

          <div className="calebdarWraper">
            <div> time</div>
            <div>יום ראשון</div>
            <div>יום שני</div>
            <div>יום שלישי</div>
            <div>יום רביעי</div>
            <div>טיום חמישי</div>
            <div>יום שישי</div>
            <div> שבת</div>

            {calBody}
          </div>
          <Button buttonText={"Back"} clicked={() => history.goBack()} />
        </div>
      );
    }
    return <Fragment>{body}</Fragment>;
  }
}

export default EditCalendar;
