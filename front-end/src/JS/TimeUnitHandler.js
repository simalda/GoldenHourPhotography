import * as proxy from "../JS/proxy";

class TimeUnitHandler {
  addNewTimeUnit(timeUnit) {
    return proxy.addNewTimeUnit(timeUnit);
  }

  getTimeSlots() {
    return proxy.getTimeSlots();
  }
  getOpenTimeSlots() {
    return proxy.getOpenSlots();
  }
  deleteTimeUnit(timeUnit) {
    return proxy.deleteTimeUnit(timeUnit);
  }

  //   updateTimeUnit(timeUnit) {
  //     proxy.updateTimeUnit(timeUnit);
  //   }
}

export default TimeUnitHandler;
