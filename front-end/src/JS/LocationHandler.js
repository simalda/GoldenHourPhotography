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

  getAllLocations() {
    return proxy.getAllLocations();
  }

  getLocationTypes() {
    return proxy.getLocationTypes();
  }
}

export default LocationHandler;
