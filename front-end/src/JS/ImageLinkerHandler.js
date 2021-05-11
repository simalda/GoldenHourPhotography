import * as proxy from "./proxy";
class ImageLinkerHandler {
  upsertlink(link) {
    proxy.upsertlink(link);
  }

  getAllLinksToImage(origin) {
    return proxy.getAllLinksToImage(origin);
  }

  removeLinkFrom() {}
}

export default ImageLinkerHandler;
