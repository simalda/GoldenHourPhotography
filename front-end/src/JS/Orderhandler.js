import * as proxy from "../JS/proxy";
class OrderHandler {
  addNewOrder(order) {
    return proxy.addOrder(order);
  }

  getOrders() {
    return proxy.getOrders();
  }

  // getOtheReport(image) {
  //   return proxy.deleteImage(image);
  // }
}

export default OrderHandler;
