import React, { Fragment } from "react";

import history from "../../../JS/history";
import Button from "../../Button";
import EditOneSlot from "./EditOneSlot";
import "./editCalendar.css";
import TimeUnit from "../../../JS/TimeUnit";

import * as dateManager from "../../../JS/dateManipulations";
import TimeUnitHandler from "../../../JS/TimeUnitHandler";
import * as config from "../../../JS/config";
import TimeSlotManager from "./TimeSlotManager";
import OrderHandler from "../../../JS/Orderhandler";
import PopupCloseTimeSlotClicked from "./PopupCloseTimeSlotClicked";
import PopupReservedTimeSlotClicked from "./PopupReservedTimeSlotClicked";
import PopupOpenTimeSlotClicked from "./PopupOpenTimeSlotClicked";
import EditOneOrder from "../EditOneOrder";
class EditCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: dateManager.countStartDate(this.props.date),
      endDate: dateManager.countEndDate(this.props.date),
      isLoading: true,
      popupReservedTimeSlotClicked: false,
      popupCloseTimeSlotClicked: false,
      popupOpenTimeSlotClicked: false,
      orderEditorClicked: false,
    };
  }

  componentDidMount() {
    this.updateTable(this.state.startDate, this.state.endDate);
  }

  async updateTable(startDate, endDate) {
    let timeUnitsSingle = await this.getTimeUnitsSingleFromDB();
    let timeUnitsWeekly = await this.getTimeUnitsWeeklyFromDB();
    let orders = await this.getOrdersFromDB();
    this.getCalendarTable(
      startDate,
      endDate,
      timeUnitsSingle,
      timeUnitsWeekly,
      orders
    );
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

  getCalendarTable(
    startDate,
    endDate,
    timeUnitSingleList,
    timeUnitWeeklyList,
    ordersList
  ) {
    let timeSlotManager = new TimeSlotManager();
    timeSlotManager.getTimeSlotsForPeriod(
      startDate,
      endDate,
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
    if (oldTimeUnit.status === config.status.close) {
      this.setState({
        popupCloseTimeSlotClicked: true,
        currentHandledUnit: oldTimeUnit,
      });
    } else if (oldTimeUnit.status === config.status.reserved) {
      this.setState({
        popupReservedTimeSlotClicked: true,
        currentHandledUnit: oldTimeUnit,
      });
    } else if (oldTimeUnit.status === config.status.open) {
      this.setState({
        popupOpenTimeSlotClicked: true,
        currentHandledUnit: oldTimeUnit,
      });
    }
    this.updateTable(this.state.startDate, this.state.endDate);
  }

  back() {
    history.goBack();
  }

  createCalendarBody() {
    let calBody = [];
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
    const start = dateManager.addDaysToDate(this.state.startDate, -7);
    const end = dateManager.addDaysToDate(this.state.endDate, -7);
    this.updateTable(start, end);
    this.setState({
      startDate: start,
      endDate: end,
    });
  }
  getNextWeekDates() {
    const startDate = dateManager.addDaysToDate(this.state.startDate, 7);
    const endDate = dateManager.addDaysToDate(this.state.endDate, 7);
    this.updateTable(startDate, endDate);
    this.setState({
      startDate: startDate,
      endDate: endDate,
      isLoading: true,
      currentOrder: null,
    });
  }

  makeOrderManually() {
    this.setState({
      orderEditorClicked: true,
      popupCloseTimeSlotClicked: false,
      popupOpenTimeSlotClicked: false,
      popupReservedTimeSlotClicked: false,
    });
  }
  deleteOrder(orderId) {
    const orHandler = new OrderHandler();
    orHandler.deleteOrder(orderId);
    this.setState({
      popupReservedTimeSlotClicked: false,
    });
    this.updateTable(this.state.startDate, this.state.endDate);
  }
  closeEditOrderPopup() {
    this.setState({
      orderEditorClicked: false,
    });
    this.updateTable(this.state.startDate, this.state.endDate);
  }
  closeCloseTimeSlotPopup() {
    this.setState({
      popupCloseTimeSlotClicked: false,
    });
    this.updateTable(this.state.startDate, this.state.endDate);
  }
  closeOpenTimeSlotPopup() {
    this.setState({
      popupOpenTimeSlotClicked: false,
    });
    this.updateTable(this.state.startDate, this.state.endDate);
  }
  closeReservedTimeSlotPopup() {
    this.setState({
      popupReservedTimeSlotClicked: false,
    });
    this.updateTable(this.state.startDate, this.state.endDate);
  }
  openTimeUnitWeekly(timeSlot) {
    let timeHandler = new TimeUnitHandler();
    let timeUnit = new TimeUnit(null, timeSlot.dayOfWeek, timeSlot.time, true);
    timeHandler.addNewTimeUnit(timeUnit);
    this.setState({
      popupCloseTimeSlotClicked: false,
    });
    this.updateTable(this.state.startDate, this.state.endDate);
  }
  openOnlyThisTimeUnit(timeSlot) {
    const date = dateManager.addDaysToDate(
      this.state.startDate,
      this.state.currentHandledUnit.dayOfWeek
    );
    let timeHandler = new TimeUnitHandler();
    let timeUnit = new TimeUnit(date, timeSlot.dayOfWeek, timeSlot.time, false);
    timeHandler.addNewTimeUnit(timeUnit);
    this.setState({
      popupCloseTimeSlotClicked: false,
    });
    this.updateTable(this.state.startDate, this.state.endDate);
  }
  closeTimeSlot(timeSlot) {
    let timeHandler = new TimeUnitHandler();
    let timeUnit = new TimeUnit(null, timeSlot.dayOfWeek, timeSlot.time, true);
    timeHandler.deleteTimeUnit(timeUnit);
    this.setState({
      popupOpenTimeSlotClicked: false,
    });
    this.updateTable(this.state.startDate, this.state.endDate);
  }

  render() {
    let body = <div></div>;
    if (this.state.isLoading) {
      body = <div>Loading</div>;
      // this.updateTable(this.state.startDate, this.state.endDate);
    } else {
      let calBody = this.createCalendarBody();
      let startDate = dateManager.convertDateToDateStringDDMMYYYY(
        this.state.startDate
      );
      let endDate = dateManager.convertDateToDateStringDDMMYYYY(
        this.state.endDate
      );
      let popup = <div></div>;

      if (this.state.popupCloseTimeSlotClicked) {
        popup = (
          <PopupCloseTimeSlotClicked
            timeSlot={this.state.currentHandledUnit}
            openTimeUnitWeekly={(x) => this.openTimeUnitWeekly(x)}
            openOnlyThisTimeUnit={(x) => this.openOnlyThisTimeUnit(x)}
            makeOrderManually={(x) => this.makeOrderManually(x)}
            closeCloseTimeSlotPopup={() => this.closeCloseTimeSlotPopup()}
          />
        );
      } else if (this.state.popupReservedTimeSlotClicked) {
        popup = (
          <PopupReservedTimeSlotClicked
            timeSlot={this.state.currentHandledUnit}
            deleteOrder={(x) => this.deleteOrder(x)}
            makeOrderManually={() => this.makeOrderManually()}
            closeReservedTimeSlotPopup={() => this.closeReservedTimeSlotPopup()}
          />
        );
      } else if (this.state.popupOpenTimeSlotClicked) {
        popup = (
          <PopupOpenTimeSlotClicked
            timeSlot={this.state.currentHandledUnit}
            closeTimeSlot={(x) => this.closeTimeSlot(x)}
            makeOrderManually={(x) => this.makeOrderManually(x)}
            closeOpenTimeSlotPopup={() => this.closeOpenTimeSlotPopup()}
          />
        );
      } else if (this.state.orderEditorClicked) {
        const date = dateManager.addDaysToDate(
          this.state.startDate,
          this.state.currentHandledUnit.dayOfWeek
        );
        let currentOrder = null;
        if (this.state.currentHandledUnit.status === config.status.reserved) {
          currentOrder = this.state.ordersList.filter(
            (order) => order.id === this.state.currentHandledUnit.orderId
          );
          currentOrder = currentOrder[0];
        }
        popup = (
          <EditOneOrder
            order={currentOrder}
            date={date}
            timeSlot={this.state.currentHandledUnit}
            closeEditOrderPopup={() => this.closeEditOrderPopup()}
            locationsInfo={this.props.locationsInfo}
            eventTypes={this.props.eventTypes}
            dictionary={this.props.dictionary}
          />
        );
      }

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
            {popup}
          </div>
          <Button buttonText={"Back"} clicked={() => history.goBack()} />
        </div>
      );
    }
    return <Fragment>{body}</Fragment>;
  }
}

export default EditCalendar;
