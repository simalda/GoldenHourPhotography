import Image from "../JS/Image";

class Location {
  constructor(
    name,
    type = null,
    latitude,
    longtitude,
    description = null,
    sphereImageList,
    regularImageList
  ) {
    this.name = name;
    this.type = type;
    this.latitude = latitude;
    this.longtitude = longtitude;
    this.description = description;
    this.sphereImageList = sphereImageList;
    this.regularImageList = regularImageList;
  }
  static deserializeToLocationObject(locationJson) {
    const newSphereImages = locationJson.sphereImageList.map((image) =>
      Image.deserializeToImageObject(image)
    );
    const newRegularImages = locationJson.regularImageList.map((image) =>
      Image.deserializeToImageObject(image)
    );

    return new Location(
      locationJson.name,
      locationJson.type,
      locationJson.latitude,
      locationJson.longtitude,
      locationJson.description,
      newSphereImages,
      newRegularImages
    );
  }
}

export default Location;
