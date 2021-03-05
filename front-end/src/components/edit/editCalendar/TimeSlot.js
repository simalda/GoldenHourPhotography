import * as config from "../../../JS/config";
class TimeSlot {
  constructor(
    date,
    dayOfWeek,
    time,
    orderId = null,
    status = config.status.close
  ) {
    this.date = date;
    this.dayOfWeek = dayOfWeek;
    this.time = time;
    this.orderId = orderId;
    this.status = status;
  }
}

export default TimeSlot;
