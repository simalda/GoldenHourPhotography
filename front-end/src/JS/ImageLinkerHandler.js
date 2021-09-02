import * as proxy from "./proxy";
import ImageLinker from "../JS/ImageLinker";
class ImageLinkerHandler {
  upsertLink(link) {
    proxy.upsertLink(link);
  }

  getAllLinksToImage(origin) {
    return proxy.getAllLinksToImage(origin);
  }

  deleteLink(link) {
    return proxy.deleteLink(link);
  }

  getConnections(image) {
    const linkHandler = new ImageLinkerHandler();
    return linkHandler.getAllLinksToImage(image).then((connections) => {
      const connectionsToLinks = (connections) =>
        connections.map(
          (connection) =>
            new ImageLinker(
              connection.origin,
              connection.destination,
              connection.destinationImagePath,
              connection.latitude,
              connection.longitude
            )
        );
      return connections ? connectionsToLinks(connections) : [];
    });
  }
}

export default ImageLinkerHandler;
