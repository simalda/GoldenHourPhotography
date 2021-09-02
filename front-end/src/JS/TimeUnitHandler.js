import * as proxy from "../JS/proxy";
import TimeSlotManager from "../components/edit/editCalendar/TimeSlotManager";
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

  deleteTimeUnit(timeUnit) {
    return proxy.deleteTimeUnit(timeUnit);
  }

  getOpenTimeUnitsForWeek(startDate, endDate) {
    const tsManager = new TimeSlotManager();
    tsManager
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
