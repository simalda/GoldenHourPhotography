class OrderHandler():
    def __init__(self, data_access):
        self.data_access = data_access
    
    def add_new_order(self, order):
        self.data_access.add_order(order)
 
    def get_orders(self):
        return self.data_access.get_orders()

    def delete_order(self, order_id):
        return self.data_access.delete_order(order_id)

    def update_order(self, order):
        self.data_access.update_order(order)