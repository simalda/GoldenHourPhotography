import * as proxy from "../JS/proxy";

class ImageHandler {
  addNewImage(image) {
    return proxy.addNewImage(image);
  }

  getAllImages() {
    return proxy.getAllImages();
  }

  deleteImage(image) {
    return proxy.deleteImage(image);
  }

  updateImage(image) {
    proxy.updateImage(image);
  }
  saveFile(file) {
    return proxy.saveFile(file);
  }
}

export default ImageHandler;
