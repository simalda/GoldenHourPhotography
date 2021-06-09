import * as config from "./config";
import * as dateManager from "./dateManipulations";

class OneDayTimeSlot {
  constructor(date) {
    this.date = date;
    this.timeSlots = this.createEmplyTimeList();
  }
  createEmplyTimeList() {
    let emptySlots = {};
    for (let i = 0; i < config.times.length; i++) {
      emptySlots[config.times[i]] = config.status.close;
    }

    return emptySlots;
  }
  isThereSlotsToReserve() {
    for (let i = 0; i < config.times.length; i++) {
      if (this.timeSlots[config.times[i]] !== config.status.close) {
        return true;
      }
    }
    return false;
  }
  fillOneDayTimeSlot(date, singleSlotList, weeklyOpenList, ordersList) {
    const dayOfWeek = date.getDay();
    const currentDay = new Date();
    for (let i = 0; i < config.times.length; i++) {
      singleSlotList.forEach((element) => {
        const elDate = dateManager.createDateDMYfromString(element.date);
        if (
          elDate === date &&
          element.time === config.times[i] &&
          date > currentDay
        ) {
          this.timeSlots[config.times[i]] === config.status.open;
        }
      });
      weeklyOpenList.forEach((element) => {
        if (
          element.dayOfWeek === dayOfWeek &&
          element.time === config.times[i] &&
          date > currentDay
        ) {
          this.timeSlots[config.times[i]] = config.status.open;
        }
      });

      ordersList.forEach((element) => {
        const elDate = dateManager.createDateDMYfromString(element.date);
        if (elDate === date && element.time === config.times[i]) {
          this.timeSlots[config.times[i]] = config.status.close;
        }
      });
    }
  }

  getTimeSlotsAsArray() {
    const timeArray = [];
    for (let i = 0; i < config.times.length; i++) {
      if (this.timeSlots[config.times[i]] !== config.status.close) {
        timeArray.push(config.times[i]);
      }
    }
    return timeArray;
  }
}

export default OneDayTimeSlot;
