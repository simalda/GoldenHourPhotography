import TimeSlot from "./TimeSlot";
import * as config from "./config";
import TimeUnitHandler from "../../JS/TimeUnitHandler";
import TimeUnit from "../../JS/TimeUnit";
import Orderhandler from "../../JS/Orderhandler";
import * as dateManager from "../../JS/dateManipulations";

class TimeSlotManager {
  constructor() {
    this.slotList = this.createSlotList();
    this.openTimeunits = [];
  }
  createSlotList() {
    let slotList = [];
    for (let i = 0; i < config.times.length; i++) {
      for (let day = 0; day < 7; day++) {
        slotList.push(new TimeSlot(null, day, config.times[i]));
      }
    }
    return slotList;
  }

  updateOpenDates() {
    let tuHandler = new TimeUnitHandler();
    return tuHandler.getTimeSlots().then((slotList) => {
      console.log(slotList);
      slotList.forEach((slot) => {
        this.updateOneTimeSlot(
          null,
          slot.dayOfWeek,
          slot.time,
          config.status.open
        );
      });
    });
  }
  updateReservedDays(orderList) {
    orderList.forEach((order) => {
      const dayOfWeek = dateManager.getDayOfWeek(order.date);
      this.updateOneTimeSlot(dayOfWeek, order.time, config.status.reserved);
    });
  }

  updateOneTimeSlot(dayOfWeek, time, status) {
    this.slotList.forEach((slotTime) => {
      if (slotTime.dayOfWeek === dayOfWeek && slotTime.time === time) {
        slotTime.status = status;
      }
    });
  }

  updateAllNonWeeklyOpenSlots(startDate, endDate, singleSlotList) {
    singleSlotList.forEach((slot) => {
      const date = new Date(slot.date);
      if (date > startDate && date < endDate) {
        this.updateOneTimeSlot(slot.dayOfWeek, slot.time, config.status.open);
      }
    });
  }

  updateWeeklyOpenSlots(identifierDdate, weeklyOpenList) {
    weeklyOpenList.forEach((slot) => {
      const date = dateManager.getDateBydayOfWeek(
        identifierDdate,
        slot.dayOfWeek
      );
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
    this.updateReservedDays(ordersList);
  }
  //   return this.updateWeeklyOpenSlots(startDate).then(() => {
  //     console.log("STEP1");
  //     console.log(this);
  //     const step2 = this.updateAllNonWeeklyOpenSlots(startDate, endDate).then(
  //       () => {
  //         console.log("STEP2");
  //         console.log(this);
  //         const step3 = this.updateReservedDays().then((result) => {
  //           console.log("STEP3");
  //           console.log(this);
  //           console.log(result);
  //         });
  //       }
  //     );
  //   });
  // }

  getOpenTimeSlotsForWeek(startDate, endDate) {
    this.getTimeSlotsForPeriod(startDate, endDate).then((result) =>
      result.filter((slot) => slot.status === config.status.open)
    );
  }
}

export default TimeSlotManager;
