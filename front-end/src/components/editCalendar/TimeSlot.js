import * as config from "./config";
class TimeSlot {
  constructor(date, dayOfWeek, time, status = config.status.close) {
    this.date = date;
    this.dayOfWeek = dayOfWeek;
    this.time = time;
    this.status = status;
  }
}

export default TimeSlot;
