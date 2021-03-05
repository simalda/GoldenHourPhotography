import TimeSlot from "./TimeSlot";
import * as config from "../../../JS/config";
import TimeUnitHandler from "../../../JS/TimeUnitHandler";
import * as dateManager from "../../../JS/dateManipulations";

class TimeSlotManager {
  constructor() {
    this.slotList = this.createSlotListForWeek();
    this.openTimeunits = [];
  }
  createSlotListForWeek() {
    let slotList = [];
    for (let i = 0; i < config.times.length; i++) {
      for (let day = 0; day < 7; day++) {
        slotList.push(new TimeSlot(null, day, config.times[i]));
      }
    }
    return slotList;
  }

  updateReservedDays(startDate, endDate, orderList) {
    orderList.forEach((order) => {
      const date = new Date(order.date);
      const dayOfWeek = dateManager.getDayOfWeek(date);
      if (date >= startDate && date <= endDate) {
        this.updateOneTimeSlot(
          dayOfWeek,
          order.time,
          config.status.reserved,
          order.id
        );
      }
    });
  }

  updateOneTimeSlot(dayOfWeek, time, status, order) {
    this.slotList.forEach((slotTime) => {
      if (slotTime.dayOfWeek === dayOfWeek && slotTime.time === time) {
        slotTime.status = status;
        slotTime.orderId = order;
      }
    });
  }

  updateAllNonWeeklyOpenSlots(startDate, endDate, singleSlotList) {
    singleSlotList.forEach((slot) => {
      const date = new Date(slot.date);
      if (date >= startDate && date <= endDate) {
        this.updateOneTimeSlot(slot.dayOfWeek, slot.time, config.status.open);
      }
    });
  }

  updateWeeklyOpenSlots(identifierDdate, weeklyOpenList) {
    weeklyOpenList.forEach((slot) => {
      const date = dateManager.addDaysToDate(identifierDdate, slot.dayOfWeek);
      this.updateOneTimeSlot(
        slot.dayOfWeek,
        slot.time,
        config.status.open,
        date
      );
    });
  }

  getOpenTimeSlotsForMonth(month) {
    let startDate = new Date();
    const daysinmonth = dateManager.daysInMonth(
      startDate.getMonth(),
      startDate.getFullYear()
    );
    let endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      daysinmonth - 1
    );
    if (month < startDate.getMonth()) return [];
    else if (month > startDate.getMonth()) {
      startDate = startDate - startDate.getDate();
    }
    return this.getTimeSlotsForPeriod(startDate, endDate);
  }

  getTimeSlotsForPeriod(
    startDate,
    endDate,
    timeUnitSingleList,
    timeUnitWeeklyList,
    ordersList
  ) {
    this.updateWeeklyOpenSlots(startDate, timeUnitWeeklyList);
    this.updateAllNonWeeklyOpenSlots(startDate, endDate, timeUnitSingleList);
    this.updateReservedDays(startDate, endDate, ordersList);
  }

  getOpenTimeSlotsForWeek(startDate, endDate) {
    this.getTimeSlotsForPeriod(startDate, endDate).then((result) =>
      result.filter((slot) => slot.status === config.status.open)
    );
  }
}

export default TimeSlotManager;
