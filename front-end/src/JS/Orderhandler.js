import * as proxy from "../JS/proxy";
class OrderHandler {
  addNewOrder(order) {
    return proxy.addOrder(order);
  }

  getOrders() {
    return proxy.getOrders();
  }
  deleteOrder(orderId) {
    proxy.deleteOrder(orderId);
  }
  updateOrder(order) {
    return proxy.updateOrder(order);
  }
  // getOtheReport(image) {
  //   return proxy.deleteImage(image);
  // }
}

export default OrderHandler;
