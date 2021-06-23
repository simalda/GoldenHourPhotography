import * as proxy from "./proxy";

class LocationHandler {
  addLocationType(locationType) {
    return proxy.addNewLocationType(locationType);
  }

  addNewLocation(location) {
    return proxy.addNewLocation(location);
  }

  deleteLocationType(locationType) {
    return proxy.deleteLocationType(locationType);
  }

  getAllLocationsInfo() {
    return proxy.getAllLocationsInfo();
  }

  getLocationsName() {
    return proxy.getLocationsName();
  }

  getLocationTypes() {
    return proxy.getLocationTypes();
  }
}

export default LocationHandler;
