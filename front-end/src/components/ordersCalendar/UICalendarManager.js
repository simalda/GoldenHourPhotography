import * as dateManager from "../../JS/dateManipulations";
import OneDayTimeSlot from "../../JS/OneDayTimeSlot";
import * as config from "../../JS/config";

class UICalendarManager {
  constructor(month, year) {
    this.month = month;
    (this.year = year), (this.openDaysList = this.createNewMonthList());
  }

  createNewMonthList() {
    let daysList = [];
    for (
      let i = 0;
      i < dateManager.numberOfDaysInMounth(this.year, this.month);
      i++
    ) {
      daysList.push(
        new OneDayTimeSlot(dateManager.createDate(this.year, this.month, i))
      );
    }
    return daysList;
  }

  getInfoAboutDays(timeUnitSingleList, timeUnitWeeklyList, ordersList) {
    const todayDay = new Date().getDate();
    const startDate = new Date(this.year, this.month, todayDay);
    const endDate = new Date(
      this.year,
      this.month,
      dateManager.numberOfDaysInMounth(this.year, this.month)
    );
    this.updateWeeklyOpenSlots(startDate, endDate, timeUnitWeeklyList);
    this.updateAllNonWeeklyOpenSlots(startDate, endDate, timeUnitSingleList);
    this.updateReservedDays(startDate, endDate, ordersList);
  }
  updateReservedDays(startDate, endDate, ordersList) {
    ordersList.forEach((slot) => {
      const date = new Date(slot.date);
      if (date >= startDate && date < endDate) {
        this.removeTimeFromDay(date, slot.time);
      }
    });
  }
  updateAllNonWeeklyOpenSlots(startDate, endDate, singleSlotList) {
    singleSlotList.forEach((slot) => {
      const date = new Date(slot.date);
      if (date > startDate && date < endDate) {
        this.addTimeToDay(date, slot.time);
      }
    });
  }
  updateWeeklyOpenSlots(startDate, endDate, weeklyOpenList) {
    weeklyOpenList.forEach((slot) => {
      const dates = dateManager.getAllDatesBydayOfWeek(
        this.year,
        this.month,
        slot.dayOfWeek
      );

      dates.forEach((date) => {
        if (date > startDate && date < endDate) {
          this.addTimeToDay(date, slot.time);
        }
      });
    });
  }

  removeTimeFromDay(date, time) {
    const day = date.getDate();
    this.openDaysList[day - 1].timeSlots[time] = config.status.close;
  }
  addTimeToDay(date, time) {
    const day = date.getDate();
    this.openDaysList[day - 1].timeSlots[time] = config.status.open;
  }
}

export default UICalendarManager;
