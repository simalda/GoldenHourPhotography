import React from "react";

import history from "../../JS/history";
import Button from "../Button";
import * as proxy from "../../JS/proxy";
import EditOneSlot from "./EditOneSlot";
import "./editCalendar.css";
import TimeUnit from "../../JS/TimeUnit";
import moment from "moment";
import TimeUnitHandler from "../../JS/TimeUnitHandler";

class EditCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSlotList: this.props.timeSlotList,
      setSlotsToUpdate: new Set(),
      startDate: this.countStartDate(),
      endDate: this.countEndDate(),
    };
  }

  componentDidMount() {
    // this.countDates();
    // this.getAllAvalableDates();
  }

  countStartDate() {
    let date = new Date();
    return moment().subtract(date.getDay(), "days")._d;
  }
  countEndDate() {
    let date = new Date();
    return moment().add(6 - date.getDay(), "days")._d;
  }

  setSlotToUpdate(timeSlot) {}

  back() {
    history.goBack();
  }

  createCalendarBody() {
    let calBody = [];
    let times = [
      "10:00 - 11:00",
      "11:00 - 12:00",
      "12:00 - 13:00",
      "13:00 - 14:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
      "16:00 - 17:00",
    ];
    times.forEach((time) => {
      let row = this.createCalendarRow(time);
      calBody.push(row);
    });
    calBody.reduce((x, y) => x + y);
    return calBody;
  }

  createCalendarRow(time) {
    let calRow = [];
    calRow.push(<div>{time}</div>);
    for (let i = 0; i < 7; i++) {
      let { timeUnit, isOpen } = this.checkTimeCell(i, time);
      calRow.push(
        <div className="oneSlot" key={i} id={i}>
          <EditOneSlot
            timeUnit={timeUnit}
            isOpen={isOpen}
            timeClicked={() => this.setSlotToUpdate()}
          />
        </div>
      );
    }
    calRow.reduce((x, y) => x + y);
    return calRow;
  }

  checkTimeCell(dayIndex, time) {
    let date = new Date();

    date = moment(this.state.startDate).add(dayIndex, "days")._d;
    let dateFormated = moment(date).format("DD.MM.YYYY");
    let timeUni = new TimeUnit(date, dateFormated, time, false, null);
    // this.state.timeSlotList.forEach((timeUnit) => {
    //   if (timeUnit.dateFormated === dateFormated && timeUnit.time === time) {
    //     if (timeUnit.orderId) {
    //       return {
    //         timeUnit: new TimeUnit(
    //           date,
    //           dateFormated,
    //           time,
    //           timeUnit.isWeekly,
    //           timeUnit.orderId
    //         ),
    //         isOpen: "Reserved",
    //       };
    //     } else {
    //       return {
    //         timeUnit: new TimeUnit(
    //           date,
    //           dateFormated,
    //           time,
    //           timeUnit.isWeekly,
    //           timeUnit.orderId
    //         ),
    //         isOpen: "Open",
    //       };
    //     }
    //   }
    // });
    let timeUnit = this.state.timeSlotList;
    for (let i = 0; i < timeUnit.length; i++) {
      if (
        timeUnit[i].dateFormated === dateFormated &&
        timeUnit[i].time === time
      ) {
        if (timeUnit[i].orderId) {
          return {
            timeUnit: new TimeUnit(
              date,
              dateFormated,
              time,
              timeUnit[i].isWeekly,
              timeUnit[i].orderId
            ),
            isOpen: "Reserved",
          };
        } else {
          return {
            timeUnit: new TimeUnit(
              date,
              dateFormated,
              time,
              timeUnit[i].isWeekly,
              timeUnit[i].orderId
            ),
            isOpen: "Open",
          };
        }
      }
    }
    return { timeUnit: timeUni, isOpen: "Close" };
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

  render() {
    let calBody = this.createCalendarBody();
    let startDate = moment(this.state.startDate).format("DD.MM.YYYY");
    let endDate = moment(this.state.endDate).format("DD.MM.YYYY");
    return (
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
      </div>
    );
  }
}

export default EditCalendar;
