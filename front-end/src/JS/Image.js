class Image {
  constructor(name, imageType, eventType, location, path) {
    this.name = name;
    this.imageType = imageType;
    this.eventType = eventType;
    this.location = location;
    this.path = path;
  }
  copy() {
    return new Image(this.name, this.imageType, this.eventType, this.location);
  }

  static deserializeToImageObject(imageJson) {
    return new Image(
      imageJson.name,
      imageJson.imageType,
      imageJson.eventType,
      imageJson.location,
      imageJson.path
    );
  }
}

export default Image;
