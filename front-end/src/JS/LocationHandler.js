import * as proxy from "./proxy";

class LocationHandler {
  getAllLocationsInfo() {
    return proxy.getAllLocationsInfo();
  }
  getAllLocations() {
    return proxy.getAllLocations();
  }

  // addLocation(){}
  // removeLocation(location){}
  // buildLocation(){}
  // getAllLinksToLocation(){}
}

export default LocationHandler;
