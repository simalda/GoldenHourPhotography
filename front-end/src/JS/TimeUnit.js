class TimeUnit {
  constructor(date, dateFormated, time, isWeekly) {
    this.date = date;
    this.dateFormated = dateFormated; //DD.MM.YYYY
    this.time = time;
    this.isWeekly = isWeekly;
    this.orderId = null;
  }
}

export default TimeUnit;
