import * as proxy from "../JS/proxy";
import TimeSlotManager from "../components/edit/editCalendar/TimeSlotManager";
// import * as dateManager from "../../../JS/dateManipulations";
import TimeUnit from "./TimeUnit";

class TimeUnitHandler {
  addNewTimeUnit(timeUnit) {
    return proxy.addNewTimeUnit(timeUnit);
  }

  getTimeSlots() {
    return proxy.getTimeSlots();
  }
  getTimeSlotsWeekly() {
    return proxy.getTimeSlotsWeekly();
  }
  getSingleTimeSlots() {
    return proxy.getSingleTimeSlots();
  }
  // getOpenTimeSlots() {
  //   return proxy.getOpenSlots();
  // }
  deleteTimeUnit(timeUnit) {
    return proxy.deleteTimeUnit(timeUnit);
  }

  getOpenTimeUnitsForWeek(startDate, endDate) {
    const tsManager = new TimeSlotManager();
    const timeSlotsForWeek = tsManager
      .getOpenTimeSlotsForWeek(startDate, endDate)
      .then((timeSlotsForWeek) =>
        timeSlotsForWeek.map(
          (timeUnit) =>
            new TimeUnit(
              new Date(startDate + timeUnit.dayOfweek),
              timeUnit.dayOfweek,
              timeUnit.time,
              timeUnit.isWeekly
            )
        )
      );
  }
}

export default TimeUnitHandler;
