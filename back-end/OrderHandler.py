class OrderHandler():
    def __init__(self, dataAccess):
        self.dataAccess = dataAccess
    
    def add_new_order(self, order):
        self.dataAccess.addOrder(order)
 
    def get_orders(self):
        return self.dataAccess.getOrders()

    def delete_order(self, orderId):
        return self.dataAccess.deleteOrder(orderId)

    def update_order(self, order):
        self.dataAccess.updateOrder(order)