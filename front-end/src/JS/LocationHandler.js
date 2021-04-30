import * as proxy from "./proxy";

class LocationHandler {
  getAllLocationsInfo() {
    return proxy.getAllLocationsInfo();
  }

  getAllLocations() {
    return proxy.getAllLocations();
  }

  addNewLocation(location) {
    return proxy.addNewLocation(location);
  }

  // removeLocation(location){}
  // buildLocation(){}
  // getAllLinksToLocation(){}
}

export default LocationHandler;
