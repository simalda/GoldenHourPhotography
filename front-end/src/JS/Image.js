class Image {
  constructor(id, name, imageType, eventType, location, path) {
    this.id = id;
    this.name = name;
    this.imageType = imageType;
    this.eventType = eventType;
    this.location = location;
    this.path = path;
  }
  copy() {
    return new Image(
      this.id,
      this.name,
      this.imageType,
      this.eventType,
      this.location,
      this.path
    );
  }

  static deserializeToImageObject(imageJson) {
    return new Image(
      imageJson.id,
      imageJson.name,
      imageJson.imageType,
      imageJson.eventType,
      imageJson.location,
      imageJson.path
    );
  }
}

export default Image;
