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

  updateImages(imageList) {
    proxy.updateImages(imageList);
  }
}

export default ImageHandler;
