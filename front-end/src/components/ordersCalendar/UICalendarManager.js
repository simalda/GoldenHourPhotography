import * as dateManager from "../../JS/dateManipulations";

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
      daysList.push([]);
    }
    return daysList;
  }

  getInfoAboutDays(timeUnitSingleList, timeUnitWeeklyList, ordersList) {
    const startDate = new Date(this.year, this.month, 0);
    const endDate = new Date(
      this.year,
      this.month,
      dateManager.numberOfDaysInMounth(this.year, this.month)
    );
    this.updateWeeklyOpenSlots(startDate, timeUnitWeeklyList);
    this.updateAllNonWeeklyOpenSlots(startDate, endDate, timeUnitSingleList);
    this.updateReservedDays(ordersList);
  }
  updateReservedDays(ordersList) {}
  updateAllNonWeeklyOpenSlots(startDate, endDate, singleSlotList) {
    singleSlotList.forEach((slot) => {
      const date = new Date(slot.date);
      if (date > startDate && date < endDate) {
        this.updateOneDay(date, slot.time);
      }
    });
  }
  updateWeeklyOpenSlots(identifierDdate, weeklyOpenList) {
    weeklyOpenList.forEach((slot) => {
      const dates = dateManager.getAllDatesBydayOfWeek(
        this.year,
        this.month,
        slot.dayOfWeek
      );
      dates.forEach((date) => this.updateOneDay(date, slot.time));
    });
  }

  removeTimeFromDay(date, time) {
    const day = date.getDate();
    this.openDaysList[day - 1].push(time);
  }
  updateOneDay(date, time) {
    const day = date.getDate();
    this.openDaysList[day - 1].push(time);
  }
}

export default UICalendarManager;
