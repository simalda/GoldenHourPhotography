import * as proxy from "./proxy";

class LocationHandler {
  getAllLocationsInfo() {
    return proxy.getAllLocationsInfo();
  }
  getAllLocations() {
    return proxy.getAllLocations();
  }
}

export default LocationHandler;
