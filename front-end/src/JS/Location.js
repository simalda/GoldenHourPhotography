import Image from "../JS/Image";

class Location {
  constructor(
    name,
    type = null,
    latitude,
    longitude,
    description = null,
    sphereImageList,
    regularImageList
  ) {
    this.name = name;
    this.type = type;
    this.latitude = latitude;
    this.longitude = longitude;
    this.description = description;
    this.sphereImageList = sphereImageList;
    this.regularImageList = regularImageList;
  }
  static deserializeToLocationObject(locationJson) {
    if (locationJson.sphereImageList !== undefined) {
      var newSphereImages = locationJson.sphereImageList.map((image) =>
        Image.deserializeToImageObject(image)
      );
    }
    if (locationJson.regularImageList !== undefined) {
      var newRegularImages = locationJson.regularImageList.map((image) =>
        Image.deserializeToImageObject(image)
      );
    }

    return new Location(
      locationJson.name,
      locationJson.type,
      locationJson.latitude,
      locationJson.longitude,
      locationJson.description,
      newSphereImages,
      newRegularImages
    );
  }
}

export default Location;
