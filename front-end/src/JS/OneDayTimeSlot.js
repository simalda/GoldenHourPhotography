import * as config from "./config";

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
