from DataAccess import DataAccess
class DataAccessOrders(DataAccess):
    
    def get_orders_inPeriod(self, firsDate, secondDate):
        self.imagesCollection = self.mydb['orders']
        result = self.imagesCollection.find( )
    
    def insert_order(self):
        pass
    #  db.orders.insert({"name":"string","secondName":"string", "telephon":"number","email":"string","date":"date", "time":"string"})?

    def addOrder(self, order):
        self.mycollection = self.mydb['orders']
        self.mycollection.insert_one({"name":order.name,"telefon":order.telefon, "email":order.email, "location":order.location,"date":order.date,"time":order.time, "eventType":order.eventType,"note":order.note})

    def getOrders(self):
        self.orderCollection = self.mydb['orders']
        orders = []
        result = self.orderCollection.find( )
        for order in result:
            orders.append({
             "date":  order["date"],
            "time" : order["time"]
        })
        print(orders)
        return orders

